
export const getExpedientesByID = (id, expedientes) => {

    return expedientes.find(exp => exp.id === id);

}

export const getExpedientesByName = (name, expedientes) => {

    if (name === '') {
        return [];
    }

    name = name.toLowerCase();
    return expedientes.filter(exp => exp.nombreExp.toLowerCase().includes(name));

}

export const getExpedientesByNumber = (number, expedientes) => {

    if (number === '') {
        return [];
    }

    number = number.toLowerCase();
    return expedientes.filter(exp => exp.numeroExp.toLowerCase().includes(number));

}

export const getExpedienteByNumberExpUnico = (number, expedientes) => {

    if (number === '') {
        return [];
    }

    number = number.toLowerCase();
    return expedientes.find(exp => exp.numeroExp === number);

}

export const getEstadosJuicio = (expediente, Juicios) => {

    if (expediente === '') {
        return [];
    }

    expediente = expediente.toLowerCase();
    return Juicios.find(juicio => juicio.numeroExp === expediente);

}

export const getFechasJuicio = (expediente, Fechas) => {

    if (expediente === '') {
        return [];
    }

    expediente = expediente.toLowerCase();
    return Fechas.find(fecha => fecha.numeroExp === expediente);

}

export const getLabelExpediente = (expediente) => {

    var expLabel = {
        label: '',
        value: ''
    }

    if (expediente.finalizado) {
        expLabel.label = 'Completado'
        expLabel.value = '1'
    } else {
        expLabel.label = 'En Proceso'
        expLabel.value = '0'
    }

    return expLabel

}

export const getLabelSecretaria = (secretaria) => {


    var scLabel = {
        label: '',
        value: ''
    }

    if (secretaria.estado) {
        scLabel.label = 'Completado'
        scLabel.value = '1'
    } else {
        scLabel.label = 'En Proceso'
        scLabel.value = '0'
    }

    return scLabel

}

export const getCantidadJuicios = (expedientes) => {

    var total = expedientes.length;
    var activos = 0;
    var finalizados = 0;

    expedientes.forEach(expediente => {

        if (!expediente.finalizado) {
            activos++;
        } else {
            finalizados++;
        }

    });

    return [total, activos, finalizados];

}

export const getExpedientesIndividuales = (expedientes) => {

    var expedientesIndividuales = [];

    expedientes.forEach(exp => {
        if (exp.tipoDemanda === 'Individual') {
            expedientesIndividuales.push(exp);
        }
    });

    return expedientesIndividuales;

}

export const getExpedientesColectivos = (expedientes) => {

    var expedientesColectivos = [];

    expedientes.forEach(exp => {
        if (exp.tipoDemanda === 'Colectiva') {
            expedientesColectivos.push(exp);
        }
    });

    return expedientesColectivos;

}

export const getEstadosObligatoriosExpediente = (expediente, Estados) => {

    var estadosJuicio = {};

    Estados.forEach(estado => {
        if (estado.numeroExp === expediente.numeroExp) {
            estadosJuicio = estado;
        }
    });

    return estadosJuicio;

}

export const getCapitalesExpediente = (numeroExp, Capitales) => {

    if (numeroExp === '') {
        return [];
    }

    numeroExp = numeroExp.toLowerCase();
    return Capitales.find(capital => capital.numeroExp === numeroExp);

}

export const getFichaCapitalExpediente = (numeroExp, Fichas) => {

    if (numeroExp === '') {
        return [];
    }

    numeroExp = numeroExp.toLowerCase();
    return Fichas.find(ficha => ficha.numeroExp === numeroExp);

}

export const getFichasSecretaria = (Fichas, Clientes) => {

    var fichasFinal = [];

    var fichaObj = {
        ficha: {},
        cliente: {}
    }

    Fichas.forEach(ficha => {

        fichaObj = {
            ficha: {},
            cliente: {}
        }

        Clientes.forEach(cliente => {
            if (ficha.cc_cliente === cliente.cuit_cuil) {
                fichaObj = {
                    ficha: ficha,
                    cliente: cliente
                }
            }
        });

        fichasFinal.push(fichaObj);
    });

    return fichasFinal;
}

