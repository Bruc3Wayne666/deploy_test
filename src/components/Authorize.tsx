import React, {FC, useState} from 'react';
import {useAppDispatch} from "../hooks/redux";
import {login, register} from '../store/reducers/auth/authActions';

const Authorize: FC = () => {
    const dispatch = useAppDispatch()
    const [type, setType] = useState('login')
    const [form, setForm] = useState({
        login: '',
        password: ''
    })

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
                        <p>Ещё нету аккаунта? <span onClick={() => {
                            setType('register')
                            setForm({
                                login: '',
                                password: ''
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
                        <p>Уже есть аккаунт? <span onClick={() => {
                            setType('login')
                            setForm({
                                login: '',
                                password: ''
                            })
                        }}>Войти!</span></p>
                        <button type={'submit'}>Зарегистрироваться!</button>
                    </>

            }
        </form>
    );
};

export default Authorize;
