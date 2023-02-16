import React, {FC, FormEvent, useState} from 'react';
import {useAppDispatch, useAppSelector} from "hooks/redux";
import {logout} from "store/entities/auth/authSlice";
import {login} from 'store/entities/auth/authActions';
import income from "../../Income/ui/Income";
import Payouts from "./screens/payouts/Payouts";
import Players from './screens/players/Players';
import Games from './screens/games/Games';
import Switcher from './TripleSwitcher/MultiSwitcher';
import Confirms from './screens/confirms/Confirms';


const Btn = (props: any) => {
    return (
        <button {...props} style={{color: 'black', border: 'none', padding: '20px 10px', cursor: 'pointer', borderRadius: '16px', position: 'fixed', bottom: 140, left: 40}}>Подтвердить матчи</button>
    )
}

const AdminPanel = () => {
        const dispatch = useAppDispatch()
        const {session} = useAppSelector(state => state.authReducer)
        const [theme, setTheme] = useState('games')
        const [form, setForm] = useState({
            login: '',
            password: '',
            remember: true
        })

        const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            dispatch(login(form))
        }


        return (
            session
                ? <div
                    style={{backgroundColor: '#222222', height: '100%', width: '100%', position: 'fixed', overflow: 'auto'}}
                >

                    <Btn onClick={() => setTheme('confirm')}/>

                    <Switcher setTheme={setTheme}/>

                    <ExitBtn dispatch={dispatch}/>

                    <div className='admin-panel'>
                        <div className='table'>
                            {
                                theme === 'income'
                                    ? <Payouts/>
                                    : theme === 'players'
                                        ? <Players/>
                                        : theme === 'confirm'
                                            ? <Confirms/>
                                            : <Games/>
                            }
                        </div>
                    </div>
                </div>
                :


                <div
                    style={{backgroundColor: '#222222', height: '100%', width: '100%', position: 'fixed', overflow: 'auto'}}
                >
                    <div className='admin-auth'>
                        <h1 style={{fontWeight: 900}}>GP Admin</h1>
                        <br/>
                        <form onSubmit={handleSubmit}>
                            <input placeholder='ЛОГИН' type="text" value={form.login}
                                   onChange={e => setForm({...form, login: e.target.value})}/>
                            <input placeholder='ПАРОЛЬ' type="password" value={form.password}
                                   onChange={e => setForm({...form, password: e.target.value})}/>
                            <button type='submit'>Войти</button>
                        </form>
                    </div>
                </div>
        );
    }
;

export default AdminPanel;


const ExitBtn: FC<any> = ({dispatch}) => {
    return (
        <div onClick={() => dispatch(logout())} className='exit-btn'>
            <img
                src={require('../../../assets/svg/exit.svg').default}
                alt="Выйти"
                width={40}
                height={40}
            />
        </div>
    )
}


