import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import Select from 'react-select';
import axios from 'axios';
import { EstadoExp, customStyles } from '../../../../helpers/Expedientes'
import { getLabelExpediente } from '../../../../selector/Expedientes';

export const EstadoExpediente = ({ expediente, history }) => {

    const [optionValueEstado, setOptionValueEstado] = useState(getLabelExpediente(expediente));
    const [listofClientes, setListofClientes] = useState([]);
    const [estadosJuicio, setEstadosJuicio] = useState({});

    useEffect(() => {
        axios.get(`https://backend-nader.herokuapp.com/juicios/obligatorio/estado/ind?data=${expediente.numeroExp}`).then((resp) => {
            setEstadosJuicio(resp.data);
        });

        axios.get(`https://backend-nader.herokuapp.com/general/estadoExp?data=${expediente.numeroExp}`).then((resp) => {
            setListofClientes(resp.data);
        });

    }, [expediente.numeroExp]);

    const handleActualizar = () => {

        if (optionValueEstado.value !== '1') {
            Swal.fire({
                title: 'No se puede cambiar el estado del expediente.',
                text: 'Seleccione el Estado `Completado` dentro de la casilla de opciones.',
                icon: 'info',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return
        }

        if (!estadosJuicio.sentenciaPrimeraInstancia) {
            Swal.fire({
                title: 'No se puede cambiar el estado del expediente.',
                text: 'Recuerde: Para completar un expediente debe alcanzar al menos el estado de Sentencia de Primera Instancia',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return
        }

        Swal.fire({
            title: '¿Estas Seguro?',
            text: "Esto Finalizara el Proceso del Expediente. ESTA ACCION NO PUEDE REVERTIRSE",
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
                    id: expediente.id,
                    caratula: expediente.caratula,
                    numeroExp: expediente.numeroExp,
                    juzgado: expediente.juzgado,
                    abogadoAp: expediente.abogadoAp,
                    abogadoGs: expediente.abogadoGs,
                    capitalColectivoReclamado: expediente.capitalColectivoReclamado,
                    empresaDemandada: expediente.empresaDemandada,
                    cantClientes: expediente.cantClientes,
                    tipoDemanda: expediente.tipoDemanda,
                    finalizado: true,
                    fechaInicio: expediente.fechaInicio,
                    fechaFinalizado: hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate()
                }

                axios.put(`https://backend-nader.herokuapp.com/expedientes/${expediente.id}`, data);

                /* CAMBIAR ESTADO A COMPLETADO DE LOS CLIENTES DE ESE JUICIO */

                var estadoCliente = {
                    id: '',
                    cc_cliente: '',

                    vJuicio: '',
                    vSecretaria: '',
                    puedeAbandonar: '',

                    estadoActividad: '',
                    estadoOperacion: ''
                }

                listofClientes.forEach(cliente => {

                    estadoCliente = {
                        id: cliente.id,
                        cc_cliente: cliente.cc_cliente,

                        vJuicio: cliente.vJuicio,
                        vSecretaria: cliente.vSecretaria,
                        puedeAbandonar: cliente.puedeAbandonar,

                        estadoActividad: cliente.estadoActividad,
                        estadoOperacion: 'Completado'
                    }

                    axios.put(`https://backend-nader.herokuapp.com/clientes/estados/${cliente.id}`, estadoCliente);

                });

                Swal.fire({
                    title: 'Estado del Expediente Actualizado Correctamente',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Continuar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        localStorage.setItem("ruta", `/exp/${expediente.id}`);
                        window.location.reload();
                    }
                });
            }
        });

    }

    return (

        <div className='container-fluid mt-2 bg-dark text-white p-4' style={{ borderRadius: '20px' }}>

            {/* TITULO DEL FORMULARIO */}

            <div className='text-center mt-3'>
                <h2 className="fw-bold text-uppercase">ESTADO DEL EXPEDIENTE [ {expediente.numeroExp} ]</h2>
                <p className="text-white-50 fs-5">Por Favor Completa el Estado del Expediente Cuando Corresponda</p>
            </div>

            {/* SELECCIONAR ESTADO */}

            {
                (expediente.finalizado)
                    ?
                    (
                        <div className='row mt-5 d-flex justify-content-center mb-5'>
                            <div className='col-6 mt-2'>
                                <h4>Estado del Expediente</h4>
                            </div>
                            <div className='col-4'>
                                <input
                                    type="text"
                                    className="form-control form-control-lg text-center bg-dark text-white mt-2"
                                    value={`Completado`}
                                    disabled
                                />
                            </div>
                        </div>
                    )
                    :
                    (
                        <div>
                            <hr />

                            <div className='row mt-5 d-flex justify-content-center mb-5'>
                                <div className='col-6 mt-2'>
                                    <h4>Seleccionar Estado del Expediente</h4>
                                </div>
                                <div className='col-4'>
                                    <Select
                                        className='fw-bold text-center text-white'
                                        options={EstadoExp}
                                        onChange={setOptionValueEstado}
                                        styles={customStyles}
                                        isSearchable={false}
                                        defaultValue={optionValueEstado}
                                    />
                                </div>
                            </div>

                            {
                                (optionValueEstado.value === '1')
                                &&
                                (
                                    <div>
                                        <hr />
                                        <div className='col-12 d-flex justify-content-center mt-4'>

                                            <button className='btn btn-outline-light w-25 p-2' onClick={handleActualizar}> Actualizar Estado</button>
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
