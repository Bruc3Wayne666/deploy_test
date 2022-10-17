import React, {FC, useEffect} from 'react'
import './index.css'
import Header from './components/Header';
import ContentContainer from "./components/ContentContainer";
import Account from "./components/Account";
import {Route, Routes} from 'react-router-dom';
import Results from "./components/Results";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {login} from "./store/reducers/auth/authActions";
import BetsScreen from "./components/BetsScreen";
import VIP from "./components/VIP";
import {getProfile} from './store/reducers/profile/profileActions';
import { Discounts } from './components/Discounts';
// import {useAppDispatch, useAppSelector} from "./hooks/redux";
// import {login} from "./store/reducers/auth/authAction";

const App: FC = () => {
    const {session} = useAppSelector(state => state.authReducer)
    const disptach = useAppDispatch()

    useEffect(() => {
        disptach(login({
            login: 'osel',
            password: 'osel'
        }))
    }, [disptach])

    return (
        <div className='App'>
            <Header/>
            <ContentContainer>
                <Routes>
                    <Route path={'/'} element={<h1>{session}</h1>}/>
                    <Route path={'profile'} element={<Account/>}/>
                    <Route path={'discounts'} element={<Discounts />}/>
                    <Route path={'results'} element={<Results/>}/>
                    <Route path={'bets'} element={<BetsScreen/>}/>
                    <Route path={'vip'} element={<VIP/>}/>
                </Routes>
            </ContentContainer>
        </div>
    )
}

export default App
