import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import axios from 'axios';

export const ReportesClientes = () => {

    const [clientesState, setClientesState] = useState(false);
    const [clientesState2, setClientesState2] = useState(false);

    const [listOfClientes, setListOfClientes] = useState([]);

    useEffect(() => {

        axios.get("https://backend-nader.herokuapp.com/clientes").then((resp) => {
            setListOfClientes(resp.data)
        });

    }, [])


    const handleCliente = () => {
        setClientesState2(false);
        setClientesState(!clientesState);

        if (listOfClientes.length === 0) {
            Swal.fire({
                title: 'El Sistema no Posee Registros de Clientes.',
                text: 'Si piensas que es un error, por favor comunicate con un administrador',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar'
            });

            setClientesState(false);
        }
    }

    const handleCliente2 = () => {
        setClientesState(false);
        setClientesState2(!clientesState2);

        if (listOfClientes.length === 0) {
            Swal.fire({
                title: 'El Sistema no Posee Registros de Clientes.',
                text: 'Si piensas que es un error, por favor comunicate con un administrador',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar'
            });

            setClientesState2(false);
        }
    }

    return (

        <div className='container-fluid'>

            <div className='me-5 ms-5'>

                {/* CARDS MODIFY */}

                <div className='row d-flex justify-content-center'>

                    {/* DATOS PERSONALES */}

                    <div className='col-lg-3 col-md-3 bg-dark text-white mt-3 me-5' style={{ borderRadius: '10px' }}>
                        <div className='row mt-4 mb-3'>
                            <div className='col-lg-12 col-md-12 d-flex flex-column align-items-center'>
                                <img src={`../assets/user.svg`} alt='Usuario' style={{ height: '100px', width: '100px' }} />
                            </div>
                            <div className='col-lg-12 col-md-12 mt-4 d-flex flex-column align-items-center'>
                                <h2>Usuarios</h2>
                                <h5 className='mb-4'>(Datos Personales)</h5>
                                {
                                    (!clientesState)
                                        ? (<button className='btn btn-outline-light' onClick={handleCliente}>Preparar Reporte</button>)
                                        : (<button className='btn btn-outline-danger' onClick={handleCliente}>Cancelar Reporte</button>)
                                }
                            </div>
                        </div>
                    </div>

                    {/* DATOS TRABAJO */}

                    <div className='col-lg-3 col-md-3 bg-dark text-white mt-3 ms-5' style={{ borderRadius: '10px' }}>
                        <div className='row mt-4 mb-3'>
                            <div className='col-lg-12 col-md-12 d-flex flex-column align-items-center'>
                                <img src={`../assets/user.svg`} alt='Usuario' style={{ height: '100px', width: '100px' }} />
                            </div>
                            <div className='col-lg-12 col-md-12 mt-4 d-flex flex-column align-items-center'>
                                <h2>Usuarios II</h2>
                                <h5 className='mb-4'>(Datos Trabajo)</h5>
                                {
                                    (!clientesState2)
                                        ? (<button className='btn btn-outline-light' onClick={handleCliente2}>Preparar Reporte</button>)
                                        : (<button className='btn btn-outline-danger' onClick={handleCliente2}>Cancelar Reporte</button>)
                                }
                            </div>
                        </div>
                    </div>

                </div>


                {
                    (clientesState && listOfClientes.length !== 0)
                    &&
                    (
                        <div>

                            <hr className='mt-4' />

                            <div className='d-flex justify-content-between'>
                                <h2>Todo Listo! Exporta tu Reporte</h2>
                                <div className='mt-3'>
                                    <ReactHTMLTableToExcel
                                        id="test-table-xls-button"
                                        className="btn btn-dark ms-3"
                                        table="tablaClientes"
                                        filename="TablaClientes"
                                        sheet="clientes"
                                        buttonText="Exportar Listado de Clientes"
                                    />
                                </div>
                            </div>

                            <table className="table table-striped table-bordered table-hover text-center mt-3" id="tablaClientes" >
                                <thead className="table-dark" >
                                    <tr>
                                        <th scope="col">CUIT/CUIL</th>
                                        <th scope="col">NOMBRE</th>
                                        <th scope="col">FECHA NACIMIENTO</th>
                                        <th scope="col">ESTADO CIVIL</th>
                                        <th scope="col">TELEFONO</th>
                                        <th scope="col">TEL. ALTERNATIVO</th>
                                        <th scope="col">CORREO</th>
                                        <th scope="col">DOMICILIO</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        listOfClientes.map(cliente => (

                                            <tr key={cliente.id}>
                                                <td className='p-3'>{cliente.cuit_cuil}</td>
                                                <td className='p-3'>{cliente.apellidoyNombre}</td>
                                                <td className='p-3'>{
                                                    cliente.fNacimiento[8] + cliente.fNacimiento[9] + '/' +
                                                    cliente.fNacimiento[5] + cliente.fNacimiento[6] + '/' +
                                                    cliente.fNacimiento[0] + cliente.fNacimiento[1] + cliente.fNacimiento[2] + cliente.fNacimiento[3]
                                                }</td>
                                                <td className='p-3'>{cliente.estadoCivil}</td>
                                                <td className='p-3'>{cliente.telPropio}</td>
                                                <td className='p-3'>{cliente.telAlternativo}</td>
                                                <td className='p-3'>{cliente.correoElectronico}</td>
                                                <td className='p-3'>{cliente.domicilio}</td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                        </div>
                    )
                }

                {
                    (clientesState2 && listOfClientes.length !== 0)
                    &&
                    (
                        <div>

                            <hr className='mt-4' />

                            <div className='d-flex justify-content-between'>
                                <h2>Todo Listo! Exporta tu Reporte</h2>
                                <div className='mt-3'>
                                    <ReactHTMLTableToExcel
                                        id="test-table-xls-button"
                                        className="btn btn-dark ms-3"
                                        table="tablaClientes2"
                                        filename="TablaClientes"
                                        sheet="clientes"
                                        buttonText="Exportar Listado de Clientes"
                                    />
                                </div>
                            </div>

                            <table className="table table-striped table-bordered table-hover text-center mt-3" id="tablaClientes2" >
                                <thead className="table-dark" >
                                    <tr>
                                        <th scope="col">CUIT/CUIL</th>
                                        <th scope="col">NOMBRE</th>
                                        <th scope="col">CALL-CENTER</th>
                                        <th scope="col">CESE</th>
                                        <th scope="col">CONTRATO</th>
                                        <th scope="col">TAREA</th>
                                        <th scope="col">CAMPAÑA</th>
                                        <th scope="col">F. INGRESO</th>
                                        <th scope="col">F. EGRESO</th>
                                        <th scope="col">PERIODO</th>
                                        <th scope="col">DIAS ESP.</th>
                                        <th scope="col">HORA ESP.</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        listOfClientes.map(cliente => (

                                            <tr key={cliente.id}>
                                                <td className='p-3'>{cliente.cuit_cuil}</td>
                                                <td className='p-3'>{cliente.apellidoyNombre}</td>
                                                <td className='p-3'>{cliente.callCenter}</td>
                                                <td className='p-3'>{cliente.tipoCese}</td>
                                                <td className='p-3'>{cliente.tipoContrato}</td>
                                                <td className='p-3'>{cliente.tipoTarea}</td>
                                                <td className='p-3'>{cliente.campaña}</td>
                                                <td className='p-3'>{
                                                    cliente.fechaIngreso[8] + cliente.fechaIngreso[9] + '/' +
                                                    cliente.fechaIngreso[5] + cliente.fechaIngreso[6] + '/' +
                                                    cliente.fechaIngreso[0] + cliente.fechaIngreso[1] + cliente.fechaIngreso[2] + cliente.fechaIngreso[3]
                                                }</td>
                                                <td className='p-3'>{
                                                    cliente.fechaEgreso[8] + cliente.fechaEgreso[9] + '/' +
                                                    cliente.fechaEgreso[5] + cliente.fechaEgreso[6] + '/' +
                                                    cliente.fechaEgreso[0] + cliente.fechaEgreso[1] + cliente.fechaEgreso[2] + cliente.fechaEgreso[3]
                                                }</td>
                                                <td className='p-3'>{cliente.periodoDias}</td>
                                                <td className='p-3'>{cliente.diasEspecificos}</td>
                                                <td className='p-3'>{cliente.horaEspDesde} : {cliente.horaEspHasta}</td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                        </div>
                    )
                }

            </div>
        </div>
    )
}
