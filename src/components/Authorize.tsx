import React, {FC, useState} from 'react';
import {useAppDispatch} from "../hooks/redux";
import {login, register} from '../store/reducers/auth/authActions';

// @ts-ignore
import { useAlert } from 'react-alert';


const Authorize: FC = () => {
    const dispatch = useAppDispatch()
    const [type, setType] = useState('login')
    const [form, setForm] = useState({
        login: '',
        password: '',
        remember: true
    })
    const [email, setEmail] = useState('')
    const alert = useAlert()

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (type === 'login') {
            dispatch(login(form))
        } else if (type === 'register') {
            dispatch(register(email))
            setType('login')
            alert.show('Мы выслали пароль на ваш email. Проверьте в разделе СПАМ')
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
                                checked={form.remember}
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
                        <p style={{fontSize: 22, marginBottom: 14}}>
                            Мы отправим пароль на ваш email
                        </p>
                        <input
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder={'Введите свой email'}
                            type="text"
                        />
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
                                setEmail('')
                            }}>Войти!</span></p>
                        </div>
                        <button style={{width: 240}} type={'submit'}>Зарегистрироваться!</button>
                    </>

            }
        </form>
    );
};

export default Authorize;
