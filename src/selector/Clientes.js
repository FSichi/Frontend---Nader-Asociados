export const getClientesByID = (id, clientes) => {

    return clientes.find(cliente => cliente.id === id);
}

export const getClientesByName = (name, clientes) => {

    if (name === '') {
        return [];
    }

    name = name.toLowerCase();
    return clientes.filter(cliente => cliente.apellidoyNombre.toLowerCase().includes(name));

}

export const getClientesByCuitCuil = (number, clientes) => {

    if (number === '') {
        return [];
    }

    number = number.toLowerCase();
    return clientes.filter(cliente => cliente.cuit_cuil.toLowerCase().includes(number));

}

export const verificarClienteByCuitCuil = (number, clientes) => {

    var b = false

    if (number === '') {
        return b;
    }

    clientes.forEach(cliente => {

        if (cliente.cuit_cuil === number) {
            b = true;
        }

    });

    return b;

}

export const verificarClienteByEmpresa = (cliente, empresa) => {

    var b = false

    if (cliente.callCenter === empresa) {
        b = true;
    }

    return b;

}

export const verificarClienteByList = (cliente, clientes) => {

    var b = false

    clientes.forEach(cli => {

        if (cli.cliente.id === cliente.id) {
            b = true;
        }

    });

    return b;

}

export const getClientesByCuitCuilExact = (number, clientes) => {

    if (number === '') {
        return [];
    }

    number = number.toLowerCase();
    return clientes.find(cliente => cliente.cuit_cuil === number);

}

export const getClientesByAll = (search, clientes) => {


    if (search === '') {
        return [];
    }

    if (search[0] !== '0' &&
        search[0] !== '1' &&
        search[0] !== '2' &&
        search[0] !== '3' &&
        search[0] !== '4' &&
        search[0] !== '5' &&
        search[0] !== '6' &&
        search[0] !== '7' &&
        search[0] !== '8' &&
        search[0] !== '9'
    ) {

        return getClientesByName(search, clientes);

    }

    return getClientesByCuitCuil(search, clientes);

}

export const getEstadoCliente = (cc, estados) => {

    if (cc === '') {
        return [];
    }

    cc = cc.toLowerCase();
    return estados.find(estado => estado.cc_cliente === cc);

}

export const getFirmasCliente = (cc, firmas) => {

    if (cc === '') {
        return [];
    }

    cc = cc.toLowerCase();
    return firmas.find(firma => firma.cc_cliente === cc);

}

export const getTelegramasCliente = (cc, telegramas) => {

    if (cc === '') {
        return [];
    }

    cc = cc.toLowerCase();
    return telegramas.find(telegrama => telegrama.cc_cliente === cc);

}

export const getTelegramaActual = (telegramas) => {

    var telegramaActual = ''

    if (telegramas.estadoGeneral) {
        telegramaActual = 'Telegramas Completos'
        return telegramaActual;
    }

    if (telegramas.estadoT5) {
        telegramaActual = 'Telegrama 5'
        return telegramaActual;
    }

    else if (telegramas.estadoT4) {
        telegramaActual = 'Telegrama 4'
        return telegramaActual;
    }

    else if (telegramas.estadoT3) {
        telegramaActual = 'Telegrama 3'
        return telegramaActual;
    }
    else if (telegramas.estadoT2) {
        telegramaActual = 'Telegrama 2'
        return telegramaActual;
    }

    else if (telegramas.estadoT1) {
        telegramaActual = 'Telegrama 1'
        return telegramaActual;
    }

    else {
        telegramaActual = 'Ningun Tel. Enviado'
        return telegramaActual;
    }


}

export const getExpedienteCliente = (cc, expedientes) => {

    var expCliente = {};

    expedientes.forEach(exp => {

        if (exp.cuit_cuil === cc) {
            expCliente = exp;
        }

    });

    return expCliente
}

