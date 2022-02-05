

export const contarCallCenter = (clientes) => {

    if (clientes.length === 0) {
        return [];
    }

    var tp = 0;
    var at = 0
    var ag = 0

    clientes.forEach(cliente => {
        
        switch (cliente.callCenter) {
            case 'TELEPERFORMANCE':
                tp = tp + 1;
                break;
            case 'ATENTO':
                at = at + 1;
                break;
            case 'AEGIS':
                ag = ag + 1;
                break;
        
            default:
                break;
        }

    });

    var callCenterFilter = [tp, at, ag];

    return callCenterFilter;
    
}