import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import axios from 'axios';

export const Firmas = ({ cliente, estadoCli }) => {

    useEffect(() => {

        axios.get(`https://backend-nader-asociados.up.railway.app/clientes/firmas/${cliente.cuit_cuil}`).then((resp) => {
            setFirmasCliente(resp.data);

            setFirmaPoder(resp.data.firmaPoder);
            setFirmaPCL(resp.data.firmaPCL);

            setBanderaFirmas(true);
        });

    }, [cliente.cuit_cuil]);

    const [estadoCliente, setEstadoCliente] = useState({});
    const [firmasCliente, setFirmasCliente] = useState({});

    const [firmaPoder, setFirmaPoder] = useState(false);
    const [firmaPCL, setFirmaPCL] = useState(false);

    const [banderaEstado, setBanderaEstado] = useState(false);
    const [banderaFirmas, setBanderaFirmas] = useState(false);


    if (JSON.stringify(estadoCli) !== '{}' && !banderaEstado) {
        setEstadoCliente(estadoCli);
        setBanderaEstado(true);
    }

    const handleFirmaPoder = () => {

        var data = {
            id: '',
            cc_cliente: '',

            firmaPoder: '',
            firmaPCL: '',
            estadoGeneral: '',
        }

        if (firmaPoder) {

            data = {
                id: firmasCliente.id,
                cc_cliente: firmasCliente.cc_cliente,

                firmaPoder: false,
                firmaPCL: firmasCliente.firmaPCL,
                estadoGeneral: firmasCliente.estadoGeneral,
            }

            /* LLAMAR A LA DB */

            console.log('Actualizando....');

            axios.put(`https://backend-nader-asociados.up.railway.app/clientes/firmas/${firmasCliente.id}`, data).then((response) => {
                console.log('Firmas Actualizadas: ', response.data);
            });

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-start',
                showConfirmButton: false,
                timer: 2500,
                timerProgressBar: false,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'error',
                title: 'Firma de Poder Eliminada'
            });

        } else {

            data = {
                id: firmasCliente.id,
                cc_cliente: firmasCliente.cc_cliente,

                firmaPoder: true,
                firmaPCL: firmasCliente.firmaPCL,
                estadoGeneral: firmasCliente.estadoGeneral,
            }

            /* LLAMAR A LA DB */

            axios.put(`https://backend-nader-asociados.up.railway.app/clientes/firmas/${firmasCliente.id}`, data).then((response) => {
                console.log('Firmas Actualizadas: ', response.data);
            });

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-start',
                showConfirmButton: false,
                timer: 2500,
                timerProgressBar: false,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: 'Firma de Poder Registrada'
            });

        }

        setFirmaPoder(!firmaPoder);
        setFirmasCliente(data);
    }

    const handleFirmaPCL = () => {

        var data = {
            id: '',
            cc_cliente: '',

            firmaPoder: '',
            firmaPCL: '',
            estadoGeneral: '',
        }

        if (firmaPCL) {

            data = {
                id: firmasCliente.id,
                cc_cliente: firmasCliente.cc_cliente,

                firmaPoder: firmasCliente.firmaPoder,
                firmaPCL: false,
                estadoGeneral: firmasCliente.estadoGeneral,
            }

            /* LLAMAR A LA DB */

            axios.put(`https://backend-nader-asociados.up.railway.app/clientes/firmas/${firmasCliente.id}`, data).then((response) => {
                console.log('Firmas Actualizadas: ', response.data);
            });

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-start',
                showConfirmButton: false,
                timer: 2500,
                timerProgressBar: false,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'error',
                title: 'Firma de Pacto de Cuota Litis Eliminada'
            });

        } else {

            data = {
                id: firmasCliente.id,
                cc_cliente: firmasCliente.cc_cliente,

                firmaPoder: firmasCliente.firmaPoder,
                firmaPCL: true,
                estadoGeneral: firmasCliente.estadoGeneral,
            }

            /* LLAMAR A LA DB */

            axios.put(`https://backend-nader-asociados.up.railway.app/clientes/firmas/${firmasCliente.id}`, data).then((response) => {
                console.log('Firmas Actualizadas: ', response.data);
            });

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-start',
                showConfirmButton: false,
                timer: 2500,
                timerProgressBar: false,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: 'Firma de Pacto de Cuota Litis Registrada'
            });
        }

        setFirmaPCL(!firmaPCL);
        setFirmasCliente(data);
    }

    const handleFinalizarFirmas = () => {

        if (!firmasCliente.firmaPoder || !firmasCliente.firmaPCL) {

            Swal.fire({
                title: 'Por favor completa las 2 firmas para poder Finalizar el Estado general de Firmas del Cliente',
                icon: 'info',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return

        }

        var data = {
            id: firmasCliente.id,
            cc_cliente: firmasCliente.cc_cliente,

            firmaPoder: firmasCliente.firmaPoder,
            firmaPCL: firmasCliente.firmaPCL,
            estadoGeneral: true,
        }

        Swal.fire({
            title: '¿Estas Seguro?',
            text: "Esto Actualizara el Estado de las Firmas del Cliente Definitivamente. Los cambios son Irreversibles.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#41B883',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {

                axios.put(`https://backend-nader-asociados.up.railway.app/clientes/firmas/${firmasCliente.id}`, data).then((response) => {
                    console.log('Firmas Actualizadas: ', response.data);
                });

                setFirmasCliente(data);

                Swal.fire({
                    title: 'Estado General de las Firmas Finalizado',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Continuar'
                });

            }
        })

    }

    return (

        <div className='container-fluid mt-2 bg-dark text-white' style={{ borderRadius: '20px' }}>

            {
                (banderaEstado && banderaFirmas)
                &&
                (
                    <div>

                        {/* INFORMACION DE LAS FIRMAS - FINALIZAR FIRMAS */}

                        <div className='row'>

                            <div className='col-6 mb-4'>
                                <h2 className="font-weight-bold fst-italic mt-5 ms-4">Informacion de las Firmas</h2>
                            </div>

                            {
                                (!firmasCliente.estadoGeneral && estadoCliente.estadoActividad)
                                &&
                                (
                                    <div className='col-6 mt-4'>
                                        <div className='d-flex justify-content-end'>
                                            <button className='btn btn-outline-info p-3 mt-3' onClick={handleFinalizarFirmas}>Finalizar Firmas</button>
                                        </div>
                                    </div>
                                )
                            }

                            <hr />

                        </div>

                        {/* FIRMA PODER - FIRMA PACTO CL */}

                        <div className='row p-5'>

                            {/* FIRMA PODER */}

                            <div className='col-6'>

                                <div className='row'>

                                    <div className='col-6 mt-2'>
                                        <span className="fs-5">Firma de Poder</span>
                                    </div>

                                    {
                                        (!firmasCliente.estadoGeneral && estadoCliente.estadoActividad)
                                        &&
                                        (
                                            <div className='col-6'>
                                                {
                                                    (firmaPoder)
                                                        ?
                                                        (
                                                            <div>
                                                                <input className="form-check-input fs-2" type="checkbox" checked onClick={handleFirmaPoder} onChange={() => { }} />
                                                            </div>
                                                        )
                                                        :
                                                        (
                                                            <div>
                                                                <input className="form-check-input fs-2 " type="checkbox" onClick={handleFirmaPoder} onChange={() => { }} />
                                                            </div>
                                                        )
                                                }
                                            </div>
                                        )
                                    }

                                    {
                                        (firmasCliente.estadoGeneral)
                                        &&
                                        (
                                            <div className='col-6'>
                                                <input className="form-check-input fs-2" type="checkbox" checked onChange={() => { }} />
                                            </div>
                                        )
                                    }

                                    {
                                        (!estadoCliente.estadoActividad)
                                        &&
                                        (
                                            <div className='col-6'>
                                                {
                                                    (firmaPoder)
                                                        ?
                                                        (
                                                            <div>
                                                                <input className="form-check-input fs-2" type="checkbox" checked disabled onChange={() => { }} />
                                                            </div>
                                                        )
                                                        :
                                                        (
                                                            <div>
                                                                <input className="form-check-input fs-2 " type="checkbox" disabled onChange={() => { }} />
                                                            </div>
                                                        )
                                                }
                                            </div>
                                        )
                                    }

                                </div>

                            </div>

                            {/* FIRMA PCL */}

                            <div className='col-6'>

                                <div className='row'>
                                    <div className='col-6 mt-2'>
                                        <span className="fs-5">Firma de Pacto Cuota Litis</span>
                                    </div>

                                    {
                                        (!firmasCliente.estadoGeneral && estadoCliente.estadoActividad)
                                        &&
                                        (
                                            <div className='col-6'>
                                                {
                                                    (firmaPCL)
                                                        ?
                                                        (
                                                            <div>
                                                                <input className="form-check-input fs-2" type="checkbox" checked onClick={handleFirmaPCL} onChange={() => { }} />
                                                            </div>
                                                        )
                                                        :
                                                        (
                                                            <div>
                                                                <input className="form-check-input fs-2 " type="checkbox" onClick={handleFirmaPCL} onChange={() => { }} />
                                                            </div>
                                                        )
                                                }
                                            </div>
                                        )

                                    }

                                    {
                                        (firmasCliente.estadoGeneral)
                                        &&
                                        (
                                            <div className='col-6'>
                                                <input className="form-check-input fs-2" type="checkbox" checked onChange={() => { }} />
                                            </div>
                                        )
                                    }

                                    {
                                        (!estadoCliente.estadoActividad)
                                        &&
                                        (
                                            <div className='col-6'>
                                                {
                                                    (firmaPCL)
                                                        ?
                                                        (
                                                            <div>
                                                                <input className="form-check-input fs-2" type="checkbox" checked disabled onChange={() => { }} />
                                                            </div>
                                                        )
                                                        :
                                                        (
                                                            <div>
                                                                <input className="form-check-input fs-2 " type="checkbox" disabled onChange={() => { }} />
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
                )
            }

        </div>
    )
}