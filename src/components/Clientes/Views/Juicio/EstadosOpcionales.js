import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'
import Select from 'react-select';
import { useForm } from '../../../../hooks/useForm';
import { EstadosOpcionalesSelect, customStyles } from '../../../../helpers/JuiciosSelector'

export const EstadosOpcionales = ({ expediente }) => {

    const [estadosJuicio, setEstadosJuicio] = useState({});
    const [fechasJuicio, setFechasJuicio] = useState({});
    const [expCapitales, setExpCapitales] = useState({});
    const [estadosJuicioObligatorios, setEstadosJuicioObligatorios] = useState({});

    const [banderaCarga, setBanderaCarga] = useState(false);

    useEffect(() => {

        axios.get(`https://backend-nader.herokuapp.com/expedientes/capitales/ind?data=${expediente.numeroExp}`).then((resp) => {
            setExpCapitales(resp.data);
        });

        axios.get(`https://backend-nader.herokuapp.com/general/juiciosOpcionales?data=${expediente.numeroExp}`).then((resp) => {
            setEstadosJuicio(resp.data[0]);
            setFechasJuicio(resp.data[1]);
            setEstadosJuicioObligatorios(resp.data[2]);

            setBanderaCarga(true);
        });

    }, [expediente.numeroExp]);

    const [formValues, handleInputChange] = useForm({
        fechaInicioEmbargo: '',
        fechaInicioApelacion: '',
        fechaInicioExpresionAgravios: '',
        fechaInicioRecursosAclaratoria: '',
        fechaInicioSentenciaSegInstancia: '',
        fechaInicioActualizacion: '',
    });

    const {
        fechaInicioEmbargo,
        fechaInicioApelacion,
        fechaInicioExpresionAgravios,
        fechaInicioRecursosAclaratoria,
        fechaInicioSentenciaSegInstancia,
        fechaInicioActualizacion
    } = formValues;

    const [optionValueEstado, setOptionValueEstado] = useState({
        label: "Embargo",
        value: '1'
    });

    const handleEmbargo = () => {

        if (fechaInicioEmbargo === '') {

            Swal.fire({
                title: 'Por favor Indica la Fecha de Inicio de `Embargo` para continuar',
                text: '',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return
        }

        var dataEstado = {
            id: estadosJuicio.id,
            numeroExp: estadosJuicio.numeroExp,

            embargo: true,
            apelacion: estadosJuicio.apelacion,
            expresionAgravios: estadosJuicio.expresionAgravios,
            recursosAclaratoria: estadosJuicio.recursosAclaratoria,
            sentenciaSegundaInstancia: estadosJuicio.sentenciaSegundaInstancia,
            actualizacion: estadosJuicio.actualizacion,
        }

        var dataFechas = {
            id: fechasJuicio.id,
            numeroExp: fechasJuicio.numeroExp,

            fechaEmbargo: fechaInicioEmbargo,
            fechaApelacion: fechasJuicio.fechaApelacion,
            fechaExpresionAgravios: fechasJuicio.fechaExpresionAgravios,
            fechaRecursosAclaratoria: fechasJuicio.fechaRecursosAclaratoria,
            fechaSentenciaSegundaInstancia: fechasJuicio.fechaSentenciaSegundaInstancia,
            fechaActualizacion: fechasJuicio.fechaActualizacion,
        }

        /* LLAMAR A DB */

        axios.put(`https://backend-nader.herokuapp.com/juicios/opcional/estado/${estadosJuicio.id}`, dataEstado);

        axios.put(`https://backend-nader.herokuapp.com/juicios/opcional/fechas/${fechasJuicio.id}`, dataFechas);

        setEstadosJuicio(dataEstado);
        setFechasJuicio(dataFechas);

        Swal.fire({
            title: 'Estado del Juicio Modificado Correctamente',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Continuar'
        });
    }

    const handleApelacion = () => {

        if (fechaInicioApelacion === '') {

            Swal.fire({
                title: 'Por favor Indica la Fecha de Inicio de `Apelacion` para continuar',
                text: '',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return
        }

        var dataEstado = {
            id: estadosJuicio.id,
            numeroExp: estadosJuicio.numeroExp,

            embargo: estadosJuicio.embargo,
            apelacion: true,
            expresionAgravios: estadosJuicio.expresionAgravios,
            recursosAclaratoria: estadosJuicio.recursosAclaratoria,
            sentenciaSegundaInstancia: estadosJuicio.sentenciaSegundaInstancia,
            actualizacion: estadosJuicio.actualizacion,
        }

        var dataFechas = {
            id: fechasJuicio.id,
            numeroExp: fechasJuicio.numeroExp,

            fechaEmbargo: fechasJuicio.fechaEmbargo,
            fechaApelacion: fechaInicioApelacion,
            fechaExpresionAgravios: fechasJuicio.fechaExpresionAgravios,
            fechaRecursosAclaratoria: fechasJuicio.fechaRecursosAclaratoria,
            fechaSentenciaSegundaInstancia: fechasJuicio.fechaSentenciaSegundaInstancia,
            fechaActualizacion: fechasJuicio.fechaActualizacion,
        }

        /* LLAMAR A DB */

        axios.put(`https://backend-nader.herokuapp.com/juicios/opcional/estado/${estadosJuicio.id}`, dataEstado);

        axios.put(`https://backend-nader.herokuapp.com/juicios/opcional/fechas/${fechasJuicio.id}`, dataFechas);

        setEstadosJuicio(dataEstado);
        setFechasJuicio(dataFechas);

        Swal.fire({
            title: 'Estado del Juicio Modificado Correctamente',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Continuar'
        });

    }

    const handleExpresionAg = () => {

        if (fechaInicioExpresionAgravios === '') {

            Swal.fire({
                title: 'Por favor Indica la Fecha de Inicio de `Expresion de Agravios` para continuar',
                text: '',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return
        }

        var dataEstado = {
            id: estadosJuicio.id,
            numeroExp: estadosJuicio.numeroExp,

            embargo: estadosJuicio.embargo,
            apelacion: estadosJuicio.apelacion,
            expresionAgravios: true,
            recursosAclaratoria: estadosJuicio.recursosAclaratoria,
            sentenciaSegundaInstancia: estadosJuicio.sentenciaSegundaInstancia,
            actualizacion: estadosJuicio.actualizacion,
        }

        var dataFechas = {
            id: fechasJuicio.id,
            numeroExp: fechasJuicio.numeroExp,

            fechaEmbargo: fechasJuicio.fechaEmbargo,
            fechaApelacion: fechasJuicio.fechaApelacion,
            fechaExpresionAgravios: fechaInicioExpresionAgravios,
            fechaRecursosAclaratoria: fechasJuicio.fechaRecursosAclaratoria,
            fechaSentenciaSegundaInstancia: fechasJuicio.fechaSentenciaSegundaInstancia,
            fechaActualizacion: fechasJuicio.fechaActualizacion,
        }

        /* LLAMAR A DB */

        axios.put(`https://backend-nader.herokuapp.com/juicios/opcional/estado/${estadosJuicio.id}`, dataEstado);

        axios.put(`https://backend-nader.herokuapp.com/juicios/opcional/fechas/${fechasJuicio.id}`, dataFechas);

        setEstadosJuicio(dataEstado);
        setFechasJuicio(dataFechas);

        Swal.fire({
            title: 'Estado del Juicio Modificado Correctamente',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Continuar'
        });
    }

    const handleRecursosAc = () => {

        if (fechaInicioRecursosAclaratoria === '') {

            Swal.fire({
                title: 'Por favor Indica la Fecha de Inicio de `Recursos de Aclaratoria` para continuar',
                text: '',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return
        }

        var dataEstado = {
            id: estadosJuicio.id,
            numeroExp: estadosJuicio.numeroExp,

            embargo: estadosJuicio.embargo,
            apelacion: estadosJuicio.apelacion,
            expresionAgravios: estadosJuicio.expresionAgravios,
            recursosAclaratoria: true,
            sentenciaSegundaInstancia: estadosJuicio.sentenciaSegundaInstancia,
            actualizacion: estadosJuicio.actualizacion,
        }

        var dataFechas = {
            id: fechasJuicio.id,
            numeroExp: fechasJuicio.numeroExp,

            fechaEmbargo: fechasJuicio.fechaEmbargo,
            fechaApelacion: fechasJuicio.fechaApelacion,
            fechaExpresionAgravios: fechasJuicio.fechaExpresionAgravios,
            fechaRecursosAclaratoria: fechaInicioRecursosAclaratoria,
            fechaSentenciaSegundaInstancia: fechasJuicio.fechaSentenciaSegundaInstancia,
            fechaActualizacion: fechasJuicio.fechaActualizacion,
        }

        /* LLAMAR A DB */

        axios.put(`https://backend-nader.herokuapp.com/juicios/opcional/estado/${estadosJuicio.id}`, dataEstado);

        axios.put(`https://backend-nader.herokuapp.com/juicios/opcional/fechas/${fechasJuicio.id}`, dataFechas);

        setEstadosJuicio(dataEstado);
        setFechasJuicio(dataFechas);

        Swal.fire({
            title: 'Estado del Juicio Modificado Correctamente',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Continuar'
        });
    }

    const handleSentenciaSeg = () => {

        if (fechaInicioSentenciaSegInstancia === '') {

            Swal.fire({
                title: 'Por favor Indica la Fecha de Inicio de `Sentencia de 2da Instancia` para continuar',
                text: '',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return
        }

        if (!estadosJuicioObligatorios.sentenciaPrimeraInstancia) {
            Swal.fire({
                title: 'Para poder completar este estado al menos debes completar la Sentencia de Primera Instancia.',
                text: 'Por favor, ve a los Estados obligatorios del Juicio y completa el Estado requerido.',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return
        }

        var dataEstado = {
            id: estadosJuicio.id,
            numeroExp: estadosJuicio.numeroExp,

            embargo: estadosJuicio.embargo,
            apelacion: estadosJuicio.apelacion,
            expresionAgravios: estadosJuicio.expresionAgravios,
            recursosAclaratoria: estadosJuicio.recursosAclaratoria,
            sentenciaSegundaInstancia: true,
            actualizacion: estadosJuicio.actualizacion,
        }

        var dataFechas = {
            id: fechasJuicio.id,
            numeroExp: fechasJuicio.numeroExp,

            fechaEmbargo: fechasJuicio.fechaEmbargo,
            fechaApelacion: fechasJuicio.fechaApelacion,
            fechaExpresionAgravios: fechasJuicio.fechaExpresionAgravios,
            fechaRecursosAclaratoria: fechasJuicio.fechaRecursosAclaratoria,
            fechaSentenciaSegundaInstancia: fechaInicioSentenciaSegInstancia,
            fechaActualizacion: fechasJuicio.fechaActualizacion
        }

        /* CREAR DATOS DE EL EXPEDIENTE CAPITAL SEGUNDA */

        var expediente_capitalSegunda = {

            numeroExp: expediente.numeroExp,
            montoTotalConcedido: '',
            honorariosPCL: '',
            honorariosSegundaInstancia: '',
            iva: '',
        }

        /* EDITAR DATOS DE EXPEDIENTES_CAPITALES */

        var expediente_capitales = {
            id: expCapitales.id,
            numeroExp: expCapitales.numeroExp,

            capitalPrimera: expCapitales.capitalPrimera,
            capitalSegunda: true,
            capitalActualizacion: expCapitales.capitalActualizacion
        }

        /* LLAMAR A DB */

        axios.put(`https://backend-nader.herokuapp.com/juicios/opcional/estado/${estadosJuicio.id}`, dataEstado);

        axios.put(`https://backend-nader.herokuapp.com/juicios/opcional/fechas/${fechasJuicio.id}`, dataFechas);

        axios.post(`https://backend-nader.herokuapp.com/expedientes/capitales/segunda`, expediente_capitalSegunda).then((response) => {
            console.log('Capital Segunda Creado: ', response.data);
        });

        axios.put(`https://backend-nader.herokuapp.com/expedientes/capitales/${expCapitales.id}`, expediente_capitales);

        setEstadosJuicio(dataEstado);
        setFechasJuicio(dataFechas);
        setExpCapitales(expediente_capitales);

        Swal.fire({
            title: 'Estado del Juicio Modificado Correctamente',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Continuar'
        });

    }

    const handleActualizacion = () => {

        if (fechaInicioActualizacion === '') {

            Swal.fire({
                title: 'Por favor Indica la Fecha de Inicio de `Actualizacion` para continuar',
                text: '',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return
        }

        if (!estadosJuicioObligatorios.sentenciaPrimeraInstancia) {
            Swal.fire({
                title: 'Para poder completar este estado al menos debes completar la Sentencia de Primera Instancia.',
                text: 'Por favor, ve a los Estados obligatorios del Juicio y completa el Estado requerido.',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return
        }

        if (!estadosJuicio.sentenciaSegundaInstancia) {

            Swal.fire({
                title: 'Para poder completar este estado debes completar la Sentencia de Segunda Instancia.',
                text: 'Por favor, ve a los Estados opcionales del Juicio y completa el Estado requerido.',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return
        }

        var dataEstado = {
            id: estadosJuicio.id,
            numeroExp: estadosJuicio.numeroExp,

            embargo: estadosJuicio.embargo,
            apelacion: estadosJuicio.apelacion,
            expresionAgravios: estadosJuicio.expresionAgravios,
            recursosAclaratoria: estadosJuicio.recursosAclaratoria,
            sentenciaSegundaInstancia: estadosJuicio.sentenciaSegundaInstancia,
            actualizacion: true,
        }

        var dataFechas = {
            id: fechasJuicio.id,
            numeroExp: fechasJuicio.numeroExp,

            fechaEmbargo: fechasJuicio.fechaEmbargo,
            fechaApelacion: fechasJuicio.fechaApelacion,
            fechaExpresionAgravios: fechasJuicio.fechaExpresionAgravios,
            fechaRecursosAclaratoria: fechasJuicio.fechaRecursosAclaratoria,
            fechaSentenciaSegundaInstancia: fechasJuicio.fechaSentenciaSegundaInstancia,
            fechaActualizacion: fechaInicioActualizacion,
        }

        /* CREAR DATOS DE EL EXPEDIENTE CAPITAL ACTUALIZACION */

        var expediente_capitalActualizacion = {

            numeroExp: expediente.numeroExp,
            capitalActualizado: '',
            honorariosPCL: '',
            honorariosActualizados: '',
            iva: ''
        }

        /* EDITAR DATOS DE EXPEDIENTES_CAPITALES */

        var expediente_capitales = {
            id: expCapitales.id,
            numeroExp: expCapitales.numeroExp,

            capitalPrimera: expCapitales.capitalPrimera,
            capitalSegunda: expCapitales.capitalSegunda,
            capitalActualizacion: true
        }

        /* LLAMAR A DB */

        axios.put(`https://backend-nader.herokuapp.com/juicios/opcional/estado/${estadosJuicio.id}`, dataEstado);

        axios.put(`https://backend-nader.herokuapp.com/juicios/opcional/fechas/${fechasJuicio.id}`, dataFechas);

        axios.post(`https://backend-nader.herokuapp.com/expedientes/capitales/actualizacion`, expediente_capitalActualizacion).then((response) => {
            console.log('Capital Segunda Creado: ', response.data);
        });

        axios.put(`https://backend-nader.herokuapp.com/expedientes/capitales/${expCapitales.id}`, expediente_capitales);

        setEstadosJuicio(dataEstado);
        setFechasJuicio(dataFechas);
        setExpCapitales(expediente_capitales);

        Swal.fire({
            title: 'Estado del Juicio Modificado Correctamente',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Continuar'
        });
    }

    return (
        <div className='container-fluid mt-2 bg-dark text-white p-4' style={{ borderRadius: '20px' }}>

            {/* TITULO DEL FORMULARIO */}

            <div className='text-center mt-3'>
                <h2 className="fw-bold text-uppercase">JUICIO ASOCIADO AL EXPEDIENTE [ {expediente.numeroExp} ]</h2>
                <p className="text-white-50 fs-5">Por Favor Completa las Casillas de los Estados del Juicio Cuando Corresponda</p>
            </div>

            {/* SELECCIONAR ESTADO */}

            <hr />

            <div className='row mt-5 d-flex justify-content-center'>
                <div className='col-4 mt-2'>
                    <h4>Seleccionar Estado de Juicio</h4>
                </div>
                <div className='col-4'>
                    <Select
                        className='fw-bold text-center text-white'
                        options={EstadosOpcionalesSelect}
                        onChange={setOptionValueEstado}
                        styles={customStyles}
                        isSearchable={false}
                        defaultValue={optionValueEstado}
                    />
                </div>
            </div>

            {/* ESTADOS OPCIONALES */}

            {
                (banderaCarga)
                &&
                (
                    <div>

                        {/* EMBARGO */}

                        {
                            (optionValueEstado.value === '1')
                            &&
                            (
                                <div>
                                    {
                                        (expediente.finalizado)
                                            ?
                                            (
                                                <div>

                                                    {
                                                        (estadosJuicio.embargo)
                                                            ?
                                                            (
                                                                <div className='container bg-white text-dark mt-5 mb-4 p-2' style={{ borderRadius: '10px' }}>

                                                                    <div className='row mt-2 mb-4'>

                                                                        <div className='col-4 mt-4 '>
                                                                            <div className="ms-2 me-auto fs-5">
                                                                                <div className="fw-bold mb-1">
                                                                                    EMBARGO
                                                                                </div>
                                                                                Completado
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-6 mt-2'>
                                                                            <div className='row'>
                                                                                <div className='col-4 mt-4'>
                                                                                    <span className="fs-5">Fecha de Inicio</span>
                                                                                </div>
                                                                                <div className='col-6'>
                                                                                    <div className="form-outline form-white text-center">

                                                                                        <input
                                                                                            type="date"
                                                                                            className="form-control form-control-lg text-center mt-3 bg-secondary text-white"
                                                                                            name='fechaInicioEmbargo'
                                                                                            value={fechasJuicio.fechaEmbargo}
                                                                                            disabled
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-2 text-center mt-4'>
                                                                            <input className="form-check-input fs-2 bg-dark" type="checkbox" checked onChange={() => { }}/>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            )
                                                            :
                                                            (
                                                                <div className='container bg-white text-dark mt-5 mb-4 p-2' style={{ borderRadius: '10px' }}>

                                                                    <div className='row mt-2 mb-4'>

                                                                        <div className='col-4 mt-4 '>
                                                                            <div className="ms-2 me-auto fs-5">
                                                                                <div className="fw-bold mb-1">
                                                                                    EMBARGO
                                                                                    {/* <hr className='w-25'/> */}
                                                                                </div>
                                                                                Pendiente
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-6 mt-2'>
                                                                            <div className='row'>
                                                                                <div className='col-4 mt-4'>
                                                                                    <span className="fs-5">Fecha de Inicio</span>
                                                                                </div>
                                                                                <div className='col-6'>
                                                                                    <div className="form-outline form-white text-center">

                                                                                        <input
                                                                                            type="date"
                                                                                            className="form-control form-control-lg text-center mt-3 bg-secondary text-white"
                                                                                            name='fechaInicioEmbargo'
                                                                                            disabled
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-2 text-center mt-4'>
                                                                            <input className="form-check-input fs-2 bg-dark" type="checkbox" disabled onChange={() => { }}/>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            )
                                                    }
                                                </div>
                                            )
                                            :
                                            (
                                                <div>
                                                    {
                                                        (estadosJuicio.embargo)
                                                            ?
                                                            (
                                                                <div className='container bg-white text-dark mt-5 mb-4 p-2' style={{ borderRadius: '10px' }}>

                                                                    <div className='row mt-2 mb-4'>

                                                                        <div className='col-4 mt-4 '>
                                                                            <div className="ms-2 me-auto fs-5">
                                                                                <div className="fw-bold mb-1">
                                                                                    EMBARGO
                                                                                    {/* <hr className='w-25'/> */}
                                                                                </div>
                                                                                Completado
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-6 mt-2'>
                                                                            <div className='row'>
                                                                                <div className='col-4 mt-4'>
                                                                                    <span className="fs-5">Fecha de Inicio</span>
                                                                                </div>
                                                                                <div className='col-6'>
                                                                                    <div className="form-outline form-white text-center">

                                                                                        <input
                                                                                            type="date"
                                                                                            className="form-control form-control-lg text-center mt-3 bg-secondary text-white"
                                                                                            name='fechaInicioEmbargo'
                                                                                            value={fechasJuicio.fechaEmbargo}
                                                                                            disabled
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-2 text-center mt-4'>
                                                                            <input className="form-check-input fs-2 bg-dark" type="checkbox" checked onChange={() => { }}/>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            )
                                                            :
                                                            (
                                                                <div className='container bg-white text-dark mt-5 mb-4 p-2' style={{ borderRadius: '10px' }}>

                                                                    <div className='row mt-2 mb-4'>

                                                                        <div className='col-4 mt-4 '>
                                                                            <div className="ms-2 me-auto fs-5">
                                                                                <div className="fw-bold mb-1">
                                                                                    EMBARGO
                                                                                    {/* <hr className='w-25'/> */}
                                                                                </div>
                                                                                Pendiente
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-6 mt-2'>
                                                                            <div className='row'>
                                                                                <div className='col-4 mt-4'>
                                                                                    <span className="fs-5">Fecha de Inicio</span>
                                                                                </div>
                                                                                <div className='col-6'>
                                                                                    <div className="form-outline form-white text-center">

                                                                                        <input
                                                                                            type="date"
                                                                                            className="form-control form-control-lg text-center mt-3 bg-secondary text-white"
                                                                                            name='fechaInicioEmbargo'
                                                                                            value={fechaInicioEmbargo}
                                                                                            onChange={handleInputChange}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-2 text-center mt-4'>
                                                                            <button className='btn btn-dark p-2 mt-2' onClick={handleEmbargo}> Actualizar </button>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            )
                                                    }
                                                </div>
                                            )
                                    }
                                </div>
                            )
                        }

                        {/* APELACION */}

                        {
                            (optionValueEstado.value === '2')
                            &&
                            (
                                <div>
                                    {
                                        (expediente.finalizado)
                                            ?
                                            (
                                                <div>

                                                    {
                                                        (estadosJuicio.apelacion)
                                                            ?
                                                            (
                                                                <div className='container bg-white text-dark mt-5 mb-4 p-2' style={{ borderRadius: '10px' }}>

                                                                    <div className='row mt-2 mb-4'>

                                                                        <div className='col-4 mt-4 '>
                                                                            <div className="ms-2 me-auto fs-5">
                                                                                <div className="fw-bold mb-1">
                                                                                    APELACION
                                                                                </div>
                                                                                Completado
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-6 mt-2'>
                                                                            <div className='row'>
                                                                                <div className='col-4 mt-4'>
                                                                                    <span className="fs-5">Fecha de Inicio</span>
                                                                                </div>
                                                                                <div className='col-6'>
                                                                                    <div className="form-outline form-white text-center">

                                                                                        <input
                                                                                            type="date"
                                                                                            className="form-control form-control-lg text-center mt-3 bg-secondary text-white"
                                                                                            name='fechaInicioEmbargo'
                                                                                            value={fechasJuicio.fechaApelacion}
                                                                                            disabled
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-2 text-center mt-4'>
                                                                            <input className="form-check-input fs-2 bg-dark" type="checkbox" checked onChange={() => { }}/>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            )
                                                            :
                                                            (
                                                                <div className='container bg-white text-dark mt-5 mb-4 p-2' style={{ borderRadius: '10px' }}>

                                                                    <div className='row mt-2 mb-4'>

                                                                        <div className='col-4 mt-4 '>
                                                                            <div className="ms-2 me-auto fs-5">
                                                                                <div className="fw-bold mb-1">
                                                                                    EMBARGO
                                                                                </div>
                                                                                Pendiente
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-6 mt-2'>
                                                                            <div className='row'>
                                                                                <div className='col-4 mt-4'>
                                                                                    <span className="fs-5">Fecha de Inicio</span>
                                                                                </div>
                                                                                <div className='col-6'>
                                                                                    <div className="form-outline form-white text-center">
                                                                                        <input
                                                                                            type="date"
                                                                                            className="form-control form-control-lg text-center mt-3 bg-secondary text-white"
                                                                                            name='fechaInicioApelacion'
                                                                                            disabled
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-2 text-center mt-4'>
                                                                            <input className="form-check-input fs-2 bg-dark" type="checkbox" disabled onChange={() => { }}/>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            )
                                                    }
                                                </div>
                                            )
                                            :
                                            (
                                                <div>
                                                    {
                                                        (estadosJuicio.apelacion)
                                                            ?
                                                            (
                                                                <div className='container bg-white text-dark mt-5 mb-4 p-2' style={{ borderRadius: '10px' }}>

                                                                    <div className='row mt-2 mb-4'>

                                                                        <div className='col-4 mt-4 '>
                                                                            <div className="ms-2 me-auto fs-5">
                                                                                <div className="fw-bold mb-1">
                                                                                    APELACION
                                                                                </div>
                                                                                Completado
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-6 mt-2'>
                                                                            <div className='row'>
                                                                                <div className='col-4 mt-4'>
                                                                                    <span className="fs-5">Fecha de Inicio</span>
                                                                                </div>
                                                                                <div className='col-6'>
                                                                                    <div className="form-outline form-white text-center">

                                                                                        <input
                                                                                            type="date"
                                                                                            className="form-control form-control-lg text-center mt-3 bg-secondary text-white"
                                                                                            name='fechaInicioEmbargo'
                                                                                            value={fechasJuicio.fechaApelacion}
                                                                                            disabled
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-2 text-center mt-4'>
                                                                            <input className="form-check-input fs-2 bg-dark" type="checkbox" checked onChange={() => { }}/>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            )
                                                            :
                                                            (
                                                                <div className='container bg-white text-dark mt-5 mb-4 p-2' style={{ borderRadius: '10px' }}>

                                                                    <div className='row mt-2 mb-4'>

                                                                        <div className='col-4 mt-4 '>
                                                                            <div className="ms-2 me-auto fs-5">
                                                                                <div className="fw-bold mb-1">
                                                                                    APELACION
                                                                                </div>
                                                                                Pendiente
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-6 mt-2'>
                                                                            <div className='row'>
                                                                                <div className='col-4 mt-4'>
                                                                                    <span className="fs-5">Fecha de Inicio</span>
                                                                                </div>
                                                                                <div className='col-6'>
                                                                                    <div className="form-outline form-white text-center">

                                                                                        <input
                                                                                            type="date"
                                                                                            className="form-control form-control-lg text-center mt-3 bg-secondary text-white"
                                                                                            name='fechaInicioApelacion'
                                                                                            value={fechaInicioApelacion}
                                                                                            onChange={handleInputChange}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-2 text-center mt-4'>
                                                                            <button className='btn btn-dark p-2 mt-2' onClick={handleApelacion}> Actualizar </button>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            )
                                                    }
                                                </div>
                                            )
                                    }
                                </div>
                            )
                        }


                        {/* EXPRESION DE AGRAVIOS */}

                        {
                            (optionValueEstado.value === '3')
                            &&
                            (
                                <div>
                                    {
                                        (expediente.finalizado)
                                            ?
                                            (
                                                <div>

                                                    {
                                                        (estadosJuicio.expresionAgravios)
                                                            ?
                                                            (
                                                                <div className='container bg-white text-dark mt-5 mb-4 p-2' style={{ borderRadius: '10px' }}>

                                                                    <div className='row mt-2 mb-4'>

                                                                        <div className='col-4 mt-4 '>
                                                                            <div className="ms-2 me-auto fs-5">
                                                                                <div className="fw-bold mb-1">
                                                                                    EXPRESION DE AGRAVIOS
                                                                                </div>
                                                                                Completado
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-6 mt-2'>
                                                                            <div className='row'>
                                                                                <div className='col-4 mt-4'>
                                                                                    <span className="fs-5">Fecha de Inicio</span>
                                                                                </div>
                                                                                <div className='col-6'>
                                                                                    <div className="form-outline form-white text-center">

                                                                                        <input
                                                                                            type="date"
                                                                                            className="form-control form-control-lg text-center mt-3 bg-secondary text-white"
                                                                                            name='fechaInicioExpresionAgravios'
                                                                                            value={fechasJuicio.fechaExpresionAgravios}
                                                                                            disabled
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-2 text-center mt-4'>
                                                                            <input className="form-check-input fs-2 bg-dark" type="checkbox" checked onChange={() => { }}/>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            )
                                                            :
                                                            (
                                                                <div className='container bg-white text-dark mt-5 mb-4 p-2' style={{ borderRadius: '10px' }}>

                                                                    <div className='row mt-2 mb-4'>

                                                                        <div className='col-4 mt-4 '>
                                                                            <div className="ms-2 me-auto fs-5">
                                                                                <div className="fw-bold mb-1">
                                                                                    EXPRESION DE AGRAVIOS
                                                                                </div>
                                                                                Pendiente
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-6 mt-2'>
                                                                            <div className='row'>
                                                                                <div className='col-4 mt-4'>
                                                                                    <span className="fs-5">Fecha de Inicio</span>
                                                                                </div>
                                                                                <div className='col-6'>
                                                                                    <div className="form-outline form-white text-center">
                                                                                        <input
                                                                                            type="date"
                                                                                            className="form-control form-control-lg text-center mt-3 bg-secondary text-white"
                                                                                            name='fechaInicioExpresionAgravios'
                                                                                            disabled
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-2 text-center mt-4'>
                                                                            <input className="form-check-input fs-2 bg-dark" type="checkbox" disabled onChange={() => { }}/>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            )
                                                    }
                                                </div>
                                            )
                                            :
                                            (
                                                <div>
                                                    {
                                                        (estadosJuicio.expresionAgravios)
                                                            ?
                                                            (
                                                                <div className='container bg-white text-dark mt-5 mb-4 p-2' style={{ borderRadius: '10px' }}>

                                                                    <div className='row mt-2 mb-4'>

                                                                        <div className='col-4 mt-4 '>
                                                                            <div className="ms-2 me-auto fs-5">
                                                                                <div className="fw-bold mb-1">
                                                                                    EXPRESION DE AGRAVIOS
                                                                                </div>
                                                                                Completado
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-6 mt-2'>
                                                                            <div className='row'>
                                                                                <div className='col-4 mt-4'>
                                                                                    <span className="fs-5">Fecha de Inicio</span>
                                                                                </div>
                                                                                <div className='col-6'>
                                                                                    <div className="form-outline form-white text-center">

                                                                                        <input
                                                                                            type="date"
                                                                                            className="form-control form-control-lg text-center mt-3 bg-secondary text-white"
                                                                                            name='fechaInicioEmbargo'
                                                                                            value={fechasJuicio.fechaExpresionAgravios}
                                                                                            disabled
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-2 text-center mt-4'>
                                                                            <input className="form-check-input fs-2 bg-dark" type="checkbox" checked onChange={() => { }}/>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            )
                                                            :
                                                            (
                                                                <div className='container bg-white text-dark mt-5 mb-4 p-2' style={{ borderRadius: '10px' }}>

                                                                    <div className='row mt-2 mb-4'>

                                                                        <div className='col-4 mt-4 '>
                                                                            <div className="ms-2 me-auto fs-5">
                                                                                <div className="fw-bold mb-1">
                                                                                    EXPRESION DE AGRAVIOS
                                                                                </div>
                                                                                Pendiente
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-6 mt-2'>
                                                                            <div className='row'>
                                                                                <div className='col-4 mt-4'>
                                                                                    <span className="fs-5">Fecha de Inicio</span>
                                                                                </div>
                                                                                <div className='col-6'>
                                                                                    <div className="form-outline form-white text-center">

                                                                                        <input
                                                                                            type="date"
                                                                                            className="form-control form-control-lg text-center mt-3 bg-secondary text-white"
                                                                                            name='fechaInicioApelacion'
                                                                                            value={fechaInicioExpresionAgravios}
                                                                                            onChange={handleInputChange}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-2 text-center mt-4'>
                                                                            <button className='btn btn-dark p-2 mt-2' onClick={handleExpresionAg}> Actualizar </button>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            )
                                                    }
                                                </div>
                                            )
                                    }
                                </div>
                            )
                        }

                        {/* RECURSOS DE ACLARATORIA */}

                        {
                            (optionValueEstado.value === '4')
                            &&
                            (
                                <div>
                                    {
                                        (expediente.finalizado)
                                            ?
                                            (
                                                <div>

                                                    {
                                                        (estadosJuicio.recursosAclaratoria)
                                                            ?
                                                            (
                                                                <div className='container bg-white text-dark mt-5 mb-4 p-2' style={{ borderRadius: '10px' }}>

                                                                    <div className='row mt-2 mb-4'>

                                                                        <div className='col-4 mt-4 '>
                                                                            <div className="ms-2 me-auto fs-5">
                                                                                <div className="fw-bold mb-1">
                                                                                    RECURSOS DE ACLARATORIA
                                                                                </div>
                                                                                Completado
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-6 mt-2'>
                                                                            <div className='row'>
                                                                                <div className='col-4 mt-4'>
                                                                                    <span className="fs-5">Fecha de Inicio</span>
                                                                                </div>
                                                                                <div className='col-6'>
                                                                                    <div className="form-outline form-white text-center">

                                                                                        <input
                                                                                            type="date"
                                                                                            className="form-control form-control-lg text-center mt-3 bg-secondary text-white"
                                                                                            name='fechaRecursosAclaratoria'
                                                                                            value={fechasJuicio.fechaRecursosAclaratoria}
                                                                                            disabled
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-2 text-center mt-4'>
                                                                            <input className="form-check-input fs-2 bg-dark" type="checkbox" checked onChange={() => { }}/>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            )
                                                            :
                                                            (
                                                                <div className='container bg-white text-dark mt-5 mb-4 p-2' style={{ borderRadius: '10px' }}>

                                                                    <div className='row mt-2 mb-4'>

                                                                        <div className='col-4 mt-4 '>
                                                                            <div className="ms-2 me-auto fs-5">
                                                                                <div className="fw-bold mb-1">
                                                                                    RECURSOS DE ACLARATORIA
                                                                                </div>
                                                                                Pendiente
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-6 mt-2'>
                                                                            <div className='row'>
                                                                                <div className='col-4 mt-4'>
                                                                                    <span className="fs-5">Fecha de Inicio</span>
                                                                                </div>
                                                                                <div className='col-6'>
                                                                                    <div className="form-outline form-white text-center">
                                                                                        <input
                                                                                            type="date"
                                                                                            className="form-control form-control-lg text-center mt-3 bg-secondary text-white"
                                                                                            name='fechaRecursosAclaratoria'
                                                                                            disabled
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-2 text-center mt-4'>
                                                                            <input className="form-check-input fs-2 bg-dark" type="checkbox" disabled onChange={() => { }}/>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            )
                                                    }
                                                </div>
                                            )
                                            :
                                            (
                                                <div>
                                                    {
                                                        (estadosJuicio.recursosAclaratoria)
                                                            ?
                                                            (
                                                                <div className='container bg-white text-dark mt-5 mb-4 p-2' style={{ borderRadius: '10px' }}>

                                                                    <div className='row mt-2 mb-4'>

                                                                        <div className='col-4 mt-4 '>
                                                                            <div className="ms-2 me-auto fs-5">
                                                                                <div className="fw-bold mb-1">
                                                                                    RECURSOS DE ACLARATORIA
                                                                                </div>
                                                                                Completado
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-6 mt-2'>
                                                                            <div className='row'>
                                                                                <div className='col-4 mt-4'>
                                                                                    <span className="fs-5">Fecha de Inicio</span>
                                                                                </div>
                                                                                <div className='col-6'>
                                                                                    <div className="form-outline form-white text-center">

                                                                                        <input
                                                                                            type="date"
                                                                                            className="form-control form-control-lg text-center mt-3 bg-secondary text-white"
                                                                                            name='fechaInicioRecursosAclaratoria'
                                                                                            value={fechasJuicio.fechaRecursosAclaratoria}
                                                                                            disabled
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-2 text-center mt-4'>
                                                                            <input className="form-check-input fs-2 bg-dark" type="checkbox" checked onChange={() => { }}/>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            )
                                                            :
                                                            (
                                                                <div className='container bg-white text-dark mt-5 mb-4 p-2' style={{ borderRadius: '10px' }}>

                                                                    <div className='row mt-2 mb-4'>

                                                                        <div className='col-4 mt-4 '>
                                                                            <div className="ms-2 me-auto fs-5">
                                                                                <div className="fw-bold mb-1">
                                                                                    RECURSOS DE ACLARATORIA
                                                                                </div>
                                                                                Pendiente
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-6 mt-2'>
                                                                            <div className='row'>
                                                                                <div className='col-4 mt-4'>
                                                                                    <span className="fs-5">Fecha de Inicio</span>
                                                                                </div>
                                                                                <div className='col-6'>
                                                                                    <div className="form-outline form-white text-center">

                                                                                        <input
                                                                                            type="date"
                                                                                            className="form-control form-control-lg text-center mt-3 bg-secondary text-white"
                                                                                            name='fechaInicioRecursosAclaratoria'
                                                                                            value={fechaInicioRecursosAclaratoria}
                                                                                            onChange={handleInputChange}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-2 text-center mt-4'>
                                                                            <button className='btn btn-dark p-2 mt-2' onClick={handleRecursosAc}> Actualizar </button>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            )
                                                    }
                                                </div>
                                            )
                                    }
                                </div>
                            )
                        }


                        {/* SENTENCIA DE SEGUNDA INSTANCIA */}

                        {
                            (optionValueEstado.value === '5')
                            &&
                            (
                                <div>
                                    {
                                        (expediente.finalizado)
                                            ?
                                            (
                                                <div>

                                                    {
                                                        (estadosJuicio.sentenciaSegundaInstancia)
                                                            ?
                                                            (
                                                                <div className='container bg-white text-dark mt-5 mb-4 p-2' style={{ borderRadius: '10px' }}>

                                                                    <div className='row mt-2 mb-4'>

                                                                        <div className='col-4 mt-4 '>
                                                                            <div className="ms-2 me-auto fs-5">
                                                                                <div className="fw-bold mb-1">
                                                                                    SENTENCIA DE SEGUNDA INSTANCIA
                                                                                </div>
                                                                                Completado
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-6 mt-2'>
                                                                            <div className='row'>
                                                                                <div className='col-4 mt-4'>
                                                                                    <span className="fs-5">Fecha de Inicio</span>
                                                                                </div>
                                                                                <div className='col-6'>
                                                                                    <div className="form-outline form-white text-center">

                                                                                        <input
                                                                                            type="date"
                                                                                            className="form-control form-control-lg text-center mt-3 bg-secondary text-white"
                                                                                            name='fechaRecursosAclaratoria'
                                                                                            value={fechasJuicio.fechaSentenciaSegundaInstancia}
                                                                                            disabled
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-2 text-center mt-4'>
                                                                            <input className="form-check-input fs-2 bg-dark" type="checkbox" checked onChange={() => { }}/>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            )
                                                            :
                                                            (
                                                                <div className='container bg-white text-dark mt-5 mb-4 p-2' style={{ borderRadius: '10px' }}>

                                                                    <div className='row mt-2 mb-4'>

                                                                        <div className='col-4 mt-4 '>
                                                                            <div className="ms-2 me-auto fs-5">
                                                                                <div className="fw-bold mb-1">
                                                                                    SENTENCIA DE SEGUNDA INSTANCIA
                                                                                </div>
                                                                                Pendiente
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-6 mt-2'>
                                                                            <div className='row'>
                                                                                <div className='col-4 mt-4'>
                                                                                    <span className="fs-5">Fecha de Inicio</span>
                                                                                </div>
                                                                                <div className='col-6'>
                                                                                    <div className="form-outline form-white text-center">
                                                                                        <input
                                                                                            type="date"
                                                                                            className="form-control form-control-lg text-center mt-3 bg-secondary text-white"
                                                                                            name='fechaSentenciaSegundaInstancia'
                                                                                            disabled
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-2 text-center mt-4'>
                                                                            <input className="form-check-input fs-2 bg-dark" type="checkbox" disabled onChange={() => { }}/>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            )
                                                    }
                                                </div>
                                            )
                                            :
                                            (
                                                <div>
                                                    {
                                                        (estadosJuicio.sentenciaSegundaInstancia)
                                                            ?
                                                            (
                                                                <div className='container bg-white text-dark mt-5 mb-4 p-2' style={{ borderRadius: '10px' }}>

                                                                    <div className='row mt-2 mb-4'>

                                                                        <div className='col-4 mt-4 '>
                                                                            <div className="ms-2 me-auto fs-5">
                                                                                <div className="fw-bold mb-1">
                                                                                    SENTENCIA DE SEGUNDA INSTANCIA
                                                                                </div>
                                                                                Completado
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-6 mt-2'>
                                                                            <div className='row'>
                                                                                <div className='col-4 mt-4'>
                                                                                    <span className="fs-5">Fecha de Inicio</span>
                                                                                </div>
                                                                                <div className='col-6'>
                                                                                    <div className="form-outline form-white text-center">

                                                                                        <input
                                                                                            type="date"
                                                                                            className="form-control form-control-lg text-center mt-3 bg-secondary text-white"
                                                                                            name='fechaInicioRecursosAclaratoria'
                                                                                            value={fechasJuicio.fechaSentenciaSegundaInstancia}
                                                                                            disabled
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-2 text-center mt-4'>
                                                                            <input className="form-check-input fs-2 bg-dark" type="checkbox" checked onChange={() => { }}/>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            )
                                                            :
                                                            (
                                                                <div className='container bg-white text-dark mt-5 mb-4 p-2' style={{ borderRadius: '10px' }}>

                                                                    <div className='row mt-2 mb-4'>

                                                                        <div className='col-4 mt-4 '>
                                                                            <div className="ms-2 me-auto fs-5">
                                                                                <div className="fw-bold mb-1">
                                                                                    SENTENCIA DE SEGUNDA INSTANCIA
                                                                                </div>
                                                                                Pendiente
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-6 mt-2'>
                                                                            <div className='row'>
                                                                                <div className='col-4 mt-4'>
                                                                                    <span className="fs-5">Fecha de Inicio</span>
                                                                                </div>
                                                                                <div className='col-6'>
                                                                                    <div className="form-outline form-white text-center">

                                                                                        <input
                                                                                            type="date"
                                                                                            className="form-control form-control-lg text-center mt-3 bg-secondary text-white"
                                                                                            name='fechaInicioSentenciaSegInstancia'
                                                                                            value={fechaInicioSentenciaSegInstancia}
                                                                                            onChange={handleInputChange}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-2 text-center mt-4'>
                                                                            <button className='btn btn-dark p-2 mt-2' onClick={handleSentenciaSeg}> Actualizar </button>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            )
                                                    }
                                                </div>
                                            )
                                    }
                                </div>
                            )
                        }

                        {/* ACTUALIZACION */}

                        {
                            (optionValueEstado.value === '6')
                            &&
                            (
                                <div>
                                    {
                                        (expediente.finalizado)
                                            ?
                                            (
                                                <div>

                                                    {
                                                        (estadosJuicio.actualizacion)
                                                            ?
                                                            (
                                                                <div className='container bg-white text-dark mt-5 mb-4 p-2' style={{ borderRadius: '10px' }}>

                                                                    <div className='row mt-2 mb-4'>

                                                                        <div className='col-4 mt-4 '>
                                                                            <div className="ms-2 me-auto fs-5">
                                                                                <div className="fw-bold mb-1">
                                                                                    ACTUALIZACION
                                                                                </div>
                                                                                Completado
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-6 mt-2'>
                                                                            <div className='row'>
                                                                                <div className='col-4 mt-4'>
                                                                                    <span className="fs-5">Fecha de Inicio</span>
                                                                                </div>
                                                                                <div className='col-6'>
                                                                                    <div className="form-outline form-white text-center">

                                                                                        <input
                                                                                            type="date"
                                                                                            className="form-control form-control-lg text-center mt-3 bg-secondary text-white"
                                                                                            name='fechaActualizacion'
                                                                                            value={fechasJuicio.fechaActualizacion}
                                                                                            disabled
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-2 text-center mt-4'>
                                                                            <input className="form-check-input fs-2 bg-dark" type="checkbox" checked onChange={() => { }}/>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            )
                                                            :
                                                            (
                                                                <div className='container bg-white text-dark mt-5 mb-4 p-2' style={{ borderRadius: '10px' }}>

                                                                    <div className='row mt-2 mb-4'>

                                                                        <div className='col-4 mt-4 '>
                                                                            <div className="ms-2 me-auto fs-5">
                                                                                <div className="fw-bold mb-1">
                                                                                    ACTUALIZACION
                                                                                </div>
                                                                                Pendiente
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-6 mt-2'>
                                                                            <div className='row'>
                                                                                <div className='col-4 mt-4'>
                                                                                    <span className="fs-5">Fecha de Inicio</span>
                                                                                </div>
                                                                                <div className='col-6'>
                                                                                    <div className="form-outline form-white text-center">
                                                                                        <input
                                                                                            type="date"
                                                                                            className="form-control form-control-lg text-center mt-3 bg-secondary text-white"
                                                                                            name='fechaActualizacion'
                                                                                            disabled
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-2 text-center mt-4'>
                                                                            <input className="form-check-input fs-2 bg-dark" type="checkbox" disabled onChange={() => { }}/>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            )
                                                    }
                                                </div>
                                            )
                                            :
                                            (
                                                <div>
                                                    {
                                                        (estadosJuicio.actualizacion)
                                                            ?
                                                            (
                                                                <div className='container bg-white text-dark mt-5 mb-4 p-2' style={{ borderRadius: '10px' }}>

                                                                    <div className='row mt-2 mb-4'>

                                                                        <div className='col-4 mt-4 '>
                                                                            <div className="ms-2 me-auto fs-5">
                                                                                <div className="fw-bold mb-1">
                                                                                    ACTUALIZACION
                                                                                </div>
                                                                                Completado
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-6 mt-2'>
                                                                            <div className='row'>
                                                                                <div className='col-4 mt-4'>
                                                                                    <span className="fs-5">Fecha de Inicio</span>
                                                                                </div>
                                                                                <div className='col-6'>
                                                                                    <div className="form-outline form-white text-center">

                                                                                        <input
                                                                                            type="date"
                                                                                            className="form-control form-control-lg text-center mt-3 bg-secondary text-white"
                                                                                            name='fechaActualizacion'
                                                                                            value={fechasJuicio.fechaActualizacion}
                                                                                            disabled
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-2 text-center mt-4'>
                                                                            <input className="form-check-input fs-2 bg-dark" type="checkbox" checked onChange={() => { }}/>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            )
                                                            :
                                                            (
                                                                <div className='container bg-white text-dark mt-5 mb-4 p-2' style={{ borderRadius: '10px' }}>

                                                                    <div className='row mt-2 mb-4'>

                                                                        <div className='col-4 mt-4 '>
                                                                            <div className="ms-2 me-auto fs-5">
                                                                                <div className="fw-bold mb-1">
                                                                                    ACTUALIZACION
                                                                                </div>
                                                                                Pendiente
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-6 mt-2'>
                                                                            <div className='row'>
                                                                                <div className='col-4 mt-4'>
                                                                                    <span className="fs-5">Fecha de Inicio</span>
                                                                                </div>
                                                                                <div className='col-6'>
                                                                                    <div className="form-outline form-white text-center">

                                                                                        <input
                                                                                            type="date"
                                                                                            className="form-control form-control-lg text-center mt-3 bg-secondary text-white"
                                                                                            name='fechaInicioActualizacion'
                                                                                            value={fechaInicioActualizacion}
                                                                                            onChange={handleInputChange}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-2 text-center mt-4'>
                                                                            <button className='btn btn-dark p-2 mt-2' onClick={handleActualizacion}> Actualizar </button>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            )
                                                    }
                                                </div>
                                            )
                                    }
                                </div>
                            )
                        }

                    </div>
                )
            }

        </div>
    )
}
