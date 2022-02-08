import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import { startLogOut } from '../../actions/auth';
import './NavBar.css'

export const Navbar = () => {

    const dispatch = useDispatch();

    const [navTogleCli, setNavTogleCli] = useState(false);
    const [navTogleExp, setNavTogleExp] = useState(false);
    const [navTogleFac, setNavTogleFac] = useState(false);
    const [navTogleHamb, setNavTogleHamb] = useState(false);

    const handleTogleCli = () => {
        setNavTogleCli(!navTogleCli);
        setNavTogleExp(false);
        setNavTogleFac(false);
    }

    const handleToglePro = () => {
        setNavTogleExp(!navTogleExp);
        setNavTogleCli(false);
        setNavTogleFac(false);
    }

    const handleTogleFac = () => {
        setNavTogleFac(!navTogleFac);
        setNavTogleCli(false);
        setNavTogleExp(false);
    }

    const handleTogleHamb = () => {
        setNavTogleHamb(!navTogleHamb);
    }

    const handleLogOut = () => {

        Swal.fire({
            title: 'Hasta Luego',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Continuar'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("ruta");
                dispatch(startLogOut());
            }
        });

    }

    return (
        <div className='container-fluid mt-3'>

            <nav className="navbar navbar-expand-md navbar-dark bg-dark nav d-none d-lg-block d-md-block" style={{ borderRadius: '20px' }}>
                <div className="container-fluid" >
                    <span className="navbar-brand">
                        <Link to='/dashboard'>
                            <img src={`../../assets/logo.svg`} alt='Logo' className='d-inline-block align-text-top' style={{ width: '50px', height: '50px' }} />
                        </Link>
                        <span className='ms-3' style={{ position: 'absolute', marginTop: '15px' }}>Nader & Asociados</span>
                    </span>
                    <button
                        className="navbar-toggler"
                        type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        onClick={handleTogleHamb}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className={navTogleHamb ? 'collapse navbar-collapse show' : 'collapse navbar-collapse'} >
                        <div className="navbar-nav me-auto mb-2 mb-lg-0">

                        </div>
                        <form className="d-flex justify-content-between itemCenter mt-md-2 mt-lg-0">
                            <div className="align-content-between">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0" onClick={handleTogleHamb}>

                                    <li className={navTogleCli ? 'nav-item dropdown show' : 'nav-item dropdown'}>
                                        <span className="nav-link dropdown-toggle" onClick={handleTogleCli}>
                                            Clientes
                                        </span>
                                        <ul className="dropdown-menu mt-4 " onClick={handleTogleCli}>
                                            <li>
                                                <Link className="dropdown-item" to='/cli/add'>
                                                    <i className="fas fa-user-plus me-2"></i>
                                                    Agregar Cliente
                                                </Link>
                                            </li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li>
                                                <Link className="dropdown-item" to='/cli/list'>
                                                    <i className="fas fa-clipboard-list me-2"></i>
                                                    Listado de Clientes
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>

                                    <li className={navTogleExp ? 'nav-item dropdown show' : 'nav-item dropdown'}>
                                        <span className="nav-link dropdown-toggle" onClick={handleToglePro}>
                                            Expedientes
                                        </span>
                                        <ul className="dropdown-menu mt-4" onClick={handleToglePro}>
                                            <li>
                                                <Link className="dropdown-item" to={`/exp/add`}>
                                                    <i className="fas fa-folder-plus me-2"></i>
                                                    Agregar Expediente
                                                </Link>
                                            </li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li>
                                                <Link className="dropdown-item" to='/exp/list'>
                                                    <i className="fas fa-database me-2"></i>
                                                    Listado de Expedientes
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>

                                    <li className={navTogleFac ? 'nav-item dropdown show' : 'nav-item dropdown'}>
                                        <span className="nav-link dropdown-toggle" onClick={handleTogleFac}>
                                            Filtros
                                        </span>
                                        <ul className="dropdown-menu mt-4" onClick={handleTogleFac}>
                                            <li>
                                                <Link className="dropdown-item" to={`/filter/clientes`}>
                                                    <i className="fas fa-users me-2"></i>
                                                    Clientes
                                                </Link>
                                            </li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li>
                                                <Link className="dropdown-item" to={`/filter/exp`}>
                                                    <i className="fas fa-gavel me-2"></i>
                                                    Expedientes
                                                </Link>
                                            </li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li>
                                                <Link className="dropdown-item" to={`/filter/capital`}>
                                                    <i className="fas fa-dollar-sign me-2"></i>
                                                    Capital
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>

                                    <li className="nav-item me-4">
                                        <Link className="nav-link" to="/reports">Reportes</Link>
                                    </li>
                                    <li className="nav-item border-start border-secondary border-2">
                                        <Link className="nav-link ms-3" to='' onClick={handleLogOut}>
                                            <i className="fas fa-sign-out-alt fs-5"></i>
                                            {/* <img src={`../../assets/logout.svg`} alt='Logout' className='d-inline-block align-text-top' style={{ width: '30px', height: '30px' }} /> */}
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </form>
                    </div>
                </div>
            </nav>

        </div>
    )
}
