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
import { Datos } from './Views/Datos/Datos';
import { Clientes } from './Views/Clientes/Clientes';
import { Capital } from './Views/Capital/Capital';
import { JuicioScreen } from './Views/Juicio/JuicioScreen';
import { EstadoExpediente } from './Views/Estado/EstadoExpediente';

/* ELEMENTOS DE LAS UNSTYLED TABS */

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

export const ExpedienteScreen = () => {

    const { expedienteId } = useParams();
    const [expediente, setExpediente] = useState({});

    const [banderaCarga, setBanderaCarga] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:3001/expedientes/${expedienteId}`).then((resp) => {
            setExpediente( resp.data );
            setBanderaCarga(true);
        });
    }, [expedienteId]);

    return (

        <div className='mt-4 ms-5 me-5 mb-5'>

            {
                (banderaCarga)
                &&
                (
                    <TabsUnstyled defaultValue={0}>
                        <TabsList>
                            <Tab>DATOS DEL EXPEDIENTE</Tab>
                            <Tab>LISTADO DE CLIENTES</Tab>
                            <Tab>CAPITAL</Tab>
                            <Tab>JUICIO ASOCIADO</Tab>
                            <Tab>ESTADO</Tab>
                        </TabsList>

                        <TabPanel value={0}>
                            <Datos expediente={expediente} />
                        </TabPanel>

                        <TabPanel value={1}>
                            <Clientes expediente={expediente} />
                        </TabPanel>

                        <TabPanel value={2} >
                            <Capital expediente={expediente} />
                        </TabPanel>

                        <TabPanel value={3} >
                            <JuicioScreen expediente={expediente} />
                        </TabPanel>

                        <TabPanel value={4} >
                            <EstadoExpediente expediente={expediente} />
                        </TabPanel>

                    </TabsUnstyled>
                )

            }

        </div>
    )
}
