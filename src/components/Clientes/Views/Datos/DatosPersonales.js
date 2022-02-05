import React from 'react'


export const DatosPersonales = ({ cliente }) => {

    return (
        <div className='container-fluid bg-dark text-white p-4' style={{ borderRadius: '20px' }}>

            <div className='ms-3 me-3 text-center'>

                <div className='row mt-2'>

                    <div className='col-6 '>
                        <div className="form-outline form-white mb-4">
                            <span className="fs-5">Nombre y Apellidos (Completo)</span>
                            <input
                                type="text"
                                className="form-control form-control-lg text-center mt-2"
                                name='apellidoyNombre'
                                value={cliente.apellidoyNombre}
                                autoComplete='off'
                                disabled
                            />
                        </div>
                    </div>

                    <div className='col-6'>

                        <div className="form-outline form-white mb-4">
                            <span className="fs-5">Cuit / Cuil</span>
                            <input
                                type="text"
                                className="form-control form-control-lg text-center mt-2"
                                name='cuit_cuil'
                                value={cliente.cuit_cuil}
                                autoComplete='off'
                                disabled
                            />
                        </div>
                    </div>

                </div>

                <div className='row'>

                    <div className='col-6'>
                        <div className="form-outline form-white mb-4">
                            <span className="fs-5">Fecha de Nacimiento</span>
                            <input
                                type="text"
                                className="form-control form-control-lg text-center mt-2"
                                name='fNacimiento'
                                value={
                                    cliente.fNacimiento[8] + cliente.fNacimiento[9] + '/' +
                                    cliente.fNacimiento[5] + cliente.fNacimiento[6] + '/' + 
                                    cliente.fNacimiento[0] + cliente.fNacimiento[1] + cliente.fNacimiento[2] + cliente.fNacimiento[3]   
                                }
                                disabled
                            />
                        </div>
                    </div>

                    <div className='col-6'>
                        <div className="form-outline form-white mb-4">
                            <span className="fs-5">Estado Civil</span>
                            <input
                                type="text"
                                className="form-control form-control-lg text-center mt-2"
                                name='estadoCivil'
                                value={cliente.estadoCivil}
                                disabled
                            />
                        </div>
                    </div>

                </div>

                <hr className='ms-5 me-5' />

                <div className='row mt-4'>
                    <div className='col-4'>
                        <div className="form-outline form-white mb-4">
                            <span className="fs-5">Telefono Celular Propio</span>
                            <input
                                type="text"
                                className="form-control form-control-lg text-center mt-2"
                                name='telefonoPropio'
                                value={cliente.telPropio}
                                disabled
                            />
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className="form-outline form-white mb-4">
                            <span className="fs-5">Telefono Celular Alternativo</span>
                            <input
                                type="text"
                                className="form-control form-control-lg text-center mt-2"
                                name='telefonoAlternativo'
                                value={cliente.telAlternativo}
                                disabled
                            />
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className="form-outline form-white mb-4">
                            <span className="fs-5">Correo Electronico</span>
                            <input
                                type="email"
                                className="form-control form-control-lg text-center mt-2"
                                name='correo'
                                value={cliente.correoElectronico}
                                disabled
                            />
                        </div>
                    </div>
                </div>

                <hr className='ms-5 me-5' />

                <div className='row'>
                    <div className='col-6'>
                        <div className="form-outline form-white mb-4">
                            <span className="fs-5">Provincia</span>
                            <input
                                type="text"
                                className="form-control form-control-lg text-center mt-2"
                                name='provincia'
                                value={cliente.provincia}
                                disabled
                            />
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className="form-outline form-white mb-4">
                            <span className="fs-5">Localidad</span>
                            <input
                                type="text"
                                className="form-control form-control-lg text-center mt-2"
                                name='localidad'
                                value={cliente.localidad}
                                disabled
                            />
                        </div>
                    </div>

                </div>

                <div className='row mt-1'>

                    <div className='col-12'>
                        <div className="form-outline form-white mb-4">
                            <span className="fs-5">Domicilio Exacto</span>
                            <input
                                type="text"
                                className="form-control form-control-lg text-center mt-2"
                                name='domicilio'
                                value={cliente.domicilio}
                                disabled
                            // style={{backgroundColor: '#3C4043'}}
                            />
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}