export const getEstadoRegisterExpediente = (numExp, nombreExp, juzgado, capitalColectivo, optionValueAbAp, optionValueAbGs, Swal, listofClientes, acumulador) => {

    var state = true;

    if (numExp === '' || nombreExp === '' || juzgado === '' || capitalColectivo === '' || JSON.stringify(optionValueAbAp) === '{}' || JSON.stringify(optionValueAbGs) === '{}') {
        Swal.fire({
            title: 'Por favor Completa todos los Campos Antes de Continuar',
            text: '',
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Continuar'
        });

        state = false;

        return state
    }

    if (listofClientes.length === 0) {

        Swal.fire({
            title: 'No has Agregado ningun Cliente en el Expediente',
            text: '',
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Continuar'
        });

        state = false;

        return state
    }

    if (acumulador !== parseInt(capitalColectivo)) {

        Swal.fire({
            title: 'El Capital Colectivo reclamado no coincide con la suma de los capitales de los clientes declarados.',
            text: '',
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Continuar'
        });

        state = false;

        return state

    }

    return state;

}

export const crearFichasExpedienteCliente = (clientes, numeroExp) => {

    var data = {
        numeroExp: numeroExp,
        cuit_cuil: '',
        capitalReclamado: '',
        capitalOtorgado: '',
    }

    var fichasClientes = [];

    clientes.forEach(cliente => {

        data = {

            numeroExp: numeroExp,
            cuit_cuil: '',
            capitalReclamado: '',
            capitalOtorgado: '',
        }

        data.cuit_cuil = cliente.cliente.cuit_cuil;
        data.capitalReclamado = cliente.capitalReclamado

        fichasClientes.push(data);

    });


    return fichasClientes;

}

export const crearFichasEstadoClientes = (clientes, Estado_Cliente) => {

    var data = {
        id: '',
        cc_cliente: '',

        vJuicio: '',
        vSecretaria: '',
        puedeAbandonar: '',

        estadoActividad: '',
        estadoOperacion: ''
    }

    var fichasEstados = [];

    Estado_Cliente.forEach(estado => {

        data = {
            id: '',
            cc_cliente: '',
    
            vJuicio: '',
            vSecretaria: '',
            puedeAbandonar: '',
    
            estadoActividad: '',
            estadoOperacion: ''
        }

        clientes.forEach(cliente => {
            
            if(estado.cc_cliente === cliente.cliente.cuit_cuil){
                data.id = estado.id;
                data.cc_cliente = estado.cc_cliente;

                data.vJuicio = estado.vJuicio;
                data.vSecretaria = estado.vSecretaria;
                data.puedeAbandonar = false;

                data.estadoActividad = estado.estadoActividad;
                data.estadoOperacion = 'En Juicio'

                fichasEstados.push(data);

            }

        });

    });

    return fichasEstados;

}

/* -------------------------------------------------------------- */

