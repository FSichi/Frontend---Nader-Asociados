import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Select from 'react-select';
import { useForm } from '../../hooks/useForm';
import { TablaClientes } from '../Clientes/Listado/TablaClientes';
import { TipoCeseFilter, CallCenterFilter, EstadoOperacionFilter, customStyles } from '../../helpers/AddClienteSelector'
import { getClientesByAll, getClientesFilter } from '../../selector/Clientes';

export const ClientesFilter = () => {

    localStorage.setItem("ruta", `/filter/clientes`);

    const [listofClientes, setListofClientes] = useState([]);
    const [listofEstados, setListofEstados] = useState([]);
    const [clientesShow, setClientesShow] = useState([]);
    const [bandera, setBandera] = useState(false);

    const [optionValueCall, setOptionValueCall] = useState({
        label: "TODOS",
        value: '1'
    });

    const [optionValueCese, setOptionValueCese] = useState({
        label: "TODOS",
        value: '1'
    });

    const [optionValueEstadoOp, setOptionValueEstadoOp] = useState({
        label: "TODOS",
        value: '1'
    });

    useEffect(() => {
        if (!bandera) {
            axios.get("https://backend-nader-asociados.up.railway.app/general/filtros/clientes").then((resp) => {

                setListofClientes(resp.data[0]);
                setListofEstados(resp.data[1]);

                setClientesShow(getClientesFilter(optionValueCall, optionValueCese, optionValueEstadoOp, resp.data[0], resp.data[1]));
                setBandera(true);
            });
        } else {
            setClientesShow(getClientesFilter(optionValueCall, optionValueCese, optionValueEstadoOp, listofClientes, listofEstados));
        }
    }, [optionValueCall, optionValueCese, optionValueEstadoOp, bandera, listofClientes, listofEstados])

    const [formValues, handleInputChange] = useForm({
        search: ''
    });

    const { search } = formValues;

    const clientesFilter = getClientesByAll(search, clientesShow);

    return (
        <div className='container-fluid mt-5'>

            {/* FILTROS */}

            <div className='row ms-3 me-3 bg-dark text-white p-4' style={{ borderRadius: '20px' }}>

                <div className='col-4'>
                    <div className="form-outline form-white mb-4">
                        <span className="fs-5 fst-italic">Call Center</span>
                        <Select
                            className='text-center text-white'
                            options={CallCenterFilter}
                            onChange={setOptionValueCall}
                            styles={customStyles}
                            isSearchable={false}
                            defaultValue={optionValueCall}
                        />
                    </div>
                </div>

                <div className='col-4'>
                    <div className="form-outline form-white mb-4">
                        <span className="fs-5 fst-italic">Tipo Cese</span>
                        <Select
                            className='text-center text-white'
                            options={TipoCeseFilter}
                            onChange={setOptionValueCese}
                            styles={customStyles}
                            isSearchable={false}
                            defaultValue={optionValueCese}
                        />
                    </div>
                </div>

                <div className='col-4'>
                    <div className="form-outline form-white mb-4">
                        <span className="fs-5 fst-italic">Estado Operacion</span>
                        <Select
                            className='text-center text-white'
                            options={EstadoOperacionFilter}
                            onChange={setOptionValueEstadoOp}
                            styles={customStyles}
                            isSearchable={false}
                            defaultValue={optionValueEstadoOp}
                        />
                    </div>
                </div>

                {/* BUSQUEDA */}

                <div className='row me-4 mt-3 d-flex justify-content-end'>

                    <div className='col-1'>
                        <span className='fs-2'>Buscar</span>
                    </div>

                    <div className='col-4 ms-5'>
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

            </div>

            <hr className='ms-3 me-3' />

            {
                (listofClientes.length !== 0)
                    ?
                    (
                        <div>

                            {/* TABLAS DE CLIENTE */}

                            <div className='me-3 ms-3'>

                                {
                                    (bandera)
                                    &&
                                    (
                                        <div>
                                            {
                                                (search === '')
                                                &&
                                                (
                                                    <TablaClientes clientes={clientesShow} />
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
                                    )
                                }

                            </div>

                        </div>
                    )
                    :
                    (
                        <div className='container mt-5 p-4 bg-dark' style={{ borderRadius: '20px' }}>
                            <h2 className='text-center mt-2 fst-italic text-white'>
                                El sistema Actualmente no Posee Clientes Registrados para poder realizar Filtros.
                            </h2>
                        </div>
                    )
            }

        </div>
    )
}
