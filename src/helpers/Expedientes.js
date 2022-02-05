
export const AbogadoApoderado = [
    {
        label: "Miguel Angel Nader",
        value: '1'
    },
    {
        label: "Mariana Lizzarraga",
        value: '2'
    },
    {
        label: "Micaela Frattura",
        value: '3'
    },
    {
        label: "Belen Moya",
        value: '4'
    },
];

export const AbogadoGestor = [
    {
        label: "Miguel Angel Nader",
        value: '1'
    },
    {
        label: "Mariana Lizzarraga",
        value: '2'
    },
    {
        label: "Micaela Frattura",
        value: '3'
    },
    {
        label: "Belen Moya",
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

export const EstadoExp = [
    {
        label: "En Proceso",
        value: '0'
    },
    {
        label: "Completado",
        value: '1'
    }
];

export const EstadoSecretaria = [
    {
        label: "En Proceso",
        value: '0'
    },
    {
        label: "Completado",
        value: '1'
    }
];

/* ------------------------------------ */

export const AbogadoApoderadoFilter = [
    {
        label: "TODOS",
        value: '1'
    },
    {
        label: "Miguel Angel Nader",
        value: '2'
    },
    {
        label: "Mariana Lizzarraga",
        value: '3'
    },
    {
        label: "Micaela Frattura",
        value: '4'
    },
    {
        label: "Belen Moya",
        value: '5'
    },
];

export const AbogadoGestorFilter = [
    {
        label: "TODOS",
        value: '1'
    },
    {
        label: "Miguel Angel Nader",
        value: '2'
    },
    {
        label: "Mariana Lizzarraga",
        value: '3'
    },
    {
        label: "Micaela Frattura",
        value: '4'
    },
    {
        label: "Belen Moya",
        value: '5'
    },
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

export const TipoDemandaFilter = [
    {
        label: "TODOS",
        value: '1'
    },
    {
        label: "Individual",
        value: '2'
    },
    {
        label: "Colectiva",
        value: '3'
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
/*     multiValueLabel: (base) => ({
        ...base,
        backgroundColor: 'black',
        color: 'white',
    }),
    noOptionsMessage: (base) => ({ 
        ...base, 
        background: 'darkslategray',
        color: 'white', 
    }) */
}

export const eliminarCliente = (id, clientes) => {

    console.log('ID A BORRAR EN FUNCION: ', id);
    console.log('CLIENTES QUE RECIBE LA FUNCION: ', clientes);

    return clientes.filter(cliente => cliente.cliente.id !== id);

}

