
export const getExpedienteByCuitCuilCliente = (number, expedientes_clientes) => {

    if (number === '') {
        return [];
    }

    number = number.toLowerCase();
    return expedientes_clientes.find(expCli => expCli.cuit_cuil === number);

}


export const getClientesByNumberExp = (number, expedientes_clientes) => {

    if (number === '') {
        return [];
    }

    number = number.toLowerCase();
    return expedientes_clientes.filter(exp => exp.numeroExp.toLowerCase().includes(number));

}