export const getEstadosTelegramas = (telegramas) => {

    if (!telegramas) {
        return [];
    }

    var estadoT1 = {
        label: '',
        value: ''
    }
    var estadoT2 = {
        label: '',
        value: ''
    }
    var estadoT3 = {
        label: '',
        value: ''
    }
    var estadoT4 = {
        label: '',
        value: ''
    }
    var estadoT5 = {
        label: '',
        value: ''
    }

    if (!telegramas.estadoT1) {
        estadoT1.label = 'En Espera'
        estadoT1.value = '1'
    }

    if (!telegramas.estadoT2) {
        estadoT2.label = 'En Espera'
        estadoT2.value = '1'
    }

    if (!telegramas.estadoT3) {
        estadoT3.label = 'En Espera'
        estadoT3.value = '1'
    }

    if (!telegramas.estadoT4) {
        estadoT4.label = 'En Espera'
        estadoT4.value = '1'
    }

    if (!telegramas.estadoT5) {
        estadoT5.label = 'En Espera'
        estadoT5.value = '1'
    }

    var estados = [estadoT1, estadoT2, estadoT3, estadoT4, estadoT5];

    return estados;


}

export const getExpedienteJuicioCliente = (numeroExp, expedientes) => {

    if (numeroExp === '') {
        return [];
    }

    numeroExp = numeroExp.toLowerCase();
    return expedientes.find(exp => exp.numeroExp === numeroExp);

}

export const getFichaSecretaria = (cc, secretaria) => {

    if (cc === '') {
        return [];
    }

    cc = cc.toLowerCase();
    return secretaria.find(exp => exp.cc_cliente === cc);

}

export const getDistribucionClientes = (estado_clientes) => {

    var telegrama = 0;
    var juicio = 0;
    var secretaria = 0;

    estado_clientes.forEach(estado => {

        if (estado.estadoOperacion === 'En Telegramas') {
            telegrama++
        }

        if (estado.estadoOperacion === 'En Juicio') {
            juicio++
        }

        if (estado.estadoOperacion === 'En Secretaria') {
            secretaria++
        }

    });

    var estados = [telegrama, juicio, secretaria];

    return estados;

}

export const getCantidadClientes = (estado_clientes) => {

    var total = estado_clientes.length;
    var activos = 0;
    var inactivos = 0;

    estado_clientes.forEach(estado => {

        if (estado.estadoActividad) {
            activos++;
        }
        else {
            inactivos++;
        }

    });

    var cantidad = [total, activos, inactivos];

    return cantidad;

}

export const getLabelEstadoCliente = (cliente) => {

    console.log('ESTADO CLIENTE: ', cliente);

    var estLabel = {
        label: '',
        value: ''
    }

    if (cliente.estadoActividad) {
        estLabel.label = 'Activo'
        estLabel.value = '1'
    } else {
        estLabel.label = 'Inactivo'
        estLabel.value = '0'
    }

    return estLabel

}

export const getLabelVoluntadCliente = (cliente) => {

    console.log('VOLUNTAD CLIENTE: ', cliente);


    var volLabel = {
        label: '',
        value: ''
    }

    if (cliente.vJuicio) {
        volLabel.label = 'Juicio'
        volLabel.value = '0'
    }

    else if (cliente.vSecretaria) {
        volLabel.label = 'Secretaria'
        volLabel.value = '1'
    }

    else {
        volLabel.label = 'Seleccionar'
        volLabel.value = '2'
    }

    return volLabel

}

