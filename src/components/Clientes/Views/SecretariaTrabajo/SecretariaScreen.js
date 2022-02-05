import React, { useEffect, useState } from 'react'
import { useForm } from '../../../../hooks/useForm';
import Swal from 'sweetalert2'
import axios from 'axios';
import Select from 'react-select';
import { EstadoSecretaria, customStyles } from '../../../../helpers/Expedientes'
import { getLabelSecretaria } from '../../../../selector/Expedientes';

export const SecretariaScreen = ({ cliente, sc, estadoCli }) => {

    useEffect(() => {

        axios.get(`https://backend-nader.herokuapp.com/clientes/secretaria/${cliente.cuit_cuil}`).then((resp) => {
            setSecretariaCliente(resp.data);

            setShowDenuncia(resp.data.tieneDenuncia);
            setShowAcuerdo(resp.data.hayAcuerdo);

            setBanderaCarga(true);
        });

    }, [cliente.cuit_cuil]);

    const [secretariaCliente, setSecretariaCliente] = useState();
    const [banderaCarga, setBanderaCarga] = useState();

    const [showDenuncia, setShowDenuncia] = useState(false);
    const [showAcuerdo, setShowAcuerdo] = useState(false);

    const [optionValueEstado, setOptionValueEstado] = useState(getLabelSecretaria(sc));

    const [formValues, handleInputChange] = useForm({
        fechaAudiencia: sc.fechaAudiencia,
        capitalTrabajador: sc.capitalTrabajador,
        honorariosConvenidos: sc.honorariosConvenidos
    });

    const { fechaAudiencia, capitalTrabajador, honorariosConvenidos } = formValues;

    const handleEstablecerDenuncia = () => {

        var data = {
            id: '',
            cc_cliente: '',

            tieneDenuncia: '',
            fechaAudiencia: '',

            hayAcuerdo: '',
            capitalTrabajador: '',
            honorariosPCL: '',
            honorariosConvenidos: '',

            estado: '',
            fechaInicio: '',
            fechaFinalizado: ''
        }

        if (showDenuncia) {

            if (fechaAudiencia === '') {
                Swal.fire({
                    title: 'Por Favor Establece una Fecha de Audiencia para Modificar la Ficha',
                    icon: 'error',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Continuar'
                });

                return;
            }

            data = {
                id: secretariaCliente.id,
                cc_cliente: secretariaCliente.cc_cliente,

                tieneDenuncia: true,
                fechaAudiencia: fechaAudiencia,

                hayAcuerdo: secretariaCliente.hayAcuerdo,
                capitalTrabajador: secretariaCliente.capitalTrabajador,
                honorariosPCL: secretariaCliente.honorariosPCL,
                honorariosConvenidos: secretariaCliente.honorariosConvenidos,

                estado: secretariaCliente.estado,
                fechaInicio: secretariaCliente.fechaInicio,
                fechaFinalizado: secretariaCliente.fechaFinalizado
            }

        }
        else {

            data = {
                id: secretariaCliente.id,
                cc_cliente: secretariaCliente.cc_cliente,

                tieneDenuncia: false,
                fechaAudiencia: '',

                hayAcuerdo: secretariaCliente.hayAcuerdo,
                capitalTrabajador: secretariaCliente.capitalTrabajador,
                honorariosPCL: secretariaCliente.honorariosPCL,
                honorariosConvenidos: secretariaCliente.honorariosConvenidos,

                estado: secretariaCliente.estado,
                fechaInicio: secretariaCliente.fechaInicio,
                fechaFinalizado: secretariaCliente.fechaFinalizado
            }
        }

        /* LLAMAR A DB */

        axios.put(`https://backend-nader.herokuapp.com/clientes/secretaria/${secretariaCliente.id}`, data).then((response) => {
            console.log('Estado Actualizado: ', response.data);
        });

        setSecretariaCliente(data);

        Swal.fire({
            title: 'Ficha Modificada Correctamente',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Continuar'
        });

        /* 
            .then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
        
        */

    }

    const handleEstablecerAcuerdo = () => {

        var data = {
            id: '',
            cc_cliente: '',

            tieneDenuncia: '',
            fechaAudiencia: '',

            hayAcuerdo: '',
            capitalTrabajador: '',
            honorariosPCL: '',
            honorariosConvenidos: '',

            estado: '',
            fechaInicio: '',
            fechaFinalizado: ''
        }

        if (showAcuerdo) {

            if (capitalTrabajador === '' || honorariosConvenidos === '') {

                Swal.fire({
                    title: 'Por favor completa los Montos del Acuerdo para poder continuar',
                    icon: 'error',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Continuar'
                });

                return;
            }

            data = {
                id: secretariaCliente.id,
                cc_cliente: secretariaCliente.cc_cliente,
                tieneDenuncia: secretariaCliente.tieneDenuncia,
                fechaAudiencia: secretariaCliente.fechaAudiencia,

                hayAcuerdo: true,
                capitalTrabajador: capitalTrabajador,
                honorariosPCL: (parseFloat(capitalTrabajador) * 0.20).toFixed(2).toString(),
                honorariosConvenidos: honorariosConvenidos,

                estado: secretariaCliente.estado,
                fechaInicio: secretariaCliente.fechaInicio,
                fechaFinalizado: secretariaCliente.fechaFinalizado
            }

        } else {

            data = {
                id: secretariaCliente.id,
                cc_cliente: secretariaCliente.cc_cliente,
                tieneDenuncia: secretariaCliente.tieneDenuncia,
                fechaAudiencia: secretariaCliente.fechaAudiencia,

                hayAcuerdo: false,
                capitalTrabajador: '',
                honorariosPCL: '',
                honorariosConvenidos: '',

                estado: secretariaCliente.estado,
                fechaInicio: secretariaCliente.fechaInicio,
                fechaFinalizado: secretariaCliente.fechaFinalizado
            }
        }

        /* LLAMAR A DB */

        axios.put(`https://backend-nader.herokuapp.com/clientes/secretaria/${secretariaCliente.id}`, data).then((response) => {
            console.log('Estado Actualizado: ', response.data);
        });

        setSecretariaCliente(data);

        Swal.fire({
            title: 'Ficha Modificada Correctamente',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Continuar'
        });

        /* 
            .then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
        
        */

    }

    const handleActualizarEstado = () => {

        if (optionValueEstado.label !== 'Completado') {

            Swal.fire({
                title: 'Por Favor Seleccione el Estado Completado para Finalizar la Ficha de Secretaria',
                icon: 'info',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return;
        }

        if (!secretariaCliente.tieneDenuncia || !secretariaCliente.hayAcuerdo) {

            Swal.fire({
                title: 'Por favor completa los Datos de la Ficha para Completarla',
                text: 'Recuerda que necesitas tener una Denuncia y un Acuerdo completados para avanzar.',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return;
        }

        Swal.fire({
            title: '¿Estas Seguro?',
            text: "Esto Finalizara el Estado de Actividad de la Ficha. ESTA ACCION NO PUEDE REVERTIRSE",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#41B883',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                const tiempoTranscurrido = Date.now();
                const hoy = new Date(tiempoTranscurrido);

                var data = {
                    id: secretariaCliente.id,
                    cc_cliente: secretariaCliente.cc_cliente,
                    tieneDenuncia: secretariaCliente.tieneDenuncia,
                    fechaAudiencia: secretariaCliente.fechaAudiencia,

                    hayAcuerdo: secretariaCliente.hayAcuerdo,
                    capitalTrabajador: secretariaCliente.capitalTrabajador,
                    honorariosPCL: secretariaCliente.honorariosPCL,
                    honorariosConvenidos: secretariaCliente.honorariosConvenidos,

                    estado: true,
                    fechaInicio: secretariaCliente.fechaInicio,
                    fechaFinalizado: hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate()
                }

                /* LLAMAR A DB */

                axios.put(`https://backend-nader.herokuapp.com/clientes/secretaria/${secretariaCliente.id}`, data).then((response) => {
                    console.log('Estado Actualizado: ', response.data);
                });

                /* ESTADO CLIENTE */

                var estado_cliente = {
                    id: estadoCli.id,
                    cc_cliente: estadoCli.cc_cliente,

                    vJuicio: estadoCli.vJuicio,
                    vSecretaria: estadoCli.vSecretaria,
                    puedeAbandonar: estadoCli.puedeAbandonar,

                    estadoActividad: estadoCli.estadoActividad,
                    estadoOperacion: 'Completado'
                }

                axios.put(`https://backend-nader.herokuapp.com/clientes/estados/${estadoCli.id}`, estado_cliente).then((response) => {
                    console.log('Estado Actualizado: ', response.data);
                });

                setSecretariaCliente(data);

                Swal.fire({
                    title: 'Ficha Modificada Correctamente',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Continuar'
                });
            }
        })

    }

    const handleCambiarJuicio = () => {

        Swal.fire({
            title: '¿Estas Seguro?',
            text: "Esto Eliminara la Ficha de Secretaria del Cliente.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#41B883',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {

                /* ELIMINAR FICHA SECRETARIA */

                axios.delete(`https://backend-nader.herokuapp.com/clientes/secretaria/${secretariaCliente.id}`).then((response) => {
                    console.log(response.data);
                });

                /* ACTUALIZAR ESTADO CLIENTE */

                var estado_cliente = {
                    id: estadoCli.id,
                    cc_cliente: estadoCli.cc_cliente,

                    vJuicio: true,
                    vSecretaria: false,
                    puedeAbandonar: estadoCli.puedeAbandonar,

                    estadoActividad: estadoCli.estadoActividad,
                    estadoOperacion: 'En Telegramas'
                }

                axios.put(`https://backend-nader.herokuapp.com/clientes/estados/${estadoCli.id}`, estado_cliente).then((response) => {
                    console.log('Estado Actualizado: ', response.data);
                });

                Swal.fire({
                    title: 'Ficha de Secretaria Eliminada Correctamente',
                    text: 'El Estado del Cliente Tambien fue Actualizado para que puedas agregarlo a un Expediente',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Continuar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });

            }
        });
        
    }

    return (

        <div>

            {/* FICHA DE SECRETARIA - PARTE DE ARRIBA */}

            <div className='container-fluid mt-2 bg-dark text-white p-4' style={{ borderRadius: '20px' }}>

                {/* TITULO DEL FORMULARIO */}

                <div className='text-center mt-3'>
                    <h3 className="fw-bold text-uppercase">FICHA DE SECRETARIA DE TRABAJO ASOCIADA A [ {cliente.apellidoyNombre} ] </h3>
                    <p className="text-white-50 fs-5">Por Favor Completa los campos a continuacion a medida que conozca su resolucion</p>
                </div>

                <hr />

                {/* FICHA DE SECRETARIA DE TRABAJO */}

                <div>

                    {
                        (banderaCarga)
                        &&
                        (
                            <div>

                                <div>

                                    {/* TIENE DENUNCIA Y FECHA DE AUDIENCIA */}

                                    <div className='ms-5 me-5'>

                                        <div className='container bg-white text-dark mt-5 mb-4 p-4' style={{ borderRadius: '10px' }}>

                                            <div className='text-center fst-italic'>
                                                <h3 className='fw-bold fs-2'>DENUNCIA</h3>
                                            </div>

                                            <hr />

                                            <div className='row mt-3'>

                                                {/* TIENE DENUNCIA */}

                                                <div className='col-4 me-5'>

                                                    <div className='row'>
                                                        <div className='col-9 mt-2'>
                                                            <span className="fs-5">Tiene Denuncia</span>
                                                        </div>

                                                        {
                                                            (secretariaCliente.tieneDenuncia && secretariaCliente.estado)
                                                                ?
                                                                (
                                                                    <div className='col-3'>
                                                                        <input className="form-check-input fs-2 bg-dark" type="checkbox" checked onChange={() => { }} />
                                                                    </div>
                                                                )
                                                                :
                                                                (
                                                                    <div className='col-3'>
                                                                        {
                                                                            (secretariaCliente.tieneDenuncia && showDenuncia)
                                                                                ?
                                                                                (
                                                                                    <div>
                                                                                        <input className="form-check-input fs-2 bg-dark" type="checkbox" checked onClick={() => { setShowDenuncia(!showDenuncia) }} onChange={() => { }} />
                                                                                    </div>
                                                                                )
                                                                                :
                                                                                (
                                                                                    <div>
                                                                                        <input className="form-check-input fs-2 bg-dark" type="checkbox" onClick={() => { setShowDenuncia(!showDenuncia) }} onChange={() => { }} />
                                                                                    </div>
                                                                                )
                                                                        }
                                                                    </div>
                                                                )
                                                        }

                                                    </div>
                                                </div>

                                                {/* FECHA AUDIENCIA */}

                                                <div className='col-6 ms-5'>

                                                    {
                                                        (secretariaCliente.tieneDenuncia && secretariaCliente.estado)
                                                            ?
                                                            (
                                                                <div>
                                                                    <div className='row'>
                                                                        <div className='col-6 mt-2'>
                                                                            <span className="fs-5">Fecha de Audiencia</span>
                                                                        </div>
                                                                        <div className='col-6'>
                                                                            <div className="form-outline form-white text-center">

                                                                                <input
                                                                                    type="date"
                                                                                    className="form-control form-control-lg text-center"
                                                                                    value={secretariaCliente.fechaAudiencia}
                                                                                    disabled
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                            :
                                                            (
                                                                <div>
                                                                    {
                                                                        (secretariaCliente.tieneDenuncia && showDenuncia)
                                                                            ?
                                                                            (
                                                                                <div>
                                                                                    <div className='row'>
                                                                                        <div className='col-6 mt-2'>
                                                                                            <span className="fs-5">Fecha de Audiencia</span>
                                                                                        </div>
                                                                                        <div className='col-6'>
                                                                                            <div className="form-outline form-white text-center">

                                                                                                <input
                                                                                                    type="date"
                                                                                                    className="form-control form-control-lg text-center"
                                                                                                    name='fechaAudiencia'
                                                                                                    value={fechaAudiencia}
                                                                                                    onChange={handleInputChange}
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                            :
                                                                            (
                                                                                <div>
                                                                                    {
                                                                                        (showDenuncia)
                                                                                        &&
                                                                                        (
                                                                                            <div>
                                                                                                <div className='row'>
                                                                                                    <div className='col-6 mt-2'>
                                                                                                        <span className="fs-5">Fecha de Audiencia</span>
                                                                                                    </div>
                                                                                                    <div className='col-6'>
                                                                                                        <div className="form-outline form-white text-center">

                                                                                                            <input
                                                                                                                type="date"
                                                                                                                className="form-control form-control-lg text-center"
                                                                                                                name='fechaAudiencia'
                                                                                                                value={fechaAudiencia}
                                                                                                                onChange={handleInputChange}
                                                                                                            />
                                                                                                        </div>
                                                                                                    </div>
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

                                                </div>

                                            </div>

                                            {/* BOTON */}

                                            <div>

                                                {
                                                    (!secretariaCliente.estado)
                                                    &&
                                                    (
                                                        <div>
                                                            <hr />

                                                            <div className='col-12 d-flex justify-content-center mt-4'>
                                                                <button className='btn btn-outline-dark' onClick={handleEstablecerDenuncia}> Establecer Denuncia </button>
                                                            </div>
                                                        </div>
                                                    )
                                                }

                                            </div>

                                        </div>

                                    </div>

                                    {/* FICHA DE SI HAY ACUERDO */}

                                    <div className='ms-5 me-5'>

                                        <div className='container bg-white text-dark mt-5 mb-4 p-4' style={{ borderRadius: '10px' }}>

                                            {/* TITULO */}

                                            <div className='text-center fst-italic'>
                                                <h3 className='fw-bold fs-2'>ACUERDO</h3>
                                            </div>

                                            <hr />

                                            {/* HAY ACUERDO ?  */}

                                            <div className='col-4 ms-2'>

                                                <div className='row'>
                                                    <div className='col-8 mt-2'>
                                                        <span className="fs-5">Hay Acuerdo ? </span>
                                                    </div>

                                                    {
                                                        (secretariaCliente.hayAcuerdo && secretariaCliente.estado)
                                                            ?
                                                            (
                                                                <div className='col-3'>
                                                                    <input className="form-check-input fs-2 bg-dark" type="checkbox" checked onChange={() => { }} />
                                                                </div>
                                                            )
                                                            :
                                                            (
                                                                <div className='col-3'>
                                                                    {
                                                                        (secretariaCliente.hayAcuerdo && showAcuerdo)
                                                                            ?
                                                                            (
                                                                                <div>
                                                                                    <input className="form-check-input fs-2 bg-dark" type="checkbox" checked onClick={() => { setShowAcuerdo(!showAcuerdo) }} onChange={() => { }} />
                                                                                </div>
                                                                            )
                                                                            :
                                                                            (
                                                                                <div>
                                                                                    <input className="form-check-input fs-2 bg-dark" type="checkbox" onClick={() => { setShowAcuerdo(!showAcuerdo) }} onChange={() => { }} />
                                                                                </div>
                                                                            )
                                                                    }
                                                                </div>

                                                            )
                                                    }

                                                </div>

                                            </div>

                                            {/* FICHA DE CAPITALES */}

                                            <div>

                                                {
                                                    (secretariaCliente.hayAcuerdo && secretariaCliente.estado)
                                                        ?
                                                        (
                                                            <div className='row mt-5'>

                                                                <div className='col-3'>
                                                                    <div className="form-outline form-white mb-4 text-center">
                                                                        <span className="fs-5">Capital Trabajador</span>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control form-control-lg text-center bg-dark text-white mt-2"
                                                                            value={'$ ' + secretariaCliente.capitalTrabajador}
                                                                            disabled
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className='col-6'>
                                                                    <div className="form-outline form-white mb-4 text-center">
                                                                        <span className="fs-5">Honorarios Pacto de Cuota Litis</span>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control form-control-lg text-center bg-dark text-white mt-2"
                                                                            value={'$ ' + secretariaCliente.honorariosPCL}
                                                                            disabled
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className='col-3'>
                                                                    <div className="form-outline form-white mb-4 text-center">
                                                                        <span className="fs-5">Honorarios Convenidos</span>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control form-control-lg text-center bg-dark text-white mt-2"
                                                                            value={'$ ' + secretariaCliente.honorariosConvenidos}
                                                                            disabled
                                                                        />
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        )
                                                        :
                                                        (
                                                            <div>
                                                                {
                                                                    (secretariaCliente.hayAcuerdo && showAcuerdo)
                                                                        ?
                                                                        (
                                                                            <div className='row mt-5'>

                                                                                {/* CAPITAL TRABAJADOR */}

                                                                                <div className='col-3'>
                                                                                    <div className="form-outline form-white mb-4 text-center">
                                                                                        <span className="fs-5">Capital Trabajador</span>
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control form-control-lg text-center bg-dark text-white mt-2"
                                                                                            name='capitalTrabajador'
                                                                                            value={capitalTrabajador}
                                                                                            onChange={handleInputChange}
                                                                                            onKeyPress={(event) => {
                                                                                                if (!/[0-9]/.test(event.key) && !/[.]/.test(event.key)) {
                                                                                                    event.preventDefault();
                                                                                                }
                                                                                            }}
                                                                                        />
                                                                                    </div>
                                                                                </div>

                                                                                {/* HONORARIOS PCL */}

                                                                                <div className='col-6'>
                                                                                    {
                                                                                        (capitalTrabajador === '')
                                                                                            ?
                                                                                            (
                                                                                                <div>
                                                                                                    <div className="form-outline form-white mb-4 text-center">
                                                                                                        <span className="fs-5">Honorarios de Pacto de Cuota Litis</span>
                                                                                                        <input
                                                                                                            type="text"
                                                                                                            className="form-control form-control-lg text-center bg-secondary text-white mt-2"
                                                                                                            value={`$ ... `}
                                                                                                            disabled
                                                                                                        />
                                                                                                    </div>
                                                                                                </div>

                                                                                            )
                                                                                            :
                                                                                            (
                                                                                                <div>
                                                                                                    <div className="form-outline form-white mb-4 text-center">
                                                                                                        <span className="fs-5">Honorarios de Pacto de Cuota Litis</span>
                                                                                                        <input
                                                                                                            type="text"
                                                                                                            className="form-control form-control-lg text-center bg-secondary text-white mt-2"
                                                                                                            placeholder='$ ...'
                                                                                                            name='honPCL'
                                                                                                            value={(parseInt(capitalTrabajador) * 0.20).toFixed(2).toString()}
                                                                                                            disabled
                                                                                                        />
                                                                                                    </div>
                                                                                                </div>

                                                                                            )
                                                                                    }
                                                                                </div>

                                                                                {/* HONORARIOS CONVENIDOS */}

                                                                                <div className='col-3'>
                                                                                    <div className="form-outline form-white mb-4 text-center">
                                                                                        <span className="fs-5">Honorarios Convenidos</span>
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control form-control-lg text-center bg-dark text-white mt-2"
                                                                                            name='honorariosConvenidos'
                                                                                            value={honorariosConvenidos}
                                                                                            onChange={handleInputChange}
                                                                                            onKeyPress={(event) => {
                                                                                                if (!/[0-9]/.test(event.key) && !/[.]/.test(event.key)) {
                                                                                                    event.preventDefault();
                                                                                                }
                                                                                            }}
                                                                                        />
                                                                                    </div>
                                                                                </div>

                                                                            </div>
                                                                        )
                                                                        :
                                                                        (
                                                                            <div>
                                                                                {
                                                                                    (showAcuerdo)
                                                                                    &&
                                                                                    (
                                                                                        <div className='row mt-5'>

                                                                                            {/* CAPITAL TRABAJADOR */}

                                                                                            <div className='col-3'>
                                                                                                <div className="form-outline form-white mb-4 text-center">
                                                                                                    <span className="fs-5">Capital Trabajador</span>
                                                                                                    <input
                                                                                                        type="text"
                                                                                                        className="form-control form-control-lg text-center bg-dark text-white mt-2"
                                                                                                        name='capitalTrabajador'
                                                                                                        value={capitalTrabajador}
                                                                                                        onChange={handleInputChange}
                                                                                                        onKeyPress={(event) => {
                                                                                                            if (!/[0-9]/.test(event.key) && !/[.]/.test(event.key)) {
                                                                                                                event.preventDefault();
                                                                                                            }
                                                                                                        }}
                                                                                                    />
                                                                                                </div>
                                                                                            </div>

                                                                                            {/* HONORARIOS PCL */}

                                                                                            <div className='col-6'>
                                                                                                {
                                                                                                    (capitalTrabajador === '')
                                                                                                        ?
                                                                                                        (
                                                                                                            <div>
                                                                                                                <div className="form-outline form-white mb-4 text-center">
                                                                                                                    <span className="fs-5">Honorarios de Pacto de Cuota Litis</span>
                                                                                                                    <input
                                                                                                                        type="text"
                                                                                                                        className="form-control form-control-lg text-center bg-secondary text-white"
                                                                                                                        value={`$ ... `}
                                                                                                                        disabled
                                                                                                                    />
                                                                                                                </div>
                                                                                                            </div>

                                                                                                        )
                                                                                                        :
                                                                                                        (
                                                                                                            <div>
                                                                                                                <div className="form-outline form-white mb-4 text-center">
                                                                                                                    <span className="fs-5">Honorarios de Pacto de Cuota Litis</span>
                                                                                                                    <input
                                                                                                                        type="text"
                                                                                                                        className="form-control form-control-lg text-center bg-secondary text-white"
                                                                                                                        placeholder='$ ...'
                                                                                                                        name='honPCL'
                                                                                                                        value={(parseInt(capitalTrabajador) * 0.20).toFixed(2).toString()}
                                                                                                                        disabled
                                                                                                                    />
                                                                                                                </div>
                                                                                                            </div>

                                                                                                        )
                                                                                                }
                                                                                            </div>

                                                                                            {/* HONORARIOS CONVENIDOS */}

                                                                                            <div className='col-3'>
                                                                                                <div className="form-outline form-white mb-4 text-center">
                                                                                                    <span className="fs-5">Honorarios Convenidos</span>
                                                                                                    <input
                                                                                                        type="text"
                                                                                                        className="form-control form-control-lg text-center bg-dark text-white mt-2"
                                                                                                        name='honorariosConvenidos'
                                                                                                        value={honorariosConvenidos}
                                                                                                        onChange={handleInputChange}
                                                                                                        onKeyPress={(event) => {
                                                                                                            if (!/[0-9]/.test(event.key) && !/[.]/.test(event.key)) {
                                                                                                                event.preventDefault();
                                                                                                            }
                                                                                                        }}
                                                                                                    />
                                                                                                </div>
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

                                            </div>

                                            {/* BOTON ACTUALIZAR ACUERDO */}

                                            <div>

                                                {
                                                    (!secretariaCliente.estado)
                                                    &&
                                                    (
                                                        <div className='row'>
                                                            <div className='col-12 d-flex justify-content-center mt-4'>
                                                                <button className='btn btn-outline-dark' onClick={handleEstablecerAcuerdo}> Actualizar Acuerdo</button>
                                                            </div>
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

                </div>

            </div >

            {/* ESTADO DE FICHA SECRETARIA - PARTE DE ABAJO */}

            <div className='container-fluid mt-4 bg-dark text-white p-4' style={{ borderRadius: '20px' }}>

                {
                    (banderaCarga)
                    &&
                    (
                        <div>

                            {/* TITULO DEL FORMULARIO */}

                            <div className='text-center mt-3'>
                                <h2 className="fw-bold text-uppercase">ESTADO DE LA FICHA DE SECRETARIA</h2>
                                <p className="text-white-50 fs-5">Por Favor Completa el Estado de la Ficha Cuando Corresponda</p>
                            </div>

                            {/* SELECCIONAR ESTADO */}

                            <hr />

                            {
                                (!secretariaCliente.estado)
                                &&
                                (
                                    <div className='row mt-5 d-flex justify-content-center mb-5'>
                                        <div className='col-6 mt-3'>
                                            <h4>No hay Acuerdo ? </h4>
                                        </div>
                                        <div className='col-4'>
                                            <button className='btn btn-outline-info w-100 p-3' onClick={handleCambiarJuicio}> Cambiar a Juicio </button>
                                        </div>
                                    </div>
                                )
                            }

                            {
                                (secretariaCliente.estado)
                                    ?
                                    (
                                        <div className='row mt-5 d-flex justify-content-center mb-5'>
                                            <div className='col-4 mt-3'>
                                                <h4>Estado del Expediente</h4>
                                            </div>
                                            <div className='col-4'>
                                                <div className="form-outline form-white mb-4 text-center">
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-lg text-center bg-dark text-white mt-2"
                                                        value={`Completado`}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                    :
                                    (
                                        <div className='row mt-5 d-flex justify-content-center mb-5'>
                                            <div className='col-6 mt-2'>
                                                <h4>Seleccionar Estado del Expediente</h4>
                                            </div>
                                            <div className='col-4'>
                                                <Select
                                                    className='fw-bold text-center text-white'
                                                    options={EstadoSecretaria}
                                                    onChange={setOptionValueEstado}
                                                    styles={customStyles}
                                                    isSearchable={false}
                                                    defaultValue={optionValueEstado}
                                                />
                                            </div>
                                        </div>
                                    )
                            }


                            {
                                (!secretariaCliente.estado)
                                &&
                                (
                                    <div>
                                        <hr />
                                        <div className='col-12 d-flex justify-content-center mt-4'>
                                            <button className='btn btn-outline-light w-25 p-2' onClick={handleActualizarEstado}> Actualizar Estado</button>
                                        </div>
                                    </div>

                                )
                            }

                        </div>
                    )
                }

            </div>

        </div>


    )
}
