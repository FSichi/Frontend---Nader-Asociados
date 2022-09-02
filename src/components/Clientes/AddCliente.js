import React, { useState } from 'react'
import { useForm } from '../../hooks/useForm';
import Swal from 'sweetalert2'
import Select from 'react-select';
import { EstadoCivil, CallCenter, Sucursal, TipoCese, TipoContrato, TipoTarea, DiasyHoras, DiasSelect, customStyles, customStylesTareas } from '../../helpers/AddClienteSelector'
import axios from "axios";

export const AddCliente = ({ history }) => {

    localStorage.setItem("ruta", `/cli/add`);

    const [optionValueEstCiv, setOptionValueEstCiv] = useState({});
    const [optionValueCall, setOptionValueCall] = useState({});
    const [optionValueSuc, setOptionValueSuc] = useState({});
    const [optionValueCese, setOptionValueCese] = useState({});
    const [optionValueContrato, setOptionValueContrato] = useState({});
    const [optionValueTarea, setOptionValueTarea] = useState({});
    const [optionValueDiasyHoras, setOptionValueDiasyHoras] = useState({});
    const [optionValueDiasEsp, setOptionValueDiasEsp] = useState([]);

    const [pantallaSig, setPantallaSig] = useState(false);

    const [formValues, handleInputChange] = useForm({
        apellidoyNombre: '',
        cuit_cuil: '',
        fNacimiento: '',
        telefonoPropio: '',
        telefonoAlternativo: '',
        domicilio: '',
        localidad: 'San Miguel De Tucuman',
        provincia: 'Tucuman',
        correo: '',
        campaña: '',
        fechaIngreso: '',
        fechaEgreso: '',
        dias: '',
        horas: '',
        horaEsp1: '',
        horaEsp2: ''
    });

    const { apellidoyNombre, cuit_cuil, fNacimiento, telefonoPropio, telefonoAlternativo, domicilio,
        localidad, provincia, correo, campaña, fechaIngreso, fechaEgreso, dias, horas, horaEsp1, horaEsp2
    } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();

        if (apellidoyNombre === '' || cuit_cuil === '' || fNacimiento === '' || JSON.stringify(optionValueEstCiv) === '{}' ||
            telefonoPropio === '' || telefonoAlternativo === '' || correo === '' || provincia === '' || localidad === '' ||
            domicilio === '' || JSON.stringify(optionValueCall) === '{}' || JSON.stringify(optionValueCese) === '{}' ||
            JSON.stringify(optionValueContrato) === '{}' || JSON.stringify(optionValueTarea) === '{}' || campaña === '' ||
            fechaIngreso === '' || JSON.stringify(optionValueDiasyHoras) === '{}' || optionValueDiasEsp.length === 0 ||
            horaEsp1 === '' || horaEsp2 === ''
        ) {

            Swal.fire({
                title: 'Por favor completa todos los campos',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return;

        }

        var diasEspTexto = '';

        for (var i = 0; i < optionValueDiasEsp.length; i++) {

            if (i === 0) {
                diasEspTexto = optionValueDiasEsp[i].label;
            } else {
                diasEspTexto = diasEspTexto + ', ' + optionValueDiasEsp[i].label
            }
        }

        // const tiempoTranscurrido = Date.now();
        // const hoy = new Date(tiempoTranscurrido);

        /* DATA CLIENTE --> CREAR */

        var data = {
            apellidoyNombre: apellidoyNombre,
            cuit_cuil: cuit_cuil,
            fNacimiento: fNacimiento,
            estadoCivil: optionValueEstCiv.label,
            telPropio: telefonoPropio,
            telAlternativo: telefonoAlternativo,
            correoElectronico: correo,
            provincia: provincia,
            localidad: localidad,
            domicilio: domicilio,

            /* AQUI HAY UNA CONSIDERACION */
            callCenter: optionValueCall.label,
            sucursal: '-',

            tipoCese: optionValueCese.label,
            tipoContrato: optionValueContrato.label,
            tipoTarea: optionValueTarea.label,
            campaña: campaña,
            fechaIngreso: fechaIngreso,
            /* ESTA PUEDE CARGARSE DESPUES */
            fechaEgreso: fechaEgreso,

            /* AQUI HAY OTRA CONSIDERACION */
            periodoDias: optionValueDiasyHoras.label,
            otroDia: '-',
            otroHora: '-',

            diasEspecificos: diasEspTexto,
            horaEspDesde: horaEsp1,
            horaEspHasta: horaEsp2

            // fechaAlta: hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate()
        }

        if (optionValueCall.value === '1') {
            data.sucursal = optionValueSuc.label;
        }

        if (optionValueDiasyHoras.value === '6') {
            data.otroDia = dias;
            data.otroHora = horas;
        }

        if (fechaEgreso !== '') {
            data.fechaEgreso = fechaEgreso;
        }

        axios.post("https://backend-nader-asociados.up.railway.app/clientes", data).then((response) => {
            console.log('Cliente Registrado', response.data);
        });

        /* DATA ESTADO CLIENTE --> CREAR */

        var estado_cliente = {
            cc_cliente: cuit_cuil,

            vJuicio: false,
            vSecretaria: false,
            puedeAbandonar: true,

            estadoActividad: true,
            estadoOperacion: 'En Telegramas'
        }

        if(optionValueCall.label === 'ATENTO' || optionValueCall.label === 'AEGIS'){
            estado_cliente.vJuicio = true;
        }

        axios.post("https://backend-nader-asociados.up.railway.app/clientes/estados", estado_cliente).then((response) => {
            console.log('ESTADO CLIENTE', response.data);
        });

        /* DATA FIRMAS CLIENTE --> CREAR */

        var firmas_cliente = {
            cc_cliente: cuit_cuil,

            firmaPoder: false,
            firmaPCL: false,
            estadoGeneral: false,
        }

        axios.post("https://backend-nader-asociados.up.railway.app/clientes/firmas", firmas_cliente).then((response) => {
            console.log('FIRMAS CLIENTE', response.data);
        });

        /* DATA TELEGRAMAS CLIENTE --> CREAR */

        var telegramas_cliente = {
            cc_cliente: cuit_cuil,

            estadoT1: false,
            estadoT2: false,
            estadoT3: false,
            estadoT4: false,
            estadoT5: false,

            fechaEnvio1: '',
            fechaEnvio2: '',
            fechaEnvio3: '',
            fechaEnvio4: '',
            fechaEnvio5: '',

            estadoGeneral: false,
        }

        axios.post("https://backend-nader-asociados.up.railway.app/clientes/telegramas", telegramas_cliente).then((response) => {
            console.log('FIRMAS CLIENTE', response.data);
        });


        /* FIN DE CREACION DE TABLAS */

        Swal.fire({
            title: 'Cliente Agregado Correctamente',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Continuar'
        }).then((result) => {
            if (result.isConfirmed) {
                history.push('/cli/list');
            }
        });

    }

    return (

        <section className="gradient-custom">
            <div className="container-fluid py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-10">
                        <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                            
                            <div className="card-body p-5 text-center">

                                <form className="pb-1" onSubmit={handleRegister} autoComplete="off">

                                    <h2 className="fw-bold text-uppercase">Datos del Cliente</h2>
                                    <p className="text-white-50">Por favor Completa el formulario a continuacion con la informacion del cliente</p>
                                    <hr />

                                    {
                                        (!pantallaSig)
                                            ?
                                            (
                                                <div>

                                                    <div className='row'>

                                                        <div className='col-6'>
                                                            <div className="form-outline form-white mb-4">
                                                                <span className="fs-5">Nombre y Apellidos (Completo)</span>
                                                                <input
                                                                    type="text"
                                                                    className="form-control form-control-lg text-center"
                                                                    placeholder='Nombre...'
                                                                    name='apellidoyNombre'
                                                                    value={apellidoyNombre}
                                                                    onChange={handleInputChange}
                                                                    autoComplete='off'
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className='col-6'>

                                                            <div className="form-outline form-white mb-4">
                                                                <span className="fs-5">Cuit / Cuil</span>
                                                                <input
                                                                    type="text"
                                                                    className="form-control form-control-lg text-center"
                                                                    placeholder='CUIT/CUIL'
                                                                    name='cuit_cuil'
                                                                    value={cuit_cuil}
                                                                    onChange={handleInputChange}
                                                                    autoComplete='off'
                                                                    onKeyPress={(event) => {
                                                                        if (!/[0-9]/.test(event.key) && !/[-]/.test(event.key)) {
                                                                            event.preventDefault();
                                                                        }
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className='row'>

                                                        <div className='col-6'>
                                                            <div className="form-outline form-white mb-4">
                                                                <span className="fs-5">Fecha de Nacimiento</span>
                                                                <input
                                                                    type="date"
                                                                    className="form-control form-control-lg text-center"
                                                                    placeholder='Fecha de Inicio'
                                                                    name='fNacimiento'
                                                                    value={fNacimiento}
                                                                    onChange={handleInputChange}
                                                                    autoComplete='off'
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className='col-6'>
                                                            <div className="form-outline form-white mb-4">
                                                                <span className="fs-5">Estado Civil</span>
                                                                <Select
                                                                    className='fw-bold text-center text-white'
                                                                    placeholder='...'
                                                                    options={EstadoCivil}
                                                                    onChange={setOptionValueEstCiv}
                                                                    styles={customStyles}
                                                                    isSearchable={false}
                                                                    defaultValue={optionValueEstCiv}
                                                                />
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className='row'>
                                                        <div className='col-4'>
                                                            <div className="form-outline form-white mb-4">
                                                                <span className="fs-5">Telefono Celular Propio</span>
                                                                <input
                                                                    type="text"
                                                                    className="form-control form-control-lg text-center"
                                                                    placeholder='Telefono'
                                                                    name='telefonoPropio'
                                                                    value={telefonoPropio}
                                                                    onChange={handleInputChange}
                                                                    autoComplete='off'
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='col-4'>
                                                            <div className="form-outline form-white mb-4">
                                                                <span className="fs-5">Telefono Celular Alternativo</span>
                                                                <input
                                                                    type="text"
                                                                    className="form-control form-control-lg text-center"
                                                                    placeholder='Telefono'
                                                                    name='telefonoAlternativo'
                                                                    value={telefonoAlternativo}
                                                                    onChange={handleInputChange}
                                                                    autoComplete='off'
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='col-4'>
                                                            <div className="form-outline form-white mb-4">
                                                                <span className="fs-5">Correo Electronico</span>
                                                                <input
                                                                    type="email"
                                                                    className="form-control form-control-lg text-center"
                                                                    placeholder='Correo Electronico'
                                                                    name='correo'
                                                                    value={correo}
                                                                    onChange={handleInputChange}
                                                                    autoComplete='off'
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <hr className='ms-5 me-5' />

                                                    <div className='row'>
                                                        <div className='col-6'>
                                                            <div className="form-outline form-white mb-4">
                                                                <span className="fs-5">Provincia</span>
                                                                <input
                                                                    type="text"
                                                                    className="form-control form-control-lg text-center"
                                                                    placeholder='Provincia'
                                                                    name='provincia'
                                                                    value={provincia}
                                                                    onChange={handleInputChange}
                                                                    autoComplete='off'
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='col-6'>
                                                            <div className="form-outline form-white mb-4">
                                                                <span className="fs-5">Localidad</span>
                                                                <input
                                                                    type="text"
                                                                    className="form-control form-control-lg text-center"
                                                                    placeholder='Localidad'
                                                                    name='localidad'
                                                                    value={localidad}
                                                                    onChange={handleInputChange}
                                                                    autoComplete='off'
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-outline form-white mb-4">
                                                        <span className="fs-5">Domicilio Exacto</span>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg text-center"
                                                            placeholder='Direccion'
                                                            name='domicilio'
                                                            value={domicilio}
                                                            onChange={handleInputChange}
                                                            autoComplete='off'
                                                        />
                                                    </div>

                                                </div>
                                            )
                                            :
                                            (
                                                <div>

                                                    <div className='row'>

                                                        <div className='col-6'>
                                                            <div className="form-outline form-white mb-4">
                                                                <span className="fs-5">Call Center</span>
                                                                <Select
                                                                    className='fw-bold text-center text-white'
                                                                    options={CallCenter}
                                                                    onChange={setOptionValueCall}
                                                                    styles={customStyles}
                                                                    isSearchable={false}
                                                                    placeholder='Selecciona un Estado'
                                                                    defaultValue={optionValueCall}
                                                                />
                                                            </div>
                                                        </div>

                                                        {
                                                            (optionValueCall.value === '1')
                                                            &&
                                                            (

                                                                <div className='col-6'>
                                                                    <div className="form-outline form-white mb-4">
                                                                        <span className="fs-5">Sucursal</span>
                                                                        <Select
                                                                            className='fw-bold text-center text-white'
                                                                            options={Sucursal}
                                                                            onChange={setOptionValueSuc}
                                                                            styles={customStyles}
                                                                            isSearchable={false}
                                                                            placeholder='Selecciona un Estado'
                                                                            defaultValue={optionValueSuc}
                                                                        />
                                                                    </div>
                                                                </div>

                                                            )
                                                        }

                                                    </div>

                                                    <div className='row'>

                                                        <div className='col-12'>
                                                            <div className="form-outline form-white mb-4">
                                                                <span className="fs-5">Tipo de Cese de Relacion Laboral al momento de la consulta</span>
                                                                <Select
                                                                    className='fw-bold text-center text-white'
                                                                    options={TipoCese}
                                                                    onChange={setOptionValueCese}
                                                                    styles={customStyles}
                                                                    isSearchable={false}
                                                                    defaultValue={optionValueCese}
                                                                />
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className='row'>

                                                        <div className='col-6'>
                                                            <div className="form-outline form-white mb-4">
                                                                <span className="fs-5">Tipo de Contrato</span>
                                                                <Select
                                                                    className='fw-bold text-center text-white'
                                                                    options={TipoContrato}
                                                                    onChange={setOptionValueContrato}
                                                                    defaultValue={optionValueContrato}
                                                                    styles={customStyles}
                                                                    isSearchable={false}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className='col-6'>
                                                            <div className="form-outline form-white mb-4">
                                                                <span className="fs-5">Tarea Desempeñada</span>
                                                                <Select
                                                                    className='fw-bold text-center text-white'
                                                                    options={TipoTarea}
                                                                    onChange={setOptionValueTarea}
                                                                    defaultValue={optionValueTarea}
                                                                    styles={customStylesTareas}
                                                                    isSearchable={false}
                                                                />
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className="form-outline form-white mb-4">
                                                        <span className="fs-5">Campaña</span>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg text-center"
                                                            placeholder='Campaña...'
                                                            name='campaña'
                                                            value={campaña}
                                                            onChange={handleInputChange}
                                                            autoComplete='off'
                                                        />
                                                    </div>

                                                    <hr className='ms-5 me-5' />

                                                    <div className='row'>

                                                        <div className='col-6'>
                                                            <div className="form-outline form-white mb-4">
                                                                <span className="fs-5">Fecha de Ingreso</span>
                                                                <input
                                                                    type="date"
                                                                    className="form-control form-control-lg text-center"
                                                                    placeholder='Fecha de Ingreso'
                                                                    name='fechaIngreso'
                                                                    value={fechaIngreso}
                                                                    onChange={handleInputChange}
                                                                    autoComplete='off'
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className='col-6'>
                                                            <div className="form-outline form-white mb-4">
                                                                <span className="fs-5">Fecha de Egreso</span>
                                                                <input
                                                                    type="date"
                                                                    className="form-control form-control-lg text-center"
                                                                    placeholder='Fecha de Egreso'
                                                                    name='fechaEgreso'
                                                                    value={fechaEgreso}
                                                                    onChange={handleInputChange}
                                                                    autoComplete='off'
                                                                />
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className='row'>

                                                        <div className='col-6'>
                                                            <div className="form-outline form-white mb-4">
                                                                <span className="fs-5">Dias y horas de Trabajo en el Ultimo Periodo</span>
                                                                <Select
                                                                    className='fw-bold text-center text-white'
                                                                    options={DiasyHoras}
                                                                    onChange={setOptionValueDiasyHoras}
                                                                    defaultValue={optionValueDiasyHoras}
                                                                    styles={customStyles}
                                                                    isSearchable={false}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className='col-6'>

                                                            {
                                                                (optionValueDiasyHoras.value === '6')
                                                                &&
                                                                (
                                                                    <div className='row'>

                                                                        <div className='col-5'>
                                                                            <span className="fs-5">Dias</span>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control form-control-lg text-center"
                                                                                placeholder='Dias..'
                                                                                name='dias'
                                                                                value={dias}
                                                                                onChange={handleInputChange}
                                                                                autoComplete='off'
                                                                                onKeyPress={(event) => {
                                                                                    if (!/[0-9]/.test(event.key)) {
                                                                                        event.preventDefault();
                                                                                    }
                                                                                }}
                                                                            />
                                                                        </div>

                                                                        <div className='col-2 mt-5'>
                                                                            <span className="fs-5"><i className="fas fa-times"></i></span>
                                                                        </div>

                                                                        <div className='col-5'>
                                                                            <span className="fs-5">Horas</span>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control form-control-lg text-center"
                                                                                placeholder='Horas..'
                                                                                name='horas'
                                                                                value={horas}
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
                                                                )
                                                            }

                                                        </div>

                                                    </div>

                                                    <hr className='ms-5 me-5' />

                                                    <span className="fs-5">Horario Especifico</span>

                                                    <div className='row'>

                                                        <div className='col-6'>
                                                            <div className="form-outline form-white mb-4">
                                                                <span className="fs-5">Dias</span>
                                                                <Select
                                                                    closeMenuOnSelect={false}
                                                                    styles={customStyles}
                                                                    onChange={setOptionValueDiasEsp}
                                                                    isMulti
                                                                    options={DiasSelect}
                                                                    defaultValue={optionValueDiasEsp}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className='col-6'>

                                                            <div className='row'>

                                                                <div className='col-5'>
                                                                    <span className="fs-5">Desde</span>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control form-control-lg text-center"
                                                                        placeholder='..'
                                                                        name='horaEsp1'
                                                                        value={horaEsp1}
                                                                        onChange={handleInputChange}
                                                                        autoComplete='off'
                                                                        onKeyPress={(event) => {
                                                                            if (!/[0-9]/.test(event.key)) {
                                                                                event.preventDefault();
                                                                            }
                                                                        }}
                                                                    />
                                                                </div>

                                                                <div className='col-2' style={{ marginTop: '35px' }}>
                                                                    <span className="fs-3"><i className="fas fa-grip-lines-vertical"></i></span>
                                                                </div>

                                                                <div className='col-5'>
                                                                    <span className="fs-5">Hasta</span>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control form-control-lg text-center"
                                                                        placeholder='..'
                                                                        name='horaEsp2'
                                                                        value={horaEsp2}
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
                                                        </div>

                                                    </div>

                                                </div>
                                            )
                                    }

                                    <hr />

                                    {
                                        (!pantallaSig)
                                            ?
                                            (
                                                <div className='row d-flex justify-content-end'>
                                                    <div className='col-12'>
                                                        <button
                                                            className="btn btn-outline-light btn-lg px-5 mt-4"
                                                            type="button"
                                                            onClick={() => { setPantallaSig(true) }}
                                                        >
                                                            Siguiente
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                            :
                                            (
                                                <div className='row d-flex justify-content-between'>

                                                    <div className='col-1'>
                                                        <button
                                                            className="btn btn-outline-light btn-lg px-5 mt-4"
                                                            type="button"
                                                            onClick={() => { setPantallaSig(false) }}
                                                        >
                                                            Anterior
                                                        </button>
                                                    </div>
                                                    <div className='col-3'>
                                                        <button
                                                            className="btn btn-outline-info btn-lg px-5 mt-4"
                                                            type="submit"
                                                            onClick={handleRegister}
                                                        >
                                                            Registrar
                                                        </button>
                                                    </div>

                                                </div>
                                            )
                                    }

                                </form>

                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}