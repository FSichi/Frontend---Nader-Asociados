import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getClientesEnDemanda, getClientesEnJuicio, getClientesEnSecretaria, getClientesEnTelegramas } from '../../../selector/Clientes';

/* IMPORT DE LAS TABS */
import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';

/* IMPORT DE LAS VIEWS */
import { ClientesListTodos } from './ClientesListTodos';
import { ClientesTelegramas } from './ClientesTelegramas';
import { ClientesJuicio } from './ClientesJuicio';
import { ClientesSecretaria } from './ClientesSecretaria';
import { ClientesDemanda } from './ClientesDemanda';


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

export const MenuList = () => {

    localStorage.setItem("ruta", `/cli/list`);

    const [clientesTelegramas, setClientesTelegramas] = useState([]);
    const [clientesDemanda, setClientesDemanda] = useState([]);
    const [clientesJuicio, setClientesJuicio] = useState([]);
    const [clientesSecretaria, setClientesSecretaria] = useState([]);

    useEffect(() => {

        axios.get("https://backend-nader-asociados.up.railway.app/general/listadoCli").then((response) => {
            setClientesTelegramas(getClientesEnTelegramas(response.data[0], response.data[1], response.data[2], response.data[3]));
            setClientesDemanda(getClientesEnDemanda(response.data[0], response.data[1], response.data[2], response.data[3]));
            setClientesJuicio(getClientesEnJuicio(response.data[0], response.data[1]));
            setClientesSecretaria(getClientesEnSecretaria(response.data[0], response.data[1]));
        });

    }, []);

    return (
        <div className='container-lg-fluid container-md-fluid mt-4'>

            <div className='mt-3'>
                <TabsUnstyled defaultValue={0}>

                    <div className='d-flex justify-content-center ms-3 me-3 '>

                        <TabsList className='col-12'>
                            <Tab>TODOS</Tab>
                            <Tab>INTERCAMBIO EPISTOLAR</Tab>
                            <Tab>PARA HACER DEMANDA</Tab>
                            <Tab>EN JUICIO</Tab>
                            <Tab>EN SECRETARIA</Tab>
                        </TabsList>

                    </div>

                    <TabPanel value={0}>
                        <ClientesListTodos />
                    </TabPanel>

                    <TabPanel value={1}>
                        <ClientesTelegramas clientes={clientesTelegramas} />
                    </TabPanel>

                    <TabPanel value={2}>
                        <ClientesDemanda clientes={clientesDemanda} />
                    </TabPanel>

                    <TabPanel value={3}>
                        <ClientesJuicio clientes={clientesJuicio} />
                    </TabPanel>

                    <TabPanel value={4}>
                        <ClientesSecretaria clientes={clientesSecretaria} />
                    </TabPanel>

                </TabsUnstyled>
            </div>

        </div>
    )
}
