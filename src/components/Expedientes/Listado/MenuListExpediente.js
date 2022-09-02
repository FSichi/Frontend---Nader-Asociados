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
import { ExpedienteIndList } from './ExpedienteIndList'
import { ExpedienteColList } from './ExpedienteColList'
import { ExpedientesAllList } from './ExpedientesAllList';

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

export const MenuListExpediente = () => {

    const [expedientesAll, setExpedientesAll] = useState([]);
    const [expedientesIndividuales, setExpedientesIndividuales] = useState([]);
    const [expedientesColectivos, setExpedientesColectivos] = useState([]);
    const [bandera, setBandera] = useState(false);

    useEffect(() => {

        localStorage.setItem("ruta", `/exp/list`);

        axios.get(`https://backend-nader-asociados.up.railway.app/general/listadoExp`).then((resp) => {
            setExpedientesAll(resp.data[2]);
            setExpedientesIndividuales(resp.data[0]);
            setExpedientesColectivos(resp.data[1]);
            setBandera(true);
        });
    }, []);

    return (
        <div className='container-lg-fluid container-md-fluid mt-4'>

            <div className='mt-3'>

                {
                    (bandera)
                    &&
                    (
                        <TabsUnstyled defaultValue={0}>

                            <div className='d-flex justify-content-center ms-3 me-3'>

                                <TabsList className='col-12'>
                                    <Tab>TODOS</Tab>
                                    <Tab>INDIVIDUALES</Tab>
                                    <Tab>COLECTIVOS</Tab>
                                </TabsList>

                            </div>

                            <TabPanel value={0}>
                                <ExpedientesAllList expedientes={expedientesAll} />
                            </TabPanel>

                            <TabPanel value={1}>
                                <ExpedienteIndList expedientes={expedientesIndividuales} />
                            </TabPanel>

                            <TabPanel value={2}>
                                <ExpedienteColList expedientes={expedientesColectivos} />
                            </TabPanel>

                        </TabsUnstyled>
                    )

                }

            </div>

        </div>
    )
}
