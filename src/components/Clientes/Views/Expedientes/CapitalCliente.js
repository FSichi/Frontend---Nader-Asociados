import React, { useEffect, useState } from 'react'
import { ClienteCard } from './ClienteCardIndividual';
import axios from 'axios';

export const CapitalCliente = ({ expediente, cliente }) => {

    const [clienteExp, setClienteExp] = useState({});
    const [banderaCarga, setBanderaCarga] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:3001/expedientes/expCli/${cliente.cuit_cuil}`).then((resp) => {
            setClienteExp(resp.data);
            setBanderaCarga(true);
        });
    }, [cliente.cuit_cuil]);

    return (

        <div className='container-lg-fluid container-md-fluid bg-dark text-white mt-4 mb-5 p-5' style={{ borderRadius: '20px' }}>

            {/* TITULO DEL FORMULARIO */}

            <div className='row text-center'>
                <div className='col-12'>
                    <h2 className="fw-bold text-uppercase">CAPITAL DE {cliente.apellidoyNombre} DEL EXPEDIENTE [ {expediente.numeroExp} ]</h2>
                    <p className="text-white-50 fs-5">Por favor Completa la casilla de Capital Ofrecido del cliente si ya conoce su resolucion</p>
                    <hr />
                </div>
            </div>

            {/* LISTADO DE CLIENTES */}

            <div>

                {
                    (banderaCarga)
                    &&
                    (
                        <div>

                            <ClienteCard
                                key={cliente.id}
                                cliente={cliente}
                                clienteExp={clienteExp}
                                expediente={expediente}
                            />

                        </div>
                    )
                }

            </div>

        </div>
    )
}
