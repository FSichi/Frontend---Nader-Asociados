import React, { useState } from 'react'
import { useForm } from '../../../hooks/useForm';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../../styles.css'

export const Juicios = () => {

    const [state, setstate] = useState(false);

    const [totalFacturado, setTotalFacturado] = useState('');
    const [iva, setIva] = useState('');

    const [banderaCarga, setBanderaCarga] = useState([]);

    const [formValues, handleInputChange] = useForm({
        fechaDesde: '',
        fechaHasta: '',
    });

    const { fechaDesde, fechaHasta } = formValues;

    const handleFiltrar = () => {

        if (fechaDesde === '' || fechaHasta === '') {
            Swal.fire({
                title: 'Por favor Indica Ambas Fechas Para Poder Filtrar el Capital',
                icon: 'info',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return;
        }

        if (!state) {

            var fechas = {
                fechaDesde: new Date(fechaDesde).getTime(),
                fechaHasta: new Date(fechaHasta).getTime()
            }

            axios.get(`https://backend-nader.herokuapp.com/filtros/juicios/${fechas.fechaDesde}/${fechas.fechaHasta}`).then((resp) => {
                setTotalFacturado(resp.data[0]);
                setIva(resp.data[1]);

                setBanderaCarga(true);
            });

            Swal.fire({
                title: 'Filtrando. Espera por favor',
                timer: 1500, 
                timerProgressBar: true,
                allowOutsideClick: false,
                allowEscapeKey: false,
                didOpen: () => {
                    Swal.showLoading()
                },
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    setstate(true);
                }
            });
        }
        else {
            setstate(false);
        }

    }

    return (
        <div className='container' style={{ borderRadius: '20px' }}>

            <div className='bg-dark text-white mt-4 p-4 mb-5' style={{ borderRadius: '20px' }}>

                {/* TITULO DEL FORMULARIO */}

                <div className='text-center mt-3'>
                    <h3 className="fw-bold text-uppercase">INFORMACION DEL CAPITAL RECAUDADO - [ JUICIOS ]</h3>
                    <p className="text-white-50 fs-5">Por Favor Selecciona el Rango de Fechas para Realizar el Calculo</p>
                </div>

                <hr />

                {/* FECHAS */}

                <div className='row mt-4'>

                    {/* FECHA DESDE */}

                    <div className='col-6 d-flex justify-content-center'>

                        <div className='row'>
                            <div className='col-5 mt-2'>
                                <span className="fs-5">Fecha Desde</span>
                            </div>
                            <div className='col-7'>
                                <div className="form-outline form-white text-center">
                                    <input
                                        type="date"
                                        className="form-control form-control-lg text-center"
                                        name='fechaDesde'
                                        value={fechaDesde}
                                        onChange={handleInputChange}
                                        autoComplete='off'
                                    />
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* FECHA HASTA */}

                    <div className='col-6 d-flex justify-content-center'>

                        <div className='row'>
                            <div className='col-5 mt-2'>
                                <span className="fs-5">Fecha Hasta</span>
                            </div>
                            <div className='col-7'>
                                <div className="form-outline form-white text-center">
                                    <input
                                        type="date"
                                        className="form-control form-control-lg text-center"
                                        name='fechaHasta'
                                        value={fechaHasta}
                                        onChange={handleInputChange}
                                        autoComplete='off'
                                    />
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

                {/* BOTON DE FILTRO - CANCELAR */}

                <div>
                    {
                        (state)
                            ?
                            (
                                <div className='row mt-5'>
                                    <div className='col-12 d-flex justify-content-center'>
                                        <button className='btn btn-outline-light w-25 py-2 px-5' onClick={handleFiltrar}>Cancelar</button>
                                    </div>
                                </div>
                            )
                            :
                            (
                                <div className='row mt-5'>
                                    <div className='col-12 d-flex justify-content-center'>
                                        <button className='btn btn-outline-light w-25 py-2 px-5' onClick={handleFiltrar}>FILTRAR</button>
                                    </div>
                                </div>
                            )
                    }
                </div>


                {/* PANTALLA DE FILTRO */}

                <div>
                    {
                        (state && banderaCarga)
                        &&
                        (
                            <div>

                                <hr />

                                <div className='row mt-4 p-3'>

                                    {/* TOTAL FACTURADO */}

                                    <div className='col-6 d-flex justify-content-center'>

                                        <div className='row'>
                                            <div className='col-5 mt-2'>
                                                <span className="fs-5">Total Facturado</span>
                                            </div>
                                            <div className='col-7'>
                                                <div className="form-outline form-white text-center">

                                                    <input
                                                        type="text"
                                                        className="form-control form-control-lg text-center bg-dark text-white _numeros"
                                                        name='totalFacturado'
                                                        value={`$ ${totalFacturado}`}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    {/* IVA */}

                                    <div className='col-6 d-flex justify-content-center'>

                                        <div className='row'>
                                            <div className='col-5 mt-2'>
                                                <span className="fs-5">IVA 21%</span>
                                            </div>
                                            <div className='col-7'>
                                                <div className="form-outline form-white text-center">

                                                    <input
                                                        type="text"
                                                        className="form-control form-control-lg text-center bg-dark text-white _numeros"
                                                        name='iva'
                                                        value={`$ ${iva}`}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>
                        )
                    }
                </div>

            </div>

        </div>
    )
}
