import React from 'react'

export const ExpClienteCard = ({ cliente, capitalReclamado }) => {

    return (
        <div className='container bg-dark text-white mt-4 mb-4 p-2' style={{ borderRadius: '10px' }}>

            <div className='row'>

                <div className='col-6 border-end border-secondary border-1 text-center'>
                    <div className="ms-2 me-auto fs-5 mt-2">
                        <div className="fw-bold">
                            {cliente.apellidoyNombre}
                        </div>
                        {cliente.cuit_cuil}
                    </div>
                </div>
                <div className='col-6 text-center'>
                    <div className="ms-3 me-auto fs-5 mt-2">
                        <div className="fw-bold">
                            Capital : 
                        </div>
                        $ {capitalReclamado}
                    </div>
                </div>

            </div>

        </div>
    )
}
