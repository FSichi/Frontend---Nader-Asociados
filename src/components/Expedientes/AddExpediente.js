import React, { useEffect, useState } from 'react'
import { ExpClienteCard } from './ExpClienteCard';
import { useForm } from '../../hooks/useForm';
import Swal from 'sweetalert2'
import Select from 'react-select';
import axios from 'axios';
import { AbogadoApoderado, AbogadoGestor, CallCenter, customStyles, eliminarCliente } from '../../helpers/Expedientes'
import { establecerAcumulador, getClientesByCuitCuilExact, getEstadoAddExpediente, getPosiblesClientes } from '../../selector/Clientes';
import { crearFichasEstadoClientes, crearFichasExpedienteCliente, getEstadoRegisterExpediente } from '../../selector/Expedientes';


export const AddExpediente = ({ history }) => {

    localStorage.setItem("ruta", `/exp/add`);

    /* STATES PARA GUARDAR VALORES DE LA DB */

    const [clientesDB, setClientesDB] = useState([]);
    const [estadoClienteDB, setEstadoClientesDB] = useState([]);
    const [firmasClienteDB, setFirmasClientesDB] = useState([]);
    const [telegramasClienteDB, setTelegramasClientesDB] = useState([]);
    const [expedienteClienteDB, setExpedienteClienteDB] = useState([]);

    /* COSAS DE ADD EXPEDIENTE */

    const [listofClientes, setListOfClientes] = useState([]);
    const [listofPosiblesClientes, setListOfPosiblesClientes] = useState([]);

    const [clienteSelect, setClienteSelect] = useState(false);
    const [clienteCC, setClienteCC] = useState('');

    const [optionValueAbAp, setOptionValueAbAp] = useState([]);
    const [optionValueAbGs, setOptionValueAbGs] = useState({});
    const [optionValueCall, setOptionValueCall] = useState({});

    const [banderaCliente, setBanderaCliente] = useState(false);
    const [banderaCliente2, setBanderaCliente2] = useState(false);

    const [banderaCarga, setBanderaCarga] = useState(false);

    const [acumulador, setAcumulador] = useState(0);

    const [formValues, handleInputChange] = useForm({
        numExp: '',
        nombreExp: '',
        juzgado: '',
        capitalColectivo: '',

        capitalReclamado: '',
        searchFilter: '',
    });

    const { numExp, nombreExp, juzgado, capitalColectivo, capitalReclamado, searchFilter } = formValues;

    if (banderaCliente2) {
        setBanderaCliente(true);
        setBanderaCliente2(false);
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/general/addExpediente`).then((resp) => {

            setClientesDB(resp.data[0]);
            setEstadoClientesDB(resp.data[1]);
            setFirmasClientesDB(resp.data[2]);
            setTelegramasClientesDB(resp.data[3]);
            setExpedienteClienteDB(resp.data[4]);

            setListOfPosiblesClientes(getPosiblesClientes(optionValueCall.label, resp.data[0], resp.data[1], resp.data[2], resp.data[3]));
            setBanderaCarga(true);
        });
    }, [optionValueCall.label]);


    const handleAddCliente = () => {

        var cc = '';

        if (clienteSelect) {
            cc = clienteCC
        } else {
            cc = searchFilter
        }

        var clientesTot = [];
        clientesTot = listofClientes;

        const state = getEstadoAddExpediente(
            optionValueCall, cc, capitalReclamado, Swal, clientesDB,
            listofClientes, estadoClienteDB, telegramasClienteDB, firmasClienteDB, expedienteClienteDB
        );

        if (state) {

            /* AGREGAR CLIENTES AL EXPEDIENTE */

            var clienteAdd = {
                cliente: getClientesByCuitCuilExact(cc, clientesDB),
                capitalReclamado: capitalReclamado
            }

            var ac = acumulador + parseInt(capitalReclamado);
            setAcumulador(ac);

            clientesTot.push(clienteAdd);
            setListOfClientes(clientesTot);
            setBanderaCliente2(true);

            /* ACTUALIZAR LISTA DE LA DERECHA */

            var clientesPosibles = listofPosiblesClientes.filter(cliente => cliente.cuit_cuil !== cc);

            setListOfPosiblesClientes(clientesPosibles);

            /* CAMBIAR EL ESTADO DEL CLIENTE SELECT */

            setClienteSelect(false);

        }

    }

    const handleDelete = (id, cc) => {

        // console.log('ID A BORRAR: ', id);

        const newListClientes = eliminarCliente(id, listofClientes);

        // console.log(newListClientes);

        const newAcumuladorValue = establecerAcumulador(newListClientes);

        setListOfClientes(newListClientes);
        setAcumulador(newAcumuladorValue);

        if (newListClientes.length === 0) {
            setBanderaCliente(false)
        }

        /* ACTUALIZAR LISTA DE LA DERECHA */

        var clientesPosibles = listofPosiblesClientes;

        clientesPosibles.push(getClientesByCuitCuilExact(cc, clientesDB));

        setListOfPosiblesClientes(clientesPosibles);

    }

    const handleRegister = () => {

        const state = getEstadoRegisterExpediente(
            numExp, nombreExp, juzgado, capitalColectivo, optionValueAbAp, optionValueAbGs, Swal,
            listofClientes, acumulador
        );

        if (state) {

            var abogadoAp = '';

            for (var i = 0; i < optionValueAbAp.length; i++) {

                if (i === 0) {
                    abogadoAp = optionValueAbAp[i].label;
                } else {
                    abogadoAp = abogadoAp + ', ' + optionValueAbAp[i].label
                }
            }

            const tiempoTranscurrido = Date.now();
            const hoy = new Date(tiempoTranscurrido);

            /* --------------------------- CREACION DE DATOS PARA CARGAR EN DB ---------------------------*/

            /* CREAR */

            var expediente = {
                caratula: nombreExp,
                numeroExp: numExp,
                juzgado: juzgado,
                abogadoAp: abogadoAp,
                abogadoGs: optionValueAbGs.label,
                capitalColectivoReclamado: capitalColectivo,
                empresaDemandada: optionValueCall.label,
                cantidad: listofClientes.length,
                tipoDemanda: listofClientes.length === 1 ? 'Individual' : 'Colectiva',
                finalizado: false,
                fechaInicio: hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate(),
                fechaFinalizado: '',
            }

            var expediente_capitales = {
                numeroExp: numExp,

                capitalPrimera: false,
                capitalSegunda: false,
                capitalActualizacion: false
            }

            var fichasClientes = crearFichasExpedienteCliente(listofClientes, numExp);

            var job_estados = {
                numeroExp: numExp,
                demanda: false,
                contestacionDemanda: false,
                ofrecimientoPrueba: false,
                audienciaConciliacion: false,
                produccionProbatoria: false,
                informeActuario: false,
                alegatos: false,
                paseResolver: false,
                sentenciaPrimeraInstancia: false
            }

            var job_fechas = {
                numeroExp: numExp,
                fechaDemanda: '',
                fechaContestacionDemanda: '',
                fechaOfrecimientoPrueba: '',
                fechaAudienciaConciliacion: '',
                fechaProduccionProbatoria: '',
                fechaInformeActuario: '',
                fechaAlegatos: '',
                fechaPaseResolver: '',
                fechaSentenciaPrimeraInstancia: ''
            }

            var jop_estados = {
                numeroExp: numExp,
                embargo: false,
                apelacion: false,
                expresionAgravios: false,
                recursosAclaratoria: false,
                sentenciaSegundaInstancia: false,
                actualizacion: false,
            }

            var jop_fechas = {
                numeroExp: numExp,
                fechaEmbargo: '',
                fechaApelacion: '',
                fechaExpresionAgravios: '',
                fechaRecursosAclaratoria: '',
                fechaSentenciaSegundaInstancia: '',
                fechaActualizacion: '',
            }

            /* EDITAR */

            var estadoClientes = crearFichasEstadoClientes(listofClientes, estadoClienteDB);


            /* --------------------------- LLAMAR A DB --------------------------- */

            axios.post(`http://localhost:3001/expedientes`, expediente)

            axios.post(`http://localhost:3001/expedientes/capitales`, expediente_capitales);

            fichasClientes.forEach(ficha => {
                axios.post(`http://localhost:3001/expedientes/expCli`, ficha);
            });

            axios.post(`http://localhost:3001/juicios/obligatorio/estado`, job_estados);

            axios.post(`http://localhost:3001/juicios/obligatorio/fechas`, job_fechas);

            axios.post(`http://localhost:3001/juicios/opcional/estado`, jop_estados);

            axios.post(`http://localhost:3001/juicios/opcional/fechas`, jop_fechas);

            estadoClientes.forEach(ficha => {
                axios.put(`http://localhost:3001/clientes/estados/${ficha.id}`, ficha)
            });

            Swal.fire({
                title: 'Expediente Agregado Correctamente',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            }).then((result) => {
                if (result.isConfirmed) {
                    history.push('/exp/list');
                }
            });

        }
    }

    const handleSelectCliente = (cc) => {
        setClienteSelect(true);
        setClienteCC(cc);
    }

    const handleDesvincularCliente = () => {
        setClienteSelect(false);
        setClienteCC('');
    }

    return (

        <div className='row'>

            {/* DATOS DEL EXPEDIENTE */}

            <div className='col-12'>

                <div className='container-lg p-5 bg-dark text-white mt-5 mb-4' style={{ borderRadius: '1rem' }}>

                    {/* TITULO DEL FORMULARIO */}

                    <div className='row text-center'>
                        <div className='col-12'>
                            <h2 className="fw-bold text-uppercase">Datos del Expediente</h2>
                            <p className="text-white-50">Por favor Completa el formulario a continuacion con la informacion del Expediente</p>
                            <hr />
                        </div>
                    </div>

                    {/* DATOS DEL EXPEDIENTE */}

                    <div>

                        <div className='row mt-3'>

                            <div className='col-6'>
                                <div className="form-outline form-white mb-4 text-center">
                                    <span className="fs-5">Caratula</span>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg text-center"
                                        placeholder='...'
                                        name='nombreExp'
                                        value={nombreExp}
                                        onChange={handleInputChange}
                                        autoComplete='off'
                                    />
                                </div>
                            </div>

                            <div className='col-4'>
                                <div className="form-outline form-white mb-4 text-center">
                                    <span className="fs-5">Numero de Expediente</span>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg text-center"
                                        placeholder='...'
                                        name='numExp'
                                        value={numExp}
                                        onChange={handleInputChange}
                                        autoComplete='off'
                                    />
                                </div>
                            </div>

                            <div className='col-2'>
                                <div className="form-outline form-white mb-4 text-center">
                                    <span className="fs-5">Nro. de Juzgado</span>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg text-center"
                                        placeholder='...'
                                        name='juzgado'
                                        value={juzgado}
                                        onChange={handleInputChange}
                                        autoComplete='off'
                                    />
                                </div>
                            </div>

                        </div>

                        <div className='row mt-3'>

                            <div className='col-6'>
                                <div className="form-outline form-white mb-4 text-center">
                                    <span className="fs-5">Abogado Apoderado</span>
                                    <Select
                                        closeMenuOnSelect={false}
                                        placeholder='Seleccionar Abogado Apoderado'
                                        styles={customStyles}
                                        onChange={setOptionValueAbAp}
                                        isMulti
                                        options={AbogadoApoderado}
                                        isSearchable={false}
                                    />
                                </div>
                            </div>

                            <div className='col-6'>
                                <div className="form-outline form-white mb-4 text-center">
                                    <span className="fs-5">Abogado Gestor</span>
                                    <Select
                                        placeholder='Seleccionar Abogado Gestor'
                                        styles={customStyles}
                                        onChange={setOptionValueAbGs}
                                        options={AbogadoGestor}
                                        isSearchable={false}
                                    />
                                </div>
                            </div>

                        </div>

                        <div className='row mt-3'>

                            <div className='col-6'>
                                <div className="form-outline form-white mb-4 text-center">
                                    <span className="fs-5">Capital Colectivo Reclamado</span>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg text-center"
                                        placeholder='$...'
                                        name='capitalColectivo'
                                        value={capitalColectivo}
                                        onChange={handleInputChange}
                                        autoComplete='off'
                                        onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            <div className='col-6'>

                                <div className="form-outline form-white mb-4 text-center">
                                    <span className="fs-5">Empresa Demandada</span>
                                    <Select
                                        closeMenuOnSelect={true}
                                        styles={customStyles}
                                        onChange={(e) => { setOptionValueCall(e); setListOfClientes([]); setBanderaCliente(false) }}
                                        options={CallCenter}
                                        placeholder='Seleccionar Empresa'
                                        isSearchable={false}
                                    />
                                </div>

                            </div>

                        </div>

                        <hr />

                    </div>

                    {/* BOTON DE REGISTRO */}

                    <div className='d-flex justify-content-center'>
                        <button
                            className="btn btn-outline-light btn-lg px-5 mt-4 w-50"
                            type="button"
                            onClick={handleRegister}
                        >
                            Registrar Expediente
                        </button>
                    </div>

                </div >

            </div>

            {/* LISTADO DE CLIENTES */}

            <div className='col-12'>

                <div className='container-lg p-5 bg-dark text-white mb-5' style={{ borderRadius: '1rem' }}>

                    {/* TITULO DEL FORMULARIO */}

                    <div className='row text-center'>
                        <div className='col-12'>
                            <h2 className="fw-bold text-uppercase">Clientes del Expediente</h2>
                            <p className="text-white-50">A continuacion, agrega los clientes que seran parte del Expediente mediante el pequeño formulario en la parte izquierda</p>
                            <hr />
                        </div>
                    </div>

                    {/* LISTA DE CLIENTES AGREGADOS Y LISTA DE CLIENTES POSIBLES */}

                    <div className='row'>

                        {/* CLIENTES AGREGADOS */}

                        <div className='col-6 border-end border-secondary border-2'>

                            {/* TITULO DEL FORMULARIO */}

                            <div className='row text-center mt-4'>
                                <div className='col-12'>
                                    <h4 className="fw-bold text-uppercase">Listado De Clientes del Expediente </h4>
                                </div>
                            </div>

                            {/* AGREGAR CLIENTES */}

                            <div className='mb-5'>

                                <div className='row mt-4'>

                                    {
                                        (clienteSelect)
                                            ?
                                            (
                                                <div className='col-6'>
                                                    <div className="form-outline form-white mb-4">
                                                        <h3 className="fs-5 text-center">Cliente Asociado</h3>
                                                        <input
                                                            type="text"
                                                            className="form-control-lg text-center text-white w-100"
                                                            value={clienteCC}
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                            )
                                            :
                                            (
                                                <div className='col-6'>
                                                    <div className="form-outline form-white mb-4">
                                                        <h3 className="fs-5 text-center">Cliente Asociado</h3>
                                                        <input
                                                            type="text"
                                                            className="form-control-lg text-center w-100"
                                                            placeholder='CUIT/CUIL'
                                                            name='searchFilter'
                                                            value={searchFilter}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                </div>
                                            )
                                    }

                                    <div className='col-6'>
                                        <div className="form-outline form-white mb-4">
                                            <h3 className="fs-5 text-center">Capital Reclamado</h3>
                                            <input
                                                type="text"
                                                className="form-control-lg text-center w-100"
                                                placeholder='$...'
                                                name='capitalReclamado'
                                                value={capitalReclamado}
                                                onChange={handleInputChange}
                                                onKeyPress={(event) => {
                                                    if (!/[0-9]/.test(event.key)) {
                                                        event.preventDefault();
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {
                                        (clienteSelect)
                                            ?
                                            (
                                                <div className='col-12'>

                                                    <div className='row'>

                                                        <div className='col-6'>
                                                            <button
                                                                className="btn btn-outline-danger btn-lg w-100 mt-2"
                                                                type="button"
                                                                onClick={handleDesvincularCliente}
                                                            >
                                                                Desvincular
                                                            </button>
                                                        </div>

                                                        <div className='col-6'>
                                                            <button
                                                                className="btn btn-outline-light btn-lg w-100 mt-2"
                                                                type="button"
                                                                onClick={handleAddCliente}
                                                            >
                                                                Agregar
                                                            </button>
                                                        </div>

                                                    </div>



                                                </div>
                                            )
                                            :
                                            (
                                                <div className='col-12 d-flex justify-content-center'>

                                                    <button
                                                        className="btn btn-outline-light btn-lg w-50 mt-2"
                                                        type="button"
                                                        onClick={handleAddCliente}
                                                    >
                                                        Agregar
                                                    </button>

                                                </div>
                                            )
                                    }



                                </div>

                            </div>

                            {/* LISTA DE CLIENTES */}

                            {
                                (banderaCliente)
                                &&
                                (
                                    <div className='bg-white p-1 me-2' style={{ borderRadius: '20px' }}>

                                        <div className='mt-4'>

                                            <div className='fs-3 text-dark text-center mt-3'>
                                                <h2>Capital Acumulado: $ {acumulador}</h2>
                                                <hr />
                                            </div>

                                            <div className='me-3 ms-3 mb-4'>

                                                <ul className="list-group">

                                                    {
                                                        (banderaCliente)
                                                        &&
                                                        (
                                                            listofClientes.map(cliente => (

                                                                <div key={cliente.cliente.id}>

                                                                    <div className='row'>
                                                                        <div className='col-10'>
                                                                            <ExpClienteCard
                                                                                key={cliente.cliente.id}
                                                                                {...cliente}
                                                                            />
                                                                        </div>

                                                                        <div className='col-1 text-dark mt-4'>
                                                                            <button className='btn btn-danger mt-4' onClick={() => handleDelete(cliente.cliente.id, cliente.cliente.cuit_cuil)}>
                                                                                <i className="fas fa-user-times fs-5"></i>
                                                                            </button>
                                                                        </div>
                                                                    </div>

                                                                </div>

                                                            )))
                                                    }

                                                </ul>
                                            </div>

                                        </div>

                                    </div >
                                )
                            }

                        </div>

                        {/* CLIENTES POSIBLES*/}

                        <div className='col-6'>

                            {
                                (JSON.stringify(optionValueCall) === '{}')
                                    ?
                                    (
                                        <div>

                                            {/* TITULO DEL FORMULARIO */}

                                            <div className='row text-center mt-5'>
                                                <div className='col-12'>
                                                    <h2 className="fw-bold text-uppercase">Selecciona una Empresa para cargar la lista de posibles clientes</h2>
                                                </div>
                                            </div>

                                        </div>
                                    )
                                    :
                                    (
                                        <div>

                                            {
                                                (banderaCarga)
                                                &&
                                                (
                                                    <div>

                                                        {/* TITULO DEL FORMULARIO */}

                                                        <div className='row text-center'>
                                                            <div className='col-12'>
                                                                <h4 className="fw-bold text-uppercase mt-2">Posibles Clientes </h4>
                                                                <h4 className="fw-bold text-uppercase">[ {optionValueCall.label} ]</h4>
                                                                <hr />
                                                            </div>
                                                        </div>

                                                        {
                                                            listofPosiblesClientes.map(cliente => (

                                                                <div key={cliente.id}>

                                                                    <div className='row bg-secondary ms-2 p-2 mb-3' style={{ borderRadius: '10px' }}>
                                                                        <div className='col-9 mt-1'>
                                                                            <h3 className='fs-4'>{cliente.apellidoyNombre}</h3>
                                                                            <h3 className='fs-4'>{cliente.cuit_cuil}</h3>
                                                                        </div>
                                                                        <div className='col-3 mt-3'>
                                                                            <button className='btn btn-outline-light' onClick={() => { handleSelectCliente(cliente.cuit_cuil) }}>Seleccionar</button>
                                                                        </div>
                                                                    </div>



                                                                </div>

                                                            ))
                                                        }

                                                    </div>
                                                )
                                            }

                                        </div>
                                    )
                            }

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}


