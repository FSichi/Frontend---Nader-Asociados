import axios from 'axios';
import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { useForm } from '../../../../hooks/useForm';

export const ClienteCard = ({ clienteExp, cliente, expediente }) => {

    const [expedienteCliente, setExpedienteCliente] = useState(clienteExp);

    const [formValues, handleInputChange] = useForm({
        capitalReclamado: clienteExp.capitalReclamado,
        capitalOtorgado: clienteExp.capitalOtorgado,
    });

    const { capitalReclamado, capitalOtorgado } = formValues;

    const handleUpdate = () => {

        console.log(expedienteCliente);

        if(capitalOtorgado !== '' && capitalReclamado === ''){
            Swal.fire({
                title: 'No puedes dejar el Capital Reclamado sin un Valor',
                text: '',
                icon: 'info',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return
        }

        var data = {
            id: expedienteCliente.id,
            numeroExp: expedienteCliente.numeroExp,
            cuit_cuil: expedienteCliente.cuit_cuil,
            capitalReclamado: capitalReclamado,
            capitalOtorgado: capitalOtorgado,
        }

        /* LLAMAR A DB */

        axios.put(`http://localhost:3001/expedientes/expCli/${expedienteCliente.id}`, data).then((response) => {
            console.log('Estado Actualizado: ', response.data);
        });

        setExpedienteCliente(data);

        Swal.fire({
            title: 'Ficha Modificada Correctamente',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Continuar'
        });

    }

    return (
        <div className='container bg-white text-dark mt-4 mb-4 p-2' style={{ borderRadius: '10px' }}>

            <div className='row mt-2 mb-4'>

                <div className='col-4 mt-4'>
                    <div className="ms-2 me-auto fs-5">
                        <div className="fw-bold mb-1">
                            {cliente.apellidoyNombre}
                        </div>
                        {cliente.cuit_cuil}
                    </div>
                </div>

                {
                    (expediente.finalizado)
                        ?
                        (
                            <div className='col-6 mt-2'>

                                <div className='row'>
                                    <div className='col-6'>
                                        <div className="form-outline form-white text-center">
                                            <span className="fs-5">Capital Reclamado</span>
                                            <input
                                                type="text"
                                                className="form-control form-control-lg text-center mt-2 bg-secondary text-white"
                                                value={clienteExp.capitalReclamado}
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
                                                value={clienteExp.capitalOtorgado}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )
                        :
                        (
                            <div className='col-6 mt-2'>

                                <div className='row'>
                                    <div className='col-6'>
                                        <div className="form-outline form-white text-center">
                                            <span className="fs-5">Capital Reclamado</span>
                                            <input
                                                type="text"
                                                className="form-control form-control-lg text-center mt-2 bg-secondary text-white"
                                                placeholder='$ ...'
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
                                                placeholder='$...'
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

                {
                    (!expediente.finalizado)
                    &&
                    (
                        <div className='col-2 text-center mt-5'>
                            <button className='btn btn-outline-dark' onClick={handleUpdate}>Actualizar</button>
                        </div>
                    )
                }

            </div>

        </div>
    )
}
