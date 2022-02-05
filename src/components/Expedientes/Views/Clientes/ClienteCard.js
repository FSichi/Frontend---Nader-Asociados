import React, { useEffect, useState } from 'react'
import { useForm } from '../../../../hooks/useForm';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';


export const ClienteCard = ({ expedienteCli }) => {

    const [cliente, setCliente] = useState({});
    const [expediente, setExpediente] = useState({});

    const [banderaCarga, setBanderaCarga] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:3001/general/clienteCard/${expedienteCli.cuit_cuil}`).then((resp) => {
            setCliente(resp.data[0]);
            setExpediente(resp.data[1]);
            setBanderaCarga(true);
        });
    }, [expedienteCli.cuit_cuil])

    const [formValues, handleInputChange] = useForm({
        capitalReclamado: expedienteCli.capitalReclamado,
        capitalOtorgado: expedienteCli.capitalOtorgado,
    });

    const { capitalReclamado, capitalOtorgado } = formValues;

    const handleUpdate = () => {

        if (capitalOtorgado !== '' && capitalReclamado === '') {
            Swal.fire({
                title: 'No puedes dejar el Capital Reclamado sin un Valor',
                text: '',
                icon: 'info',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });
        }

        var data = {
            id: expedienteCli.id,
            numeroExp: expedienteCli.numeroExp,
            cuit_cuil: expedienteCli.cuit_cuil,
            capitalReclamado: capitalReclamado,
            capitalOtorgado: capitalOtorgado,
        }

        axios.put(`http://localhost:3001/expedientes/expCli/${expedienteCli.id}`, data);

        Swal.fire({
            title: `Ficha de Expediente de ${cliente.apellidoyNombre} Actualizada Correctamente`,
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Continuar'
        });

    }

    return (

        <div className='container bg-white text-dark mt-4 mb-4 p-2' style={{ borderRadius: '10px' }}>

            {
                (banderaCarga)
                &&
                (
                    <div className='row mt-2 mb-4'>

                        {/* NOMBRE Y CUIT */}

                        <div className='col-3 mt-4'>
                            <div className="ms-2 me-auto fs-5">
                                <div className="fw-bold mb-1">
                                    {cliente.apellidoyNombre}
                                </div>
                                {cliente.cuit_cuil}
                            </div>
                        </div>

                        {/* INPUTS CAPITALES */}

                        {
                            (expediente.finalizado)
                                ?
                                (
                                    <div className='col-5 mt-2 ms-5'>

                                        <div className='row'>
                                            <div className='col-6'>
                                                <div className="form-outline form-white text-center">
                                                    <span className="fs-5">Capital Reclamado</span>
                                                    <input
                                                        className="form-control form-control-lg text-center mt-2 bg-secondary text-white"
                                                        type="text"
                                                        value={capitalReclamado}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className='col-6'>
                                                <div className="form-outline form-white text-center">
                                                    <span className="fs-5">Capital Otorgado</span>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-lg text-center mt-2 bg-secondary text-white"
                                                        value={capitalOtorgado}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                )
                                :
                                (
                                    <div className='col-5 mt-2 ms-5'>

                                        <div className='row'>
                                            <div className='col-6'>
                                                <div className="form-outline form-white text-center">
                                                    <span className="fs-5">Capital Reclamado</span>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-lg text-center mt-2 bg-secondary text-white"
                                                        placeholder='...'
                                                        name='capitalReclamado'
                                                        value={capitalReclamado}
                                                        onChange={handleInputChange}
                                                        autoComplete='off'
                                                        onKeyPress={(event) => {
                                                            if (!/[0-9]/.test(event.key)) {
                                                                event.preventDefault();
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className='col-6'>
                                                <div className="form-outline form-white text-center">
                                                    <span className="fs-5">Capital Otorgado</span>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-lg text-center mt-2 bg-secondary text-white"
                                                        name='capitalOtorgado'
                                                        value={capitalOtorgado}
                                                        onChange={handleInputChange}
                                                        autoComplete='off'
                                                        onKeyPress={(event) => {
                                                            if (!/[0-9]/.test(event.key)) {
                                                                event.preventDefault();
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                )
                        }


                        {/* BOTONES */}

                        {
                            (expediente.finalizado)
                                ?
                                (
                                    <div className='col-3 text-center mt-3 ms-3'>
                                        <div className='row'>
                                            <div className='col-12 mt-4'>
                                                <Link className='btn btn-outline-dark w-75' to={`/cli/${cliente.id}`}> Ir al Cliente </Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                                :
                                (
                                    <div className='col-3 text-center mt-3 ms-3'>
                                        <div className='row'>
                                            <div className='col-12'>
                                                <button className='btn btn-outline-dark w-75' onClick={handleUpdate}>Actualizar Capital</button>
                                            </div>
                                            <div className='col-12 mt-4'>
                                                <Link className='btn btn-outline-dark w-75' to={`/cli/${cliente.id}`}> Ir al Cliente </Link>
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