export const getExpedientesFilter = (optionValueAbAp, optionValueAbGs, optionValueTipoDemanda, optionValueCallCenter, nroJuzgado, Expedientes) => {

    var expedientesReturn = [];

    var abogadoAp = optionValueAbAp.label;
    var abogadoGs = optionValueAbGs.label;
    var tipoDemanda = optionValueTipoDemanda.label;
    var callCenter = optionValueCallCenter.label;
    var juzgado = nroJuzgado;

/*     console.log('Abogado Apoderado: ', abogadoAp);
    console.log('Abogado Gestor: ', abogadoGs);
    console.log('Tipo de Demanda: ', tipoDemanda);
    console.log('CallCenter: ', callCenter);
    console.log('Nro Juzgado: ', juzgado);
    console.log('-------------------------------'); */

    /* PROBABILIDADES */

    /*  1]  AbogadoAp = TODOS | AbogadoGs = TODOS | TipoDemanda = TODOS | CallCenter = TODOS | Juzgado = TODOS  */

    if (abogadoAp === 'TODOS' && abogadoGs === 'TODOS' && tipoDemanda === 'TODOS' && callCenter === 'TODOS' && juzgado === '') {
        return expedientesReturn = Expedientes;
    }

    /*  2 ]  AbogadoAp = TODOS | AbogadoGs = TODOS | TipoDemanda = TODOS | CallCenter = TODOS | Juzgado = 'Opcion'  */

    if (abogadoAp === 'TODOS' && abogadoGs === 'TODOS' && tipoDemanda === 'TODOS' && callCenter === 'TODOS' && juzgado !== '') {

        Expedientes.forEach(exp => {
            if (exp.juzgado === juzgado) {
                expedientesReturn.push(exp);
            }
        });

        return expedientesReturn;
    }

    /*  3 ]  AbogadoAp = TODOS | AbogadoGs = TODOS | TipoDemanda = 'Opcion' | CallCenter = TODOS | Juzgado = TODOS  */

    if (abogadoAp === 'TODOS' && abogadoGs === 'TODOS' && tipoDemanda !== 'TODOS' && callCenter === 'TODOS' && juzgado === '') {

        Expedientes.forEach(exp => {
            if (exp.tipoDemanda === tipoDemanda) {
                expedientesReturn.push(exp);
            }
        });

        return expedientesReturn;
    }

    /*  4 ]  AbogadoAp = TODOS | AbogadoGs = TODOS | TipoDemanda = 'Opcion' | CallCenter = TODOS | Juzgado = 'Opcion'  */

    if (abogadoAp === 'TODOS' && abogadoGs === 'TODOS' && tipoDemanda !== 'TODOS' && callCenter === 'TODOS' && juzgado !== '') {

        Expedientes.forEach(exp => {
            if (
                (exp.tipoDemanda === tipoDemanda) &&
                (exp.juzgado === juzgado)
            ) {
                expedientesReturn.push(exp);
            }
        });

        return expedientesReturn;
    }

    /*  5 ]  AbogadoAp = TODOS | AbogadoGs = TODOS | TipoDemanda = TODOS | CallCenter = 'Opcion' | Juzgado = TODOS  */

    if (abogadoAp === 'TODOS' && abogadoGs === 'TODOS' && tipoDemanda === 'TODOS' && callCenter !== 'TODOS' && juzgado === '') {

        Expedientes.forEach(exp => {
            if (
                (exp.empresaDemandada === callCenter)
            ) {
                expedientesReturn.push(exp);
            }
        });

        return expedientesReturn;
    }

    /*  6 ]  AbogadoAp = TODOS | AbogadoGs = TODOS | TipoDemanda = TODOS | CallCenter = 'Opcion' | Juzgado = 'Opcion'  */

    if (abogadoAp === 'TODOS' && abogadoGs === 'TODOS' && tipoDemanda === 'TODOS' && callCenter !== 'TODOS' && juzgado !== '') {

        Expedientes.forEach(exp => {
            if (
                (exp.empresaDemandada === callCenter) &&
                (exp.juzgado === juzgado)
            ) {
                expedientesReturn.push(exp);
            }
        });

        return expedientesReturn;
    }

    /*  7 ]  AbogadoAp = TODOS | AbogadoGs = TODOS | TipoDemanda = 'Opcion' | CallCenter = 'Opcion' | Juzgado = TODOS  */

    if (abogadoAp === 'TODOS' && abogadoGs === 'TODOS' && tipoDemanda !== 'TODOS' && callCenter !== 'TODOS' && juzgado === '') {

        Expedientes.forEach(exp => {
            if (
                (exp.empresaDemandada === callCenter) &&
                (exp.tipoDemanda === tipoDemanda)
            ) {
                expedientesReturn.push(exp);
            }
        });

        return expedientesReturn;
    }

    /*  8 ]  AbogadoAp = TODOS | AbogadoGs = TODOS | TipoDemanda = 'Opcion' | CallCenter = 'Opcion' | Juzgado = 'Opcion'  */

    if (abogadoAp === 'TODOS' && abogadoGs === 'TODOS' && tipoDemanda !== 'TODOS' && callCenter !== 'TODOS' && juzgado !== '') {

        Expedientes.forEach(exp => {
            if (
                (exp.empresaDemandada === callCenter) &&
                (exp.tipoDemanda === tipoDemanda) &&
                (exp.juzgado === juzgado)
            ) {
                expedientesReturn.push(exp);
            }
        });

        return expedientesReturn;
    }

    /*  9 ]  AbogadoAp = TODOS | AbogadoGs = 'Opcion' | TipoDemanda = TODOS | CallCenter = TODOS | Juzgado = TODOS  */

    if (abogadoAp === 'TODOS' && abogadoGs !== 'TODOS' && tipoDemanda === 'TODOS' && callCenter === 'TODOS' && juzgado === '') {

        Expedientes.forEach(exp => {
            if (
                (exp.abogadoGs === abogadoGs)
            ) {
                expedientesReturn.push(exp);
            }
        });

        return expedientesReturn;
    }

    /*  10 ]  AbogadoAp = TODOS | AbogadoGs = 'Opcion' | TipoDemanda = TODOS | CallCenter = TODOS | Juzgado = 'Opcion'  */

    if (abogadoAp === 'TODOS' && abogadoGs !== 'TODOS' && tipoDemanda === 'TODOS' && callCenter === 'TODOS' && juzgado !== '') {

        Expedientes.forEach(exp => {
            if (
                (exp.abogadoGs === abogadoGs) &&
                (exp.juzgado === juzgado)
            ) {
                expedientesReturn.push(exp);
            }
        });

        return expedientesReturn;
    }

    /*  11 ]  AbogadoAp = TODOS | AbogadoGs = 'Opcion' | TipoDemanda = 'Opcion' | CallCenter = TODOS | Juzgado = TODOS  */

    if (abogadoAp === 'TODOS' && abogadoGs !== 'TODOS' && tipoDemanda !== 'TODOS' && callCenter === 'TODOS' && juzgado === '') {

        Expedientes.forEach(exp => {
            if (
                (exp.abogadoGs === abogadoGs) &&
                (exp.tipoDemanda === tipoDemanda)
            ) {
                expedientesReturn.push(exp);
            }
        });

        return expedientesReturn;
    }

    /*  12 ]  AbogadoAp = TODOS | AbogadoGs = 'Opcion' | TipoDemanda = 'Opcion' | CallCenter = TODOS | Juzgado = 'Opcion'  */

    if (abogadoAp === 'TODOS' && abogadoGs !== 'TODOS' && tipoDemanda !== 'TODOS' && callCenter === 'TODOS' && juzgado !== '') {

        Expedientes.forEach(exp => {
            if (
                (exp.abogadoGs === abogadoGs) &&
                (exp.tipoDemanda === tipoDemanda) &&
                (exp.juzgado === juzgado)
            ) {
                expedientesReturn.push(exp);
            }
        });

        return expedientesReturn;
    }

    /*  13 ]  AbogadoAp = TODOS | AbogadoGs = 'Opcion' | TipoDemanda = TODOS | CallCenter = 'Opcion' | Juzgado = TODOS  */

    if (abogadoAp === 'TODOS' && abogadoGs !== 'TODOS' && tipoDemanda === 'TODOS' && callCenter !== 'TODOS' && juzgado === '') {

        Expedientes.forEach(exp => {
            if (
                (exp.abogadoGs === abogadoGs) &&
                (exp.empresaDemandada === callCenter)
            ) {
                expedientesReturn.push(exp);
            }
        });

        return expedientesReturn;
    }

    /*  14 ]  AbogadoAp = TODOS | AbogadoGs = 'Opcion' | TipoDemanda = TODOS | CallCenter = 'Opcion' | Juzgado = 'Opcion'  */

    if (abogadoAp === 'TODOS' && abogadoGs !== 'TODOS' && tipoDemanda === 'TODOS' && callCenter !== 'TODOS' && juzgado !== '') {

        Expedientes.forEach(exp => {
            if (
                (exp.abogadoGs === abogadoGs) &&
                (exp.empresaDemandada === callCenter) &&
                (exp.juzgado === juzgado)
            ) {
                expedientesReturn.push(exp);
            }
        });

        return expedientesReturn;
    }

    /*  15 ]  AbogadoAp = TODOS | AbogadoGs = 'Opcion' | TipoDemanda = 'Opcion' | CallCenter = 'Opcion' | Juzgado = TODOS  */

    if (abogadoAp === 'TODOS' && abogadoGs !== 'TODOS' && tipoDemanda !== 'TODOS' && callCenter !== 'TODOS' && juzgado === '') {

        Expedientes.forEach(exp => {
            if (
                (exp.abogadoGs === abogadoGs) &&
                (exp.empresaDemandada === callCenter) &&
                (exp.tipoDemanda === tipoDemanda)
            ) {
                expedientesReturn.push(exp);
            }
        });

        return expedientesReturn;
    }

    /*  16 ]  AbogadoAp = TODOS | AbogadoGs = 'Opcion' | TipoDemanda = 'Opcion' | CallCenter = 'Opcion' | Juzgado = 'Opcion'  */

    if (abogadoAp === 'TODOS' && abogadoGs !== 'TODOS' && tipoDemanda !== 'TODOS' && callCenter !== 'TODOS' && juzgado !== '') {

        Expedientes.forEach(exp => {
            if (
                (exp.abogadoGs === abogadoGs) &&
                (exp.tipoDemanda === tipoDemanda) &&
                (exp.empresaDemandada === callCenter) &&
                (exp.juzgado === juzgado)
            ) {
                expedientesReturn.push(exp);
            }
        });

        return expedientesReturn;
    }

    /*  17 ]  AbogadoAp = 'Opcion' | AbogadoGs = TODOS | TipoDemanda = TODOS | CallCenter = TODOS | Juzgado = TODOS  */

    if (abogadoAp !== 'TODOS' && abogadoGs === 'TODOS' && tipoDemanda === 'TODOS' && callCenter === 'TODOS' && juzgado === '') {

        Expedientes.forEach(exp => {
            if (
                (exp.abogadoAp.includes(abogadoAp))
            ) {
                expedientesReturn.push(exp);
            }
        });

        return expedientesReturn;
    }

    /*  18 ]  AbogadoAp = 'Opcion' | AbogadoGs = TODOS | TipoDemanda = TODOS | CallCenter = TODOS | Juzgado = 'Opcion'  */

    if (abogadoAp !== 'TODOS' && abogadoGs === 'TODOS' && tipoDemanda === 'TODOS' && callCenter === 'TODOS' && juzgado !== '') {

        Expedientes.forEach(exp => {
            if (
                (exp.juzgado === juzgado) &&
                (exp.abogadoAp.includes(abogadoAp))
            ) {
                expedientesReturn.push(exp);
            }
        });

        return expedientesReturn;
    }

    /*  19 ]  AbogadoAp = 'Opcion' | AbogadoGs = TODOS | TipoDemanda = 'Opcion' | CallCenter = TODOS | Juzgado = TODOS  */

    if (abogadoAp !== 'TODOS' && abogadoGs === 'TODOS' && tipoDemanda !== 'TODOS' && callCenter === 'TODOS' && juzgado === '') {

        Expedientes.forEach(exp => {
            if (
                (exp.tipoDemanda === tipoDemanda) &&
                (exp.abogadoAp.includes(abogadoAp))
            ) {
                expedientesReturn.push(exp);
            }
        });

        return expedientesReturn;
    }

    /*  20 ]  AbogadoAp = 'Opcion' | AbogadoGs = TODOS | TipoDemanda = 'Opcion' | CallCenter = TODOS | Juzgado = 'Opcion'  */

    if (abogadoAp !== 'TODOS' && abogadoGs === 'TODOS' && tipoDemanda !== 'TODOS' && callCenter === 'TODOS' && juzgado !== '') {

        Expedientes.forEach(exp => {
            if (
                (exp.tipoDemanda === tipoDemanda) &&
                (exp.juzgado === juzgado) &&
                (exp.abogadoAp.includes(abogadoAp))
            ) {
                expedientesReturn.push(exp);
            }
        });

        return expedientesReturn;
    }

    /*  21 ]  AbogadoAp = 'Opcion' | AbogadoGs = TODOS | TipoDemanda = TODOS | CallCenter = 'Opcion' | Juzgado = TODOS  */

    if (abogadoAp !== 'TODOS' && abogadoGs === 'TODOS' && tipoDemanda === 'TODOS' && callCenter !== 'TODOS' && juzgado === '') {

        Expedientes.forEach(exp => {
            if (
                (exp.empresaDemandada === callCenter) &&
                (exp.abogadoAp.includes(abogadoAp))
            ) {
                expedientesReturn.push(exp);
            }
        });

        return expedientesReturn;
    }

    /*  22 ]  AbogadoAp = 'Opcion' | AbogadoGs = TODOS | TipoDemanda = TODOS | CallCenter = 'Opcion' | Juzgado = 'Opcion'  */

    if (abogadoAp !== 'TODOS' && abogadoGs === 'TODOS' && tipoDemanda === 'TODOS' && callCenter !== 'TODOS' && juzgado !== '') {

        Expedientes.forEach(exp => {
            if (
                (exp.empresaDemandada === callCenter) &&
                (exp.juzgado === juzgado) &&
                (exp.abogadoAp.includes(abogadoAp))
            ) {
                expedientesReturn.push(exp);
            }
        });

        return expedientesReturn;
    }

    /*  23 ]  AbogadoAp = TODOS | AbogadoGs = TODOS | TipoDemanda = 'Opcion' | CallCenter = 'Opcion' | Juzgado = TODOS  */

    if (abogadoAp !== 'TODOS' && abogadoGs === 'TODOS' && tipoDemanda !== 'TODOS' && callCenter !== 'TODOS' && juzgado === '') {

        Expedientes.forEach(exp => {
            if (
                (exp.empresaDemandada === callCenter) &&
                (exp.tipoDemanda === tipoDemanda) &&
                (exp.abogadoAp.includes(abogadoAp))
            ) {
                expedientesReturn.push(exp);
            }
        });

        return expedientesReturn;
    }

    /*  24 ]  AbogadoAp = 'Opcion' | AbogadoGs = TODOS | TipoDemanda = 'Opcion' | CallCenter = 'Opcion' | Juzgado = 'Opcion'  */

    if (abogadoAp !== 'TODOS' && abogadoGs === 'TODOS' && tipoDemanda !== 'TODOS' && callCenter !== 'TODOS' && juzgado !== '') {

        Expedientes.forEach(exp => {
            if (
                (exp.empresaDemandada === callCenter) &&
                (exp.tipoDemanda === tipoDemanda) &&
                (exp.juzgado === juzgado) &&
                (exp.abogadoAp.includes(abogadoAp))
            ) {
                expedientesReturn.push(exp);
            }
        });

        return expedientesReturn;
    }

    /*  25 ]  AbogadoAp = 'Opcion' | AbogadoGs = 'Opcion' | TipoDemanda = TODOS | CallCenter = TODOS | Juzgado = TODOS  */

    if (abogadoAp !== 'TODOS' && abogadoGs !== 'TODOS' && tipoDemanda === 'TODOS' && callCenter === 'TODOS' && juzgado === '') {

        Expedientes.forEach(exp => {
            if (
                (exp.abogadoGs === abogadoGs) &&
                (exp.abogadoAp.includes(abogadoAp))
            ) {
                expedientesReturn.push(exp);
            }
        });

        return expedientesReturn;
    }

    /*  26 ]  AbogadoAp = 'Opcion' | AbogadoGs = 'Opcion' | TipoDemanda = TODOS | CallCenter = TODOS | Juzgado = 'Opcion'  */

    if (abogadoAp !== 'TODOS' && abogadoGs !== 'TODOS' && tipoDemanda === 'TODOS' && callCenter === 'TODOS' && juzgado !== '') {

        Expedientes.forEach(exp => {
            if (
                (exp.abogadoGs === abogadoGs) &&
                (exp.juzgado === juzgado) &&
                (exp.abogadoAp.includes(abogadoAp))
            ) {
                expedientesReturn.push(exp);
            }
        });

        return expedientesReturn;
    }

    /*  27 ]  AbogadoAp = 'Opcion' | AbogadoGs = 'Opcion' | TipoDemanda = 'Opcion' | CallCenter = TODOS | Juzgado = TODOS  */

    if (abogadoAp !== 'TODOS' && abogadoGs !== 'TODOS' && tipoDemanda !== 'TODOS' && callCenter === 'TODOS' && juzgado === '') {

        Expedientes.forEach(exp => {
            if (
                (exp.abogadoGs === abogadoGs) &&
                (exp.tipoDemanda === tipoDemanda) &&
                (exp.abogadoAp.includes(abogadoAp))
            ) {
                expedientesReturn.push(exp);
            }
        });

        return expedientesReturn;
    }

    /*  28 ]  AbogadoAp = 'Opcion' | AbogadoGs = 'Opcion' | TipoDemanda = 'Opcion' | CallCenter = TODOS | Juzgado = 'Opcion'  */

    if (abogadoAp !== 'TODOS' && abogadoGs !== 'TODOS' && tipoDemanda !== 'TODOS' && callCenter === 'TODOS' && juzgado !== '') {

        Expedientes.forEach(exp => {
            if (
                (exp.abogadoGs === abogadoGs) &&
                (exp.tipoDemanda === tipoDemanda) &&
                (exp.juzgado === juzgado) &&
                (exp.abogadoAp.includes(abogadoAp))
            ) {
                expedientesReturn.push(exp);
            }
        });

        return expedientesReturn;
    }

    /*  29 ]  AbogadoAp = 'Opcion' | AbogadoGs = 'Opcion' | TipoDemanda = TODOS | CallCenter = 'Opcion' | Juzgado = TODOS  */

    if (abogadoAp !== 'TODOS' && abogadoGs !== 'TODOS' && tipoDemanda === 'TODOS' && callCenter !== 'TODOS' && juzgado === '') {

        Expedientes.forEach(exp => {
            if (
                (exp.abogadoGs === abogadoGs) &&
                (exp.empresaDemandada === callCenter) &&
                (exp.abogadoAp.includes(abogadoAp))
            ) {
                expedientesReturn.push(exp);
            }
        });

        return expedientesReturn;
    }

    /*  30 ]  AbogadoAp = 'Opcion' | AbogadoGs = 'Opcion' | TipoDemanda = TODOS | CallCenter = 'Opcion' | Juzgado = 'Opcion'  */

    if (abogadoAp !== 'TODOS' && abogadoGs !== 'TODOS' && tipoDemanda === 'TODOS' && callCenter !== 'TODOS' && juzgado !== '') {

        Expedientes.forEach(exp => {
            if (
                (exp.abogadoGs === abogadoGs) &&
                (exp.empresaDemandada === callCenter) &&
                (exp.juzgado === juzgado) &&
                (exp.abogadoAp.includes(abogadoAp))
            ) {
                expedientesReturn.push(exp);
            }
        });

        return expedientesReturn;
    }

    /*  31 ]  AbogadoAp = 'Opcion' | AbogadoGs = 'Opcion' | TipoDemanda = 'Opcion' | CallCenter = 'Opcion' | Juzgado = TODOS  */

    if (abogadoAp !== 'TODOS' && abogadoGs !== 'TODOS' && tipoDemanda !== 'TODOS' && callCenter !== 'TODOS' && juzgado === '') {

        Expedientes.forEach(exp => {
            if (
                (exp.abogadoGs === abogadoGs) &&
                (exp.empresaDemandada === callCenter) &&
                (exp.tipoDemanda === tipoDemanda) &&
                (exp.abogadoAp.includes(abogadoAp))
            ) {
                expedientesReturn.push(exp);
            }
        });

        return expedientesReturn;
    }

    /*  32 ]  AbogadoAp = 'Opcion' | AbogadoGs = 'Opcion' | TipoDemanda = 'Opcion' | CallCenter = 'Opcion' | Juzgado = 'Opcion'  */

    if (abogadoAp !== 'TODOS' && abogadoGs !== 'TODOS' && tipoDemanda !== 'TODOS' && callCenter !== 'TODOS' && juzgado !== '') {

        Expedientes.forEach(exp => {
            if (
                (exp.abogadoGs === abogadoGs) &&
                (exp.tipoDemanda === tipoDemanda) &&
                (exp.empresaDemandada === callCenter) &&
                (exp.juzgado === juzgado) &&
                (exp.abogadoAp.includes(abogadoAp))
            ) {
                expedientesReturn.push(exp);
            }
        });

        return expedientesReturn;
    }

}