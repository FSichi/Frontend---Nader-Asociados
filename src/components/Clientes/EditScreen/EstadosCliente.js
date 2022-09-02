import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import Swal from 'sweetalert2'
import axios from 'axios';
import { EstadoCli, VoluntadCli, customStyles } from '../../../helpers/AddClienteSelector'
import { getDataEstadoCliente, getLabelEstadoCliente, getLabelVoluntadCliente } from '../../../selector/Clientes';


export const EstadosCliente = ({ cliente }) => {

    const [estadoCliente, setEstadoCliente] = useState({});
    const [banderaCarga, setBanderaCarga] = useState(false);

    const [optionValueEstado, setOptionValueEstado] = useState({});
    const [optionValueVoluntad, setOptionValueVoluntad] = useState({});

    useEffect(() => {
        axios.get(`https://backend-nader-asociados.up.railway.app/clientes/estados/${cliente.cuit_cuil}`).then((resp) => {
            setEstadoCliente(resp.data);

            setOptionValueEstado(getLabelEstadoCliente(resp.data));
            setOptionValueVoluntad(getLabelVoluntadCliente(resp.data));

            setBanderaCarga(true);
        });
    }, [cliente.cuit_cuil]);

    const handleUpdate = () => {

        const data = getDataEstadoCliente(cliente, estadoCliente, optionValueEstado, optionValueVoluntad);

        /* LLAMAR A DB */

        axios.put(`https://backend-nader-asociados.up.railway.app/clientes/estados/${estadoCliente.id}`, data);

        setEstadoCliente(data);

        Swal.fire({
            title: 'Estado del Cliente Modificado Correctamente',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Continuar'
        })
    }

    return (

        <div className='container-fluid mt-2 bg-dark text-white p-4' style={{ borderRadius: '20px' }}>

            {/* TITULO DEL FORMULARIO */}

            <div className='text-center mt-3'>
                <h2 className="fw-bold text-uppercase">ESTADO DEL CLIENTE</h2>
                <p className="text-white-50 fs-5">Por Favor Completa el Estado del Cliente Cuando Corresponda</p>
            </div>

            <hr />

            {/* SELECCIONAR ESTADO */}

            {
                (banderaCarga)
                &&
                (
                    <div>

                        {
                            (
                                (estadoCliente.estadoOperacion === 'En Juicio') ||
                                (estadoCliente.estadoOperacion === 'En Secretaria') ||
                                (estadoCliente.estadoOperacion === 'Completado')
                            )
                                ?
                                (
                                    <div>

                                        <div className='text-center mt-3'>
                                            <p className="text-white-50 fs-5">El Cliente Actualmente esta asociado a un Expediente o una Ficha de Secretaria de Trabajo</p>
                                            <p className="text-white-50 fs-5">
                                                Es por ese motivo que el estado general del Cliente y la Voluntad del mismo no pueden ser editadas
                                                mientras se detecte que pertenecen a los elementos anteriormente mencionados
                                            </p>
                                        </div>

                                        <div className='row mt-5 d-flex justify-content-center mb-5'>
                                            <div className='col-6 mt-3'>
                                                <h4>Estado del Cliente</h4>
                                            </div>
                                            <div className='col-4'>
                                                <input
                                                    type="text" name='apyNombre' value={`Activo`} disabled
                                                    className="form-control form-control-lg text-center mt-2 bg-secondary text-white"
                                                />
                                            </div>
                                        </div>

                                        <div className='row mt-5 d-flex justify-content-center mb-5'>
                                            <div className='col-6 mt-3'>
                                                <h4>Voluntad del Cliente</h4>
                                            </div>
                                            <div className='col-4'>
                                                <input
                                                    type="text" name='apyNombre' value={estadoCliente.estadoOperacion} disabled
                                                    className="form-control form-control-lg text-center mt-2 bg-secondary text-white"
                                                />
                                            </div>
                                        </div>

                                    </div>
                                )
                                :
                                (
                                    <>
                                        <div className='row mt-5 d-flex justify-content-center mb-5'>
                                            <div className='col-6 mt-2'>
                                                <h4>Seleccionar Estado del Cliente</h4>
                                            </div>
                                            <div className='col-4'>
                                                <Select
                                                    className='fw-bold text-center text-white'
                                                    options={EstadoCli}
                                                    onChange={setOptionValueEstado}
                                                    styles={customStyles}
                                                    isSearchable={false}
                                                    defaultValue={optionValueEstado}
                                                />
                                            </div>
                                        </div>

                                        <div className='row mt-5 d-flex justify-content-center mb-5'>
                                            <div className='col-6 mt-2'>
                                                <h4>Seleccionar Voluntad del Cliente</h4>
                                            </div>
                                            <div className='col-4'>
                                                <Select
                                                    className='fw-bold text-center text-white'
                                                    options={VoluntadCli}
                                                    onChange={setOptionValueVoluntad}
                                                    styles={customStyles}
                                                    isSearchable={false}
                                                    defaultValue={optionValueVoluntad}
                                                />
                                            </div>
                                        </div>

                                        <hr />

                                        <div className='col-12 d-flex justify-content-center mt-4'>
                                            <button className='btn btn-outline-light w-25 p-2' onClick={handleUpdate}> Actualizar Estado</button>
                                        </div>

                                    </>
                                )
                        }

                    </div>
                )
            }

        </div>
    )
}
