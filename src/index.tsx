import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App, { InWork } from './App'
import {setupStore} from './store/store'
import {Provider} from 'react-redux'
import {BrowserRouter} from "react-router-dom";

// @ts-ignore
import {transitions, positions, Provider as AlertProvider} from 'react-alert'

// @ts-ignore
import AlertTemplate from 'react-alert-template-basic'


const options = {
    // you can also just use 'bottom center'
    position: positions.TOP_RIGHT,
    timeout: 5000,
    offset: '30px',
    containerStyle: {
        zIndex: 9999
    },
    // you can also just use 'scale'
    transition: transitions.SCALE
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const store = setupStore()
root.render(
    <Provider store={store}>
        {/*<BrowserRouter basename='/deploy_test'>*/}
        <BrowserRouter>
            <AlertProvider template={AlertTemplate} {...options}>
                {/*<App/>*/}
                <InWork/>
            </AlertProvider>
        </BrowserRouter>
    </Provider>
)
