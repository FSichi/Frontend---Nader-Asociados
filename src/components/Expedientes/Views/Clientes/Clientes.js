import React, { useEffect, useState } from 'react'
import { ClienteCard } from './ClienteCard';
import axios from 'axios';

export const Clientes = ({ expediente }) => {

    const [listofClientes, setListofClientes] = useState([]);
    const [banderaCarga, setBanderaCarga] = useState(false);

    useEffect(() => {
        axios.get(`https://backend-nader.herokuapp.com/expedientes/expCli/fichasCli/all?data=${expediente.numeroExp}`).then((resp) => {
            setListofClientes(resp.data);
            setBanderaCarga(true);
        });
    }, [expediente.numeroExp]);

    return (

        <div className='container-lg-fluid container-md-fluid bg-dark text-white mt-4 mb-5 p-5' style={{ borderRadius: '20px' }}>

            {/* TITULO DEL FORMULARIO */}

            <div className='row text-center'>
                <div className='col-12'>
                    <h2 className="fw-bold text-uppercase">LISTADO DE CLIENTES DEL EXPEDIENTE [ {expediente.numeroExp} ]</h2>
                    <p className="text-white-50 fs-5">Por favor Completa la casilla de Capital Ofrecido de cada cliente a medida que se conozca su resolucion</p>
                    <hr />
                </div>
            </div>

            {/* LISTADO DE CLIENTES */}

            <div>

                {
                    (banderaCarga)
                    &&
                    (
                        listofClientes.map(cliente => (

                            <div key={cliente.id}>

                                <ClienteCard
                                    key={cliente.id}
                                    expedienteCli={cliente}
                                />

                            </div>

                        )))
                }

            </div>

        </div>
    )
}
