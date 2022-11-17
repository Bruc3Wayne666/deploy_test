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
import {logout} from "./store/reducers/auth/authSlice";
import Help from "./components/Help";


const App: FC = () => {
    const {session} = useAppSelector(state => state.authReducer)
    const dispatch = useAppDispatch()
    // const alert = useAlert()


    useEffect(() => {
        if (localStorage.getItem('isAuth') === 'true') {
            dispatch(login({
                // @ts-ignore
                login: localStorage.getItem('login'),
                // @ts-ignore
                password: localStorage.getItem('password'),
                remember: true
            }))
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
            <p className='advice'>Попробуйте очистить localstorage, а затем перезагрузить страницу и войти заново, нажав
                по ссылке.</p>
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
                            <Route path={'cyber'} element={<CyberSport/>}/>
                            <Route path={'*'} element={<h1>404. Страница появится скоро</h1>}/>
                        </Routes>
                }

            </ContentContainer>
            <TabBar/>
        </div>
    )
}

export default App
