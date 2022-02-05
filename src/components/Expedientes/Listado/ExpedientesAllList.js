import React from 'react'
import { useForm } from '../../../hooks/useForm';
import { TablaExpedientes } from './TablaExpedientes';
import { getExpedientesByNumber } from '../../../selector/Expedientes';

export const ExpedientesAllList = (expedientes) => {

    // console.log('AQUI: ', expedientes.expedientes);

    const [formValues, handleInputChange] = useForm({
        search: ''
    });

    const { search } = formValues;

    const expedientesFilter = getExpedientesByNumber(search, expedientes.expedientes);

    return (
        <div className='container-fluid'>

            {
                (expedientes.expedientes.length !== 0)
                    ?
                    (
                        <div>

                            <div className='row me-4 mt-3 d-flex justify-content-end'>

                                <div className='col-1'>
                                    <span className='fs-2'>Buscar</span>
                                </div>

                                <div className='col-4 ms-3'>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg text-center bg-dark text-white"
                                        placeholder='Nro. Expediente'
                                        name='search'
                                        value={search}
                                        onChange={handleInputChange}
                                        autoComplete='off'
                                    />
                                </div>

                            </div>

                            <div className='me-3'>

                                {
                                    (search === '')
                                    &&
                                    (
                                        <TablaExpedientes expedientes={expedientes.expedientes} />
                                    )
                                }
                                {
                                    (search !== '' && expedientesFilter.length !== 0) &&
                                    (
                                        <TablaExpedientes expedientes={expedientesFilter} />
                                    )
                                }
                                {
                                    (search !== '' && expedientesFilter.length === 0) &&
                                    (
                                        <div className='container mt-5 p-3 bg-danger' style={{ borderRadius: '20px' }}>
                                            <h2 className='text-center mt-2 fst-italic text-white'>
                                                No Existe el Expediente que buscas, verifica que los parametros sean correctos.
                                            </h2>
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                    )
                    :
                    (
                        <div className='container mt-5 p-4 bg-dark' style={{ borderRadius: '20px' }}>
                            <h2 className='text-center mt-2 fst-italic text-white'>
                                El sistema Actualmente no Posee Expedientes Registrados.
                            </h2>
                        </div>
                    )

            }

        </div>
    )
}
