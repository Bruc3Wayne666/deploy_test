import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {login, register} from '../store/reducers/auth/authActions';

const Authorize: FC = () => {
    const {session} = useAppSelector(state => state.authReducer)
    const {result} = useAppSelector(state => state.profileReducer)

    const dispatch = useAppDispatch()
    const [type, setType] = useState('login')
    const [form, setForm] = useState({
        login: '',
        password: '',
        remember: false
    })

    // useEffect(()=> {
    //     console.log(session)
    //     console.log(result)
    // }, [])

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (type === 'login'){
            dispatch(login(form))
        } else if (type === 'register') {
            dispatch(register(form))
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={'auth-form'}
        >
            {
                type === 'login'
                    ?
                    <>
                        <input
                            value={form.login}
                            onChange={e => setForm({...form, login: e.target.value})}
                            placeholder={'Ваш логин'}
                            type="text"
                        />
                        <input
                            value={form.password}
                            onChange={e => setForm({...form, password: e.target.value})}
                            placeholder={'Ваш пароль'}
                            type="password"
                        />
                        <div style={{display:'flex', justifyContent: "center", alignItems: "center"}}>
                            Запомнить меня
                            <input
                                onChange={e => setForm({...form, remember: e.target.checked})}
                                type={'checkbox'}
                            />
                        </div>
                        <p>Ещё нету аккаунта? <span onClick={() => {
                            setType('register')
                            setForm({
                                login: '',
                                password: '',
                                remember: false
                            })
                        }}>Зарегистрироваться!</span></p>
                        <button type={'submit'}>Войти</button>
                    </>
                    :
                    <>
                        <input
                            value={form.login}
                            onChange={e => setForm({...form, login: e.target.value})}
                            placeholder={'Придумайте логин'}
                            type="text"
                        />
                        <input
                            value={form.password}
                            onChange={e => setForm({...form, password: e.target.value})}
                            placeholder={'Придумайте пароль'}
                            type="password"
                        />
                        <div style={{display:'flex', justifyContent: "center", alignItems: "center"}}>
                            Запомнить меня
                            <input
                                onChange={e => setForm({...form, remember: e.target.checked})}
                                type={'checkbox'}
                            />
                        </div>
                        <p>Уже есть аккаунт? <span onClick={() => {
                            setType('login')
                            setForm({
                                login: '',
                                password: '',
                                remember: false
                            })
                        }}>Войти!</span></p>
                        <button type={'submit'}>Зарегистрироваться!</button>
                    </>

            }
        </form>
    );
};

export default Authorize;
