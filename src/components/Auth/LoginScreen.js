import React from 'react';
import { useDispatch } from 'react-redux'
import { useForm } from '../../hooks/useForm';
import { Link } from 'react-router-dom'
// import { startLoginEmailPassword, startGoogleLogin } from '../../actions/auth'
import { startLoginEmailPassword } from '../../actions/auth'


export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [formValues, handleInputChange] = useForm({
        email: '',
        password: ''
    });

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLoginEmailPassword(email, password));
    }

/*     const handleGoogleLogin = (e) => {
        e.preventDefault();
        dispatch(startGoogleLogin());
    } */

    return (
        <section className="gradient-custom"> {/* vh-100 --> Estilo para centrarlo */}
            <div className="container mt-3 mb-3 vh-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                            <div className="card-body p-5 text-center">

                                <form className="pb-5" onSubmit={handleLogin}>

                                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                    <p className="text-white-50">Por favor Ingresa Tu correo y Contraseña</p>

                                    <hr />

                                    <div className="form-outline form-white mb-4">
                                        <input
                                            type="email"
                                            className="form-control form-control-lg text-center"
                                            placeholder='Correo Electronico'
                                            autoComplete='off'
                                            name='email'
                                            value={email}
                                            onChange={handleInputChange}
                                        />

                                    </div>

                                    <div className="form-outline form-white mb-4">
                                        <input
                                            type="password"
                                            className="form-control form-control-lg text-center"
                                            placeholder='Contraseña'
                                            autoComplete='off'
                                            name='password'
                                            value={password}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <button
                                        className="btn btn-outline-light btn-lg px-5"
                                        type="submit">Iniciar Sesion
                                    </button>

                                    {/* LOGIN CON GOOGLE */}

{/*                                     <div className='row'>
                                        <div>
                                            <button className="btn btn-outline-light btn-lg px-5 mt-4" onClick={handleGoogleLogin}>
                                                <i className="fab fa-google"></i>
                                            </button>
                                        </div>
                                    </div> */}


                                </form>

                                <div>
                                    <span className="mb-0">Aun no Tienes Cuenta?
                                        <Link className="fw-bold ms-2" to='/auth/register' style={{ textDecoration: 'none' }}>
                                            Registrate
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
