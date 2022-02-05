import React from 'react'

export const DatosTrabajo = ({ cliente }) => {

    return (

        <div className='container-fluid bg-dark text-white p-4' style={{ borderRadius: '20px'  }}>

            <div className='ms-3 me-3 text-center'>

                <div className='row mt-2'>

                    <div className='col-6'>
                        <div className="form-outline form-white mb-4">
                            <span className="fs-5">Call Center</span>
                            <input
                                type="text"
                                className="form-control form-control-lg text-center mt-2"
                                name='callCenter'
                                value={cliente.callCenter}
                                disabled
                            />
                        </div>
                    </div>

                    {
                        (cliente.callCenter === 'TELEPERFORMANCE')
                        &&
                        (

                            <div className='col-6'>
                                <div className="form-outline form-white mb-4">
                                    <span className="fs-5">Sucursal</span>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg text-center mt-2"
                                        name='sucursal'
                                        value={cliente.sucursal}
                                        disabled
                                    />
                                </div>
                            </div>

                        )
                    }

                </div>

                <div className='row'>

                    <div className='col-12'>
                        <div className="form-outline form-white mb-4">
                            <span className="fs-5">Tipo de Cese de Relacion Laboral al momento de la consulta</span>
                            <input
                                type="text"
                                className="form-control form-control-lg text-center mt-2"
                                name='tipoCese'
                                value={cliente.tipoCese}
                                disabled
                            />
                        </div>
                    </div>

                </div>

                <div className='row'>

                    <div className='col-6'>
                        <div className="form-outline form-white mb-4">
                            <span className="fs-5">Tipo de Contrato</span>
                            <input
                                type="text"
                                className="form-control form-control-lg text-center mt-2"
                                name='tipoContrato'
                                value={cliente.tipoContrato}
                                disabled
                            />
                        </div>
                    </div>

                    <div className='col-6'>
                        <div className="form-outline form-white mb-4">
                            <span className="fs-5">Tarea Desempeñada</span>
                            <input
                                type="text"
                                className="form-control form-control-lg text-center mt-2"
                                name='tipoTarea'
                                value={cliente.tipotarea}
                                disabled
                            />
                        </div>
                    </div>

                </div>

                <div className="form-outline form-white mb-4">
                    <span className="fs-5">Campaña</span>
                    <input
                        type="text"
                        className="form-control form-control-lg text-center mt-2"
                        name='campaña'
                        value={cliente.campaña}
                        disabled
                    />
                </div>

                <hr className='ms-5 me-5' />

                <div className='row'>

                    <div className='col-6'>
                        <div className="form-outline form-white mb-4">
                            <span className="fs-5">Fecha de Ingreso</span>
                            <input
                                type="text"
                                className="form-control form-control-lg text-center"
                                name='fechaIngreso'
                                value={
                                    cliente.fechaIngreso[8] + cliente.fechaIngreso[9] + '/' +
                                    cliente.fechaIngreso[5] + cliente.fechaIngreso[6] + '/' + 
                                    cliente.fechaIngreso[0] + cliente.fechaIngreso[1] + cliente.fechaIngreso[2] + cliente.fechaIngreso[3]  
                                }
                                disabled
                            />

                        </div>
                    </div>

                    <div className='col-6'>
                        <div className="form-outline form-white mb-4">
                            <span className="fs-5">Fecha de Egreso</span>
                            <input
                                type="text"
                                className="form-control form-control-lg text-center"
                                name='fechaEgreso'
                                value={
                                    cliente.fechaEgreso[8] + cliente.fechaEgreso[9] + '/' +
                                    cliente.fechaEgreso[5] + cliente.fechaEgreso[6] + '/' + 
                                    cliente.fechaEgreso[0] + cliente.fechaEgreso[1] + cliente.fechaEgreso[2] + cliente.fechaEgreso[3]
                                }
                                disabled
                            />
                        </div>
                    </div>

                </div>

                <div className='row'>

                    <div className='col-6'>
                        <div className="form-outline form-white mb-4">
                            <span className="fs-5">Dias y horas de Trabajo en el Ultimo Periodo</span>
                            <input
                                type="text"
                                className="form-control form-control-lg text-center mt-2"
                                name='periodoDias'
                                value={cliente.periodoDias}
                                disabled
                            />
                        </div>
                    </div>

                    <div className='col-6'>

                        {
                            (cliente.periodoDias === 'Otra Carga Horaria')
                            &&
                            (
                                <div className='row'>

                                    <div className='col-5'>
                                        <span className="fs-5">Dias</span>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg text-center"
                                            name='otroDia'
                                            value={cliente.otroDia}
                                            disabled
                                        />
                                    </div>

                                    <div className='col-2 mt-5'>
                                        <span className="fs-5"><i className="fas fa-times"></i></span>
                                    </div>

                                    <div className='col-5'>
                                        <span className="fs-5">Horas</span>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg text-center"
                                            name='otroHora'
                                            value={cliente.otroHora}
                                            disabled
                                        />
                                    </div>

                                </div>
                            )
                        }

                    </div>

                </div>

                <hr className='ms-5 me-5' />

                <span className="fs-5">Horario Especifico</span>

                <div className='row'>

                    <div className='col-6'>
                        <div className="form-outline form-white mb-4">
                            <span className="fs-5">Dias</span>
                            <input
                                type="text"
                                className="form-control form-control-lg text-center"
                                name='diasEspecificos'
                                value={cliente.diasEspecificos}
                                disabled
                            />
                        </div>
                    </div>

                    <div className='col-6'>

                        <div className='row'>

                            <div className='col-5'>
                                <span className="fs-5">Desde</span>
                                <input
                                    type="text"
                                    className="form-control form-control-lg text-center"
                                    name='horaEspDesde'
                                    value={cliente.horaEspDesde}
                                    disabled
                                />
                            </div>

                            <div className='col-2' style={{ marginTop: '35px' }}>
                                <span className="fs-3"><i className="fas fa-grip-lines-vertical"></i></span>
                            </div>

                            <div className='col-5'>
                                <span className="fs-5">Hasta</span>
                                <input
                                    type="text"
                                    className="form-control form-control-lg text-center"
                                    name='horaEspHasta'
                                    value={cliente.horaEspHasta}
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
