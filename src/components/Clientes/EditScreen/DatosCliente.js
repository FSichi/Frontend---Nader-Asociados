import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import Swal from 'sweetalert2'
import axios from 'axios';
import { useForm } from '../../../hooks/useForm';
import { EstadoCivil, customStyles } from '../../../helpers/AddClienteSelector'
import { getDataOrdenada, getEstadoCivilDefault } from '../../../selector/Clientes';

export const DatosCliente = ({ cliente }) => {

    const [actualizarState, setActualizarState] = useState(false);

    const [estadoCivilValue, setEstadoCivilValue] = useState({});

    useEffect(() => {
        setEstadoCivilValue(getEstadoCivilDefault(cliente));
    }, [cliente]);

    var { apellidoyNombre, cuit_cuil, fNacimiento, telPropio, telAlternativo, correoElectronico, provincia, localidad, domicilio } = cliente;

    const [formValues, handleInputChange] = useForm({
        apyNombre: apellidoyNombre,
        cc: cuit_cuil,
        fNac: fNacimiento,
        telProp: telPropio,
        telAlt: telAlternativo,
        email: correoElectronico,
        prov: provincia,
        loc: localidad,
        dom: domicilio
    });

    const { apyNombre, cc, fNac, telProp, telAlt, email, prov, loc, dom } = formValues

    const handleUpdate = () => {

        var formCli = [apellidoyNombre, cuit_cuil, fNacimiento, telPropio, telAlternativo, correoElectronico, provincia, localidad, domicilio];
        var formEdit = [apyNombre, cc, fNac, telProp, telAlt, email, prov, loc, dom];

        var data = getDataOrdenada(cliente, formCli, formEdit, estadoCivilValue.label);

        if (
            apyNombre === '' || cc === '' || fNac === '' || telProp === '' || telAlt === '' || email === '' ||
            prov === '' || loc === '' || dom === ''
        ) {

            Swal.fire({
                title: 'Por favor completa todos los campos',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return;

        }

        /* LLAMAR A LA DB */

        axios.put(`https://backend-nader.herokuapp.com/clientes/${cliente.id}`, data);

        Swal.fire({
            title: 'Cliente Modificado Correctamente',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Continuar'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.reload();
            }
        });
    }

    return (
        <div className='container-fluid bg-dark text-white p-4' style={{ borderRadius: '20px' }}>

            {
                (!actualizarState)
                    ?
                    (
                        <div>

                            <div className='ms-3 me-3 text-center'>

                                <div className='row mt-2'>

                                    <div className='col-6 '>
                                        <div className="form-outline form-white mb-4">
                                            <span className="fs-5">Nombre y Apellidos (Completo)</span>
                                            <input
                                                type="text"
                                                className="form-control form-control-lg text-center mt-2"
                                                name='apyNombre'
                                                value={apellidoyNombre}
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
                                                name='cc'
                                                value={cuit_cuil}
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
                                                name='fNac'
                                                value={fNacimiento}
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
                                                name='telProp'
                                                value={telPropio}
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
                                                name='telAlt'
                                                value={telAlternativo}
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
                                                name='email'
                                                value={correoElectronico}
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
                                                name='prov'
                                                value={provincia}
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
                                                name='loc'
                                                value={localidad}
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
                                                name='dom'
                                                value={domicilio}
                                                disabled
                                            />
                                        </div>
                                    </div>

                                </div>

                            </div>

                            <hr />

                            <div className='col-12 d-flex justify-content-center mt-2 p-3'>
                                <button className='btn btn-outline-light w-25 p-2' onClick={() => { setActualizarState(!actualizarState) }}> Actualizar Ficha del Cliente</button>
                            </div>

                        </div>

                    )
                    :
                    (
                        <div>
                            <div className='ms-3 me-3 text-center'>

                                <div className='row mt-2'>

                                    <div className='col-6 '>
                                        <div className="form-outline form-white mb-4">
                                            <span className="fs-5">Nombre y Apellidos (Completo)</span>
                                            <input
                                                type="text"
                                                className="form-control form-control-lg text-center mt-2"
                                                name='apyNombre'
                                                value={apyNombre}
                                                onChange={handleInputChange}
                                                autoComplete='off'
                                            />
                                        </div>
                                    </div>

                                    <div className='col-6'>

                                        <div className="form-outline form-white mb-4">
                                            <span className="fs-5">Cuit / Cuil</span>
                                            <input
                                                type="text"
                                                className="form-control form-control-lg text-center mt-2"
                                                name='cc'
                                                value={cc}
                                                onChange={handleInputChange}
                                                autoComplete='off'
                                            />
                                        </div>
                                    </div>

                                </div>

                                <div className='row'>

                                    <div className='col-6'>
                                        <div className="form-outline form-white mb-4">
                                            <span className="fs-5">Fecha de Nacimiento</span>
                                            <input
                                                type="date"
                                                className="form-control form-control-lg text-center mt-2"
                                                name='fNac'
                                                value={fNac}
                                                onChange={handleInputChange}
                                                autoComplete='off'
                                            />
                                        </div>
                                    </div>

                                    <div className='col-6'>
                                        <div className="form-outline form-white mb-4">
                                            <span className="fs-5">Estado Civil</span>
                                            <Select
                                                className='fw-bold text-center text-white mt-2'
                                                placeholder='...'
                                                options={EstadoCivil}
                                                onChange={setEstadoCivilValue}
                                                styles={customStyles}
                                                isSearchable={false}
                                                defaultValue={estadoCivilValue}
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
                                                name='telProp'
                                                value={telProp}
                                                onChange={handleInputChange}
                                                autoComplete='off'
                                            />
                                        </div>
                                    </div>
                                    <div className='col-4'>
                                        <div className="form-outline form-white mb-4">
                                            <span className="fs-5">Telefono Celular Alternativo</span>
                                            <input
                                                type="text"
                                                className="form-control form-control-lg text-center mt-2"
                                                name='telAlt'
                                                value={telAlt}
                                                onChange={handleInputChange}
                                                autoComplete='off'
                                            />
                                        </div>
                                    </div>
                                    <div className='col-4'>
                                        <div className="form-outline form-white mb-4">
                                            <span className="fs-5">Correo Electronico</span>
                                            <input
                                                type="email"
                                                className="form-control form-control-lg text-center mt-2"
                                                name='email'
                                                value={email}
                                                onChange={handleInputChange}
                                                autoComplete='off'
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
                                                name='prov'
                                                value={prov}
                                                onChange={handleInputChange}
                                                autoComplete='off'
                                            />
                                        </div>
                                    </div>
                                    <div className='col-6'>
                                        <div className="form-outline form-white mb-4">
                                            <span className="fs-5">Localidad</span>
                                            <input
                                                type="text"
                                                className="form-control form-control-lg text-center mt-2"
                                                name='loc'
                                                value={loc}
                                                onChange={handleInputChange}
                                                autoComplete='off'
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
                                                name='dom'
                                                value={dom}
                                                onChange={handleInputChange}
                                                autoComplete='off'
                                            />
                                        </div>
                                    </div>

                                </div>

                            </div>

                            <hr />

                            <div className='row mt-2'>
                                <div className='col-6 d-flex justify-content-center p-3'>
                                    <button className='btn btn-outline-light w-50 p-2' onClick={() => { setActualizarState(!actualizarState) }}> Cancelar Actualizacion</button>
                                </div>

                                <div className='col-6 d-flex justify-content-center p-3'>
                                    <button className='btn btn-outline-success w-50 p-2' onClick={handleUpdate}> Confirmar Actualizacion</button>
                                </div>
                            </div>

                        </div>
                    )
            }


        </div>
    )
}
