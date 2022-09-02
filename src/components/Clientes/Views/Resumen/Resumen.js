import React, { useState, useEffect } from 'react'
import { getTelegramaActual } from '../../../../selector/Clientes'
import axios from 'axios';
import Swal from 'sweetalert2';

export const Resumen = ({ cliente, estadoCli, history }) => {

    localStorage.setItem("ruta", `/cli/${cliente.id}`);

    const [estadoCliente, setEstadoCliente] = useState({});
    const [firmasCliente, setFirmasCliente] = useState({});
    const [telegramasCliente, setTelegramasCliente] = useState({});
    const [telegramaActual, setTelegramaActual] = useState('');
    const [expedienteCliente, setExpedienteCliente] = useState({});

    const [bandera, setBandera] = useState(false);

    useEffect(() => {

        axios.get(`https://backend-nader.herokuapp.com/general/clienteScreen/resumen/${cliente.cuit_cuil}`).then((resp) => {

            setEstadoCliente(estadoCli);
            setFirmasCliente(resp.data[0]);
            setTelegramasCliente(resp.data[1]);
            setTelegramaActual(getTelegramaActual(resp.data[1]));
            setExpedienteCliente(resp.data[2]);

            setBandera(true);
        });

    }, [cliente, estadoCli]);


    const handleCrearFichaSecretaria = () => {

        Swal.fire({
            title: '¿Estas Seguro?',
            text: "Esto Asociara el Cliente con una Ficha de Secretaria.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#41B883',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {

                /* COMPROBAR QUE LAS FIRMAS Y TELEGRAMAS TERMINARAN */

                if (!firmasCliente.estadoGeneral || !telegramasCliente.estadoGeneral) {

                    Swal.fire({
                        title: 'El Cliente aun no puede ser agregado a la Ficha de Secretaria',
                        text: 'Por favor, verifica que los telegramas y las firmas esten finalizadas',
                        icon: 'error',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Continuar'
                    });

                    return;
                }

                /* DATA DE SECRETARIA --> CREAR */

                const tiempoTranscurrido = Date.now();
                const hoy = new Date(tiempoTranscurrido);

                var fichaSecretaria = {
                    cc_cliente: cliente.cuit_cuil,

                    tieneDenuncia: false,
                    fechaAudiencia: '',

                    hayAcuerdo: false,
                    capitalTrabajador: '',
                    honorariosPCL: '',
                    honorariosConvenidos: '',
                    iva: '',
                    estado: false,
                    fechaInicio: hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate(),
                    fechaFinalizado: ''
                }

                axios.post("https://backend-nader.herokuapp.com/clientes/secretaria", fichaSecretaria).then((response) => {
                    console.log('Ficha Secretaria Registrada', response.data);
                });

                /* DATA DE ESTADO DEL CLIENTE --> EDITAR */

                var estadoCli = {
                    id: estadoCliente.id,
                    cc_cliente: estadoCliente.cc_cliente,

                    vJuicio: estadoCliente.vJuicio,
                    vSecretaria: estadoCliente.vSecretaria,
                    puedeAbandonar: false,

                    estadoActividad: true,
                    estadoOperacion: 'En Secretaria'
                }

                axios.put(`https://backend-nader.herokuapp.com/clientes/estados/${estadoCliente.id}`, estadoCli).then((response) => {
                    console.log('Estado Actualizado: ', response.data);
                });

                Swal.fire({
                    title: `${cliente.apellidoyNombre} fue Agregado Correctamente a Secretaria de Trabajo`,
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Continuar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });

            }
        })
    }

    return (

        <div>
            {
                (bandera)
                &&
                (
                    <div className='container-fluid mt-4' style={{ borderRadius: '20px' }}>

                        <div className='row'>

                            {/* PRIMERA MITAD */}

                            <div className="col-4 bg-dark text-white me-0" style={{ borderRadius: '20px' }}>

                                <div className="row">

                                    <div className="col-md-12 col-lg-12" >
                                        <div className="d-flex flex-column align-items-center p-3 py-4 text-center">

                                            <img className="rounded-circle" width="100px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt='Logo Perfil' />

                                            <h2 className="font-weight-bold mt-3 fst-italic ">{cliente.apellidoyNombre}</h2>
                                            <h4 className="font-weight-bold fst-italic">{cliente.cuit_cuil}</h4>
                                            <h2 className='mt-2 fst-italic' style={{ fontSize: '1.3rem' }}><i className="fas fa-envelope"></i> {cliente.correoElectronico}</h2>
                                            <h2 className='mt-2 fst-italic' style={{ fontSize: '1.3rem' }}><i className="fas fa-mobile-alt"></i> {cliente.telPropio}</h2>

                                            <a
                                                href={`https://api.whatsapp.com/send?phone=54${cliente.telPropio}`}
                                                target="_blank"
                                                rel='noreferrer'
                                                className="btn btn-success w-75 ms-5 me-5 mt-3 fs-5"
                                            >
                                                <i className="fab fa-whatsapp me-3"></i>
                                                Contactar
                                            </a>

                                        </div>

                                    </div>

                                    <div className='col-md-12 col-lg-12 '>

                                        <hr />

                                        {/* ESTADO DE ACTIVIDAD */}

                                        <div className='d-flex justify-content-center'>

                                            <div className='row mt-2'>

                                                <div className='col-12'>
                                                    {
                                                        (estadoCliente.estadoActividad)
                                                            ?
                                                            (
                                                                <div className="form-outline form-white mb-4">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control form-control-lg text-center"
                                                                        name='callCenter'
                                                                        value={`ACTIVO`}
                                                                        disabled
                                                                    />
                                                                </div>
                                                            )
                                                            :
                                                            (
                                                                <div className="form-outline form-white mb-4">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control form-control-lg text-center mt-2 bg-danger"
                                                                        name='callCenter'
                                                                        value={`INACTIVO`}
                                                                        disabled
                                                                    />
                                                                </div>
                                                            )
                                                    }

                                                </div>

                                            </div>

                                        </div>

                                        {/* ESTADO DE OPERACION */}

                                        <div className='d-flex justify-content-center'>

                                            <div className='row'>
                                                <div className='col-12 text-center'>
                                                    <span className="fs-5">Estado de Operacion </span>
                                                    {
                                                        (estadoCliente.estadoOperacion === 'En Telegramas')
                                                        &&
                                                        (
                                                            <div className="form-outline form-white mb-4">
                                                                <input
                                                                    type="text"
                                                                    className="form-control form-control-lg text-center mt-2"
                                                                    name='callCenter'
                                                                    value={`En Telegramas`}
                                                                    disabled
                                                                />
                                                            </div>
                                                        )
                                                    }
                                                    {
                                                        (estadoCliente.estadoOperacion === 'En Juicio')
                                                        &&
                                                        (
                                                            <div className="form-outline form-white mb-4">
                                                                <input
                                                                    type="text"
                                                                    className="form-control form-control-lg text-center mt-2"
                                                                    name='callCenter'
                                                                    value={`En Juicio`}
                                                                    disabled
                                                                />
                                                            </div>
                                                        )
                                                    }
                                                    {
                                                        (estadoCliente.estadoOperacion === 'En Secretaria')
                                                        &&
                                                        (
                                                            <div className="form-outline form-white mb-4">
                                                                <input
                                                                    type="text"
                                                                    className="form-control form-control-lg text-center mt-2"
                                                                    name='callCenter'
                                                                    value={`En Secretaria`}
                                                                    disabled
                                                                />
                                                            </div>
                                                        )
                                                    }
                                                    {
                                                        (estadoCliente.estadoOperacion === 'Completado')
                                                        &&
                                                        (
                                                            <div className="form-outline form-white mb-4">
                                                                <input
                                                                    type="text"
                                                                    className="form-control form-control-lg text-center mt-2"
                                                                    name='callCenter'
                                                                    value={`Completado`}
                                                                    disabled
                                                                />
                                                            </div>
                                                        )
                                                    }

                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* SEGUNDA MITAD */}

                            <div className="col-8 ms-0" style={{ borderRadius: '20px' }}>

                                {/* PARTE DE ARRIBA */}

                                <div className='container bg-dark text-white' style={{ borderRadius: '20px' }}>

                                    <div className="row">

                                        <div className="col-md-12 col-lg-12" >

                                            <h2 className="font-weight-bold fst-italic text-center mt-4">Informacion de Trabajo</h2>

                                            <div className='row mt-4 ms-3 me-3'>

                                                <div className='col-12'>

                                                    <div className='row'>
                                                        <div className='col-5 mt-3'>
                                                            <span className="fs-5">Call Center</span>
                                                        </div>
                                                        <div className='col-7'>
                                                            <div className="form-outline form-white mb-4">
                                                                <input
                                                                    type="text"
                                                                    className="form-control form-control-lg text-center mt-2"
                                                                    name='callCenter'
                                                                    value={cliente.callCenter}
                                                                    disabled
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className='col-12'>
                                                    <div className='row'>
                                                        <div className='col-5 mt-3'>
                                                            <span className="fs-5">Tipo Cese</span>
                                                        </div>
                                                        <div className='col-7'>
                                                            <div className="form-outline form-white mb-4">
                                                                <input
                                                                    type="text"
                                                                    className="form-control form-control-lg text-center mt-2"
                                                                    name='tipoCese'
                                                                    value={cliente.tipoCese}
                                                                    disabled
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='col-12'>
                                                    <div className='row'>
                                                        <div className='col-5 mt-3'>
                                                            <span className="fs-5">Tipo Contrato</span>
                                                        </div>
                                                        <div className='col-7'>
                                                            <div className="form-outline form-white mb-4">
                                                                <input
                                                                    type="text"
                                                                    className="form-control form-control-lg text-center mt-2"
                                                                    style={{ fontSize: '0.9rem' }}
                                                                    name='tipoContrato'
                                                                    value={cliente.tipoContrato}
                                                                    disabled
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                                {/* ESTADO DEL CLIENTE */}

                                <div className='container bg-dark text-white mt-3' style={{ borderRadius: '20px' }}>

                                    <div className="row">

                                        <div className="col-md-12 col-lg-12" >

                                            <h2 className="font-weight-bold fst-italic text-center mt-4">Estado del Cliente</h2>

                                            <div className='row mt-4 ms-3 me-3'>

                                                <div className='col-12'>

                                                    <div className='row text-center'>
                                                        <div className='col-5'>
                                                            <span className="fs-5">Nro de Telegrama Actual</span>
                                                            <div className="form-outline form-white mb-4">
                                                                <input
                                                                    type="text"
                                                                    className="form-control form-control-lg text-center mt-2"
                                                                    name='callCenter'
                                                                    value={telegramaActual}
                                                                    disabled
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className='col-7'>

                                                            <div className='row'>

                                                                <div className='col-6'>
                                                                    <span className="fs-5">Firma Poder </span>
                                                                    {
                                                                        (firmasCliente.firmaPoder)
                                                                            ?
                                                                            (
                                                                                <div className="form-outline form-white mb-4">
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control form-control-lg text-center mt-2"
                                                                                        name='callCenter'
                                                                                        value={`Si`}
                                                                                        disabled
                                                                                    />
                                                                                </div>
                                                                            )
                                                                            :
                                                                            (
                                                                                <div className="form-outline form-white mb-4">
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control form-control-lg text-center mt-2"
                                                                                        name='callCenter'
                                                                                        value={`No`}
                                                                                        disabled
                                                                                    />
                                                                                </div>
                                                                            )
                                                                    }

                                                                </div>

                                                                <div className='col-6'>
                                                                    <span className="fs-5">Firma Pacto C.L </span>
                                                                    {
                                                                        (firmasCliente.firmaPCL)
                                                                            ?
                                                                            (
                                                                                <div className="form-outline form-white mb-4">
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control form-control-lg text-center mt-2"
                                                                                        name='callCenter'
                                                                                        value={`Si`}
                                                                                        disabled
                                                                                    />
                                                                                </div>
                                                                            )
                                                                            :
                                                                            (
                                                                                <div className="form-outline form-white mb-4">
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control form-control-lg text-center mt-2"
                                                                                        name='callCenter'
                                                                                        value={`No`}
                                                                                        disabled
                                                                                    />
                                                                                </div>
                                                                            )
                                                                    }

                                                                </div>

                                                            </div>


                                                        </div>
                                                    </div>

                                                </div>

                                                <div className='col-12'>

                                                    <div className='text-center'>

                                                        {
                                                            (estadoCliente.vJuicio)
                                                            &&
                                                            (
                                                                <div>

                                                                    {
                                                                        (estadoCliente.estadoActividad)
                                                                            ?
                                                                            (
                                                                                <div className='row'>
                                                                                    <div className='col-6 me-5'>
                                                                                        <span className="fs-5">Voluntad</span>
                                                                                        <div className="form-outline form-white mb-4">
                                                                                            <input
                                                                                                type="text"
                                                                                                className="form-control form-control-lg text-center mt-2"
                                                                                                name='voluntad'
                                                                                                value={`Juicio`}
                                                                                                disabled
                                                                                            />
                                                                                        </div>
                                                                                    </div>

                                                                                    {
                                                                                        (JSON.stringify(expedienteCliente) !== '{}')
                                                                                            ?
                                                                                            (
                                                                                                <div className='col-5'>
                                                                                                    <span className="fs-5">Expediente</span>
                                                                                                    <div className="form-outline form-white mb-4">
                                                                                                        <input
                                                                                                            type="text"
                                                                                                            className="form-control form-control-lg text-center mt-2"
                                                                                                            name='expediente'
                                                                                                            value={expedienteCliente.numeroExp}
                                                                                                            disabled
                                                                                                        />
                                                                                                    </div>
                                                                                                </div>
                                                                                            )
                                                                                            :
                                                                                            (
                                                                                                <div className='col-4 mt-4 ms-5'>
                                                                                                    <button
                                                                                                        className='btn btn-outline-light w-100 p-2 mt-3'
                                                                                                        onClick={() => { history.push('/exp/add'); }}
                                                                                                    >
                                                                                                        Crear Expediente
                                                                                                    </button>
                                                                                                </div>
                                                                                            )
                                                                                    }
                                                                                </div>
                                                                            )
                                                                            :
                                                                            (
                                                                                <div className='row'>
                                                                                    <div className='col-6 me-5'>
                                                                                        <span className="fs-5">Voluntad</span>
                                                                                        <div className="form-outline form-white mb-4">
                                                                                            <input
                                                                                                type="text"
                                                                                                className="form-control form-control-lg text-center mt-2"
                                                                                                name='voluntad'
                                                                                                value={`Juicio`}
                                                                                                disabled
                                                                                            />
                                                                                        </div>
                                                                                    </div>

                                                                                    {
                                                                                        (JSON.stringify(expedienteCliente) !== '{}')
                                                                                        &&
                                                                                        (
                                                                                            <div className='col-6'>
                                                                                                <span className="fs-5">Expediente</span>
                                                                                                <div className="form-outline form-white mb-4">
                                                                                                    <input
                                                                                                        type="text"
                                                                                                        className="form-control form-control-lg text-center mt-2"
                                                                                                        name='expediente'
                                                                                                        value={expedienteCliente.numeroExp}
                                                                                                        disabled
                                                                                                    />
                                                                                                </div>
                                                                                            </div>
                                                                                        )

                                                                                    }
                                                                                </div>
                                                                            )
                                                                    }


                                                                </div>
                                                            )
                                                        }

                                                        {
                                                            (estadoCliente.vSecretaria)
                                                            &&
                                                            (
                                                                <div>
                                                                    {
                                                                        (estadoCliente.estadoOperacion === 'En Telegramas')
                                                                            ?
                                                                            (
                                                                                <div className='row'>
                                                                                    <div className='col-8'>
                                                                                        <span className="fs-5">Voluntad</span>
                                                                                        <div className="form-outline form-white mb-4">
                                                                                            <input
                                                                                                type="text"
                                                                                                className="form-control form-control-lg text-center mt-2"
                                                                                                name='callCenter'
                                                                                                value={`Secretaria de Trabajo`}
                                                                                                disabled
                                                                                            />
                                                                                        </div>
                                                                                    </div>

                                                                                    {
                                                                                        (estadoCliente.estadoActividad)
                                                                                        &&
                                                                                        (
                                                                                            <div className='col-4 mt-4'>
                                                                                                <button className='btn btn-outline-light w-100 p-2 mt-3' onClick={handleCrearFichaSecretaria}>Iniciar Ficha</button>
                                                                                            </div>
                                                                                        )
                                                                                    }

                                                                                </div>
                                                                            )
                                                                            :
                                                                            (
                                                                                <div className='row'>
                                                                                    <div className='col-12'>
                                                                                        <span className="fs-5">Voluntad</span>
                                                                                        <div className="form-outline form-white mb-4">
                                                                                            <input
                                                                                                type="text"
                                                                                                className="form-control form-control-lg text-center mt-2"
                                                                                                name='callCenter'
                                                                                                value={`Secretaria de Trabajo`}
                                                                                                disabled
                                                                                            />
                                                                                        </div>
                                                                                    </div>

                                                                                </div>
                                                                            )
                                                                    }
                                                                </div>

                                                            )
                                                        }

                                                        {
                                                            (!estadoCliente.vJuicio && !estadoCliente.vSecretaria)
                                                            &&
                                                            (
                                                                <div className='row'>
                                                                    <div className='col-12'>
                                                                        <span className="fs-5">Voluntad</span>
                                                                        <div className="form-outline form-white mb-4">
                                                                            <input
                                                                                type="text"
                                                                                className="form-control form-control-lg text-center mt-2"
                                                                                name='callCenter'
                                                                                value={`No Definido`}
                                                                                disabled
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>
                )
            }
        </div>

    )
}
