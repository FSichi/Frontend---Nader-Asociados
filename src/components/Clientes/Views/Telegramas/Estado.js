import React, { useEffect, useState } from 'react'
import axios from 'axios';

export const Estado = ({ cliente }) => {

    const [telegramaCliente, setTelegramaCliente] = useState({});
    const [firmaCliente, setFirmaCliente] = useState({});

    const [banderaCarga, setBanderaCarga] = useState(false);

    useEffect(() => {

        axios.get(`https://backend-nader.herokuapp.com/general/clienteScreen/telegramas/${cliente.cuit_cuil}`).then((resp) => {
            setTelegramaCliente(resp.data[0]);
            setFirmaCliente(resp.data[1]);

            setBanderaCarga(true);
        });

    }, [cliente.cuit_cuil]);

    return (
        <div className='container-fluid mt-2 bg-dark text-white p-3' style={{ borderRadius: '20px' }}>

            <div className='row'>

                <div className='col-12 mb-1'>
                    <h2 className="font-weight-bold fst-italic mt-4">Requisitos para Avanzar en el proceso Legal</h2>
                </div>

                {
                    (banderaCarga)
                    &&
                    (
                        <div>

                            {/* MENSAJES DE ESTADO */}

                            <div className='col-12 mb-2'>

                                {
                                    (telegramaCliente.estadoGeneral && firmaCliente.estadoGeneral)
                                        ?
                                        (
                                            <div className='row d-flex justify-content-center mt-2 mb-4'>

                                                <div className='col-10'>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-lg text-center mt-2 "
                                                        name='apellidoyNombre'
                                                        value={`Listo para ir a Juicio. Puedes agregarlo a un Expediente`}
                                                        autoComplete='off'
                                                        disabled
                                                        style={{ backgroundColor: 'lightseagreen' }}
                                                    />
                                                </div>

                                            </div>
                                        )
                                        :
                                        (
                                            <div className='row d-flex justify-content-center mt-2 mb-4'>

                                                <div className='col-10'>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-lg text-center mt-2 "
                                                        name='apellidoyNombre'
                                                        value={`El cliente no cumple los requisitos para ir a Juicio.`}
                                                        autoComplete='off'
                                                        disabled
                                                        style={{ backgroundColor: 'salmon' }}
                                                    />
                                                </div>

                                            </div>
                                        )
                                }

                            </div>

                            <hr />

                            {/* FIRMAS */}

                            <div className='row ms-5'>

                                <div className='col-6 mb-4'>

                                    <div className='row'>
                                        <div className='col-4 mt-3'>
                                            <span className="fs-5">Firma de Poder</span>
                                        </div>

                                        <div className='col-4'>
                                            {
                                                (firmaCliente.firmaPoder)
                                                    ?
                                                    (
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg text-center mt-2 bg-secondary text-white"
                                                            value={`Si`}
                                                            autoComplete='off'
                                                            disabled
                                                        />
                                                    )
                                                    :
                                                    (
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg text-center mt-2 bg-secondary text-white"
                                                            value={`No`}
                                                            autoComplete='off'
                                                            disabled
                                                        />
                                                    )
                                            }

                                        </div>

                                    </div>

                                </div>

                                <div className='col-6 mb-3'>

                                    <div className='row'>
                                        <div className='col-5 mt-3'>
                                            <span className="fs-5">Firma de Pacto C. L. </span>
                                        </div>

                                        <div className='col-4'>
                                            {
                                                (firmaCliente.firmaPCL)
                                                    ?
                                                    (
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg text-center mt-2 bg-secondary text-white"
                                                            value={`Si`}
                                                            autoComplete='off'
                                                            disabled
                                                        />
                                                    )
                                                    :
                                                    (
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg text-center mt-2 bg-secondary text-white"
                                                            value={`No`}
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

                            {/* TELEGRAMAS 1 - 2 */}

                            <div className='row ms-5 mb-5'>

                                {/* TELEGRAMA 1 */}

                                <div className='col-6'>

                                    <div className='row'>
                                        <div className='col-4 mt-3'>
                                            <span className="fs-5">Telegrama 1</span>
                                        </div>

                                        {
                                            (telegramaCliente.estadoT1)
                                                ?
                                                (
                                                    <div className='col-4'>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg text-center mt-2 bg-secondary text-white"
                                                            value={`Enviado`}
                                                            autoComplete='off'
                                                            disabled
                                                        />
                                                    </div>
                                                )
                                                :
                                                (
                                                    <div className='col-4'>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg text-center mt-2 bg-secondary text-white"
                                                            value={`No Enviado`}
                                                            autoComplete='off'
                                                            disabled
                                                        />
                                                    </div>
                                                )
                                        }

                                    </div>

                                </div>

                                {/* TELEGRAMA 2 */}

                                <div className='col-6'>

                                    <div className='row'>
                                        <div className='col-5 mt-3'>
                                            <span className="fs-5">Telegrama 2</span>
                                        </div>

                                        {
                                            (telegramaCliente.estadoT2)
                                                ?
                                                (
                                                    <div className='col-4'>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg text-center mt-2 bg-secondary text-white"
                                                            value={`Enviado`}
                                                            autoComplete='off'
                                                            disabled
                                                        />
                                                    </div>
                                                )
                                                :
                                                (
                                                    <div className='col-4'>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg text-center mt-2 bg-secondary text-white"
                                                            value={`No Enviado`}
                                                            autoComplete='off'
                                                            disabled
                                                        />
                                                    </div>
                                                )
                                        }

                                    </div>

                                </div>

                            </div>

                            {/* TELEGRAMAS 3 - 4 */}

                            <div className='row ms-5 mb-5'>

                                {/* TELEGRAMA 3 */}

                                <div className='col-6'>

                                    <div className='row'>
                                        <div className='col-4 mt-3'>
                                            <span className="fs-5">Telegrama 3</span>
                                        </div>
                                        {
                                            (telegramaCliente.estadoT3)
                                                ?
                                                (
                                                    <div className='col-4'>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg text-center mt-2 bg-secondary text-white"
                                                            value={`Enviado`}
                                                            autoComplete='off'
                                                            disabled
                                                        />
                                                    </div>
                                                )
                                                :
                                                (
                                                    <div className='col-4'>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg text-center mt-2 bg-secondary text-white"
                                                            value={`No Enviado`}
                                                            autoComplete='off'
                                                            disabled
                                                        />
                                                    </div>
                                                )
                                        }
                                    </div>

                                </div>

                                {/* TELEGRAMA 4 */}

                                <div className='col-6'>

                                    <div className='row'>
                                        <div className='col-5 mt-3'>
                                            <span className="fs-5">Telegrama 4</span>
                                        </div>
                                        {
                                            (telegramaCliente.estadoT4)
                                                ?
                                                (
                                                    <div className='col-4'>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg text-center mt-2 bg-secondary text-white"
                                                            value={`Enviado`}
                                                            autoComplete='off'
                                                            disabled
                                                        />
                                                    </div>
                                                )
                                                :
                                                (
                                                    <div className='col-4'>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg text-center mt-2 bg-secondary text-white"
                                                            value={`No Enviado`}
                                                            autoComplete='off'
                                                            disabled
                                                        />
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

        </div>
    )
}
