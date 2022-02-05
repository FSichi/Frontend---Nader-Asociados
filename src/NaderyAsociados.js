import React from 'react'
import { MainRoutes } from './routes/MainRoutes'
import {Provider} from 'react-redux'
import { store } from './store/store'

export const NaderyAsociados = () => {
    return (
        <Provider store={store}>
            <MainRoutes />
        </Provider>
    )
}
