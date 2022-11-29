import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import axios from 'axios';

/* IMPORT DE LAS TABS */
import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';

/* IMPORT DE LAS VIEWS */
import { DatosCliente } from './DatosCliente';
import { EstadosCliente } from './EstadosCliente';


const blue = {
    50: '#F0F7FF',
    100: '#C2E0FF',
    200: '#80BFFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0059B2',
    800: '#004C99',
    900: '#003A75',
};

const Tab = styled(TabUnstyled)`
    color: white;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: bold;
    background-color: transparent;
    width: 100%;
    padding: 12px 16px;
    margin: 6px 6px;
    border: none;
    border-radius: 5px;
    display: flex;
    justify-content: center;
  
    &:hover {
      background-color: white;
      color: black
    }
  
    &.${buttonUnstyledClasses.focusVisible} {
      color: #fff;
      outline: none;
      background-color: ${blue[200]};
    }
  
    &.${tabUnstyledClasses.selected} {
      background-color: ${blue[50]};
      color: black;
    }
  
    &.${buttonUnstyledClasses.disabled} {
      opacity: 0.5;
      cursor: not-allowed;
    }
`;

const TabPanel = styled(TabPanelUnstyled)`
    width: 100%;
    font-family: 'Josefin Sans', sans-serif;
    font-size: 0.875rem;
`;

const TabsList = styled(TabsListUnstyled)`
    min-width: 320px;
    background-color: #212529;
    border-radius: 8px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: space-between;
`;

export const ClienteEditScreen = () => {

    
    const { clienteId } = useParams();
    const [cliente, setCliente] = useState({});
    const [banderaCarga, setBanderaCarga] = useState({});
        
    useEffect(() => {

        localStorage.setItem("ruta", `/cli/${clienteId}/edit`);

        axios.get(`https://backend-nader.herokuapp.com/clientes/${clienteId}`).then((resp) => {
            setCliente(resp.data);
            setBanderaCarga(true);
        });
    }, [clienteId]);

    return (

        <div className='container' >

            <div className='bg-dark text-white mt-4 p-3' style={{ borderRadius: '20px' }}>
                {/* TITULO DEL FORMULARIO */}

                <div className='text-center mt-3'>
                    <h3 className="fw-bold text-uppercase">PANTALLA DE EDICION DEL ESTADO DE [ {cliente.apellidoyNombre} ] </h3>
                    <p className="text-white-50 fs-5">Por Favor Selecciona que tipo de Datos quieres modificar y actualizalo segun corresponda</p>
                </div>
            </div>

            <div className='mt-4 mb-5'>

                {
                    (banderaCarga)
                    &&
                    (
                        <TabsUnstyled defaultValue={0}>

                            <TabsList>
                                <Tab>DATOS DEL CLIENTE</Tab>
                                <Tab>ESTADO DEL CLIENTE</Tab>
                            </TabsList>

                            <TabPanel value={0}>
                                <DatosCliente cliente={cliente} />
                            </TabPanel>

                            <TabPanel value={1}>
                                <EstadosCliente cliente={cliente} />
                            </TabPanel>

                        </TabsUnstyled>
                    )
                }



            </div>

        </div>

    )
}
