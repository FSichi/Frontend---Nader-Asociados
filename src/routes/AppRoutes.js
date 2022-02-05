import React, { useState } from 'react'
import { Navbar } from '../components/UI/Navbar'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import { Dashboard } from '../components/UI/Dashboard'
import { AddCliente } from '../components/Clientes/AddCliente'
import { ClienteScreen } from '../components/Clientes/ClienteScreen'
import { ClientesListParticular } from '../components/Clientes/Listado/ClientesListParticular'
import { AddExpediente } from '../components/Expedientes/AddExpediente'
import { ExpedienteScreen } from '../components/Expedientes/ExpedienteScreen'
import { ReportesScreen } from '../components/Reportes/ReportesScreen'
import { ClienteEditScreen } from '../components/Clientes/EditScreen/ClienteEditScreen'
import { MenuList } from '../components/Clientes/Listado/MenuList'
import { MenuListExpediente } from '../components/Expedientes/Listado/MenuListExpediente'
import { ClientesFilter } from '../components/Filtros/Clientes'
import { ExpedientesJuiciosFilter } from '../components/Filtros/ExpedientesJuicios'
import { Menu } from '../components/Filtros/Capital/Menu'


export const AppRoutes = () => {

    const [state, setState] = useState(false);
    const [ruta, setRuta] = useState('');

    if (localStorage.getItem('ruta') !== null && !state) {

        setRuta(localStorage.getItem('ruta'));
        setState(true);

        localStorage.clear();
    }

    return (
        <Router>

            <Navbar />

            <Switch>

                <Route path="/dashboard" component={Dashboard}></Route>

                {/* RUTAS DE LOS CLIENTES */}

                <Route path="/cli/list" component={MenuList}></Route>
                <Route path="/cli/listp" component={ClientesListParticular}></Route>
                <Route path="/cli/add" component={AddCliente}></Route>
                <Route exact path="/cli/:clienteId" component={ClienteScreen}></Route>
                <Route exact path="/cli/:clienteId/edit" component={ClienteEditScreen}></Route>

                {/* RUTAS DE LOS EXPEDIENTES */}

                <Route path="/exp/add" component={AddExpediente}></Route>
                <Route path="/exp/list" component={MenuListExpediente}></Route>
                <Route exact path="/exp/:expedienteId" component={ExpedienteScreen}></Route>

                {/* RUTAS DE FILTROS */}

                <Route path="/filter/clientes" component={ClientesFilter}></Route>
                <Route path="/filter/capital" component={Menu}></Route>
                <Route path="/filter/exp" component={ExpedientesJuiciosFilter}></Route>

                {/* RUTAS DE REPORTE */}

                <Route path="/reports" component={ReportesScreen}></Route>

                {
                    (state)
                    &&
                    (
                        <Redirect to={ruta} />
                    )

                }

                <Redirect to={'/dashboard'} />



            </Switch>

        </Router>
    )
}
