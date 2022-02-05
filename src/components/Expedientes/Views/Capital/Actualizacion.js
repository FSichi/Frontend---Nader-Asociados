import axios from 'axios';
import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { useForm } from '../../../../hooks/useForm';

export const Actualizacion = ({ expediente, fichaCapAct }) => {

    const [fichaCapital, setFichaCapital] = useState(fichaCapAct);

    const [formValues, handleInputChange] = useForm({
        capActualizado: fichaCapital.capitalActualizado,
        honAct: fichaCapital.honorariosActualizados,
    });

    const { capActualizado, honAct } = formValues;

    const handleActualizar = () => {

        if (capActualizado === '' || honAct === '') {

            Swal.fire({
                title: 'Por favor completa todos los campos',
                icon: 'info',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return;
        }

        var data = {
            id: fichaCapital.id,
            numeroExp: fichaCapital.numeroExp,

            capitalActualizado: capActualizado,
            honorariosPCL: (parseFloat(capActualizado) * 0.20).toFixed(2).toString(),
            honorariosActualizados: honAct,
            iva: (parseFloat(honAct) * 0.21).toFixed(2).toString()
        }

        /* LLAMAR A DB */

        axios.put(`https://backend-nader.herokuapp.com/expedientes/capitales/actualizacion/${fichaCapital.id}`, data);

        setFichaCapital(data);

        Swal.fire({
            title: 'Ficha del Capital de Actualizacion Modificada Correctamente',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Continuar'
        });
    }

    return (

        <div className='container-fluid bg-dark text-white mt-2 mb-3 p-5' style={{ borderRadius: '20px' }}>

            {/* TITULO DEL FORMULARIO */}

            <div className='row text-center'>
                <div className='col-12'>
                    <h2 className="fw-bold text-uppercase">ACTUALIZACION DE CAPITAL DEL EXPEDIENTE [ {expediente.numeroExp} ]</h2>
                    <p className="text-white-50 fs-5">Por favor Completa los campos a medida que se conozca su resolucion</p>
                    <hr />
                </div>
            </div>

            {/* VALORES Y CAMPOS */}

            {
                (expediente.finalizado)
                    ?
                    (
                        <div className='row'>

                            <div className='col-3'>
                                <div className="form-outline form-white mb-4 text-center">
                                    <span className="fs-5">Capital Actualizado</span>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg text-center"
                                        value={`$ ${fichaCapital.capitalActualizado}`}
                                        disabled
                                    />
                                </div>
                            </div>

                            <div className='col-4'>
                                <div className="form-outline form-white mb-4 text-center">
                                    <span className="fs-5">Honorarios Pacto de Cuota Litis</span>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg text-center"
                                        value={`$ ${fichaCapital.honorariosPCL}`}
                                        disabled
                                    />
                                </div>
                            </div>

                            <div className='col-5'>
                                <div className='row'>

                                    <div className='col-8'>
                                        <div className="form-outline form-white mb-4 text-center">
                                            <span className="fs-5">Honorarios Actualizados</span>
                                            <input
                                                type="text"
                                                className="form-control form-control-lg text-center"
                                                value={`$ ${fichaCapital.honorariosActualizados}`}
                                                disabled
                                            />
                                        </div>
                                    </div>

                                    <div className='col-4'>
                                        <div className="form-outline form-white mb-4 text-center">
                                            <span className="fs-5">IVA 21%</span>
                                            <input
                                                type="text"
                                                className="form-control form-control-lg text-center"
                                                value={`$ ${fichaCapital.iva}`}
                                                disabled
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    )
                    :
                    (
                        <div>

                            <div className='row'>

                                {/* CAPITAL ACTUALIZADO */}

                                <div className='col-3'>
                                    <div className="form-outline form-white mb-4 text-center">
                                        <span className="fs-5">Capital Actualizado</span>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg text-center"
                                            placeholder='$ ...'
                                            name='capActualizado'
                                            value={capActualizado}
                                            onChange={handleInputChange}
                                            onKeyPress={(event) => {
                                                if (!/[0-9]/.test(event.key) && !/[.]/.test(event.key)) {
                                                    event.preventDefault();
                                                }
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* HONORARIOS PCL */}

                                <div className='col-4'>
                                    {
                                        (capActualizado === '')
                                            ?
                                            (
                                                <div>
                                                    <div className="form-outline form-white mb-4 text-center">
                                                        <span className="fs-5">Honorarios de Pacto de Cuota Litis</span>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg text-center bg-secondary text-white"
                                                            value={`$ ... `}
                                                            disabled
                                                        />
                                                    </div>
                                                </div>

                                            )
                                            :
                                            (
                                                <div>
                                                    <div className="form-outline form-white mb-4 text-center">
                                                        <span className="fs-5">Honorarios de Pacto de Cuota Litis</span>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg text-center bg-secondary text-white"
                                                            placeholder='$ ...'
                                                            name='honPCL'
                                                            value={(parseInt(capActualizado) * 0.20).toFixed(2).toString()}
                                                            disabled
                                                        />
                                                    </div>
                                                </div>

                                            )
                                    }
                                </div>

                                {/* HONORARIOS ACTUALIZADOS - IVA */}

                                <div className='col-5'>

                                    <div className='row'>

                                        {/* HON. ACTUALIZADOS */}

                                        <div className='col-8'>
                                            <div className="form-outline form-white mb-4 text-center">
                                                <span className="fs-5">Honorarios Actualizados</span>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg text-center"
                                                    placeholder='$ ...'
                                                    name='honAct'
                                                    value={honAct}
                                                    onChange={handleInputChange}
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9]/.test(event.key) && !/[.]/.test(event.key)) {
                                                            event.preventDefault();
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* IVA */}

                                        <div className='col-4 '>
                                            {
                                                (honAct === '')
                                                    ?
                                                    (
                                                        <div>
                                                            <div className="form-outline form-white mb-4 text-center">
                                                                <span className="fs-5">IVA 21%</span>
                                                                <input
                                                                    type="text"
                                                                    className="form-control form-control-lg text-center bg-secondary text-white"
                                                                    name='iv'
                                                                    value={`$ ...`}
                                                                    disabled
                                                                />
                                                            </div>
                                                        </div>
                                                    )
                                                    :
                                                    (
                                                        <div>
                                                            <div className="form-outline form-white mb-4 text-center">
                                                                <span className="fs-5">IVA 21%</span>
                                                                <input
                                                                    type="text"
                                                                    className="form-control form-control-lg text-center bg-secondary text-white"
                                                                    placeholder='$ ...'
                                                                    name='iv'
                                                                    value={(parseFloat(honAct) * 0.21).toFixed(2).toString()}
                                                                    disabled
                                                                />
                                                            </div>
                                                        </div>
                                                    )
                                            }
                                        </div>

                                    </div>

                                </div>

                            </div>

                            <hr />

                            {/* BOTON ACTUALIZAR */}

                            <div className='col-12 d-flex justify-content-center mt-4'>
                                <button className='btn btn-outline-light w-25' onClick={handleActualizar}> Actualizar Capital</button>
                            </div>

                        </div>
                    )
            }

        </div>
    )
}
