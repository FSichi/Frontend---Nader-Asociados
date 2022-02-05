export const EstadosObligatoriosSelect = [

    {
        label: "Demanda",
        value: '1'
    },
    {
        label: "Contestacion de Demanda",
        value: '2'
    },
    {
        label: "Ofrecimiento de Prueba",
        value: '3'
    },
    {
        label: "Audiencia de Conciliacion",
        value: '4'
    },
    {
        label: "Produccion Probatoria",
        value: '5'
    },
    {
        label: "Informe de Actuario",
        value: '6'
    },
    {
        label: "Alegatos",
        value: '7'
    },
    {
        label: "Pase a Resolver",
        value: '8'
    },
    {
        label: "Sentencia de Primera Instancia",
        value: '9'
    },
];

export const EstadosOpcionalesSelect = [
    {
        label: "Embargo",
        value: '1'
    },
    {
        label: "Apelacion",
        value: '2'
    },
    {
        label: "Expresion de Agravios",
        value: '3'
    },
    {
        label: "Recursos de Aclaratoria",
        value: '4'
    },
    {
        label: "Sentencia de Segunda Instancia",
        value: '5'
    },
    {
        label: "Actualizacion",
        value: '6'
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