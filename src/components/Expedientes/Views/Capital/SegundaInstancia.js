import React, { useState } from 'react'
import { useForm } from '../../../../hooks/useForm';
import Swal from 'sweetalert2'
import axios from 'axios';


export const SegundaInstancia = ({ expediente, fichaCapSeg }) => {

    const [fichaCapital, setFichaCapital] = useState(fichaCapSeg);

    const [formValues, handleInputChange] = useForm({
        montoTotCon: fichaCapital.montoTotalConcedido,
        honSeg: fichaCapital.honorariosSegundaInstancia,
    });

    const { montoTotCon, honSeg } = formValues;

    const handleActualizar = () => {

        if (montoTotCon === '' || honSeg === '') {

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

            montoTotalConcedido: montoTotCon,
            honorariosPCL: (parseFloat(montoTotCon) * 0.20).toFixed(2).toString(),
            honorariosSegundaInstancia: honSeg,
            iva: (parseFloat(honSeg) * 0.21).toFixed(2).toString()
        }

        /* LLAMAR A DB */

        axios.put(`https://backend-nader-asociados.up.railway.app/expedientes/capitales/segunda/${fichaCapital.id}`, data);

        setFichaCapital(data);

        Swal.fire({
            title: 'Ficha del Capital de Segunda Instancia Modificada Correctamente',
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
                    <h2 className="fw-bold text-uppercase">CAPITAL 2° INSTANCIA DEL EXPEDIENTE [ {expediente.numeroExp} ]</h2>
                    <p className="text-white-50 fs-5">Por favor Completa los campos a medida que se conozca su resolucion</p>
                    <hr />
                </div>
            </div>

            {/* VALORES Y CAMPOS */}

            {
                (expediente.finalizado)
                    ?
                    (
                        <div>

                            <div className='row'>

                                <div className='col-3'>
                                    <div className="form-outline form-white mb-4 text-center">
                                        <span className="fs-5">Monto Total Concedido</span>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg text-center"
                                            value={`$ ${fichaCapital.montoTotalConcedido}`}
                                            disabled
                                        />
                                    </div>
                                </div>

                                <div className='col-4'>
                                    <div className="form-outline form-white mb-4 text-center">
                                        <span className="fs-5">Honorarios de Pacto de Cuota Litis</span>
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
                                                <span className="fs-5">Honorarios 2° Instancia</span>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg text-center"
                                                    value={`$ ${fichaCapital.honorariosSegundaInstancia}`}
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

                        </div>
                    )
                    :
                    (
                        <div>

                            {/* INPUTS */}

                            <div className='row'>

                                {/* MONTO TOTAL CONCEDIDO */}

                                <div className='col-3'>
                                    <div className="form-outline form-white mb-4 text-center">
                                        <span className="fs-5">Monto Total Concedido</span>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg text-center"
                                            placeholder='...'
                                            name='montoTotCon'
                                            value={montoTotCon}
                                            onChange={handleInputChange}
                                            onKeyPress={(event) => {
                                                if (!/[0-9]/.test(event.key) && !/[.]/.test(event.key)) {
                                                    event.preventDefault();
                                                }
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* HONORARIOS DE PACTO DE CUOTA LITIS */}

                                <div className='col-4'>
                                    {
                                        (montoTotCon === '')
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
                                                            value={(parseInt(montoTotCon) * 0.20).toFixed(2).toString()}
                                                            disabled
                                                        />
                                                    </div>
                                                </div>

                                            )
                                    }
                                </div>

                                {/* HONORARIOS DE SEGUNDA INSTANCIA - IVA */}

                                <div className='col-5'>

                                    <div className='row'>

                                        {/* HON 2DA */}

                                        <div className='col-8'>
                                            <div className="form-outline form-white mb-4 text-center">
                                                <span className="fs-5">Honorarios 2° Instancia</span>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg text-center"
                                                    placeholder='...'
                                                    name='honSeg'
                                                    value={honSeg}
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
                                                (honSeg === '')
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
                                                                    value={(parseFloat(honSeg) * 0.21).toFixed(2).toString()}
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
