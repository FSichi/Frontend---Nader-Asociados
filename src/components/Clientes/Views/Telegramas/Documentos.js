import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useForm } from '../../../../hooks/useForm';
import { EstadoTelegrama, customStylesEstados } from '../../../../helpers/TelegramasSelector'
import { getEstadosTelegramas } from '../../../../selector/Clientes';

export const Documentos = ({ cliente, estadoCli }) => {

    useEffect(() => {
        axios.get(`https://backend-nader.herokuapp.com/clientes/telegramas/${cliente.cuit_cuil}`).then((resp) => {
            setTelegramasCliente(resp.data);

            setBanT2(resp.data.estadoT2);
            setBanT3(resp.data.estadoT3);
            setBanT4(resp.data.estadoT4);
            setBanT5(resp.data.estadoT5);

            setBandera2(true);
        });
    }, [cliente.cuit_cuil]);

    const [estadoCliente, setEstadoCliente] = useState({});
    const [telegramasCliente, setTelegramasCliente] = useState({});

    /* BANDERAS PARA APARICION DE TELEGRAMAS */
    const [banT2, setBanT2] = useState({});
    const [banT3, setBanT3] = useState({});
    const [banT4, setBanT4] = useState({});
    const [banT5, setBanT5] = useState({});

    const [bandera, setBandera] = useState(false);
    const [bandera2, setBandera2] = useState(false);

    const estadosTelLabel = getEstadosTelegramas(telegramasCliente);

    /* ESTADO TELEGRAMAS (SELECT) */
    const [telegrama1, setTelegrama1] = useState(estadosTelLabel[0]);
    const [telegrama2, setTelegrama2] = useState(estadosTelLabel[1]);
    const [telegrama3, setTelegrama3] = useState(estadosTelLabel[2]);
    const [telegrama4, setTelegrama4] = useState(estadosTelLabel[3]);
    const [telegrama5, setTelegrama5] = useState(estadosTelLabel[4]);

    const [formValues, handleInputChange] = useForm({
        fechaTel1: '',
        fechaTel2: '',
        fechaTel3: '',
        fechaTel4: '',
        fechaTel5: '',
    });

    const { fechaTel1, fechaTel2, fechaTel3, fechaTel4, fechaTel5 } = formValues;

    if (JSON.stringify(estadoCli) !== '{}' && !bandera) {
        setEstadoCliente(estadoCli);
        setBandera(true);
    }

    /* FUNCIONES DE ACTUALIZACION */

    const handleUpdateTel1 = () => {

        if (telegrama1.label !== 'Enviado') {

            Swal.fire({
                title: 'Por favor actualiza el Estado del Telegama a `Enviado` para poder continuar',
                icon: 'info',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return
        }

        if (fechaTel1 === '') {

            Swal.fire({
                title: 'Por favor ingresa una Fecha para actualizar el Estado del Telegrama 1',
                icon: 'info',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return
        }

        var data = {
            id: telegramasCliente.id,
            cc_cliente: telegramasCliente.cc_cliente,

            estadoT1: true,
            estadoT2: telegramasCliente.estadoT2,
            estadoT3: telegramasCliente.estadoT3,
            estadoT4: telegramasCliente.estadoT4,
            estadoT5: telegramasCliente.estadoT5,

            fechaEnvio1: fechaTel1,
            fechaEnvio2: telegramasCliente.fechaEnvio2,
            fechaEnvio3: telegramasCliente.fechaEnvio3,
            fechaEnvio4: telegramasCliente.fechaEnvio4,
            fechaEnvio5: telegramasCliente.fechaEnvio5,

            estadoGeneral: telegramasCliente.estadoGeneral,
        }

        axios.put(`https://backend-nader.herokuapp.com/clientes/telegramas/${telegramasCliente.id}`, data).then((response) => {
            console.log('Estado Actualizado: ', response.data);
        });

        setTelegramasCliente(data);

        Swal.fire({
            title: 'Telegrama 1 Actualizado con Exito',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Continuar'
        });

    }

    const handleUpdateTel2 = () => {

        if (telegrama2.label !== 'Enviado') {

            Swal.fire({
                title: 'Por favor actualiza el Estado del Telegama a `Enviado` para poder continuar',
                icon: 'info',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return
        }

        if (fechaTel2 === '') {

            Swal.fire({
                title: 'Por favor ingresa una Fecha para actualizar el Estado del Telegrama 2',
                icon: 'info',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return
        }

        var data = {
            id: telegramasCliente.id,
            cc_cliente: cliente.cuit_cuil,

            estadoT1: telegramasCliente.estadoT1,
            estadoT2: true,
            estadoT3: telegramasCliente.estadoT3,
            estadoT4: telegramasCliente.estadoT4,
            estadoT5: telegramasCliente.estadoT5,

            fechaEnvio1: telegramasCliente.fechaEnvio1,
            fechaEnvio2: fechaTel2,
            fechaEnvio3: telegramasCliente.fechaEnvio3,
            fechaEnvio4: telegramasCliente.fechaEnvio4,
            fechaEnvio5: telegramasCliente.fechaEnvio5,

            estadoGeneral: telegramasCliente.estadoGeneral,
        }

        axios.put(`https://backend-nader.herokuapp.com/clientes/telegramas/${telegramasCliente.id}`, data).then((response) => {
            console.log('Estado Actualizado: ', response.data);
        });

        setTelegramasCliente(data);

        Swal.fire({
            title: 'Telegrama 2 Actualizado con Exito',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Continuar'
        });

    }

    const handleUpdateTel3 = () => {

        if (telegrama3.label !== 'Enviado') {

            Swal.fire({
                title: 'Por favor actualiza el Estado del Telegama a `Enviado` para poder continuar',
                icon: 'info',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return
        }

        if (fechaTel3 === '') {

            Swal.fire({
                title: 'Por favor ingresa una Fecha para actualizar el Estado del Telegrama 3',
                icon: 'info',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return
        }

        var data = {
            id: telegramasCliente.id,
            cc_cliente: cliente.cuit_cuil,

            estadoT1: telegramasCliente.estadoT1,
            estadoT2: telegramasCliente.estadoT2,
            estadoT3: true,
            estadoT4: telegramasCliente.estadoT4,
            estadoT5: telegramasCliente.estadoT5,

            fechaEnvio1: telegramasCliente.fechaEnvio1,
            fechaEnvio2: telegramasCliente.fechaEnvio2,
            fechaEnvio3: fechaTel3,
            fechaEnvio4: telegramasCliente.fechaEnvio4,
            fechaEnvio5: telegramasCliente.fechaEnvio5,

            estadoGeneral: telegramasCliente.estadoGeneral,
        }

        axios.put(`https://backend-nader.herokuapp.com/clientes/telegramas/${telegramasCliente.id}`, data).then((response) => {
            console.log('Estado Actualizado: ', response.data);
        });

        setTelegramasCliente(data);

        Swal.fire({
            title: 'Telegrama 3 Actualizado con Exito',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Continuar'
        });

    }

    const handleUpdateTel4 = () => {

        if (telegrama4.label !== 'Enviado') {

            Swal.fire({
                title: 'Por favor actualiza el Estado del Telegama a `Enviado` para poder continuar',
                icon: 'info',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return
        }

        if (fechaTel4 === '') {

            Swal.fire({
                title: 'Por favor ingresa una Fecha para actualizar el Estado del Telegrama 4',
                icon: 'info',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return
        }

        var data = {
            id: telegramasCliente.id,
            cc_cliente: cliente.cuit_cuil,

            estadoT1: telegramasCliente.estadoT1,
            estadoT2: telegramasCliente.estadoT2,
            estadoT3: telegramasCliente.estadoT3,
            estadoT4: true,
            estadoT5: telegramasCliente.estadoT5,

            fechaEnvio1: telegramasCliente.fechaEnvio1,
            fechaEnvio2: telegramasCliente.fechaEnvio2,
            fechaEnvio3: telegramasCliente.fechaEnvio3,
            fechaEnvio4: fechaTel4,
            fechaEnvio5: telegramasCliente.fechaEnvio5,

            estadoGeneral: telegramasCliente.estadoGeneral,
        }

        axios.put(`https://backend-nader.herokuapp.com/clientes/telegramas/${telegramasCliente.id}`, data).then((response) => {
            console.log('Estado Actualizado: ', response.data);
        });

        setTelegramasCliente(data);

        Swal.fire({
            title: 'Telegrama 4 Actualizado con Exito',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Continuar'
        });

    }

    const handleUpdateTel5 = () => {

        if (telegrama5.label !== 'Enviado') {

            Swal.fire({
                title: 'Por favor actualiza el Estado del Telegama a `Enviado` para poder continuar',
                icon: 'info',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return
        }

        if (fechaTel5 === '') {

            Swal.fire({
                title: 'Por favor ingresa una Fecha para actualizar el Estado del Telegrama 5',
                icon: 'info',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return
        }

        var data = {
            id: telegramasCliente.id,
            cc_cliente: cliente.cuit_cuil,

            estadoT1: telegramasCliente.estadoT1,
            estadoT2: telegramasCliente.estadoT2,
            estadoT3: telegramasCliente.estadoT3,
            estadoT4: telegramasCliente.estadoT4,
            estadoT5: true,

            fechaEnvio1: telegramasCliente.fechaEnvio1,
            fechaEnvio2: telegramasCliente.fechaEnvio2,
            fechaEnvio3: telegramasCliente.fechaEnvio3,
            fechaEnvio4: telegramasCliente.fechaEnvio4,
            fechaEnvio5: fechaTel5,

            estadoGeneral: telegramasCliente.estadoGeneral,
        }

        axios.put(`https://backend-nader.herokuapp.com/clientes/telegramas/${telegramasCliente.id}`, data).then((response) => {
            console.log('Estado Actualizado: ', response.data);
        });

        setTelegramasCliente(data);

        Swal.fire({
            title: 'Telegrama 5 Actualizado con Exito',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Continuar'
        });

    }

    const handleFinalizarTelegramas = () => {

        var data = {
            id: telegramasCliente.id,
            cc_cliente: telegramasCliente.cc_cliente,

            estadoT1: telegramasCliente.estadoT1,
            estadoT2: telegramasCliente.estadoT2,
            estadoT3: telegramasCliente.estadoT3,
            estadoT4: telegramasCliente.estadoT4,
            estadoT5: telegramasCliente.estadoT5,

            fechaEnvio1: telegramasCliente.fechaEnvio1,
            fechaEnvio2: telegramasCliente.fechaEnvio2,
            fechaEnvio3: telegramasCliente.fechaEnvio3,
            fechaEnvio4: telegramasCliente.fechaEnvio4,
            fechaEnvio5: telegramasCliente.fechaEnvio5,

            estadoGeneral: true
        }

        Swal.fire({
            title: '¿Estas Seguro?',
            text: "Esto Actualizara el Estado de los telegramas del Cliente Definitivamente. Los cambios son Irreversibles.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#41B883',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {

                axios.put(`https://backend-nader.herokuapp.com/clientes/telegramas/${telegramasCliente.id}`, data).then((response) => {
                    console.log('Estado Actualizado: ', response.data);
                });

                setTelegramasCliente(data);

                Swal.fire({
                    title: `Telegramas de ${cliente.apellidoyNombre} Finalizados.`,
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Continuar'
                });

            }
        })

    }

    return (
        <div className='container-fluid mt-2 bg-dark text-white p-3' style={{ borderRadius: '20px' }}>

            {
                (bandera2)
                &&
                (
                    <div className='text-center'>

                        {/* INFORMACION DE LOS TELEGRAMAS */}

                        <div className='row'>

                            <div className='col-6 mb-4'>
                                <h2 className="font-weight-bold fst-italic mt-4">Informacion de los Telegramas</h2>
                            </div>

                            {
                                (!telegramasCliente.estadoGeneral && estadoCliente.estadoActividad)
                                &&
                                (
                                    <div className='col-6 mt-3'>
                                        <div className='d-flex justify-content-end'>
                                            <button className='btn btn-outline-info p-3' onClick={handleFinalizarTelegramas}>Finalizar Telegramas</button>
                                        </div>
                                    </div>
                                )
                            }

                            <hr />

                            <div className='row ms-5 mb-3'>

                                {/* TIPO DE CONTRATO */}

                                <div className='col-6'>

                                    <div className='row'>
                                        <div className='col-4 mt-3'>
                                            <span className="fs-5">Tipo de Cese</span>
                                        </div>
                                        <div className='col-8'>
                                            <input
                                                type="text"
                                                className="form-control form-control-lg text-center mt-2 bg-dark text-white"
                                                name='contrato'
                                                value={cliente.tipoCese}
                                                autoComplete='off'
                                                disabled
                                                style={{ fontSize: '1rem' }}
                                            />
                                        </div>
                                    </div>

                                </div>

                                {/* CANTIDAD DE TELEGRAMAS A ENVIAR */}

                                <div className='col-5 ms-2'>

                                    <div className='row'>
                                        <div className='col-10 mt-3'>
                                            <span className="fs-5">Cantidad de Telegramas a Enviar</span>
                                        </div>
                                        <div className='col-2'>

                                            {
                                                (cliente.tipoCese === 'RENUNCIA')
                                                    ?
                                                    (
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg text-center mt-2 bg-dark text-white"
                                                            name='cantTelegramas'
                                                            value={`3`}
                                                            autoComplete='off'
                                                            disabled
                                                        />
                                                    )
                                                    :
                                                    (
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg text-center mt-2 bg-dark text-white"
                                                            name='cantTelegramas'
                                                            value={`4`}
                                                            autoComplete='off'
                                                            disabled
                                                        />
                                                    )
                                            }

                                        </div>
                                    </div>

                                </div>

                            </div>

                            <hr />

                        </div>

                        {/* TELEGRAMAS */}

                        <div className='container mt-3 mb-5 text-dark'>

                            {/* TELEGRAMA 1 */}

                            <div className='row ms-5 me-5'>

                                {
                                    (telegramasCliente.estadoT1)
                                        ?
                                        (
                                            <div className='p-3' style={{ borderRadius: '20px', backgroundColor: '#e2d8d8' }}>

                                                <div className='d-flex justify-content-between mt-1 mb-2 '>
                                                    <div>
                                                        <h4>TELEGRAMA 1</h4>
                                                    </div>
                                                </div>

                                                <hr />

                                                <div className='row mt-2'>

                                                    <div className='col-5'>
                                                        <div className='row'>

                                                            <div className='col-5 mt-2'>
                                                                <h4>Estado</h4>
                                                            </div>

                                                            <div className='col-7'>
                                                                <input
                                                                    type="text"
                                                                    className="form-control form-control-lg bg-dark text-white text-center"
                                                                    name='contrato'
                                                                    value={`Enviado`}
                                                                    disabled
                                                                    autoComplete='off'
                                                                />
                                                            </div>

                                                        </div>
                                                    </div>

                                                    <div className='col-6 ms-5'>
                                                        <div className='row'>

                                                            <div className='col-6 mt-2'>
                                                                <h4>Fecha Envio</h4>
                                                            </div>

                                                            <div className='col-6'>
                                                                <input
                                                                    type="date"
                                                                    className="form-control form-control-lg bg-dark text-white text-center"
                                                                    name='contrato'
                                                                    value={telegramasCliente.fechaEnvio1}
                                                                    disabled
                                                                    autoComplete='off'
                                                                />
                                                            </div>

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        )
                                        :
                                        (
                                            <div className='p-3' style={{ borderRadius: '20px', backgroundColor: '#e2d8d8' }}>

                                                <div className='d-flex justify-content-between mt-1 mb-2 '>
                                                    <div>
                                                        <h4>TELEGRAMA 1</h4>
                                                    </div>
                                                    <div>
                                                        <button className='btn btn-outline-dark ' onClick={handleUpdateTel1}> Actualizar</button>
                                                    </div>
                                                </div>

                                                <hr />

                                                <div className='row mt-2'>

                                                    <div className='col-5'>
                                                        <div className='row'>

                                                            <div className='col-5 mt-2'>
                                                                <h4>Estado</h4>
                                                            </div>

                                                            <div className='col-7'>
                                                                <Select
                                                                    className='fw-bold text-center'
                                                                    options={EstadoTelegrama}
                                                                    onChange={setTelegrama1}
                                                                    styles={customStylesEstados}
                                                                    isSearchable={false}
                                                                    defaultValue={telegrama1}
                                                                />
                                                            </div>

                                                        </div>
                                                    </div >

                                                    <div className='col-6 ms-5'>
                                                        <div className='row'>

                                                            <div className='col-6 mt-2'>
                                                                <h4>Fecha Envio</h4>
                                                            </div>

                                                            <div className='col-6'>
                                                                <input
                                                                    type="date"
                                                                    className="form-control form-control-lg text-center"
                                                                    autoComplete='off'
                                                                    name='fechaTel1'
                                                                    value={fechaTel1}
                                                                    onChange={handleInputChange}
                                                                />
                                                            </div>

                                                        </div>
                                                    </div>

                                                </div >
                                            </div>
                                        )
                                }

                                {
                                    (!banT2 && telegramasCliente.estadoT1 && !telegramasCliente.estadoGeneral && estadoCliente.estadoActividad)
                                    &&
                                    (
                                        <div className='mt-4 d-flex justify-content-center'>
                                            <button className='btn btn-outline-light' onClick={() => { setBanT2(true) }}>Agregar Telegrama</button>
                                        </div>
                                    )
                                }

                            </div >

                            {/* TELEGRAMA 2 */}

                            <div>

                                {
                                    (banT2)
                                    &&
                                    (
                                        <div className='row ms-5 me-5 mt-4'>

                                            {
                                                (telegramasCliente.estadoT2)
                                                    ?
                                                    (
                                                        <div className='p-3' style={{ borderRadius: '20px', backgroundColor: '#e2d8d8' }}>

                                                            <div className='d-flex justify-content-between mt-1 mb-2 '>
                                                                <div>
                                                                    <h4>TELEGRAMA 2</h4>
                                                                </div>
                                                            </div>

                                                            <hr />

                                                            <div className='row mt-2'>

                                                                <div className='col-5'>
                                                                    <div className='row'>

                                                                        <div className='col-5 mt-2'>
                                                                            <h4>Estado</h4>
                                                                        </div>

                                                                        <div className='col-7'>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control form-control-lg bg-dark text-white text-center"
                                                                                name='contrato'
                                                                                value={`Enviado`}
                                                                                disabled
                                                                                autoComplete='off'
                                                                            />
                                                                        </div>

                                                                    </div>
                                                                </div>

                                                                <div className='col-6 ms-5'>
                                                                    <div className='row'>

                                                                        <div className='col-6 mt-2'>
                                                                            <h4>Fecha Envio</h4>
                                                                        </div>

                                                                        <div className='col-6'>
                                                                            <input
                                                                                type="date"
                                                                                className="form-control form-control-lg bg-dark text-white text-center"
                                                                                name='contrato'
                                                                                value={telegramasCliente.fechaEnvio2}
                                                                                disabled
                                                                                autoComplete='off'
                                                                            />
                                                                        </div>

                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    )
                                                    :
                                                    (
                                                        <div className='p-3' style={{ borderRadius: '20px', backgroundColor: '#e2d8d8' }}>

                                                            <div className='d-flex justify-content-between mt-1 mb-2 '>
                                                                <div>
                                                                    <h4>TELEGRAMA 2</h4>
                                                                </div>
                                                                <div>
                                                                    <button className='btn btn-outline-dark' onClick={handleUpdateTel2}> Actualizar</button>
                                                                </div>
                                                            </div>

                                                            <hr />

                                                            <div className='row mt-2'>

                                                                <div className='col-5'>
                                                                    <div className='row'>

                                                                        <div className='col-5 mt-2'>
                                                                            <h4>Estado</h4>
                                                                        </div>

                                                                        <div className='col-7'>
                                                                            <Select
                                                                                className='fw-bold text-center text-white'
                                                                                options={EstadoTelegrama}
                                                                                onChange={setTelegrama2}
                                                                                styles={customStylesEstados}
                                                                                isSearchable={false}
                                                                                defaultValue={telegrama2}
                                                                            />
                                                                        </div>

                                                                    </div>
                                                                </div >

                                                                <div className='col-6 ms-5'>
                                                                    <div className='row'>

                                                                        <div className='col-6 mt-2'>
                                                                            <h4>Fecha Envio</h4>
                                                                        </div>

                                                                        <div className='col-6'>
                                                                            <input
                                                                                type="date"
                                                                                className="form-control form-control-lg text-center"
                                                                                autoComplete='off'
                                                                                name='fechaTel2'
                                                                                value={fechaTel2}
                                                                                onChange={handleInputChange}
                                                                            />
                                                                        </div>

                                                                    </div>
                                                                </div>

                                                            </div >
                                                        </div>
                                                    )
                                            }

                                            {
                                                (!banT3 && telegramasCliente.estadoT2 && !telegramasCliente.estadoGeneral && estadoCliente.estadoActividad)
                                                &&
                                                (
                                                    <div className='mt-4 d-flex justify-content-center'>
                                                        <button className='btn btn-outline-light' onClick={() => { setBanT3(true) }}>Agregar Telegrama</button>
                                                    </div>
                                                )
                                            }

                                        </div >
                                    )
                                }

                            </div>


                            {/* TELEGRAMA 3 */}

                            <div>

                                {
                                    (banT3)
                                    &&
                                    (
                                        <div className='row ms-5 me-5 mt-4'>

                                            {
                                                (telegramasCliente.estadoT3)
                                                    ?
                                                    (
                                                        <div className='p-3' style={{ borderRadius: '20px', backgroundColor: '#e2d8d8' }}>

                                                            <div className='d-flex justify-content-between mt-1 mb-2 '>
                                                                <div>
                                                                    <h4>TELEGRAMA 3</h4>
                                                                </div>
                                                            </div>

                                                            <hr />

                                                            <div className='row mt-2'>

                                                                <div className='col-5'>
                                                                    <div className='row'>

                                                                        <div className='col-5 mt-2'>
                                                                            <h4>Estado</h4>
                                                                        </div>

                                                                        <div className='col-7'>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control form-control-lg bg-dark text-white text-center"
                                                                                name='contrato'
                                                                                value={`Enviado`}
                                                                                disabled
                                                                                autoComplete='off'
                                                                            />
                                                                        </div>

                                                                    </div>
                                                                </div>

                                                                <div className='col-6 ms-5'>
                                                                    <div className='row'>

                                                                        <div className='col-6 mt-2'>
                                                                            <h4>Fecha Envio</h4>
                                                                        </div>

                                                                        <div className='col-6'>
                                                                            <input
                                                                                type="date"
                                                                                className="form-control form-control-lg bg-dark text-white text-center"
                                                                                name='contrato'
                                                                                value={telegramasCliente.fechaEnvio3}
                                                                                disabled
                                                                                autoComplete='off'
                                                                            />
                                                                        </div>

                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    )
                                                    :
                                                    (
                                                        <div className='p-3' style={{ borderRadius: '20px', backgroundColor: '#e2d8d8' }}>

                                                            <div className='d-flex justify-content-between mt-1 mb-2 '>
                                                                <div>
                                                                    <h4>TELEGRAMA 3</h4>
                                                                </div>
                                                                <div>
                                                                    <button className='btn btn-outline-dark' onClick={handleUpdateTel3}> Actualizar</button>
                                                                </div>
                                                            </div>

                                                            <hr />

                                                            <div className='row mt-2'>

                                                                <div className='col-5'>
                                                                    <div className='row'>

                                                                        <div className='col-5 mt-2'>
                                                                            <h4>Estado</h4>
                                                                        </div>

                                                                        <div className='col-7'>
                                                                            <Select
                                                                                className='fw-bold text-center text-white'
                                                                                options={EstadoTelegrama}
                                                                                onChange={setTelegrama3}
                                                                                styles={customStylesEstados}
                                                                                isSearchable={false}
                                                                                defaultValue={telegrama3}
                                                                            />
                                                                        </div>

                                                                    </div>
                                                                </div >

                                                                <div className='col-6 ms-5'>
                                                                    <div className='row'>

                                                                        <div className='col-6 mt-2'>
                                                                            <h4>Fecha Envio</h4>
                                                                        </div>

                                                                        <div className='col-6'>
                                                                            <input
                                                                                type="date"
                                                                                className="form-control form-control-lg text-center"
                                                                                autoComplete='off'
                                                                                name='fechaTel3'
                                                                                value={fechaTel3}
                                                                                onChange={handleInputChange}
                                                                            />
                                                                        </div>

                                                                    </div>
                                                                </div>

                                                            </div >
                                                        </div>
                                                    )
                                            }

                                            {
                                                (!banT4 && telegramasCliente.estadoT3 && !telegramasCliente.estadoGeneral && estadoCliente.estadoActividad)
                                                &&
                                                (
                                                    <div className='mt-4 d-flex justify-content-center'>
                                                        <button className='btn btn-outline-light' onClick={() => { setBanT4(true) }}>Agregar Telegrama</button>
                                                    </div>
                                                )
                                            }

                                        </div >
                                    )

                                }

                            </div>


                            {/* TELEGRAMA 4 */}

                            <div>

                                {
                                    (banT4)
                                    &&
                                    (
                                        <div className='row ms-5 me-5 mt-4'>

                                            {
                                                (telegramasCliente.estadoT4)
                                                    ?
                                                    (
                                                        <div className='p-3' style={{ borderRadius: '20px', backgroundColor: '#e2d8d8' }}>

                                                            <div className='d-flex justify-content-between mt-1 mb-2 '>
                                                                <div>
                                                                    <h4>TELEGRAMA 4</h4>
                                                                </div>
                                                            </div>

                                                            <hr />

                                                            <div className='row mt-2'>

                                                                <div className='col-5'>
                                                                    <div className='row'>

                                                                        <div className='col-5 mt-2'>
                                                                            <h4>Estado</h4>
                                                                        </div>

                                                                        <div className='col-7'>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control form-control-lg bg-dark text-white text-center"
                                                                                name='contrato'
                                                                                value={`Enviado`}
                                                                                disabled
                                                                                autoComplete='off'
                                                                            />
                                                                        </div>

                                                                    </div>
                                                                </div>

                                                                <div className='col-6 ms-5'>
                                                                    <div className='row'>

                                                                        <div className='col-6 mt-2'>
                                                                            <h4>Fecha Envio</h4>
                                                                        </div>

                                                                        <div className='col-6'>
                                                                            <input
                                                                                type="date"
                                                                                className="form-control form-control-lg bg-dark text-white text-center"
                                                                                name='contrato'
                                                                                value={telegramasCliente.fechaEnvio4}
                                                                                disabled
                                                                                autoComplete='off'
                                                                            />
                                                                        </div>

                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    )
                                                    :
                                                    (
                                                        <div className='p-3' style={{ borderRadius: '20px', backgroundColor: '#e2d8d8' }}>

                                                            <div className='d-flex justify-content-between mt-1 mb-2 '>
                                                                <div>
                                                                    <h4>TELEGRAMA 4</h4>
                                                                </div>
                                                                <div>
                                                                    <button className='btn btn-outline-dark' onClick={handleUpdateTel4}> Actualizar</button>
                                                                </div>
                                                            </div>

                                                            <hr />

                                                            <div className='row mt-2'>

                                                                <div className='col-5'>
                                                                    <div className='row'>

                                                                        <div className='col-5 mt-2'>
                                                                            <h4>Estado</h4>
                                                                        </div>

                                                                        <div className='col-7'>
                                                                            <Select
                                                                                className='fw-bold text-center text-white'
                                                                                options={EstadoTelegrama}
                                                                                onChange={setTelegrama4}
                                                                                styles={customStylesEstados}
                                                                                isSearchable={false}
                                                                                defaultValue={telegrama4}
                                                                            />
                                                                        </div>

                                                                    </div>
                                                                </div >

                                                                <div className='col-6 ms-5'>
                                                                    <div className='row'>

                                                                        <div className='col-6 mt-2'>
                                                                            <h4>Fecha Envio</h4>
                                                                        </div>

                                                                        <div className='col-6'>
                                                                            <input
                                                                                type="date"
                                                                                className="form-control form-control-lg text-center"
                                                                                autoComplete='off'
                                                                                name='fechaTel4'
                                                                                value={fechaTel4}
                                                                                onChange={handleInputChange}
                                                                            />
                                                                        </div>

                                                                    </div>
                                                                </div>

                                                            </div >
                                                        </div>
                                                    )
                                            }

                                            {
                                                (!banT5 && telegramasCliente.estadoT4 && !telegramasCliente.estadoGeneral && estadoCliente.estadoActividad)
                                                &&
                                                (
                                                    <div className='mt-4 d-flex justify-content-center'>
                                                        <button className='btn btn-outline-light' onClick={() => { setBanT5(true) }}>Agregar Telegrama</button>
                                                    </div>
                                                )
                                            }

                                        </div >
                                    )

                                }

                            </div>


                            {/* TELEGRAMA 5 */}

                            <div>

                                {
                                    (banT5)
                                    &&
                                    (
                                        <div className='row ms-5 me-5 mt-4' >

                                            {
                                                (telegramasCliente.estadoT5)
                                                    ?
                                                    (
                                                        <div className='p-3' style={{ borderRadius: '20px', backgroundColor: '#e2d8d8' }}>

                                                            <div className='d-flex justify-content-between mt-1 mb-2 '>
                                                                <div>
                                                                    <h4>TELEGRAMA 5</h4>
                                                                </div>
                                                            </div>

                                                            <hr />

                                                            <div className='row mt-2'>

                                                                <div className='col-5'>
                                                                    <div className='row'>

                                                                        <div className='col-5 mt-2'>
                                                                            <h4>Estado</h4>
                                                                        </div>

                                                                        <div className='col-7'>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control form-control-lg bg-dark text-white text-center"
                                                                                name='contrato'
                                                                                value={`Enviado`}
                                                                                disabled
                                                                                autoComplete='off'
                                                                            />
                                                                        </div>

                                                                    </div>
                                                                </div>

                                                                <div className='col-6 ms-5'>
                                                                    <div className='row'>

                                                                        <div className='col-6 mt-2'>
                                                                            <h4>Fecha Envio</h4>
                                                                        </div>

                                                                        <div className='col-6'>
                                                                            <input
                                                                                type="date"
                                                                                className="form-control form-control-lg bg-dark text-white text-center"
                                                                                name='contrato'
                                                                                value={telegramasCliente.fechaEnvio5}
                                                                                disabled
                                                                                autoComplete='off'
                                                                            />
                                                                        </div>

                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    )
                                                    :
                                                    (
                                                        <div className='p-3' style={{ borderRadius: '20px', backgroundColor: '#e2d8d8' }}>

                                                            <div className='d-flex justify-content-between mt-1 mb-2 '>
                                                                <div>
                                                                    <h4>TELEGRAMA 5</h4>
                                                                </div>
                                                                <div>
                                                                    <button className='btn btn-outline-dark' onClick={handleUpdateTel5}> Actualizar</button>
                                                                </div>
                                                            </div>

                                                            <hr />

                                                            <div className='row mt-2'>

                                                                <div className='col-5'>
                                                                    <div className='row'>

                                                                        <div className='col-5 mt-2'>
                                                                            <h4>Estado</h4>
                                                                        </div>

                                                                        <div className='col-7'>
                                                                            <Select
                                                                                className='fw-bold text-center text-white'
                                                                                options={EstadoTelegrama}
                                                                                onChange={setTelegrama5}
                                                                                styles={customStylesEstados}
                                                                                isSearchable={false}
                                                                                defaultValue={telegrama5}
                                                                            />
                                                                        </div>

                                                                    </div>
                                                                </div >

                                                                <div className='col-6 ms-5'>
                                                                    <div className='row'>

                                                                        <div className='col-6 mt-2'>
                                                                            <h4>Fecha Envio</h4>
                                                                        </div>

                                                                        <div className='col-6'>
                                                                            <input
                                                                                type="date"
                                                                                className="form-control form-control-lg text-center"
                                                                                autoComplete='off'
                                                                                name='fechaTel5'
                                                                                value={fechaTel5}
                                                                                onChange={handleInputChange}
                                                                            />
                                                                        </div>

                                                                    </div>
                                                                </div>

                                                            </div >
                                                        </div>
                                                    )
                                            }

                                        </div >
                                    )

                                }

                            </div>

                        </div >

                    </div>
                )
            }

        </div >
    )
}