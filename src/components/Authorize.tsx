import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {login, register} from '../store/reducers/auth/authActions';

const Authorize: FC = () => {
    const dispatch = useAppDispatch()
    const [type, setType] = useState('login')
    const [form, setForm] = useState({
        login: '',
        password: '',
        remember: false
    })

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (type === 'login') {
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
                        <div
                            style={{
                                fontSize: 16,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: "center"
                            }}
                        >
                            <p>Запомнить&nbsp;меня</p>
                            <input
                                style={{
                                    margin: 'auto',
                                    marginLeft: 6
                                }}
                                onChange={e => setForm({...form, remember: e.target.checked})}
                                type={'checkbox'}
                            />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                marginTop: 12
                            }}
                        >
                            <p>Ещё нету аккаунта? <span onClick={() => {
                                setType('register')
                                setForm({
                                    login: '',
                                    password: '',
                                    remember: false
                                })
                            }}>Зарегистрироваться!</span></p>
                        </div>
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
                        <div
                            style={{
                                fontSize: 16,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: "center"
                            }}
                        >
                            <p>Запомнить&nbsp;меня</p>
                            <input
                                style={{
                                    margin: 'auto',
                                    marginLeft: 6
                                }}
                                onChange={e => setForm({...form, remember: e.target.checked})}
                                type={'checkbox'}
                            />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                marginTop: 12
                            }}
                        >
                            <p>Уже есть аккаунт? <span onClick={() => {
                                setType('login')
                                setForm({
                                    login: '',
                                    password: '',
                                    remember: false
                                })
                            }}>Войти!</span></p>
                        </div>
                        <button type={'submit'}>Зарегистрироваться!</button>
                    </>

            }
        </form>
    );
};

export default Authorize;