export const getDataOrdenada = (cliente, formCli, formEdit, estadoCivil) => {

    var data = {
        id: cliente.id,
        apellidoyNombre: '',
        cuit_cuil: '',
        fNacimiento: '',
        estadoCivil: estadoCivil,
        telPropio: '',
        telAlternativo: '',
        correoElectronico: '',
        provincia: '',
        localidad: '',
        domicilio: '',

        callCenter: cliente.callCenter,
        sucursal: cliente.sucursal,
        tipoCese: cliente.tipoCese,
        tipoContrato: cliente.tipoContrato,
        tipoTarea: cliente.tipoTarea,
        campaña: cliente.campaña,
        fechaIngreso: cliente.fechaIngreso,
        fechaEgreso: cliente.fechaEgreso,
        periodoDias: cliente.periodoDias,
        otroDia: cliente.otroDia,
        otroHora: cliente.otroHora,
        diasEspecificos: cliente.diasEspecificos,
        horaEspDesde: cliente.horaEspDesde,
        horaEspHasta: cliente.horaEspHasta,
    }

    if (formEdit[0] === undefined) {
        data.apellidoyNombre = formCli[0]
    } else {
        data.apellidoyNombre = formEdit[0]
    }

    if (formEdit[1] === undefined) {
        data.cuit_cuil = formCli[1]
    } else {
        data.cuit_cuil = formEdit[1]
    }

    if (formEdit[2] === undefined) {
        data.fNacimiento = formCli[2]
    } else {
        data.fNacimiento = formEdit[2]
    }

    if (formEdit[3] === undefined) {
        data.telPropio = formCli[3]
    } else {
        data.correoElectronico = formEdit[3]
    }

    if (formEdit[4] === undefined) {
        data.telAlternativo = formCli[4]
    } else {
        data.telAlternativo = formEdit[4]
    }

    if (formEdit[5] === undefined) {
        data.correoElectronico = formCli[5]
    } else {
        data.correoElectronico = formEdit[5]
    }

    if (formEdit[6] === undefined) {
        data.provincia = formCli[6]
    } else {
        data.provincia = formEdit[6]
    }

    if (formEdit[7] === undefined) {
        data.localidad = formCli[7]
    } else {
        data.localidad = formEdit[7]
    }

    if (formEdit[8] === undefined) {
        data.domicilio = formCli[8]
    } else {
        data.domicilio = formEdit[8]
    }

    return data

}

export const getEstadoCivilDefault = (cliente) => {

    var estadoCivLabel = {
        label: '',
        value: ''
    }

    switch (cliente.estadoCivil) {
        case 'Soltero':
            estadoCivLabel.label = "Soltero";
            estadoCivLabel.value = '1';
            break;
        case 'Casado':
            estadoCivLabel.label = "Casado";
            estadoCivLabel.value = '2';
            break;
        case 'Divorciado':
            estadoCivLabel.label = "Divorciado";
            estadoCivLabel.value = '3';
            break;
        case 'Viudo':
            estadoCivLabel.label = "Viudo";
            estadoCivLabel.value = '4';
            break;

        default:
            break;
    }

    return estadoCivLabel;

}

export const comprobarJuicio = (estado, juicios, expCli) => {

    var expedienteCliente = {};
    var expediente = {};

    expCli.forEach(exp => {
        if (exp.cuit_cuil === estado.cc_cliente) {
            expedienteCliente = exp;
        }
    });

    juicios.forEach(exp => {
        if (exp.numeroExp === expedienteCliente.numeroExp) {
            expediente = exp;
        }
    });

    return expediente;

}

export const comprobarSecretaria = (estado, fichas) => {

    var fichaSecretaria = {};

    fichas.forEach(ficha => {

        if (ficha.cc_cliente === estado.cc_cliente) {
            fichaSecretaria = ficha;
        }

    });

    return fichaSecretaria;
}

export const getFichaExpCliente = (estado, secretarias, expedientes, expCli) => {

    var documento = {};

    switch (estado.estadoOperacion) {
        case 'En Telegramas':
            documento = {};
            break;
        case 'En Juicio':
            documento = comprobarJuicio(estado, expedientes, expCli);
            break;
        case 'En Secretaria':
            documento = comprobarSecretaria(estado, secretarias);
            break;

        default:
            break;
    }

    return documento;

}

