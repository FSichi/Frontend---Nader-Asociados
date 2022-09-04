import React, { useEffect, useState } from 'react'
import { CallCenterGraf } from './Grafics/CallCenterGraf';
import { getCantidadJuicios } from '../../selector/Expedientes';
import { getCantidadClientes, getDistribucionClientes } from '../../selector/Clientes';
import axios from "axios";

export const Dashboard = () => {

    localStorage.removeItem("ruta");

    useEffect(() => {
        axios.get("https://backend-nader-asociados.up.railway.app/general/dashboard").then((resp) => {
            setStateEstadoClientes(resp.data[0]);
            setStateEstadoJuicios(resp.data[1]);
            setListOfClientes(resp.data[2]);
        });
    }, []);

    const [listOfClientes, setListOfClientes] = useState([]);
    const [stateEstadoClientes, setStateEstadoClientes] = useState([]);
    const [stateEstadoJuicios, setStateEstadoJuicios] = useState([]);

    const estadoClientes = getCantidadClientes(stateEstadoClientes);
    const estadoJuicios = getCantidadJuicios(stateEstadoJuicios);
    const distClientes = getDistribucionClientes(stateEstadoClientes);

    return (
        <div className='container-fluid ' >

            <div className='me-5 ms-5' >

                {/* CARDS */}

                <div>

                    <div className='row d-flex justify-content-between'>

                        <div className='col-lg-3 col-md-3 bg-dark text-white mt-5' style={{ borderRadius: '10px' }}>
                            <div className='row mt-4 mb-3'>
                                <div className='col-lg-12 col-md-12 d-flex flex-column align-items-center'>
                                    <img src={`../assets/user.svg`} alt='Usuario' style={{ height: '100px', width: '100px' }} />
                                </div>
                                <div className='col-lg-12 col-md-12 mt-4 d-flex flex-column align-items-center'>
                                    <h2>Clientes Totales</h2>
                                    <h3 className='bg-primary p-3 ' style={{ borderRadius: '10px' }}>{estadoClientes[0]}</h3>
                                </div>
                            </div>
                        </div>

                        <div className='col-lg-3 col-md-3 bg-dark text-white mt-5' style={{ borderRadius: '10px' }}>
                            <div className='row mt-4 mb-3'>
                                <div className='col-lg-12 col-md-12 d-flex flex-column align-items-center'>
                                    <img src={`../assets/user.svg`} alt='Usuario' style={{ height: '100px', width: '100px' }} />
                                </div>
                                <div className='col-lg-12 col-md-12 mt-4 d-flex flex-column align-items-center'>
                                    <h2>Clientes Activos</h2>
                                    <h3 className='bg-success p-3 ' style={{ borderRadius: '10px' }}>{estadoClientes[1]}</h3>
                                </div>
                            </div>
                        </div>

                        <div className='col-lg-3 col-md-3 bg-dark text-white mt-5' style={{ borderRadius: '10px' }}>
                            <div className='row mt-4 mb-3'>
                                <div className='col-lg-12 col-md-12 d-flex flex-column align-items-center'>
                                    <img src={`../assets/user.svg`} alt='Usuario' style={{ height: '100px', width: '100px' }} />
                                </div>
                                <div className='col-lg-12 col-md-12 mt-4 d-flex flex-column align-items-center'>
                                    <h2>Clientes Inactivos</h2>
                                    <h3 className='bg-danger p-3 ' style={{ borderRadius: '10px' }}>{estadoClientes[2]}</h3>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='row d-flex justify-content-between mb-5'>

                        <div className='col-lg-3 col-md-3 bg-dark text-white mt-5' style={{ borderRadius: '10px' }}>
                            <div className='row mt-4 mb-3'>
                                <div className='col-lg-12 col-md-12 d-flex flex-column align-items-center'>
                                    <img src={`../assets/juicios.svg`} alt='Usuario' style={{ height: '100px', width: '100px' }} />
                                </div>
                                <div className='col-lg-12 col-md-12 mt-4 d-flex flex-column align-items-center'>
                                    <h2>Juicios Totales</h2>
                                    <h3 className='bg-primary p-3 ' style={{ borderRadius: '10px' }}>{estadoJuicios[0]}</h3>
                                </div>
                            </div>
                        </div>

                        <div className='col-lg-3 col-md-3 bg-dark text-white mt-5' style={{ borderRadius: '10px' }}>
                            <div className='row mt-4 mb-3'>
                                <div className='col-lg-12 col-md-12 d-flex flex-column align-items-center'>
                                    <img src={`../assets/juicios.svg`} alt='Usuario' style={{ height: '100px', width: '100px' }} />
                                </div>
                                <div className='col-lg-12 col-md-12 mt-4 d-flex flex-column align-items-center'>
                                    <h2>Juicios Activos</h2>
                                    <h3 className='bg-success p-3 ' style={{ borderRadius: '10px' }}>{estadoJuicios[1]}</h3>
                                </div>
                            </div>
                        </div>

                        <div className='col-lg-3 col-md-3 bg-dark text-white mt-5' style={{ borderRadius: '10px' }}>
                            <div className='row mt-4 mb-3'>
                                <div className='col-lg-12 col-md-12 d-flex flex-column align-items-center'>
                                    <img src={`../assets/juicios.svg`} alt='Usuario' style={{ height: '100px', width: '100px' }} />
                                </div>
                                <div className='col-lg-12 col-md-12 mt-4 d-flex flex-column align-items-center'>
                                    <h2>Juicios Finalizados</h2>
                                    <h3 className='bg-danger p-3 ' style={{ borderRadius: '10px' }}>{estadoJuicios[2]}</h3>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

                {/* TABLES */}

                <div className='row d-flex justify-content-between'>

                    {/* NUMERO DE CLIENTES */}

                    <div className='bg-dark text-white col-lg-4 mb-5' style={{ borderRadius: '10px' }}>

                        <div className='mt-4'>
                            <h3 className='mt-4 text-center'>Distribucion de Clientes</h3>
                        </div>
                        <hr />

                        <div className='me-2 ms-2 mb-4'>

                            <ul className="list-group mt-3">

                                <div className="list-group-item list-group-item-info d-flex justify-content-between align-items-start mt-3 p-4" onClick={() => { console.log('Juicio 1') }} style={{ borderRadius: '10px' }}>
                                    <div className="mt-1">
                                        <div className="fw-bold" style={{ fontSize: '1.1rem' }}>Clientes en Int. Epistolar</div>
                                    </div>
                                    <span className="badge bg-primary rounded-pill" style={{ fontSize: '1.2rem' }}>{distClientes[0]}</span>
                                </div>
                                <div className="list-group-item list-group-item-info d-flex justify-content-between align-items-start p-4 mt-5" onClick={() => { console.log('Juicio 1') }} style={{ borderRadius: '10px' }}>
                                    <div className="mt-1">
                                        <div className="fw-bold" style={{ fontSize: '1.1rem' }}>Clientes en Juicio</div>
                                    </div>
                                    <span className="badge bg-primary rounded-pill" style={{ fontSize: '1.2rem' }}>{distClientes[1]}</span>
                                </div>
                                <div className="list-group-item list-group-item-info d-flex justify-content-between align-items-start mt-5 p-4" onClick={() => { console.log('Juicio 1') }} style={{ borderRadius: '10px' }}>
                                    <div className="mt-1">
                                        <div className="fw-bold" style={{ fontSize: '1.1rem' }}>Clientes en S. de Trabajo</div>
                                    </div>
                                    <span className="badge bg-primary rounded-pill" style={{ fontSize: '1.2rem' }}>{distClientes[2]}</span>
                                </div>

                            </ul>

                        </div>
                    </div>

                    {/* GRAFICA CLIENTES */}

                    <div className='bg-dark text-white col-lg-7 mb-5' style={{ borderRadius: '10px' }}>

                        <div className='mt-4 mb-4'>
                            <h2 className='text-center mt-3'>Empresas con mas Clientes Representados</h2>
                        </div>

                        <hr />

                        <CallCenterGraf clientes={listOfClientes} />

                    </div>


                </div>

            </div>

        </div>
    )
}
