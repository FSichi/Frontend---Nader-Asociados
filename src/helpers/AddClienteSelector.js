export const EstadoCliente = [
    {
        label: "Activo",
        value: '1'
    },
    {
        label: "Inactivo",
        value: '2'
    }
];

export const EstadoCivil = [
    {
        label: "Soltero",
        value: '1'
    },
    {
        label: "Casado",
        value: '2'
    },
    {
        label: "Divorciado",
        value: '3'
    },
    {
        label: "Viudo",
        value: '4'
    },
];

export const CallCenter = [
    {
        label: "TELEPERFORMANCE",
        value: '1'
    },
    {
        label: "ATENTO",
        value: '2'
    },
    {
        label: "AEGIS",
        value: '3'
    },
    {
        label: "OTRO",
        value: '4'
    },
];

export const Sucursal = [
    {
        label: "Adolfo de la Vega 345",
        value: '1'
    },
    {
        label: "Junin 168",
        value: '2'
    },
    {
        label: "Adolfo de la Vega 473",
        value: '3'
    }
];

export const TipoCese = [
    {
        label: "RENUNCIA",
        value: '1'
    },
    {
        label: "DESPIDO SIN CAUSA",
        value: '2'
    },
    {
        label: "DESPIDO CON CAUSA",
        value: '3'
    },
    {
        label: "DESPIDO INDIRECTO",
        value: '4'
    },
    {
        label: "INDUCCION A LA RENUNCIA CON GRATIFICACION",
        value: '5'
    },
];

export const TipoContrato = [
    {
        label: "VENCIMIENTO DE CONTRATO A PLAZO",
        value: '1'
    },
    {
        label: "CONTRATOS EVENTUALES",
        value: '2'
    },
    {
        label: "CONTRATO PERMANENTE",
        value: '3'
    },
];

export const TipoTarea = [
    {
        label: "AGENTE",
        value: '1'
    },
    {
        label: "MANDO MEDIO (CALIDAD, SUPER, FORMACION, FORCE)",
        value: '2'
    },
    {
        label: "JERARQUICO (PM, CCMS, ACM, GERENCIA, JEFE DE SERVICIO)",
        value: '3'
    },
    {
        label: "RRHH (RECURSOS HUMANOS)",
        value: '4'
    },
];

export const DiasyHoras = [
    {
        label: "5 x 5",
        value: '1'
    },
    {
        label: "6 x 5",
        value: '2'
    },
    {
        label: "6 x 6",
        value: '3'
    },
    {
        label: "9 x 5",
        value: '4'
    },
    {
        label: "9 x 6",
        value: '5'
    },
    {
        label: "Otra Carga Horaria",
        value: '6'
    },
];

export const DiasSelect = [
    {
        label: "Lunes",
        value: '1'
    },
    {
        label: "Martes",
        value: '2'
    },
    {
        label: "Miercoles",
        value: '3'
    },
    {
        label: "Jueves",
        value: '4'
    },
    {
        label: "Viernes",
        value: '5'
    },
    {
        label: "Sabado",
        value: '6'
    },
    {
        label: "Domingo",
        value: '7'
    },
];

export const EstadoCli = [
    {
        label: "Inactivo",
        value: '0'
    },
    {
        label: "Activo",
        value: '1'
    },

];

export const EstadoOperacionCli = [
    {
        label: "En Telegramas",
        value: '1'
    },
    {
        label: "En Juicio",
        value: '2'
    },
    {
        label: "En Secretaria",
        value: '3'
    },
    {
        label: "Completado",
        value: '4'
    }
];

export const VoluntadCli = [
    {
        label: "Juicio",
        value: '0'
    },
    {
        label: "Secretaria de Trabajo",
        value: '1'
    }
];

export const CallCenterFilter = [
    {
        label: "TODOS",
        value: '1'
    },
    {
        label: "TELEPERFORMANCE",
        value: '2'
    },
    {
        label: "ATENTO",
        value: '3'
    },
    {
        label: "AEGIS",
        value: '4'
    },
    {
        label: "OTRO",
        value: '5'
    },
];

export const TipoCeseFilter = [
    {
        label: "TODOS",
        value: '1'
    },
    {
        label: "RENUNCIA",
        value: '2'
    },
    {
        label: "DESPIDO SIN CAUSA",
        value: '3'
    },
    {
        label: "DESPIDO CON CAUSA",
        value: '4'
    },
    {
        label: "DESPIDO INDIRECTO",
        value: '5'
    },
    {
        label: "INDUCCION A LA RENUNCIA CON GR",
        value: '6'
    },
];

export const EstadoOperacionFilter = [
    {
        label: "TODOS",
        value: '1'
    },
    {
        label: "En Telegramas",
        value: '2'
    },
    {
        label: "En Juicio",
        value: '3'
    },
    {
        label: "En Secretaria",
        value: '4'
    },
    {
        label: "Completado",
        value: '5'
    }
];

export const customStyles = {
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? 'black' : 'black',
        padding: 12,
        minHeight: '44px',
        height: '44px',
    }),
    valueContainer: (provided, state) => ({
        ...provided,
        height: '44px',
        padding: '0 6px'
    }),
    input: (provided, state) => ({
        ...provided,
        margin: '0px',
    }),
    indicatorSeparator: state => ({
        display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
        ...provided,
        height: '44px',
    }),
}

export const customStylesTareas = {
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? 'black' : 'black',
        padding: 12,
        minHeight: '44px',
        height: '44px',
        fontSize: 13,
    }),
    valueContainer: (provided, state) => ({
        ...provided,
        height: '44px',
        padding: '0 6px'
    }),
    input: (provided, state) => ({
        ...provided,
        margin: '0px',
    }),
    indicatorSeparator: state => ({
        display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
        ...provided,
        height: '44px',
    }),
}