export const getDataEstadoCliente = (cliente, estado, optionEstado, optionVoluntad) => {

    console.log('Estado: ', optionEstado);
    console.log('Voluntad: ', optionVoluntad);

    var data = {
        id: cliente.id,
        cc_cliente: cliente.cuit_cuil,

        vJuicio: '',
        vSecretaria: '',
        puedeAbandonar: true,

        estadoActividad: '',
        estadoOperacion: estado.estadoOperacion
    }

    switch (optionEstado.label) {
        case 'Activo':
            data.estadoActividad = true
            break;
        case 'Inactivo':
            data.estadoActividad = false
            break;

        default:
            break;
    }

    switch (optionVoluntad.label) {
        case 'Juicio':
            data.vJuicio = true;
            data.vSecretaria = false;
            break;
        case 'Secretaria de Trabajo':
            data.vJuicio = false;
            data.vSecretaria = true;
            break;

        default:
            break;
    }

    return data;

}

/* ---------------------------------------------------------------------------------------------- */

export const ordenarClientes = (clientes) => {

    const clientesOrdenados = clientes.sort(function (a, b) {
        return a.apellidoyNombre.localeCompare(b.apellidoyNombre)
    });

    return clientesOrdenados;
}

export const getClientesEnTelegramas = (clientes, estados, firmas, telegramas) => {

    var clientesTelegramas = [];
    var clientesReturn = [];

    var tel = false;
    var fir = false;

    clientes.forEach(cliente => {
        estados.forEach(estado => {
            if (cliente.cuit_cuil === estado.cc_cliente) {
                if (estado.estadoOperacion === 'En Telegramas') {
                    clientesTelegramas.push(cliente);
                }
            }
        });
    });


    clientesTelegramas.forEach(cliente => {

        tel = false;
        fir = false;

        telegramas.forEach(ficha => {
            if ((cliente.cuit_cuil === ficha.cc_cliente) && ficha.estadoGeneral) {
                tel = true;
            }
        });

        firmas.forEach(ficha => {
            if ((cliente.cuit_cuil === ficha.cc_cliente) && ficha.estadoGeneral) {
                fir = true;
            }
        });

        if (!tel || !fir) {
            clientesReturn.push(cliente);
        }

    });

    const clientesOrdenados = ordenarClientes(clientesReturn);

    return clientesOrdenados;
}

export const getClientesEnJuicio = (clientes, estados) => {

    var clientesJuicio = [];

    clientes.forEach(cliente => {
        estados.forEach(estado => {
            if (cliente.cuit_cuil === estado.cc_cliente) {
                if ((estado.estadoOperacion === 'En Juicio') || (estado.vJuicio && estado.estadoOperacion === 'Completado')) {
                    clientesJuicio.push(cliente);
                }
            }
        });
    });

    const clientesOrdenados = ordenarClientes(clientesJuicio);

    return clientesOrdenados;
}

export const getClientesEnSecretaria = (clientes, estados) => {

    var clientesSecretaria = [];

    clientes.forEach(cliente => {
        estados.forEach(estado => {
            if (cliente.cuit_cuil === estado.cc_cliente) {
                if ((estado.estadoOperacion === 'En Secretaria') || (estado.vSecretaria && estado.estadoOperacion === 'Completado')) {
                    clientesSecretaria.push(cliente);
                }
            }
        });
    });

    const clientesOrdenados = ordenarClientes(clientesSecretaria);

    return clientesOrdenados;
}

export const getClientesEnDemanda = (clientes, estados, firmas, telegramas) => {

    var clientesTelegramas = [];
    var clientesDemanda = [];

    var tel = false;
    var fir = false;
    var vol = false;

    clientes.forEach(cliente => {

        estados.forEach(estado => {
            if (cliente.cuit_cuil === estado.cc_cliente) {
                if (estado.estadoOperacion === 'En Telegramas') {
                    clientesTelegramas.push(cliente);
                }
            }
        });

    });

    clientesTelegramas.forEach(cliente => {

        tel = false;
        fir = false;
        vol = false;

        telegramas.forEach(ficha => {
            if ((cliente.cuit_cuil === ficha.cc_cliente) && ficha.estadoGeneral) {
                tel = true;
            }
        });

        firmas.forEach(ficha => {
            if ((cliente.cuit_cuil === ficha.cc_cliente) && ficha.estadoGeneral) {
                fir = true;
            }
        });

        estados.forEach(estado => {
            if (cliente.cuit_cuil === estado.cc_cliente) {
                if (estado.vJuicio || estado.vSecretaria) {
                    vol = true;
                }
            }
        });

        if (tel && fir && vol) {
            clientesDemanda.push(cliente);
        }

    });

    const clientesOrdenados = ordenarClientes(clientesDemanda);

    return clientesOrdenados;
}

