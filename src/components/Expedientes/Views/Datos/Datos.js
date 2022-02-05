import React from 'react'

export const Datos = ({ expediente }) => {

    localStorage.setItem("ruta", `/exp/${expediente.id}`);

    return (
        
        <div className='container-fluid bg-dark text-white mt-4 mb-5 p-5' style={{ borderRadius: '20px' }}>

            <div className='row'>

                <div className='col-6'>
                    <div className="form-outline form-white mb-4 text-center">
                        <span className="fs-5">Caratula</span>
                        <input
                            type="text"
                            className="form-control form-control-lg text-center"
                            placeholder='...'
                            name='caratula'
                            value={expediente.caratula}
                            disabled
                        />
                    </div>
                </div>

                <div className='col-3'>
                    <div className="form-outline form-white mb-4 text-center">
                        <span className="fs-5">Nro. de Expediente</span>
                        <input
                            type="text"
                            className="form-control form-control-lg text-center"
                            placeholder='...'
                            name='numeroExp'
                            value={expediente.numeroExp}
                            disabled
                        />
                    </div>
                </div>

                <div className='col-3'>
                    <div className="form-outline form-white mb-4 text-center">
                        <span className="fs-5">Nro. de Juzgado</span>
                        <input
                            type="text"
                            className="form-control form-control-lg text-center"
                            placeholder='...'
                            name='juzgado'
                            value={expediente.juzgado}
                            disabled
                        />
                    </div>
                </div>

            </div>

            <div className='row mt-3'>
                <div className='col-6'>
                    <div className="form-outline form-white mb-4 text-center">
                        <span className="fs-5">Abogado Apoderado</span>
                        <input
                            type="text"
                            className="form-control form-control-lg text-center"
                            name='abogadoAp'
                            value={expediente.abogadoAp}
                            disabled
                        />
                    </div>
                </div>

                <div className='col-6'>
                    <div className="form-outline form-white mb-4 text-center">
                        <span className="fs-5">Abogado Gestor</span>
                        <input
                            type="text"
                            className="form-control form-control-lg text-center"
                            name='abogadoGs'
                            value={expediente.abogadoGs}
                            disabled
                        />
                    </div>
                </div>

            </div>

            <div className='row mt-3'>

                <div className='col-4'>
                    <div className="form-outline form-white mb-4 text-center">
                        <span className="fs-5">Capital Colectivo Reclamado</span>
                        <input
                            type="text"
                            className="form-control form-control-lg text-center"
                            name='capitalColectivoReclamado'
                            value={'$ ' + expediente.capitalColectivoReclamado}
                            disabled
                        />
                    </div>
                </div>

                <div className='col-4'>
                    <div className="form-outline form-white mb-4 text-center">
                        <span className="fs-5">Empresa Demandada</span>
                        <input
                            type="text"
                            className="form-control form-control-lg text-center"
                            name='empresaDemandada'
                            value={expediente.empresaDemandada}
                            disabled
                        />
                    </div>
                </div>

                <div className='col-4'>

                    {
                        (expediente.tipoDemanda === 'Colectiva')
                            ?
                            (
                                <div className='row'>

                                    <div className='col-8'>
                                        <div className="form-outline form-white mb-4 text-center">
                                            <span className="fs-5">Tipo de Demanda</span>
                                            <input
                                                type="text"
                                                className="form-control form-control-lg text-center"
                                                name='tipoDemanda'
                                                value={expediente.tipoDemanda}
                                                disabled
                                            />
                                        </div>
                                    </div>

                                    <div className='col-4'>
                                        <div className="form-outline form-white mb-4 text-center">
                                            <span className="fs-5">Clientes</span>
                                            <input
                                                type="text"
                                                className="form-control form-control-lg text-center "
                                                name='cantClientes'
                                                value={expediente.cantidad}
                                                disabled
                                            />
                                        </div>
                                    </div>

                                </div>
                            )
                            :
                            (
                                <div className='row'>

                                    <div className='col-12'>
                                        <div className="form-outline form-white mb-4 text-center">
                                            <span className="fs-5">Tipo de Demanda</span>
                                            <input
                                                type="text"
                                                className="form-control form-control-lg text-center"
                                                name='tipoDemanda'
                                                value={expediente.tipoDemanda}
                                                disabled
                                            />
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
