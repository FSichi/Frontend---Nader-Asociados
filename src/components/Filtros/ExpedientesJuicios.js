import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import axios from 'axios';
import { useForm } from '../../hooks/useForm';
import { TablaExpedientes } from '../Expedientes/Listado/TablaExpedientes';
import { AbogadoApoderadoFilter, AbogadoGestorFilter, CallCenterFilter, TipoDemandaFilter, customStyles } from '../../helpers/Expedientes'
import { getExpedientesByNumber, getExpedientesFilter } from '../../selector/Expedientes';

export const ExpedientesJuiciosFilter = () => {

    localStorage.setItem("ruta", `/filter/exp`);

    const [listofExpedientes, setListofExpedientes] = useState([]);
    const [expedientesShow, setExpedientesShow] = useState([]);
    const [bandera, setBandera] = useState(false);

    const [optionValueAbAp, setOptionValueAbAp] = useState({
        label: "TODOS",
        value: '1'
    });

    const [optionValueAbGs, setOptionValueAbGs] = useState({
        label: "TODOS",
        value: '1'
    });

    const [optionValueTipoDemanda, setOptionValueTipoDemanda] = useState({
        label: "TODOS",
        value: '1'
    });

    const [optionValueCallCenter, setOptionValueCallCenter] = useState({
        label: "TODOS",
        value: '1'
    });

    const [formValues, handleInputChange] = useForm({
        search: '',
        nroJuzgado: ''
    });

    const { search, nroJuzgado } = formValues;

    useEffect(() => {

        if (!bandera) {
            axios.get("https://backend-nader.herokuapp.com/general/filtros/expedientes").then((resp) => {

                setListofExpedientes(resp.data);

                setExpedientesShow(getExpedientesFilter(optionValueAbAp, optionValueAbGs, optionValueTipoDemanda, optionValueCallCenter, nroJuzgado, resp.data))

                setBandera(true);
            });
        } else {
            setExpedientesShow(getExpedientesFilter(optionValueAbAp, optionValueAbGs, optionValueTipoDemanda, optionValueCallCenter, nroJuzgado, listofExpedientes));
        }

    }, [optionValueAbAp, optionValueAbGs, optionValueCallCenter, optionValueTipoDemanda, nroJuzgado, bandera, listofExpedientes]);


    const expedientesFilter = getExpedientesByNumber(search, expedientesShow);

    return (
        <div className='container-fluid mt-5'>

            {/* FILTROS Y BUSQUEDA */}

            <div className='ms-3 me-3 bg-dark text-white p-4' style={{ borderRadius: '20px' }}>

                <div className='row ' >

                    <div className='col-3'>
                        <div className="form-outline form-white mb-4">
                            <span className="fs-5 fst-italic">Abogado Apoderado</span>
                            <Select
                                className='text-center text-white'
                                options={AbogadoApoderadoFilter}
                                onChange={setOptionValueAbAp}
                                styles={customStyles}
                                isSearchable={false}
                                defaultValue={optionValueAbAp}
                            />
                        </div>
                    </div>

                    <div className='col-3'>
                        <div className="form-outline form-white mb-4">
                            <span className="fs-5 fst-italic">Abogado Gestor</span>
                            <Select
                                className='text-center text-white'
                                options={AbogadoGestorFilter}
                                onChange={setOptionValueAbGs}
                                styles={customStyles}
                                isSearchable={false}
                                defaultValue={optionValueAbGs}
                            />
                        </div>
                    </div>

                    <div className='col-3'>
                        <div className="form-outline form-white mb-4">
                            <span className="fs-5 fst-italic">Empresa</span>
                            <Select
                                className='text-center text-white'
                                options={CallCenterFilter}
                                onChange={setOptionValueCallCenter}
                                styles={customStyles}
                                isSearchable={false}
                                defaultValue={optionValueCallCenter}
                            />
                        </div>
                    </div>

                    <div className='col-3'>
                        <div className="form-outline form-white mb-4">
                            <span className="fs-5 fst-italic">Tipo de Demanda</span>
                            <Select
                                className='text-center text-white'
                                options={TipoDemandaFilter}
                                onChange={setOptionValueTipoDemanda}
                                styles={customStyles}
                                isSearchable={false}
                                defaultValue={optionValueTipoDemanda}
                            />
                        </div>
                    </div>

                </div>

                <div className='row '>

                    <div className='col-2'>
                        <div className="form-outline form-white mb-4">
                            <span className="fs-5 fst-italic">Nro de Juzgado</span>
                            <input
                                type="text"
                                className="form-control form-control-lg text-center"
                                placeholder='Nro..'
                                name='nroJuzgado'
                                value={nroJuzgado}
                                onChange={handleInputChange}
                                autoComplete='off'
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                            />
                        </div>
                    </div>

                    {/* BUSQUEDA */}

                    <div className='col-10'>
                        <div className='row me-4 mt-4 d-flex justify-content-end'>

                            <div className='col-1'>
                                <span className='fs-2'>Buscar</span>
                            </div>

                            <div className='col-5 ms-5'>
                                <input
                                    type="text"
                                    className="form-control form-control-lg text-center bg-dark text-white"
                                    placeholder='Nro Expediente'
                                    name='search'
                                    value={search}
                                    onChange={handleInputChange}
                                    autoComplete='off'
                                />
                            </div>

                        </div>
                    </div>

                </div>

            </div>

            <hr className='ms-3 me-3' />

            {
                (listofExpedientes.length !== 0)
                    ?
                    (
                        <div>

                            {/* TABLAS DE EXPEDIENTES */}

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
                                                    <TablaExpedientes expedientes={expedientesShow} />
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
                                El sistema Actualmente no Posee Expedientes Registrados para poder realizar Filtros.
                            </h2>
                        </div>
                    )
            }


        </div>
    )
}
