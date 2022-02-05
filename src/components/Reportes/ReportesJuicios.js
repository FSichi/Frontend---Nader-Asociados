import React, { useEffect, useState } from 'react'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { getFichasSecretaria } from '../../selector/Expedientes';
import Swal from 'sweetalert2'
import axios from 'axios';


export const ReportesJuicios = () => {

    const [listOfJuicios, setListOfJuicios] = useState([]);
    const [expedientesState, setExpedienteState] = useState(false);

    const [fichasSecretaria, setfichasSecretaria] = useState([]);
    const [secretariaState, setSecretariaState] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:3001/expedientes").then((resp) => {
            setListOfJuicios(resp.data)
        });
        axios.get("http://localhost:3001/general/reportes/secretaria").then((resp) => {
            setfichasSecretaria(getFichasSecretaria(resp.data[0], resp.data[1]));
        });
    }, []);

    const handleExpediente = () => {

        setSecretariaState(false);
        setExpedienteState(!expedientesState);

        if (listOfJuicios.length === 0) {
            Swal.fire({
                title: 'El Sistema no Posee Registros de Expedientes de Juicios.',
                text: 'Si piensas que es un error, por favor comunicate con un administrador',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar'
            });

            setExpedienteState(false);
        }
    }

    const handleSecretaria = () => {

        setExpedienteState(false);
        setSecretariaState(!secretariaState);

        if (fichasSecretaria.length === 0) {

            Swal.fire({
                title: 'El Sistema no Posee Registros de Clientes en Secretaria.',
                text: 'Si piensas que es un error, por favor comunicate con un administrador',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar'
            });

            setSecretariaState(false);
        }
    }

    return (

        <div className='container-fluid'>

            <div className='me-5 ms-5'>

                {/* CARDS */}

                <div className='row d-flex justify-content-center'>

                    {/* DATOS JUCIOS */}

                    <div className='col-lg-3 col-md-3 bg-dark text-white mt-3 me-5' style={{ borderRadius: '10px' }}>
                        <div className='row mt-4 mb-3'>
                            <div className='col-lg-12 col-md-12 d-flex flex-column align-items-center'>
                                <img src={`../assets/juicios.svg`} alt='Usuario' style={{ height: '100px', width: '100px' }} />
                            </div>
                            <div className='col-lg-12 col-md-12 mt-4 d-flex flex-column align-items-center'>
                                <h2>Expedientes</h2>
                                <h5 className='mb-4'>( Juicios )</h5>
                                {
                                    (!expedientesState)
                                        ? (<button className='btn btn-outline-light' onClick={handleExpediente}>Preparar Reporte</button>)
                                        : (<button className='btn btn-outline-danger' onClick={handleExpediente}>Cancelar Reporte</button>)
                                }
                            </div>
                        </div>
                    </div>

                    {/* DATOS SECRETARIA */}

                    <div className='col-lg-3 col-md-3 bg-dark text-white mt-3 ms-5' style={{ borderRadius: '10px' }}>
                        <div className='row mt-4 mb-3'>
                            <div className='col-lg-12 col-md-12 d-flex flex-column align-items-center'>
                                <img src={`../assets/juicios2.svg`} alt='Usuario' style={{ height: '100px', width: '100px' }} />
                            </div>
                            <div className='col-lg-12 col-md-12 mt-4 d-flex flex-column align-items-center'>
                                <h2 className='text-center'>Expedientes</h2>
                                <h5 className='mb-4'>( Secretaria )</h5>
                                {
                                    (!secretariaState)
                                        ? (<button className='btn btn-outline-light' onClick={handleSecretaria}>Preparar Reporte</button>)
                                        : (<button className='btn btn-outline-danger' onClick={handleSecretaria}>Cancelar Reporte</button>)
                                }
                            </div>
                        </div>
                    </div>

                </div>


                {
                    (expedientesState && listOfJuicios.length !== 0)
                    &&
                    (
                        <div>

                            <hr className='mt-4' />

                            <div className='d-flex justify-content-between mb-4'>
                                <h2>Todo Listo! Exporta tu Reporte</h2>
                                <div className='mt-2'>
                                    <ReactHTMLTableToExcel
                                        id="test-table-xls-button"
                                        className="btn btn-dark ms-3"
                                        table="tablaExpedientes"
                                        filename="TablaDatosEstadisticosExpedientes"
                                        sheet="Expedientes"
                                        buttonText="Exportar Listado de Expedientes"
                                    />
                                </div>
                            </div>

                            <table className="table table-striped table-bordered table-hover text-center mt-3" id="tablaExpedientes" >
                                <thead className="table-dark" >
                                    <tr>
                                        <th scope="col">CARATULA</th>
                                        <th scope="col">NUMERO EXPEDIENTE</th>
                                        <th scope="col">NRO. JUZGADO</th>
                                        <th scope="col">AB. APODERADO</th>
                                        <th scope="col">AB. GESTOR</th>
                                        <th scope="col">CAPITAL RECLAMADO</th>
                                        <th scope="col">EMPRESA DEMANDADA</th>
                                        <th scope="col">TIPO DE DEMANDA</th>
                                        <th scope="col">CANT. DE CLIENTES</th>
                                        <th scope="col">ESTADO</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        listOfJuicios.map(expediente => (

                                            <tr key={expediente.id}>
                                                <td className='p-3'>{expediente.caratula}</td>
                                                <td className='p-3'>{expediente.numeroExp}</td>
                                                <td className='p-3'>{expediente.juzgado}</td>
                                                <td className='p-3'>{expediente.abogadoAp}</td>
                                                <td className='p-3'>{expediente.abogadoGs}</td>
                                                <td className='p-3'>{expediente.capitalColectivoReclamado}</td>
                                                <td className='p-3'>{expediente.empresaDemandada}</td>
                                                <td className='p-3'>{expediente.tipoDemanda}</td>
                                                <td className='p-3'>{expediente.cantidad}</td>
                                                {
                                                    (expediente.finalizado)
                                                        ?
                                                        (
                                                            <td className='p-3'>Completado</td>
                                                        )
                                                        :
                                                        (
                                                            <td className='p-3'>En Proceso</td>
                                                        )
                                                }
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                        </div>
                    )
                }

                {
                    (secretariaState && fichasSecretaria.length !== 0)
                    &&
                    (
                        <div>

                            <hr className='mt-4' />

                            <div className='d-flex justify-content-between mb-4'>
                                <h2>Todo Listo! Exporta tu Reporte</h2>
                                <div className='mt-2'>
                                    <ReactHTMLTableToExcel
                                        id="test-table-xls-button"
                                        className="btn btn-dark ms-3"
                                        table="tablaFichasSecretaria"
                                        filename="TablaFichaSecretaria"
                                        sheet="fichas"
                                        buttonText="Exportar Listado de Secretaria"
                                    />
                                </div>
                            </div>

                            <table className="table table-striped table-bordered table-hover text-center mt-3" id="tablaFichasSecretaria" >
                                <thead className="table-dark" >
                                    <tr>
                                        <th scope="col">CUIT/CUIL</th>
                                        <th scope="col">NOMBRE</th>
                                        <th scope="col">CALLCENTER</th>
                                        <th scope="col">CAMPAÑA</th>
                                        <th scope="col">DENUNCIA</th>
                                        <th scope="col">FECHA DE AUDIENCIA</th>
                                        <th scope="col">ACUERDO</th>
                                        <th scope="col">CAPITAL TRABAJADOR</th>
                                        <th scope="col">HONORARIOS PCL</th>
                                        <th scope="col">HONORARIOS CONVENIDOS</th>
                                        <th scope="col">ESTADO</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        fichasSecretaria.map(ficha => (

                                            <tr key={ficha.cliente.id}>

                                                <td className='p-3'>{ficha.cliente.cuit_cuil}</td>
                                                <td className='p-3'>{ficha.cliente.apellidoyNombre}</td>
                                                <td className='p-3'>{ficha.cliente.callCenter}</td>
                                                <td className='p-3'>{ficha.cliente.campaña}</td>

                                                {
                                                    (ficha.ficha.tieneDenuncia)
                                                        ?
                                                        (
                                                            <td className='p-3'>
                                                                Si
                                                            </td>
                                                        )
                                                        :
                                                        (
                                                            <td className='p-3'>
                                                                No
                                                            </td>
                                                        )
                                                }

                                                {
                                                    (ficha.ficha.fechaAudiencia !== '')
                                                        ?
                                                        (
                                                            <td className='p-3'>
                                                                {
                                                                    ficha.ficha.fechaAudiencia[8] + ficha.ficha.fechaAudiencia[9] + '/' +
                                                                    ficha.ficha.fechaAudiencia[5] + ficha.ficha.fechaAudiencia[6] + '/' +
                                                                    ficha.ficha.fechaAudiencia[0] + ficha.ficha.fechaAudiencia[1] + ficha.ficha.fechaAudiencia[2] + ficha.ficha.fechaAudiencia[3]
                                                                }
                                                            </td>
                                                        )
                                                        :
                                                        (
                                                            <td className='p-3'>
                                                                -
                                                            </td>
                                                        )
                                                }


                                                {
                                                    (ficha.ficha.hayAcuerdo)
                                                        ?
                                                        (
                                                            <td className='p-3'>
                                                                Si
                                                            </td>
                                                        )
                                                        :
                                                        (
                                                            <td className='p-3'>
                                                                No
                                                            </td>
                                                        )
                                                }

                                                {
                                                    (ficha.ficha.capitalTrabajador !== '')
                                                        ?
                                                        (
                                                            <td className='p-3'>{ficha.ficha.capitalTrabajador}</td>

                                                        )
                                                        :
                                                        (
                                                            <td className='p-3'> - </td>

                                                        )
                                                }

                                                {
                                                    (ficha.ficha.honorariosPCL !== '')
                                                        ?
                                                        (
                                                            <td className='p-3'>{ficha.ficha.honorariosPCL}</td>

                                                        )
                                                        :
                                                        (
                                                            <td className='p-3'> - </td>

                                                        )
                                                }

                                                {
                                                    (ficha.ficha.honorariosConvenidos !== '')
                                                        ?
                                                        (
                                                            <td className='p-3'>{ficha.ficha.honorariosConvenidos}</td>

                                                        )
                                                        :
                                                        (
                                                            <td className='p-3'> - </td>

                                                        )
                                                }


                                                {
                                                    (ficha.ficha.estado)
                                                        ?
                                                        (
                                                            <td className='p-3'>
                                                                Completado
                                                            </td>
                                                        )
                                                        :
                                                        (
                                                            <td className='p-3'>
                                                                En Proceso
                                                            </td>
                                                        )
                                                }

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
