export const getVoluntadByCC = (cc, voluntades) => {
    
    if (cc === '') {
        return [];
    }

    cc = cc.toLowerCase();
    return voluntades.find(voluntad => voluntad.cc_cliente === cc);

}