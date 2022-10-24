import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { setupStore } from './store/store'
import { Provider } from 'react-redux'
import {BrowserRouter, HashRouter} from "react-router-dom";
// import { BrowserRouter } from 'react'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const store = setupStore()
root.render(
	<Provider store={store}>
		{/*<HashRouter basename={'/'}>*/}
			<BrowserRouter basename='/'>
				<App />
			</BrowserRouter>
		{/*</HashRouter>*/}
	</Provider>
)
