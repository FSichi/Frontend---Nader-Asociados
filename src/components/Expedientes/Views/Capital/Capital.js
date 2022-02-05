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
import { PrimeraInstancia } from './PrimeraInstancia';
import { SegundaInstancia } from './SegundaInstancia';
import { Actualizacion } from './Actualizacion';


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

export const Capital = ({ expediente }) => {

    const [capitalesExpediente, setCapitalesExpediente] = useState({});

    const [capitalPrimeraInstancia, setCapitalPrimeraInstancia] = useState({});
    const [capitalSegundaInstancia, setCapitalSegundaInstancia] = useState({});
    const [capitalActualizacionInstancia, setCapitalActualizacionInstancia] = useState({});

    const [banderaCarga, setBanderaCarga] = useState(false);

    useEffect(() => {
        axios.get(`https://backend-nader.herokuapp.com/general/capitalesExp?data=${expediente.numeroExp}`).then((resp) => {
            setCapitalesExpediente(resp.data[0]);
            setCapitalPrimeraInstancia(resp.data[1]);
            setCapitalSegundaInstancia(resp.data[2]);
            setCapitalActualizacionInstancia(resp.data[3]);
            setBanderaCarga(true);
        });
    }, [expediente.numeroExp]);

    return (

        <div className='mt-4'>

            {
                (banderaCarga)
                &&
                (
                    <div>
                        {
                            (capitalesExpediente.capitalPrimera)
                                ?
                                (
                                    <div>
                                        {
                                            (capitalesExpediente.capitalSegunda)
                                                ?
                                                (
                                                    <div>
                                                        {
                                                            (capitalesExpediente.capitalActualizacion)
                                                                ?
                                                                (
                                                                    <TabsUnstyled defaultValue={0}>

                                                                        <div className='d-flex justify-content-center'>
                                                                            <TabsList className='col-8'>
                                                                                <Tab>PRIMERA INSTANCIA</Tab>
                                                                                <Tab>SEGUNDA INSTANCIA</Tab>
                                                                                <Tab>ACTUALIZACION</Tab>
                                                                            </TabsList>
                                                                        </div>

                                                                        <TabPanel value={0}>
                                                                            <PrimeraInstancia expediente={expediente} fichaCapPrim={capitalPrimeraInstancia}/>
                                                                        </TabPanel>

                                                                        <TabPanel value={1}>
                                                                            <SegundaInstancia expediente={expediente} fichaCapSeg={capitalSegundaInstancia}/>
                                                                        </TabPanel>

                                                                        <TabPanel value={2}>
                                                                            <Actualizacion expediente={expediente} fichaCapAct={capitalActualizacionInstancia}/>
                                                                        </TabPanel>

                                                                    </TabsUnstyled>
                                                                )
                                                                :
                                                                (
                                                                    <TabsUnstyled defaultValue={0}>

                                                                        <div className='d-flex justify-content-center'>
                                                                            <TabsList className='col-8'>
                                                                                <Tab>PRIMERA INSTANCIA</Tab>
                                                                                <Tab>SEGUNDA INSTANCIA</Tab>
                                                                            </TabsList>
                                                                        </div>

                                                                        <TabPanel value={0}>
                                                                            <PrimeraInstancia expediente={expediente} fichaCapPrim={capitalPrimeraInstancia}/>
                                                                        </TabPanel>

                                                                        <TabPanel value={1}>
                                                                            <SegundaInstancia expediente={expediente} fichaCapSeg={capitalSegundaInstancia}/>
                                                                        </TabPanel>

                                                                    </TabsUnstyled>
                                                                )
                                                        }
                                                    </div>
                                                )
                                                :
                                                (
                                                    <div>
                                                        {
                                                            (capitalesExpediente.capitalActualizacion)
                                                                ?
                                                                (
                                                                    <TabsUnstyled defaultValue={0}>

                                                                        <div className='d-flex justify-content-center'>
                                                                            <TabsList className='col-8'>
                                                                                <Tab>PRIMERA INSTANCIA</Tab>
                                                                                <Tab>ACTUALIZACION</Tab>
                                                                            </TabsList>
                                                                        </div>

                                                                        <TabPanel value={0}>
                                                                            <PrimeraInstancia expediente={expediente} fichaCapPrim={capitalPrimeraInstancia}/>
                                                                        </TabPanel>

                                                                        <TabPanel value={1}>
                                                                            <Actualizacion expediente={expediente} fichaCapAct={capitalActualizacionInstancia}/>
                                                                        </TabPanel>

                                                                    </TabsUnstyled>
                                                                )
                                                                :
                                                                (
                                                                    <TabsUnstyled defaultValue={0}>

                                                                        <div className='d-flex justify-content-center'>
                                                                            <TabsList className='col-8'>
                                                                                <Tab>PRIMERA INSTANCIA</Tab>
                                                                            </TabsList>
                                                                        </div>

                                                                        <TabPanel value={0}>
                                                                            <PrimeraInstancia expediente={expediente} fichaCapPrim={capitalPrimeraInstancia}/>
                                                                        </TabPanel>

                                                                    </TabsUnstyled>
                                                                )
                                                        }
                                                    </div>
                                                )
                                        }
                                    </div>
                                )
                                :
                                (
                                    <div className='container-fluid bg-dark text-white mt-5 p-5' style={{ borderRadius: '20px' }}>

                                        {/* TITULO DEL FORMULARIO */}

                                        <div className='row text-center'>
                                            <div className='col-12'>
                                                <h2 className="fw-bold text-uppercase">ACTUALMENTE NO HAY CAPITALES HABILITADOS</h2>
                                                <p className="text-white-50 fs-5">A medida que los Estados del Juicio vayan avanzando, esta funcion estara disponible segun corresponda</p>
                                            </div>
                                        </div>

                                    </div>
                                )
                        }
                    </div>
                )
            }

        </div>
    )
}