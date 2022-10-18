import React, {FC, useEffect} from 'react'
import './index.css'
import Header from './components/Header';
import ContentContainer from "./components/ContentContainer";
import Account from "./components/Account";
import {Link, Route, Routes} from 'react-router-dom';
import Results from "./components/Results";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {login} from "./store/reducers/auth/authActions";
import BetsScreen from "./components/BetsScreen";
import VIP from "./components/VIP";
import {getProfile} from './store/reducers/profile/profileActions';
import {Discounts} from './components/Discounts';
import Register from "./components/Authorize";
import Authorize from "./components/Authorize";

const App: FC = () => {
    const {session} = useAppSelector(state => state.authReducer)

    useEffect(()=> {
        console.log(session)
    }, [session])

    if (Number(session) === -1) return <>
        <h1>Wrong data</h1>
    </>

    return (
        <div className='App'>
            <Header/>
            <ContentContainer>
                {
                    session ?
                        <Routes>
                            <Route path={'/'} element={<h1>{session}</h1>}/>
                            <Route path={'profile'} element={<Account/>}/>
                            <Route path={'discounts'} element={<Discounts/>}/>
                            <Route path={'results'} element={<Results/>}/>
                            <Route path={'bets'} element={<BetsScreen/>}/>
                            <Route path={'vip'} element={<VIP/>}/>
                        </Routes>
                        :
                        <Routes>
                            <Route path={'/'} element={<h1>Sign in now</h1>}/>
                            <Route path={'profile'} element={<Authorize/>}/>
                            <Route path={'results'} element={<Results/>}/>
                            <Route path={'*'} element={<h1>404</h1>} />
                        </Routes>
                }

            </ContentContainer>
        </div>
    )
}

export default App
