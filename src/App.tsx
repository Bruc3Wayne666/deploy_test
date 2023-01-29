import React, {FC, useEffect} from 'react'
import './index.css'
import Header from './components/Header';
import ContentContainer from "./components/ContentContainer";
import Account from "./components/Account";
import {Route, Routes} from 'react-router-dom';
import Results from "./components/Results";
import BetsScreen from "./components/BetsScreen";
import VIP from "./components/VIP";
import {Discounts} from './components/Discounts';
import Authorize from "./components/Authorize";
import {useAppDispatch, useAppSelector} from './hooks/redux';
import {login} from "./store/reducers/auth/authActions";
import Main from "./components/Main";
import TabBar from "./components/TabBar";
import Live from "./components/Live";
import HeaderMobile from "./components/HeaderMobile";
import Purchase from "./components/Purchase";
import CyberSport from "./components/Cybers";

// @ts-ignore
// import {useAlert} from 'react-alert';
import {logout, setSession} from "./store/reducers/auth/authSlice";
import Help from "./components/Help";
import Income from './components/Income';
import ChatBox from "./components/ChatBox";


const App: FC = () => {
    const {session} = useAppSelector(state => state.authReducer)
    const dispatch = useAppDispatch()
    // const alert = useAlert()

    // useEffect(() => {
    //     const script = document.createElement('script');
    //
    //     script.src = 'https://code.jivo.ru/widget/MgAeR2eRHq';
    //     script.async = true;
    //
    //     document.getElementById('chatbox')?.appendChild(script);
    //
    //     return () => {
    //         document.getElementById('chatbox')?.removeChild(script);
    //     }
    // }, [])

    useEffect(() => {
        if (localStorage.getItem('isAuth') === 'true') {
            if (localStorage.getItem('password') || localStorage.getItem('login')) {
                dispatch(logout())
            }
            //@ts-ignore
            else dispatch(setSession(localStorage.getItem('session')))
        }
    }, [])

    if (Number(session) === -1) {
        // alert.show('Неправильный логин или пароль.')
        alert('Неправильный логин или пароль.')
        dispatch(logout())
    }

    if (Number(session) === -2) return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                height: '100vh'
            }}
            className='error'
        >
            <h1>Что-то пошло не так</h1>
            <p>Возможно данного пользователя не существует или введены некорректные данные.</p>
            <p>Либо это может быть связано с неполадками на сервере.</p>
            <p className='advice'>Попробуйте перезагрузить страницу и войти заново, нажав
                на кнопку ниже.</p>
            <button
                onClick={() => {
                    dispatch(logout())
                    // localStorage.clear()
                    // window.location.href = "/profile"
                }}>Попробовать снова
            </button>
        </div>
    )

    return (
        <div className='App'>
            <HeaderMobile/>
            <Header/>
            <ContentContainer>
                {
                    session ?
                        <Routes>
                            <Route path={'/'} element={<Main/>}/>
                            <Route path={'/:sport'} element={<Main/>}/>
                            <Route path={'profile'} element={<Account/>}/>
                            <Route path={'discounts'} element={<Discounts/>}/>
                            <Route path={'results'} element={<Results/>}/>
                            <Route path={'bets'} element={<BetsScreen/>}/>
                            <Route path={'vip'} element={<VIP/>}/>
                            <Route path={'live'} element={<Live/>}/>
                            <Route path={'purchase'} element={<Purchase/>}/>
                            <Route path={'purchase_history'} element={<Purchase/>}/>
                            <Route path={'income'} element={<Income/>}/>
                            <Route path={'income_history'} element={<Income/>}/>
                            <Route path={'cyber'} element={<CyberSport/>}/>
                            <Route path={'help'} element={<Help/>}/>
                            <Route path={'*'} element={<h1>404. Страница появится скоро</h1>}/>
                        </Routes>
                        :
                        <Routes>
                            <Route path={'/'} element={<Main/>}/>
                            <Route path={'/:sport'} element={<Main/>}/>
                            <Route path={'profile'} element={<Authorize/>}/>
                            <Route path={'results'} element={<Results/>}/>
                            <Route path={'bets'} element={<Authorize/>}/>
                            <Route path={'live'} element={<Live/>}/>
                            <Route path={'purchase'} element={<Authorize/>}/>
                            <Route path={'purchase_history'} element={<Authorize/>}/>
                            <Route path={'income'} element={<Authorize/>}/>
                            <Route path={'income_history'} element={<Authorize/>}/>
                            <Route path={'cyber'} element={<CyberSport/>}/>
                            <Route path={'*'} element={<h1>404. Страница появится скоро</h1>}/>
                        </Routes>
                }

            </ContentContainer>
            <TabBar/>
            {/*<ChatBox/>*/}
        </div>
    )
}

export const InWork: FC = () => {
    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column'}}>
            <img
                width={200}
                // src={require('./assets/svg/repair.svg').default}
                src='https://images.squarespace-cdn.com/content/v1/5a9491275ffd20adbfc1b276/1520298034213-3A61XFIYH7SHL9HCD9RF/repair.gif'
                alt=""
            />
            <br/>
            <br/>
            <h2>Ведутся технические работы</h2>
            <br/>
            <h4>Приносим свои извинения, тех. поддержка работает. Скоро всё будет!</h4>
        </div>
    )
}

export default App
