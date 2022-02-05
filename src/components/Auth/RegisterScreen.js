import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Swal from "sweetalert2";
import validator from 'validator'
import { startRegisterWithEmailPasswordName } from '../../actions/auth'

export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const [securityState, setSecurityState] = useState(false);
    const [claveState, setClaveState] = useState(false);

    const [formValues, handleInputChange] = useForm({
        name: '',
        email: '',
        password: '',
        password2: '',
        claveMaestra: ''
    });

    const { name, email, password, password2, claveMaestra } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();

        if (isFormValid()) {
            dispatch(startRegisterWithEmailPasswordName(email, password, name));
        }

    }

    const isFormValid = () => {

        if (name.trim().length === 0) {

            Swal.fire({
                title: 'Se Requiere un Nombre para continuar el Registro',
                icon: 'info',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return false;

        } else if (!validator.isEmail(email)) {

            Swal.fire({
                title: 'El Email ingresado no es valido',
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return false;

        } else if (password !== password2 || password.length < 6) {

            Swal.fire({
                title: 'La contraseña debe de ser de al menos 6 caracteres y coincidir',
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return false;

        } else if (!securityState) {

            Swal.fire({
                title: 'Es necesario desbloquear el Acceso de Registro mediante una Clave Maestra',
                icon: 'info',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return false;
        }

        return true;
    }

    const handleCheckClave = () => {

        if (claveMaestra !== 'WDC99ZX-Nader') {
            Swal.fire({
                title: 'La Clave Maestra es incorrecta.',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return;
        }

        setClaveState(false);
        setSecurityState(true);
    }


    return (
        <section className="gradient-custom"> {/* vh-100 --> Estilo para centrarlo */}
            <div className="container mt-3 mb-3 vh-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                            <div className="card-body p-5 text-center">

                                <form className="mb-md-4 pb-1" onSubmit={handleRegister}>

                                    <h2 className="fw-bold mb-2 text-uppercase">Crea tu Cuenta</h2>
                                    <p className="text-white-50">Por favor Completa los siguientes campos</p>
                                    <hr />

                                    <div className="form-outline form-white mb-3">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg text-center"
                                            placeholder='Nombre y Apellido'
                                            name='name'
                                            autoComplete='off'
                                            value={name}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="form-outline form-white mb-3">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg text-center"
                                            placeholder='Correo Electronico'
                                            autoComplete='off'
                                            name='email'
                                            value={email}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="form-outline form-white mb-3">
                                        <input
                                            type="password"
                                            className="form-control form-control-lg text-center"
                                            placeholder='Contraseña'
                                            name='password'
                                            autoComplete='off'
                                            value={password}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="form-outline form-white mb-3">
                                        <input
                                            type="password"
                                            className="form-control form-control-lg text-center"
                                            placeholder='Repetir Contraseña'
                                            autoComplete='off'
                                            name='password2'
                                            value={password2}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    {
                                        (claveState)
                                        &&
                                        (
                                            <div className='row mt-4'>
                                                <hr />
                                                <div className='col-8'>
                                                    <div className="form-outline form-white mb-3">
                                                        <input
                                                            type="password"
                                                            className="form-control form-control-lg text-center"
                                                            placeholder='Clave Maestra'
                                                            autoComplete='off'
                                                            name='claveMaestra'
                                                            value={claveMaestra}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='col-3'>
                                                    <button
                                                        className="btn btn-outline-info btn-lg ms-3"
                                                        type="button"
                                                        onClick={handleCheckClave}
                                                    >
                                                        Check
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    }



                                    <div className='row d-flex justify-content-center'>
                                        <div className='col-7'>
                                            <button
                                                className="btn btn-outline-light btn-lg px-4 mt-3"
                                                type="submit">
                                                Registrarse
                                            </button>
                                        </div>
                                        <div className='col-4'>
                                            {
                                                (!securityState)
                                                    ?
                                                    (
                                                        <button
                                                            className="btn btn-warning btn-lg px-4 mt-3"
                                                            type="button"
                                                            onClick={() => { setClaveState(!claveState) }}
                                                        >
                                                            <i class="fas fa-lock"></i>
                                                        </button>
                                                    )
                                                    :
                                                    (
                                                        <button
                                                            className="btn btn-success btn-lg px-4 mt-3"
                                                            type="button"
                                                        >
                                                            <i class="fas fa-lock-open"></i>
                                                        </button>
                                                    )
                                            }

                                        </div>
                                    </div>

                                </form>

                                <div>
                                    <span className="mb-0">Ya tienes una cuenta?
                                        <Link className="fw-bold ms-2" to='/auth/login' style={{ textDecoration: 'none' }}>
                                            Inicia Sesion
                                        </Link>
                                    </span>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
