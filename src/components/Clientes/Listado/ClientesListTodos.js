import React, { useEffect, useState } from 'react'
import { useForm } from '../../../hooks/useForm';
import { getClientesByAll } from '../../../selector/Clientes';
import { TablaClientes } from './TablaClientes';
import axios from 'axios';

export const ClientesListTodos = () => {

    const [listClientes, setListClientes] = useState([]);

    useEffect(() => {

        axios.get("http://localhost:3001/clientes").then((response) => {
            setListClientes(response.data)
        });

    }, []);

    const [formValues, handleInputChange] = useForm({
        search: ''
    });

    const { search } = formValues;

    const clientesFilter = getClientesByAll(search, listClientes);

    return (
        <div className='container-fluid'>

            {
                (listClientes.length !== 0)
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
                                        placeholder='Nombre / Cuil-Cuit'
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
                                        <TablaClientes clientes={listClientes} />
                                    )
                                }
                                {
                                    (search !== '' && clientesFilter.length !== 0) &&
                                    (
                                        <TablaClientes clientes={clientesFilter} />
                                    )
                                }
                                {
                                    (search !== '' && clientesFilter.length === 0) &&
                                    (
                                        <div className='container mt-5 p-3 bg-danger' style={{ borderRadius: '20px' }}>
                                            <h2 className='text-center mt-2 fst-italic text-white'>
                                                No Existe el cliente que buscas
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
                                El sistema Actualmente no Posee Clientes Registrados..
                            </h2>
                        </div>
                    )

            }

        </div>
    )
}
