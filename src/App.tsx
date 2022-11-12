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

const App: FC = () => {
    const {session} = useAppSelector(state => state.authReducer)
    const dispatch = useAppDispatch()


    useEffect(() => {
        if (localStorage.getItem('isAuth') === 'true'){
            dispatch(login({
                // @ts-ignore
                login: localStorage.getItem('login'),
                // @ts-ignore
                password: localStorage.getItem('password'),
                remember: true
            }))
        }
    }, [])

    if (Number(session) === -1) return <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: '100vh'
        }}
    >
        {/*<Navigate to={'/profile'}/>*/}
    <h1>Что-то пошло не так</h1>
        <p>Возможно данного пользователя не существует или введены некорректные данные.</p>
        <p>Либо это может быть связано с неполадками на сервере.</p>
        <p>Попробуйте очистить localstorage, а затем перезагрузить страницу и войти заново, нажав по ссылке.</p>
        <a
            style={{
                fontSize: 34,
                color: 'lightblue',
                textDecoration: 'underline',
                cursor: 'pointer',
                marginTop: 20
            }}
            onClick={() => {
                localStorage.clear()
                window.location.href="/profile"
            }}>Попробовать снова</a>
    </div>


    return (
        <div className='App'>
            <HeaderMobile />
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
                            <Route path={'*'} element={<h1>404. Страница появится скоро</h1>} />
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
                            <Route path={'*'} element={<h1>404. Страница появится скоро</h1>} />
                        </Routes>
                }

            </ContentContainer>
            <TabBar/>
        </div>
    )
}

export default App
