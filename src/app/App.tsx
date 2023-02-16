import React, {FC, useEffect} from 'react'
import './styles/index.css'
import {Route, Routes, useLocation} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {login} from "store/entities/auth/authActions";

// @ts-ignore
// import {useAlert} from 'react-alert';
import {logout, setSession} from "store/entities/auth/authSlice";
import {Account} from 'pages/Account';
import {AdminPanel} from 'pages/AdminPanel';
import HeaderMobile from "widgets/Header/ui/HeaderMobile/HeaderMobile";
import {ContentContainer} from "pages/ContentContainer";
import Header from 'widgets/Header/ui/Header/Header';
import {Main} from 'pages/Main';
import {Results} from 'pages/Results';
import {Discounts} from 'pages/Discounts';
import {BetsScreen} from 'pages/BetsScreen';
import {Vip} from "pages/VIP";
import {Live} from 'pages/Live';
import {Purchase} from 'pages/Purchase';
import {Income} from 'pages/Income';
import {CyberSport} from 'pages/Cybers';
import {Help} from 'pages/Help';
import {Authorize} from "pages/Authorize";
import TabBar from 'widgets/TabBar/ui/TabBar';
import {Suspense} from 'react';


const App: FC = () => {
    const {session} = useAppSelector(state => state.authReducer)
    const dispatch = useAppDispatch()
    const {pathname} = useLocation()
    // const alert = useAlert()

    useEffect(() => {
        if (pathname !== '/admin_panel') {
            const script = document.createElement('script')

            script.src = 'https://code.jivo.ru/widget/MgAeR2eRHq'
            script.async = true

            document.body.appendChild(script)

            return () => {
                document.body.removeChild(script)
            }
        }
    }, [])

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

    if (pathname === '/admin_panel') {
        return <Suspense>
            <AdminPanel/>
        </Suspense>
    }

    return (
        <div className='App'>
            <HeaderMobile/>
            <Header/>
            <ContentContainer>
                {
                    session ?
                        <Suspense>
                            <Routes>
                                <Route path={'/'} element={<Main/>}/>
                                <Route path={'/:sport'} element={<Main/>}/>
                                <Route path={'profile'} element={<Account/>}/>
                                <Route path={'discounts'} element={<Discounts/>}/>
                                <Route path={'results'} element={<Results/>}/>
                                <Route path={'bets'} element={<BetsScreen/>}/>
                                <Route path={'vip'} element={<Vip/>}/>
                                <Route path={'live'} element={<Live/>}/>
                                <Route path={'purchase'} element={<Purchase/>}/>
                                <Route path={'purchase_history'} element={<Purchase/>}/>
                                <Route path={'income'} element={<Income/>}/>
                                <Route path={'income_history'} element={<Income/>}/>
                                <Route path={'cyber'} element={<CyberSport/>}/>
                                <Route path={'help'} element={<Help/>}/>
                                {/*<Route path={'admin_panel'} element={<AdminPanel/>}/>*/}
                                <Route path={'*'} element={<h1>404. Страница появится скоро</h1>}/>
                            </Routes>
                        </Suspense>
                        :
                        <Suspense>
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
                        </Suspense>
                }

            </ContentContainer>
            <TabBar/>
            {/*<ChatBox/>*/}
        </div>
    )
}


export default App
