import React, { useState } from 'react'
import Select from 'react-select';
import { EstadoSecretaria, customStyles } from '../../../../helpers/Expedientes'
import Swal from 'sweetalert2';
import { getLabelSecretaria } from '../../../../selector/Expedientes';


export const SecretariaEstado = ({ fichaSecretaria }) => {

    const [fichaSec, setFichaSec] = useState(fichaSecretaria);
    const [optionValueEstado, setOptionValueEstado] = useState(getLabelSecretaria(fichaSecretaria));

    const handleActualizarEstado = () => {
        
        if(optionValueEstado.label !== 'Completado'){

            Swal.fire({
                title: 'Por Favor Seleccione el Estado Completado para Finalizar la Ficha de Secretaria',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return;
        }
    }

    return (

        <div className='container-fluid mt-2 bg-dark text-white p-4' style={{ borderRadius: '20px' }}>

            {/* TITULO DEL FORMULARIO */}

            <div className='text-center mt-3'>
                <h2 className="fw-bold text-uppercase">ESTADO DE LA FICHA DE SECRETARIA</h2>
                <p className="text-white-50 fs-5">Por Favor Completa el Estado de la Ficha Cuando Corresponda</p>
            </div>

            {/* SELECCIONAR ESTADO */}

            <hr />

            {
                (!fichaSec.estado)
                &&
                (
                    <div className='row mt-5 d-flex justify-content-center mb-5'>
                        <div className='col-6 mt-3'>
                            <h4>No hay Acuerdo ? </h4>
                        </div>
                        <div className='col-4'>
                            <button className='btn btn-outline-info w-100 p-3'> Cambiar a Juicio </button>
                        </div>
                    </div>
                )
            }

            {
                (fichaSec.estado)
                    ?
                    (
                        <div className='row mt-5 d-flex justify-content-center mb-5'>
                            <div className='col-4 mt-3'>
                                <h4>Estado del Expediente</h4>
                            </div>
                            <div className='col-4'>
                                <div className="form-outline form-white mb-4 text-center">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg text-center bg-dark text-white mt-2"
                                        value={`Completado`}
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                    )
                    :
                    (
                        <div className='row mt-5 d-flex justify-content-center mb-5'>
                            <div className='col-6 mt-2'>
                                <h4>Seleccionar Estado del Expediente</h4>
                            </div>
                            <div className='col-4'>
                                <Select
                                    className='fw-bold text-center text-white'
                                    options={EstadoSecretaria}
                                    onChange={setOptionValueEstado}
                                    styles={customStyles}
                                    isSearchable={false}
                                    defaultValue={optionValueEstado}
                                />
                            </div>
                        </div>
                    )
            }


            {
                (!fichaSec.estado)
                &&
                (
                    <div>
                        <hr />
                        <div className='col-12 d-flex justify-content-center mt-4'>
                            <button className='btn btn-outline-light w-25 p-2' onClick={handleActualizarEstado}> Actualizar Estado</button>
                        </div>
                    </div>

                )
            }

        </div>
    )
}
