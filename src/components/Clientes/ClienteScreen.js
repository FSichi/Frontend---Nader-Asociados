import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { getExpedienteCliente, getExpedienteJuicioCliente } from '../../selector/Clientes';
import axios from 'axios';

/* IMPORT DE LAS TABS */
import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';

/* IMPORT DE LAS VIEWS */
import { Resumen } from './Views/Resumen/Resumen';
import { DatosCliente } from './Views/Datos/DatosCliente';
import { Telegramas } from './Views/Telegramas/Telegramas';
import { Expediente } from './Views/Expedientes/Expediente';
import { Juicio } from './Views/Juicio/Juicio';
import { SecretariaHome } from './Views/SecretariaTrabajo/SecretariaHome';


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

export const ClienteScreen = ({ history }) => {

    const { clienteId } = useParams();
    var numExpCli = {};
    
    const [cliente, setCliente] = useState({});
    const [estadoCli, setEstadoCli] = useState({});
    const [expediente, setExpediente] = useState({});

    const [banderaCli, setBanderaCli] = useState(false);
    const [banderaExp, setBanderaExp] = useState(false);
    const [bandera, setBandera] = useState(false);
    const [bandera2, setBandera2] = useState(false);

    useEffect(() => {
        axios.get(`https://backend-nader-asociados.up.railway.app/clientes/${clienteId}`).then((resp) => {
            setCliente( resp.data );
            // console.log('DATOS DE DB CLIENTE: ', resp.data);
            setBandera(true);
            setBanderaCli(true);
        });
    }, [clienteId]);

    if (bandera) {
        axios.get(`https://backend-nader-asociados.up.railway.app/clientes/estados/${cliente.cuit_cuil}`).then((resp) => {
            setEstadoCli( resp.data );
            // console.log('DATOS DE DB ESTADO: ', resp.data);
            setBandera(false);
        });
    }

    if (
        (banderaCli && estadoCli.estadoOperacion === 'En Juicio' && !bandera2 && estadoCli.vJuicio) ||
        (banderaCli && estadoCli.estadoOperacion === 'Completado' && !bandera2 && estadoCli.vJuicio)
    ) {

        axios.get("https://backend-nader-asociados.up.railway.app/general/clienteScreen").then((resp) => {

            numExpCli = getExpedienteCliente(cliente.cuit_cuil, resp.data[1]);
            setExpediente(getExpedienteJuicioCliente(numExpCli.numeroExp, resp.data[0]));
            setBanderaExp(true);
            setBandera2(true);
        });
    }

    return (
        <div className='mt-4 ms-5 me-5 mb-5'>

            {
                (banderaCli)
                &&
                (
                    <div>

                        {
                            (estadoCli.estadoOperacion === 'En Telegramas')
                            &&
                            (
                                <TabsUnstyled defaultValue={0}>

                                    <TabsList>
                                        <Tab>RESUMEN</Tab>
                                        <Tab>DATOS DEL CLIENTE</Tab>
                                        <Tab>TELEGRAMAS</Tab>
                                    </TabsList>

                                    <TabPanel value={0}>
                                        <Resumen cliente={cliente} estadoCli={estadoCli} history={history} />
                                    </TabPanel>

                                    <TabPanel value={1}>
                                        <DatosCliente cliente={cliente} />
                                    </TabPanel>

                                    <TabPanel value={2} >
                                        <Telegramas cliente={cliente} estadoCli={estadoCli}/>
                                    </TabPanel>

                                </TabsUnstyled>
                            )
                        }

                        {
                            (
                                (estadoCli.estadoOperacion === 'En Juicio' && banderaExp) ||
                                (estadoCli.estadoOperacion === 'Completado' && estadoCli.vJuicio)
                            )
                            &&
                            (
                                <TabsUnstyled defaultValue={0}>
                                    <TabsList>
                                        <Tab>RESUMEN</Tab>
                                        <Tab>DATOS DEL CLIENTE</Tab>
                                        <Tab>TELEGRAMAS</Tab>
                                        <Tab>EXPEDIENTE</Tab>
                                        <Tab>JUICIO</Tab>
                                    </TabsList>

                                    <TabPanel value={0}>
                                        <Resumen cliente={cliente} estadoCli={estadoCli} history={history}/>
                                    </TabPanel>

                                    <TabPanel value={1}>
                                        <DatosCliente cliente={cliente} />
                                    </TabPanel>

                                    <TabPanel value={2} >
                                        <Telegramas cliente={cliente} estadoCli={estadoCli}/>
                                    </TabPanel>

                                    <TabPanel value={3} >
                                        <Expediente cliente={cliente} expediente={expediente} />
                                    </TabPanel>

                                    <TabPanel value={4} >
                                        <Juicio expediente={expediente} />
                                    </TabPanel>

                                </TabsUnstyled>
                            )
                        }

                        {
                            (
                                (estadoCli.estadoOperacion === 'En Secretaria') ||
                                (estadoCli.estadoOperacion === 'Completado' && estadoCli.vSecretaria)
                            )
                            &&
                            (
                                <TabsUnstyled defaultValue={0}>
                                    <TabsList>
                                        <Tab>RESUMEN</Tab>
                                        <Tab>DATOS DEL CLIENTE</Tab>
                                        <Tab>TELEGRAMAS</Tab>
                                        <Tab>S. TRABAJO</Tab>
                                    </TabsList>

                                    <TabPanel value={0}>
                                        <Resumen cliente={cliente} estadoCli={estadoCli} history={history}/>
                                    </TabPanel>

                                    <TabPanel value={1}>
                                        <DatosCliente cliente={cliente} />
                                    </TabPanel>

                                    <TabPanel value={2} >
                                        <Telegramas cliente={cliente} estadoCli={estadoCli}/>
                                    </TabPanel>

                                    <TabPanel value={3} >
                                        <SecretariaHome cliente={cliente} estadoCli={estadoCli}/>
                                    </TabPanel>

                                </TabsUnstyled>
                            )
                        }

                    </div>
                )
            }

        </div>
    )
}


