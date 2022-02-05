import React, { useEffect, useState } from 'react'
import { useForm } from '../../../../hooks/useForm';
import Select from 'react-select';
import Swal from 'sweetalert2';
import axios from 'axios';
import { EstadosObligatoriosSelect, customStyles } from '../../../../helpers/JuiciosSelector'

export const EstadosObligatorios = ({ expediente, expCapitales }) => {

    const [estadosJuicio, setEstadosJuicio] = useState({});
    const [fechasJuicio, setFechasJuicio] = useState({});

    const [banderaCarga, setBanderaCarga] = useState(false);

    const [optionValueEstado, setOptionValueEstado] = useState({
        label: "Demanda",
        value: '1'
    });

    useEffect(() => {

        axios.get(`http://localhost:3001/general/juiciosObligatorios?data=${expediente.numeroExp}`).then((resp) => {
            setEstadosJuicio(resp.data[0]);
            setFechasJuicio(resp.data[1]);
            setBanderaCarga(true);
        });

    }, [expediente.numeroExp]);

    const [formValues, handleInputChange] = useForm({
        fechaInicioDemanda: '',
        fechaInicioContestacionDemanda: '',
        fechaInicioOfrecimientoPrueba: '',
        fechaInicioAudienciaConciliacion: '',
        fechaInicioProduccionProb: '',
        fechaInicioInformeActuario: '',
        fechaInicioAlegatos: '',
        fechaInicioPaseResolver: '',
        fechaInicioSentenciaPrimInstancia: '',
    });

    const {
        fechaInicioDemanda,
        fechaInicioContestacionDemanda,
        fechaInicioOfrecimientoPrueba,
        fechaInicioAudienciaConciliacion,
        fechaInicioProduccionProb,
        fechaInicioInformeActuario,
        fechaInicioAlegatos,
        fechaInicioPaseResolver,
        fechaInicioSentenciaPrimInstancia
    } = formValues;

    const handleDemanda = () => {

        if (fechaInicioDemanda === '') {

            Swal.fire({
                title: 'Por favor Indica la Fecha de Inicio de `Demanda` para continuar',
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

            demanda: true,
            contestacionDemanda: estadosJuicio.contestacionDemanda,
            ofrecimientoPrueba: estadosJuicio.ofrecimientoPrueba,
            audienciaConciliacion: estadosJuicio.audienciaConciliacion,
            produccionProbatoria: estadosJuicio.produccionProbatoria,
            informeActuario: estadosJuicio.informeActuario,
            alegatos: estadosJuicio.alegatos,
            paseResolver: estadosJuicio.paseResolver,
            sentenciaPrimeraInstancia: estadosJuicio.sentenciaPrimeraInstancia
        }

        var dataFechas = {
            id: fechasJuicio.id,
            numeroExp: fechasJuicio.numeroExp,

            fechaDemanda: fechaInicioDemanda,
            fechaContestacionDemanda: fechasJuicio.fechaContestacionDemanda,
            fechaOfrecimientoPrueba: fechasJuicio.fechaOfrecimientoPrueba,
            fechaAudienciaConciliacion: fechasJuicio.fechaAudienciaConciliacion,
            fechaProduccionProbatoria: fechasJuicio.fechaProduccionProbatoria,
            fechaInformeActuario: fechasJuicio.fechaInformeActuario,
            fechaAlegatos: fechasJuicio.fechaAlegatos,
            fechaPaseResolver: fechasJuicio.fechaPaseResolver,
            fechaSentenciaPrimeraInstancia: fechasJuicio.fechaSentenciaPrimeraInstancia
        }

        /* LLAMAR A DB */

        axios.put(`http://localhost:3001/juicios/obligatorio/estado/${estadosJuicio.id}`, dataEstado);

        axios.put(`http://localhost:3001/juicios/obligatorio/fechas/${fechasJuicio.id}`, dataFechas);

        setEstadosJuicio(dataEstado);
        setFechasJuicio(dataFechas);

        Swal.fire({
            title: 'Estado del Juicio Modificado Correctamente',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Continuar'
        });

    }

    const handleContestacionDem = () => {

        if (fechaInicioContestacionDemanda === '') {

            Swal.fire({
                title: 'Por favor Indica la Fecha de Inicio de `Contestacion de Demanda` para continuar',
                text: '',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return
        }

        if (!estadosJuicio.demanda) {

            Swal.fire({
                title: 'Debes Completar el Estado anterior `Demanda` para continuar',
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

            demanda: estadosJuicio.demanda,
            contestacionDemanda: true,
            ofrecimientoPrueba: estadosJuicio.ofrecimientoPrueba,
            audienciaConciliacion: estadosJuicio.audienciaConciliacion,
            produccionProbatoria: estadosJuicio.produccionProbatoria,
            informeActuario: estadosJuicio.informeActuario,
            alegatos: estadosJuicio.alegatos,
            paseResolver: estadosJuicio.paseResolver,
            sentenciaPrimeraInstancia: estadosJuicio.sentenciaPrimeraInstancia
        }

        var dataFechas = {
            id: fechasJuicio.id,
            numeroExp: fechasJuicio.numeroExp,

            fechaDemanda: fechasJuicio.fechaDemanda,
            fechaContestacionDemanda: fechaInicioContestacionDemanda,
            fechaOfrecimientoPrueba: fechasJuicio.fechaOfrecimientoPrueba,
            fechaAudienciaConciliacion: fechasJuicio.fechaAudienciaConciliacion,
            fechaProduccionProbatoria: fechasJuicio.fechaProduccionProbatoria,
            fechaInformeActuario: fechasJuicio.fechaInformeActuario,
            fechaAlegatos: fechasJuicio.fechaAlegatos,
            fechaPaseResolver: fechasJuicio.fechaPaseResolver,
            fechaSentenciaPrimeraInstancia: fechasJuicio.fechaSentenciaPrimeraInstancia
        }

        /* LLAMAR A DB */

        axios.put(`http://localhost:3001/juicios/obligatorio/estado/${estadosJuicio.id}`, dataEstado);

        axios.put(`http://localhost:3001/juicios/obligatorio/fechas/${fechasJuicio.id}`, dataFechas);

        setEstadosJuicio(dataEstado);
        setFechasJuicio(dataFechas);

        Swal.fire({
            title: 'Estado del Juicio Modificado Correctamente',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Continuar'
        });

    }

    const handleOfrecimientoP = () => {

        if (fechaInicioOfrecimientoPrueba === '') {

            Swal.fire({
                title: 'Por favor Indica la Fecha de Inicio de `Ofrecimiento de Prueba` para continuar',
                text: '',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return
        }

        if (!estadosJuicio.contestacionDemanda) {

            Swal.fire({
                title: 'Debes Completar el Estado anterior `Contestacion de Demanda` para continuar',
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

            demanda: estadosJuicio.demanda,
            contestacionDemanda: estadosJuicio.contestacionDemanda,
            ofrecimientoPrueba: true,
            audienciaConciliacion: estadosJuicio.audienciaConciliacion,
            produccionProbatoria: estadosJuicio.produccionProbatoria,
            informeActuario: estadosJuicio.informeActuario,
            alegatos: estadosJuicio.alegatos,
            paseResolver: estadosJuicio.paseResolver,
            sentenciaPrimeraInstancia: estadosJuicio.sentenciaPrimeraInstancia
        }

        var dataFechas = {
            id: fechasJuicio.id,
            numeroExp: fechasJuicio.numeroExp,

            fechaDemanda: fechasJuicio.fechaDemanda,
            fechaContestacionDemanda: fechasJuicio.fechaContestacionDemanda,
            fechaOfrecimientoPrueba: fechaInicioOfrecimientoPrueba,
            fechaAudienciaConciliacion: fechasJuicio.fechaAudienciaConciliacion,
            fechaProduccionProbatoria: fechasJuicio.fechaProduccionProbatoria,
            fechaInformeActuario: fechasJuicio.fechaInformeActuario,
            fechaAlegatos: fechasJuicio.fechaAlegatos,
            fechaPaseResolver: fechasJuicio.fechaPaseResolver,
            fechaSentenciaPrimeraInstancia: fechasJuicio.fechaSentenciaPrimeraInstancia
        }

        /* LLAMAR A DB */

        axios.put(`http://localhost:3001/juicios/obligatorio/estado/${estadosJuicio.id}`, dataEstado);

        axios.put(`http://localhost:3001/juicios/obligatorio/fechas/${fechasJuicio.id}`, dataFechas);

        setEstadosJuicio(dataEstado);
        setFechasJuicio(dataFechas);

        Swal.fire({
            title: 'Estado del Juicio Modificado Correctamente',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Continuar'
        });

    }

    const handleAudienciaCon = () => {

        if (fechaInicioAudienciaConciliacion === '') {

            Swal.fire({
                title: 'Por favor Indica la Fecha de Inicio de `Audiencia de Conciliacion` para continuar',
                text: '',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return
        }

        if (!estadosJuicio.ofrecimientoPrueba) {

            Swal.fire({
                title: 'Debes Completar el Estado anterior `Ofrecimiento de Prueba` para continuar',
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

            demanda: estadosJuicio.demanda,
            contestacionDemanda: estadosJuicio.contestacionDemanda,
            ofrecimientoPrueba: estadosJuicio.ofrecimientoPrueba,
            audienciaConciliacion: true,
            produccionProbatoria: estadosJuicio.produccionProbatoria,
            informeActuario: estadosJuicio.informeActuario,
            alegatos: estadosJuicio.alegatos,
            paseResolver: estadosJuicio.paseResolver,
            sentenciaPrimeraInstancia: estadosJuicio.sentenciaPrimeraInstancia
        }

        var dataFechas = {
            id: fechasJuicio.id,
            numeroExp: fechasJuicio.numeroExp,

            fechaDemanda: fechasJuicio.fechaDemanda,
            fechaContestacionDemanda: fechasJuicio.fechaContestacionDemanda,
            fechaOfrecimientoPrueba: fechasJuicio.fechaOfrecimientoPrueba,
            fechaAudienciaConciliacion: fechaInicioAudienciaConciliacion,
            fechaProduccionProbatoria: fechasJuicio.fechaProduccionProbatoria,
            fechaInformeActuario: fechasJuicio.fechaInformeActuario,
            fechaAlegatos: fechasJuicio.fechaAlegatos,
            fechaPaseResolver: fechasJuicio.fechaPaseResolver,
            fechaSentenciaPrimeraInstancia: fechasJuicio.fechaSentenciaPrimeraInstancia
        }

        /* LLAMAR A DB */

        axios.put(`http://localhost:3001/juicios/obligatorio/estado/${estadosJuicio.id}`, dataEstado);

        axios.put(`http://localhost:3001/juicios/obligatorio/fechas/${fechasJuicio.id}`, dataFechas);

        setEstadosJuicio(dataEstado);
        setFechasJuicio(dataFechas);

        Swal.fire({
            title: 'Estado del Juicio Modificado Correctamente',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Continuar'
        });

    }

    const handleProduccionProb = () => {

        if (fechaInicioProduccionProb === '') {

            Swal.fire({
                title: 'Por favor Indica la Fecha de Inicio de `Produccion Probatoria` para continuar',
                text: '',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return
        }

        if (!estadosJuicio.audienciaConciliacion) {

            Swal.fire({
                title: 'Debes Completar el Estado anterior `Audiencia de Conciliacion` para continuar',
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

            demanda: estadosJuicio.demanda,
            contestacionDemanda: estadosJuicio.contestacionDemanda,
            ofrecimientoPrueba: estadosJuicio.ofrecimientoPrueba,
            audienciaConciliacion: estadosJuicio.audienciaConciliacion,
            produccionProbatoria: true,
            informeActuario: estadosJuicio.informeActuario,
            alegatos: estadosJuicio.alegatos,
            paseResolver: estadosJuicio.paseResolver,
            sentenciaPrimeraInstancia: estadosJuicio.sentenciaPrimeraInstancia
        }

        var dataFechas = {
            id: fechasJuicio.id,
            numeroExp: fechasJuicio.numeroExp,

            fechaDemanda: fechasJuicio.fechaDemanda,
            fechaContestacionDemanda: fechasJuicio.fechaContestacionDemanda,
            fechaOfrecimientoPrueba: fechasJuicio.fechaOfrecimientoPrueba,
            fechaAudienciaConciliacion: fechasJuicio.fechaAudienciaConciliacion,
            fechaProduccionProbatoria: fechaInicioProduccionProb,
            fechaInformeActuario: fechasJuicio.fechaInformeActuario,
            fechaAlegatos: fechasJuicio.fechaAlegatos,
            fechaPaseResolver: fechasJuicio.fechaPaseResolver,
            fechaSentenciaPrimeraInstancia: fechasJuicio.fechaSentenciaPrimeraInstancia
        }

        /* LLAMAR A DB */

        axios.put(`http://localhost:3001/juicios/obligatorio/estado/${estadosJuicio.id}`, dataEstado);

        axios.put(`http://localhost:3001/juicios/obligatorio/fechas/${fechasJuicio.id}`, dataFechas);

        setEstadosJuicio(dataEstado);
        setFechasJuicio(dataFechas);

        Swal.fire({
            title: 'Estado del Juicio Modificado Correctamente',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Continuar'
        });

    }

    const handleInformeAct = () => {

        if (fechaInicioInformeActuario === '') {

            Swal.fire({
                title: 'Por favor Indica la Fecha de Inicio de `Informe de Actuarios` para continuar',
                text: '',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return
        }

        if (!estadosJuicio.produccionProbatoria) {

            Swal.fire({
                title: 'Debes Completar el Estado anterior `Produccion Probatoria` para continuar',
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

            demanda: estadosJuicio.demanda,
            contestacionDemanda: estadosJuicio.contestacionDemanda,
            ofrecimientoPrueba: estadosJuicio.ofrecimientoPrueba,
            audienciaConciliacion: estadosJuicio.audienciaConciliacion,
            produccionProbatoria: estadosJuicio.produccionProbatoria,
            informeActuario: true,
            alegatos: estadosJuicio.alegatos,
            paseResolver: estadosJuicio.paseResolver,
            sentenciaPrimeraInstancia: estadosJuicio.sentenciaPrimeraInstancia
        }

        var dataFechas = {
            id: fechasJuicio.id,
            numeroExp: fechasJuicio.numeroExp,

            fechaDemanda: fechasJuicio.fechaDemanda,
            fechaContestacionDemanda: fechasJuicio.fechaContestacionDemanda,
            fechaOfrecimientoPrueba: fechasJuicio.fechaOfrecimientoPrueba,
            fechaAudienciaConciliacion: fechasJuicio.fechaAudienciaConciliacion,
            fechaProduccionProbatoria: fechasJuicio.fechaProduccionProbatoria,
            fechaInformeActuario: fechaInicioInformeActuario,
            fechaAlegatos: fechasJuicio.fechaAlegatos,
            fechaPaseResolver: fechasJuicio.fechaPaseResolver,
            fechaSentenciaPrimeraInstancia: fechasJuicio.fechaSentenciaPrimeraInstancia
        }

        /* LLAMAR A DB */

        axios.put(`http://localhost:3001/juicios/obligatorio/estado/${estadosJuicio.id}`, dataEstado);

        axios.put(`http://localhost:3001/juicios/obligatorio/fechas/${fechasJuicio.id}`, dataFechas);

        setEstadosJuicio(dataEstado);
        setFechasJuicio(dataFechas);

        Swal.fire({
            title: 'Estado del Juicio Modificado Correctamente',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Continuar'
        });

    }

    const handleAlegatos = () => {

        if (fechaInicioAlegatos === '') {

            Swal.fire({
                title: 'Por favor Indica la Fecha de Inicio de `Alegatos` para continuar',
                text: '',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return
        }

        if (!estadosJuicio.informeActuario) {

            Swal.fire({
                title: 'Debes Completar el Estado anterior `Informe de Actuarios` para continuar',
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

            demanda: estadosJuicio.demanda,
            contestacionDemanda: estadosJuicio.contestacionDemanda,
            ofrecimientoPrueba: estadosJuicio.ofrecimientoPrueba,
            audienciaConciliacion: estadosJuicio.audienciaConciliacion,
            produccionProbatoria: estadosJuicio.produccionProbatoria,
            informeActuario: estadosJuicio.informeActuario,
            alegatos: true,
            paseResolver: estadosJuicio.paseResolver,
            sentenciaPrimeraInstancia: estadosJuicio.sentenciaPrimeraInstancia
        }

        var dataFechas = {
            id: fechasJuicio.id,
            numeroExp: fechasJuicio.numeroExp,

            fechaDemanda: fechasJuicio.fechaDemanda,
            fechaContestacionDemanda: fechasJuicio.fechaContestacionDemanda,
            fechaOfrecimientoPrueba: fechasJuicio.fechaOfrecimientoPrueba,
            fechaAudienciaConciliacion: fechasJuicio.fechaAudienciaConciliacion,
            fechaProduccionProbatoria: fechasJuicio.fechaProduccionProbatoria,
            fechaInformeActuario: fechasJuicio.fechaInformeActuario,
            fechaAlegatos: fechaInicioAlegatos,
            fechaPaseResolver: fechasJuicio.fechaPaseResolver,
            fechaSentenciaPrimeraInstancia: fechasJuicio.fechaSentenciaPrimeraInstancia
        }

        /* LLAMAR A DB */

        axios.put(`http://localhost:3001/juicios/obligatorio/estado/${estadosJuicio.id}`, dataEstado);

        axios.put(`http://localhost:3001/juicios/obligatorio/fechas/${fechasJuicio.id}`, dataFechas);

        setEstadosJuicio(dataEstado);
        setFechasJuicio(dataFechas);

        Swal.fire({
            title: 'Estado del Juicio Modificado Correctamente',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Continuar'
        });

    }

    const handlePaseResolver = () => {

        if (fechaInicioPaseResolver === '') {

            Swal.fire({
                title: 'Por favor Indica la Fecha de Inicio de `Pase a Resolver` para continuar',
                text: '',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return
        }

        if (!estadosJuicio.alegatos) {

            Swal.fire({
                title: 'Debes Completar el Estado anterior `Alegatos` para continuar',
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

            demanda: estadosJuicio.demanda,
            contestacionDemanda: estadosJuicio.contestacionDemanda,
            ofrecimientoPrueba: estadosJuicio.ofrecimientoPrueba,
            audienciaConciliacion: estadosJuicio.audienciaConciliacion,
            produccionProbatoria: estadosJuicio.produccionProbatoria,
            informeActuario: estadosJuicio.informeActuario,
            alegatos: estadosJuicio.alegatos,
            paseResolver: true,
            sentenciaPrimeraInstancia: estadosJuicio.sentenciaPrimeraInstancia
        }

        var dataFechas = {
            id: fechasJuicio.id,
            numeroExp: fechasJuicio.numeroExp,

            fechaDemanda: fechasJuicio.fechaDemanda,
            fechaContestacionDemanda: fechasJuicio.fechaContestacionDemanda,
            fechaOfrecimientoPrueba: fechasJuicio.fechaOfrecimientoPrueba,
            fechaAudienciaConciliacion: fechasJuicio.fechaAudienciaConciliacion,
            fechaProduccionProbatoria: fechasJuicio.fechaProduccionProbatoria,
            fechaInformeActuario: fechasJuicio.fechaInformeActuario,
            fechaAlegatos: fechasJuicio.fechaAlegatos,
            fechaPaseResolver: fechaInicioPaseResolver,
            fechaSentenciaPrimeraInstancia: fechasJuicio.fechaSentenciaPrimeraInstancia
        }

        /* LLAMAR A DB */

        axios.put(`http://localhost:3001/juicios/obligatorio/estado/${estadosJuicio.id}`, dataEstado);

        axios.put(`http://localhost:3001/juicios/obligatorio/fechas/${fechasJuicio.id}`, dataFechas);

        setEstadosJuicio(dataEstado);
        setFechasJuicio(dataFechas);

        Swal.fire({
            title: 'Estado del Juicio Modificado Correctamente',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Continuar'
        });

    }

    const handleSentenciaPrim = () => {

        if (fechaInicioSentenciaPrimInstancia === '') {

            Swal.fire({
                title: 'Por favor Indica la Fecha de Inicio de `Sentencia de Primera Instancia` para continuar',
                text: '',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return
        }

        if (!estadosJuicio.paseResolver) {

            Swal.fire({
                title: 'Debes Completar el Estado anterior `Pase a Resolver` para continuar',
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

            demanda: estadosJuicio.demanda,
            contestacionDemanda: estadosJuicio.contestacionDemanda,
            ofrecimientoPrueba: estadosJuicio.ofrecimientoPrueba,
            audienciaConciliacion: estadosJuicio.audienciaConciliacion,
            produccionProbatoria: estadosJuicio.produccionProbatoria,
            informeActuario: estadosJuicio.informeActuario,
            alegatos: estadosJuicio.alegatos,
            paseResolver: estadosJuicio.paseResolver,
            sentenciaPrimeraInstancia: true
        }

        var dataFechas = {
            id: fechasJuicio.id,
            numeroExp: fechasJuicio.numeroExp,

            fechaDemanda: fechasJuicio.fechaDemanda,
            fechaContestacionDemanda: fechasJuicio.fechaContestacionDemanda,
            fechaOfrecimientoPrueba: fechasJuicio.fechaOfrecimientoPrueba,
            fechaAudienciaConciliacion: fechasJuicio.fechaAudienciaConciliacion,
            fechaProduccionProbatoria: fechasJuicio.fechaProduccionProbatoria,
            fechaInformeActuario: fechasJuicio.fechaInformeActuario,
            fechaAlegatos: fechasJuicio.fechaAlegatos,
            fechaPaseResolver: fechasJuicio.fechaPaseResolver,
            fechaSentenciaPrimeraInstancia: fechaInicioSentenciaPrimInstancia
        }

        /* CREAR DATOS DE EL EXPEDIENTE CAPITALPRIMERA */

        var expediente_capitalPrimera = {
            numeroExp: expediente.numeroExp,
            montoTotalReclamado: '',
            montoTotalConcedido: '',
            honorariosPCL: '',
            honorariosPrimeraInstancia: '',
            iva: '',
            cajaFinalizado: ''
        }

        /* EDITAR DATOS DE EXPEDIENTES_CAPITALES */

        var expediente_capitales = {
            id: expCapitales.id,
            numeroExp: expCapitales.numeroExp,

            capitalPrimera: true,
            capitalSegunda: expCapitales.capitalSegunda,
            capitalActualizacion: expCapitales.capitalActualizacion
        }

        /* LLAMAR A DB */

        axios.put(`http://localhost:3001/juicios/obligatorio/estado/${estadosJuicio.id}`, dataEstado);

        axios.put(`http://localhost:3001/juicios/obligatorio/fechas/${fechasJuicio.id}`, dataFechas);

        axios.post(`http://localhost:3001/expedientes/capitales/primera`, expediente_capitalPrimera).then((response) => {
            console.log('Capital Primera Creado: ', response.data);
        });

        axios.put(`http://localhost:3001/expedientes/capitales/${expCapitales.id}`, expediente_capitales);

        setEstadosJuicio(dataEstado);
        setFechasJuicio(dataFechas);

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
                        options={EstadosObligatoriosSelect}
                        onChange={setOptionValueEstado}
                        styles={customStyles}
                        isSearchable={false}
                        defaultValue={optionValueEstado}
                    />
                </div>
            </div>

            {/* ESTADOS OBLIGATORIOS */}

            <div>

                {
                    (banderaCarga)
                    &&
                    (
                        <div>

                            {/* DEMANDA */}

                            {
                                (optionValueEstado.value === '1')
                                &&
                                (
                                    <div>
                                        {
                                            (estadosJuicio.demanda)
                                                ?
                                                (
                                                    <div className='container bg-white text-dark mt-5 mb-4 p-2' style={{ borderRadius: '10px' }}>

                                                        <div className='row mt-2 mb-4'>

                                                            <div className='col-4 mt-4'>
                                                                <div className="ms-2 me-auto fs-5">
                                                                    <div className="fw-bold mb-1">
                                                                        DEMANDA
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
                                                                                name='fechaInicioDemanda'
                                                                                value={fechasJuicio.fechaDemanda}
                                                                                disabled
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className='col-2 text-center mt-4'>
                                                                <input className="form-check-input fs-2 border border-dark border-2" type="checkbox" checked onChange={() => { }} />
                                                            </div>

                                                        </div>

                                                    </div>
                                                )
                                                :
                                                (
                                                    <div className='container bg-white text-dark mt-5 mb-4 p-2' style={{ borderRadius: '10px' }}>

                                                        <div className='row mt-2 mb-4'>

                                                            <div className='col-4 mt-4'>
                                                                <div className="ms-2 me-auto fs-5">
                                                                    <div className="fw-bold mb-1">
                                                                        DEMANDA
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
                                                                                name='fechaInicioDemanda'
                                                                                value={fechaInicioDemanda}
                                                                                onChange={handleInputChange}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className='col-2 text-center mt-4'>
                                                                <button className='btn btn-dark p-2 mt-2' onClick={handleDemanda}> Actualizar </button>
                                                            </div>

                                                        </div>

                                                    </div>
                                                )
                                        }

                                    </div>
                                )
                            }


                            {/* CONTESTACION DE DEMANDA */}

                            {
                                (optionValueEstado.value === '2')
                                &&
                                (
                                    <div>
                                        {
                                            (estadosJuicio.contestacionDemanda)
                                                ?
                                                (
                                                    <div className='container bg-white text-dark mt-5 mb-4 p-2' style={{ borderRadius: '10px' }}>

                                                        <div className='row mt-2 mb-4'>

                                                            <div className='col-4 mt-4'>
                                                                <div className="ms-2 me-auto fs-5">
                                                                    <div className="fw-bold mb-1">
                                                                        CONTESTACION DE DEMANDA
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
                                                                                name='fechaInicioContestacionDemanda'
                                                                                value={fechasJuicio.fechaContestacionDemanda}
                                                                                disabled
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className='col-2 text-center mt-4'>
                                                                <input className="form-check-input fs-2 border border-dark border-2" type="checkbox" checked onChange={() => { }} />
                                                            </div>

                                                        </div>

                                                    </div>
                                                )
                                                :
                                                (
                                                    <div className='container bg-white text-dark mt-5 mb-4 p-2' style={{ borderRadius: '10px' }}>

                                                        <div className='row mt-2 mb-4'>

                                                            <div className='col-4 mt-4'>
                                                                <div className="ms-2 me-auto fs-5">
                                                                    <div className="fw-bold mb-1">
                                                                        CONTESTACION DE DEMANDA
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
                                                                                name='fechaInicioContestacionDemanda'
                                                                                value={fechaInicioContestacionDemanda}
                                                                                onChange={handleInputChange}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className='col-2 text-center mt-4'>
                                                                <button className='btn btn-dark p-2 mt-2' onClick={handleContestacionDem}> Actualizar </button>
                                                            </div>

                                                        </div>

                                                    </div>
                                                )
                                        }
                                    </div>
                                )
                            }


                            {/* OFRECIMIENTO DE PRUEBA */}

                            {
                                (optionValueEstado.value === '3')
                                &&
                                (
                                    <div>
                                        {
                                            (estadosJuicio.ofrecimientoPrueba)
                                                ?
                                                (
                                                    <div className='container bg-white text-dark mt-5 mb-4 p-2' style={{ borderRadius: '10px' }}>

                                                        <div className='row mt-2 mb-4'>

                                                            <div className='col-4 mt-4'>
                                                                <div className="ms-2 me-auto fs-5">
                                                                    <div className="fw-bold mb-1">
                                                                        OFRECIMIENTO DE PRUEBA
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
                                                                                name='fechaInicioOfrecimientoPrueba'
                                                                                value={fechasJuicio.fechaOfrecimientoPrueba}
                                                                                disabled
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className='col-2 text-center mt-4'>
                                                                <input className="form-check-input fs-2 border border-dark border-2" type="checkbox" checked onChange={() => { }} />
                                                            </div>

                                                        </div>

                                                    </div>
                                                )
                                                :
                                                (
                                                    <div className='container bg-white text-dark mt-5 mb-4 p-2' style={{ borderRadius: '10px' }}>

                                                        <div className='row mt-2 mb-4'>

                                                            <div className='col-4 mt-4'>
                                                                <div className="ms-2 me-auto fs-5">
                                                                    <div className="fw-bold mb-1">
                                                                        OFRECIMIENTO DE PRUEBA
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
                                                                                name='fechaInicioOfrecimientoPrueba'
                                                                                value={fechaInicioOfrecimientoPrueba}
                                                                                onChange={handleInputChange}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className='col-2 text-center mt-4'>
                                                                <button className='btn btn-dark p-2 mt-2' onClick={handleOfrecimientoP}> Actualizar </button>
                                                            </div>

                                                        </div>

                                                    </div>
                                                )
                                        }
                                    </div>
                                )
                            }


                            {/* AUDIENCIA DE CONCILIACION */}

                            {
                                (optionValueEstado.value === '4')
                                &&
                                (
                                    <div>
                                        {
                                            (estadosJuicio.audienciaConciliacion)
                                                ?
                                                (
                                                    <div className='container bg-white text-dark mt-5 mb-4 p-2' style={{ borderRadius: '10px' }}>

                                                        <div className='row mt-2 mb-4'>

                                                            <div className='col-4 mt-4'>
                                                                <div className="ms-2 me-auto fs-5">
                                                                    <div className="fw-bold mb-1">
                                                                        AUDIENCIA DE CONCILIACION
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
                                                                                name='fechaInicioAudienciaConciliacion'
                                                                                value={fechasJuicio.fechaAudienciaConciliacion}
                                                                                disabled
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className='col-2 text-center mt-4'>
                                                                <input className="form-check-input fs-2 border border-dark border-2" type="checkbox" checked onChange={() => { }} />
                                                            </div>

                                                        </div>

                                                    </div>
                                                )
                                                :
                                                (
                                                    <div className='container bg-white text-dark mt-5 mb-4 p-2' style={{ borderRadius: '10px' }}>

                                                        <div className='row mt-2 mb-4'>

                                                            <div className='col-4 mt-4'>
                                                                <div className="ms-2 me-auto fs-5">
                                                                    <div className="fw-bold mb-1">
                                                                        AUDIENCIA DE CONCILIACION
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
                                                                                name='fechaInicioAudienciaConciliacion'
                                                                                value={fechaInicioAudienciaConciliacion}
                                                                                onChange={handleInputChange}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className='col-2 text-center mt-4'>
                                                                <button className='btn btn-dark p-2 mt-2' onClick={handleAudienciaCon}> Actualizar </button>
                                                            </div>

                                                        </div>

                                                    </div>
                                                )
                                        }
                                    </div>
                                )
                            }


                            {/* PRODUCCION PROBATORIA */}

                            {
                                (optionValueEstado.value === '5')
                                &&
                                (
                                    <div>
                                        {
                                            (estadosJuicio.produccionProbatoria)
                                                ?
                                                (
                                                    <div className='container bg-white text-dark mt-5 mb-4 p-2' style={{ borderRadius: '10px' }}>

                                                        <div className='row mt-2 mb-4'>

                                                            <div className='col-4 mt-4'>
                                                                <div className="ms-2 me-auto fs-5">
                                                                    <div className="fw-bold mb-1">
                                                                        PRODUCCION PROBATORIA
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
                                                                                name='fechaInicioProduccionProb'
                                                                                value={fechasJuicio.fechaProduccionProbatoria}
                                                                                disabled
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className='col-2 text-center mt-4'>
                                                                <input className="form-check-input fs-2 border border-dark border-2" type="checkbox" checked onChange={() => { }} />
                                                            </div>

                                                        </div>

                                                    </div>
                                                )
                                                :
                                                (
                                                    <div className='container bg-white text-dark mt-5 mb-4 p-2' style={{ borderRadius: '10px' }}>

                                                        <div className='row mt-2 mb-4'>

                                                            <div className='col-4 mt-4'>
                                                                <div className="ms-2 me-auto fs-5">
                                                                    <div className="fw-bold mb-1">
                                                                        PRODUCCION PROBATORIA
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
                                                                                name='fechaInicioProduccionProb'
                                                                                value={fechaInicioProduccionProb}
                                                                                onChange={handleInputChange}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className='col-2 text-center mt-4'>
                                                                <button className='btn btn-dark p-2 mt-2' onClick={handleProduccionProb}> Actualizar </button>
                                                            </div>

                                                        </div>

                                                    </div>
                                                )
                                        }
                                    </div>
                                )
                            }


                            {/* INFORME DE ACTUARIO */}

                            {
                                (optionValueEstado.value === '6')
                                &&
                                (
                                    <div>
                                        {
                                            (estadosJuicio.informeActuario)
                                                ?
                                                (
                                                    <div className='container bg-white text-dark mt-5 mb-4 p-2' style={{ borderRadius: '10px' }}>

                                                        <div className='row mt-2 mb-4'>

                                                            <div className='col-4 mt-4'>
                                                                <div className="ms-2 me-auto fs-5">
                                                                    <div className="fw-bold mb-1">
                                                                        INFORME DE ACTUARIO
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
                                                                                name='fechaInicioInformeActuario'
                                                                                value={fechasJuicio.fechaInformeActuario}
                                                                                disabled
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className='col-2 text-center mt-4'>
                                                                <input className="form-check-input fs-2 border border-dark border-2" type="checkbox" checked onChange={() => { }} />
                                                            </div>

                                                        </div>

                                                    </div>
                                                )
                                                :
                                                (

                                                    <div className='container bg-white text-dark mt-5 mb-4 p-2' style={{ borderRadius: '10px' }}>

                                                        <div className='row mt-2 mb-4'>

                                                            <div className='col-4 mt-4'>
                                                                <div className="ms-2 me-auto fs-5">
                                                                    <div className="fw-bold mb-1">
                                                                        INFORME DE ACTUARIO
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
                                                                                name='fechaInicioInformeActuario'
                                                                                value={fechaInicioInformeActuario}
                                                                                onChange={handleInputChange}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className='col-2 text-center mt-4'>
                                                                <button className='btn btn-dark p-2 mt-2' onClick={handleInformeAct}> Actualizar </button>
                                                            </div>

                                                        </div>

                                                    </div>

                                                )
                                        }
                                    </div>
                                )
                            }


                            {/* ALEGATOS */}

                            {
                                (optionValueEstado.value === '7')
                                &&
                                (
                                    <div>
                                        {
                                            (estadosJuicio.alegatos)
                                                ?
                                                (
                                                    <div className='container bg-white text-dark mt-5 mb-4 p-2' style={{ borderRadius: '10px' }}>

                                                        <div className='row mt-2 mb-4'>

                                                            <div className='col-4 mt-4'>
                                                                <div className="ms-2 me-auto fs-5">
                                                                    <div className="fw-bold mb-1">
                                                                        ALEGATOS
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
                                                                                name='fechaInicioAlegatos'
                                                                                value={fechasJuicio.fechaAlegatos}
                                                                                disabled
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className='col-2 text-center mt-4'>
                                                                <input className="form-check-input fs-2 border border-dark border-2" type="checkbox" checked onChange={() => { }} />
                                                            </div>

                                                        </div>

                                                    </div>
                                                )
                                                :
                                                (
                                                    <div className='container bg-white text-dark mt-5 mb-4 p-2' style={{ borderRadius: '10px' }}>

                                                        <div className='row mt-2 mb-4'>

                                                            <div className='col-4 mt-4'>
                                                                <div className="ms-2 me-auto fs-5">
                                                                    <div className="fw-bold mb-1">
                                                                        ALEGATOS
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
                                                                                name='fechaInicioAlegatos'
                                                                                value={fechaInicioAlegatos}
                                                                                onChange={handleInputChange}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className='col-2 text-center mt-4'>
                                                                <button className='btn btn-dark p-2 mt-2' onClick={handleAlegatos}> Actualizar </button>
                                                            </div>

                                                        </div>

                                                    </div>
                                                )
                                        }
                                    </div>
                                )
                            }


                            {/* PASE A RESOLVER */}

                            {
                                (optionValueEstado.value === '8')
                                &&
                                (
                                    <div>
                                        {
                                            (estadosJuicio.paseResolver)
                                                ?
                                                (
                                                    <div className='container bg-white text-dark mt-5 mb-4 p-2' style={{ borderRadius: '10px' }}>

                                                        <div className='row mt-2 mb-4'>

                                                            <div className='col-4 mt-4'>
                                                                <div className="ms-2 me-auto fs-5">
                                                                    <div className="fw-bold mb-1">
                                                                        PASE A RESOLVER
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
                                                                                name='fechaInicioPaseResolver'
                                                                                value={fechasJuicio.fechaPaseResolver}
                                                                                disabled
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className='col-2 text-center mt-4'>
                                                                <input className="form-check-input fs-2 border border-dark border-2" type="checkbox" checked onChange={() => { }} />
                                                            </div>

                                                        </div>

                                                    </div>
                                                )
                                                :
                                                (
                                                    <div className='container bg-white text-dark mt-5 mb-4 p-2' style={{ borderRadius: '10px' }}>

                                                        <div className='row mt-2 mb-4'>

                                                            <div className='col-4 mt-4'>
                                                                <div className="ms-2 me-auto fs-5">
                                                                    <div className="fw-bold mb-1">
                                                                        PASE A RESOLVER
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
                                                                                name='fechaInicioPaseResolver'
                                                                                value={fechaInicioPaseResolver}
                                                                                onChange={handleInputChange}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className='col-2 text-center mt-4'>
                                                                <button className='btn btn-dark p-2 mt-2' onClick={handlePaseResolver}> Actualizar </button>
                                                            </div>

                                                        </div>

                                                    </div>
                                                )
                                        }
                                    </div>
                                )
                            }


                            {/* SENTENCIA DE PRIMERA INSTANCIA */}

                            {
                                (optionValueEstado.value === '9')
                                &&
                                (
                                    <div>
                                        {
                                            (estadosJuicio.sentenciaPrimeraInstancia)
                                                ?
                                                (
                                                    <div className='container bg-white text-dark mt-5 mb-4 p-2' style={{ borderRadius: '10px' }}>

                                                        <div className='row mt-2 mb-4'>

                                                            <div className='col-4 mt-4'>
                                                                <div className="ms-2 me-auto fs-5">
                                                                    <div className="fw-bold mb-1">
                                                                        SENTENCIA DE PRIMERA INSTANCIA
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
                                                                                name='fechaInicioSentenciaPrimInstancia'
                                                                                value={fechasJuicio.fechaSentenciaPrimeraInstancia}
                                                                                disabled
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className='col-2 text-center mt-4'>
                                                                <input className="form-check-input fs-2 border border-dark border-2" type="checkbox" checked onChange={() => { }} />
                                                            </div>

                                                        </div>

                                                    </div>
                                                )
                                                :
                                                (
                                                    <div className='container bg-white text-dark mt-5 mb-4 p-2' style={{ borderRadius: '10px' }}>

                                                        <div className='row mt-2 mb-4'>

                                                            <div className='col-4 mt-4'>
                                                                <div className="ms-2 me-auto fs-5">
                                                                    <div className="fw-bold mb-1">
                                                                        SENTENCIA DE PRIMERA INSTANCIA
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
                                                                                name='fechaInicioSentenciaPrimInstancia'
                                                                                value={fechaInicioSentenciaPrimInstancia}
                                                                                onChange={handleInputChange}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className='col-2 text-center mt-4'>
                                                                <button className='btn btn-dark p-2 mt-2' onClick={handleSentenciaPrim}> Actualizar </button>
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

        </div >
    )
}