export const getPosiblesClientes = (callCenter, clientes, estados, firmas, telegramas) => {

    if (callCenter === undefined) {
        return [];
    }

    var clientesAll = getClientesEnDemanda(clientes, estados, firmas, telegramas);

    var clientesReturn = [];

    clientesAll.forEach(cliente => {

        if (cliente.callCenter === callCenter) {
            clientesReturn.push(cliente);
        }

    });

    return clientesReturn;

}

/* ---------------------------------------------------------------------------------------------- */

export const getEstadoAddExpediente = (optionValueCall, searchFilter, capitalReclamado, Swal, Clientes, listofClientes, Estados, Telegramas, Firmas, Expediente_Cliente) => {

    var state = true;

    /* VERIFICAR INPUTS */

    if (JSON.stringify(optionValueCall) === '{}') {
        Swal.fire({
            title: 'Antes de Agregar un Cliente por favor Seleccione una Empresa',
            text: '',
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Continuar'
        });

        state = false;

        return state;
    }

    if (searchFilter === '') {
        Swal.fire({
            title: 'Ingresa el Cuit/Cuil del Cliente Para Poder Encontrarlo',
            text: '',
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Continuar'
        });

        state = false;

        return state;
    }

    if (capitalReclamado === '') {
        Swal.fire({
            title: 'Ingresa el Capital Reclamado Correspondiente al Cliente',
            text: '',
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Continuar'
        });

        state = false;

        return state;
    }

    /* VERIFICAR ERRORES */

    const b = verificarClienteByCuitCuil(searchFilter, Clientes);

    if (!b) {

        Swal.fire({
            title: 'El Cliente que intentas buscar no existe.',
            text: 'Por favor verifica que los datos ingresados sean correctos e intenta de nuevo',
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Continuar'
        });

        state = false;

        return state;

    } else {

        /* OBTENER TODOS LOS DATOS DEL CLIENTE. */

        const cliente = getClientesByCuitCuilExact(searchFilter, Clientes);
        const estadoCliente = getEstadoCliente(cliente.cuit_cuil, Estados);
        const telegramasCliente = getTelegramasCliente(cliente.cuit_cuil, Telegramas);
        const firmasCliente = getFirmasCliente(cliente.cuit_cuil, Firmas);


        /* VERIFICACIONES */

        /* 
            COMPROBAR QUE: 
            1- EL CLIENTE PERTENECE A LA EMPRESA SELECCIONADA
            2- EL CLIENTE TIENE TODOS LOS TELEGRAMAS ENVIADOS
            3- EL CLIENTE TIENE TODAS LAS FIRMAS REALIZADAS
            4- EL CLIENTE TIENE LA VOLUNTAD DE JUICIO EN TRUE
            5- EL CLIENTE TIENE EL ESTADO DE OPERACION EN 'EN TELEGRAMAS'.
            6- EL CLIENTE NO HA SIDO AGREGADO A UN EXPEDIENTE
            7- EL CLIENTE NO HA SIDO AGREGADO A LA LISTA. 
        */

        const c1 = verificarClienteByEmpresa(cliente, optionValueCall.label);

        const c2 = telegramasCliente.estadoGeneral;

        const c3 = firmasCliente.estadoGeneral;

        const c4 = estadoCliente.vJuicio;

        const c5 = estadoCliente.estadoOperacion;

        const c6 = verificarExpedienteCliente(cliente.cuit_cuil, Expediente_Cliente);

        const c7 = verificarClienteByList(cliente, listofClientes);

        if (!c1) {

            Swal.fire({
                title: 'El Cliente que intentas Agregar no pertenece a la Empresa Seleccionada.',
                text: 'Por favor verifica que los clientes que agregas coincidan con los parametros establecidos',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            state = false;

            return state;
        }

        if (c7) {

            Swal.fire({
                title: 'El Cliente que intentas Agregar ya pertenece a la Lista',
                text: '',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            state = false;

            return state;
        }

        if (!c2) {

            Swal.fire({
                title: 'El Cliente que intentas Agregar No Termino de Enviar todos sus Telegramas',
                text: 'Por favor verifica que los clientes cumplan con las condiciones para ser agregados a un Expediente',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            state = false;

            return state;
        }

        if (!c3) {

            Swal.fire({
                title: 'El Cliente que intentas Agregar No Firmo Poder y/o Pacto C.L',
                text: 'Por favor verifica que los clientes cumplan con las condiciones para ser agregados a un Expediente',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            state = false;

            return state;
        }

        if (!c4) {

            Swal.fire({
                title: 'El Cliente que intentas Agregar No Tiene la Voluntad definida en Juicio.',
                text: 'Por favor verifica que los clientes cumplan con las condiciones para ser agregados a un Expediente',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            state = false;

            return state;
        }

        if (c5 !== 'En Telegramas') {

            Swal.fire({
                title: 'El Cliente que intentas Agregar Ya Pertenece a un Expediente o Ficha de Secretaria',
                text: 'Por favor verifica que los clientes cumplan con las condiciones para ser agregados a un Expediente',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            state = false;

            return state;
        }

        if (!c6) {

            Swal.fire({
                title: 'El Cliente que intentas Agregar Ya Pertenece a un Expediente',
                text: 'Por favor verifica que los clientes cumplan con las condiciones para ser agregados a un Expediente',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            state = false;

            return state;
        }

        return state
    }

}

export const verificarExpedienteCliente = (cc, expedientesClientes) => {

    var state = true;

    expedientesClientes.forEach(exp => {
        if (exp.cuit_cuil === cc) {
            state = false;
        }
    });

    return state;

}

export const establecerAcumulador = (clientes) => {

    var acumulador = 0;

    clientes.forEach(cliente => {
        acumulador = acumulador + parseInt(cliente.capitalReclamado);
    });

    return acumulador;

}

/* ---------------------------------------------------------------------------------------------- */

export const getExpedienteExactCliente = (cc, expedientesCli, expedientes) => {

    var expCliente = {};
    var expediente = {};

    expedientesCli.forEach(exp => {
        if (exp.cuit_cuil === cc) {
            expCliente = exp;
        }
    });

    expedientes.forEach(exp => {
        if (exp.numeroExp === expCliente.numeroExp) {
            expediente = exp;
        }
    });

    return expediente

}

/* ---------------------------------------------------------------------------------------------- */

export const getClientesFilter = (optionCall, optionCese, optionEstado, Clientes, Estado_Clientes) => {

    var clientesReturn = [];

    var callCenter = optionCall.label;
    var tipoCese = optionCese.label;
    var estadoOperacion = optionEstado.label;

    /* PRIMERA ALTERNATIVA -->  callCenter = TODOS | tipoCese = TODOS | estadoOperacion = TODOS */

    if (callCenter === 'TODOS' && tipoCese === 'TODOS' && estadoOperacion === 'TODOS') {
        return clientesReturn = Clientes;
    }

    /* SEGUNDA ALTERNATIVA -->  callCenter = TODOS | tipoCese = TODOS | estadoOperacion = 'Opcion Seleccionada' */

    if (callCenter === 'TODOS' && tipoCese === 'TODOS' && estadoOperacion !== 'TODOS') {

        Clientes.forEach(cliente => {

            Estado_Clientes.forEach(estado => {

                if (
                    (estado.cc_cliente === cliente.cuit_cuil) &&
                    (estado.estadoOperacion === estadoOperacion)
                ) {
                    clientesReturn.push(cliente);
                }

            });

        });
    }

    /* TERCERA ALTERNATIVA -->  callCenter = TODOS | tipoCese = 'Opcion Seleccionada' | estadoOperacion = 'Opcion Seleccionada' */

    if (callCenter === 'TODOS' && tipoCese !== 'TODOS' && estadoOperacion !== 'TODOS') {

        Clientes.forEach(cliente => {

            Estado_Clientes.forEach(estado => {

                if (
                    (estado.cc_cliente === cliente.cuit_cuil) &&
                    (cliente.tipoCese === tipoCese) &&
                    (estado.estadoOperacion === estadoOperacion)
                ) {
                    clientesReturn.push(cliente);
                }

            });

        });
    }

    /* CUARTA ALTERNATIVA -->  callCenter = 'Opcion Seleccionada' | tipoCese = TODOS | estadoOperacion = TODOS */

    if (callCenter !== 'TODOS' && tipoCese === 'TODOS' && estadoOperacion === 'TODOS') {

        Clientes.forEach(cliente => {

            Estado_Clientes.forEach(estado => {

                if (
                    (estado.cc_cliente === cliente.cuit_cuil) &&
                    (cliente.callCenter === callCenter)
                ) {
                    clientesReturn.push(cliente);
                }

            });

        });
    }

    /* QUINTA ALTERNATIVA -->  callCenter = 'Opcion Seleccionada' | tipoCese = 'Opcion Seleccionada' | estadoOperacion = TODOS */

    if (callCenter !== 'TODOS' && tipoCese !== 'TODOS' && estadoOperacion === 'TODOS') {

        Clientes.forEach(cliente => {

            Estado_Clientes.forEach(estado => {

                if (
                    (estado.cc_cliente === cliente.cuit_cuil) &&
                    (cliente.callCenter === callCenter) &&
                    (cliente.tipoCese === tipoCese)
                ) {
                    clientesReturn.push(cliente);
                }

            });

        });
    }

    /* SEXTA ALTERNATIVA -->  callCenter = 'Opcion Seleccionada' | tipoCese = TODOS | estadoOperacion = 'Opcion Seleccionada' */

    if (callCenter !== 'TODOS' && tipoCese === 'TODOS' && estadoOperacion !== 'TODOS') {

        Clientes.forEach(cliente => {

            Estado_Clientes.forEach(estado => {

                if (
                    (estado.cc_cliente === cliente.cuit_cuil) &&
                    (cliente.callCenter === callCenter) &&
                    (estado.estadoOperacion === estadoOperacion)
                ) {
                    clientesReturn.push(cliente);
                }

            });

        });
    }

    /* SEPTIMA ALTERNATIVA -->  callCenter = TODOS | tipoCese = 'Opcion Seleccionada' | estadoOperacion = TODOS */

    if (callCenter === 'TODOS' && tipoCese !== 'TODOS' && estadoOperacion === 'TODOS') {

        Clientes.forEach(cliente => {

            Estado_Clientes.forEach(estado => {

                if (
                    (estado.cc_cliente === cliente.cuit_cuil) &&
                    (cliente.tipoCese === tipoCese)
                ) {
                    clientesReturn.push(cliente);
                }

            });

        });
    }

    /* OCTAVA ALTERNATIVA -->  callCenter = 'Opcion Seleccionada' | tipoCese = 'Opcion Seleccionada' | estadoOperacion = 'Opcion Seleccionada' */

    if (callCenter !== 'TODOS' && tipoCese !== 'TODOS' && estadoOperacion !== 'TODOS') {

        Clientes.forEach(cliente => {

            Estado_Clientes.forEach(estado => {

                if (
                    (estado.cc_cliente === cliente.cuit_cuil) &&
                    (cliente.callCenter === callCenter) &&
                    (cliente.tipoCese === tipoCese) &&
                    (estado.estadoOperacion === estadoOperacion)
                ) {
                    clientesReturn.push(cliente);
                }

            });

        });
    }

    return clientesReturn;

}