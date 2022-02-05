import React, { useEffect, useState } from 'react'
import axios from 'axios';

/* IMPORT DE LAS TABS */
import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';

/* IMPORT DE LAS VIEWS */
import { EstadosObligatorios } from './EstadosObligatorios';
import { EstadosOpcionales } from './EstadosOpcionales';

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

export const Juicio = ({ expediente }) => {

    const [expedienteCapitales, setExpedienteCapitales] = useState({});
    const [banderaCarga, setBanderaCarga] = useState(false);

    useEffect(() => {
        axios.get(`https://backend-nader.herokuapp.com/expedientes/capitales/ind?data=${expediente.numeroExp}`).then((resp) => {
            setExpedienteCapitales(resp.data);
            setBanderaCarga(true);
        });
    }, [expediente.numeroExp]);

    return (
        <div className='container-lg-fluid container-md-fluid'>

            <div className='mt-4'>
                {
                    (banderaCarga)
                    &&
                    (
                        <TabsUnstyled defaultValue={0}>

                            <div className='d-flex justify-content-center'>
                                <TabsList className='ms-5 me-5 col-6'>
                                    <Tab>ESTADOS OBLIGATORIOS</Tab>
                                    <Tab>ESTADOS OPCIONALES</Tab>
                                </TabsList>
                            </div>

                            <TabPanel value={0}>
                                <EstadosObligatorios expediente={expediente} expCapitales={expedienteCapitales}/>
                            </TabPanel>

                            <TabPanel value={1}>
                                <EstadosOpcionales expediente={expediente} expCapitales={expedienteCapitales}/>
                            </TabPanel>

                        </TabsUnstyled>
                    )
                }
            </div>

        </div>
    )
}
