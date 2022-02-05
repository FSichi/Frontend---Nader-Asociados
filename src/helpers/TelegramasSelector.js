export const EstadoTelegrama = [
    {
        label: "En Espera",
        value: '1'
    },
    {
        label: "Enviado",
        value: '2'
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

export const customStylesEstados = {
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