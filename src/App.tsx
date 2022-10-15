import React, {FC} from 'react'
import './index.css'
import Header from './components/Header';
import ContentContainer from "./components/ContentContainer";
import Account from "./components/Account";
import {Route, Routes } from 'react-router-dom';
// import {useAppDispatch, useAppSelector} from "./hooks/redux";
// import {login} from "./store/reducers/auth/authAction";

const App: FC = () => {
	// const { userId } = useAppSelector(state => state.authReducer)
	// const disptach = useAppDispatch()
	//
	// useEffect(() => {
	// 	disptach(login({
	// 		login: 'bruce',
	// 		password: 'bruce1234'
	// 	}))
	// }, [disptach])

	return (
		<div className='App'>
			<Header/>
			<ContentContainer>
				<Routes>
					<Route path={'profile'} element={<Account/>}/>
				</Routes>
			</ContentContainer>
		</div>
	)
}

export default App
