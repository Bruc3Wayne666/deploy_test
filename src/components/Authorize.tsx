import React, {FC, useState} from 'react';
import {useAppDispatch} from "../hooks/redux";
import {login, register} from '../store/reducers/auth/authActions';

// @ts-ignore
import { useAlert } from 'react-alert';


const Button: FC<{value: string}> = ({value}) => {

    return (
        <button type={'submit'}>
            {value}
        </button>
    )
}

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
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: 30
                            }}
                        >
                            <img
                                src={require('../assets/green_price.png')}
                                height={90}
                                width={90}
                                alt="GPBet"
                            />
                            <h1 style={{fontStyle: 'italic', fontWeight: 'bold'}}>GPBet</h1>
                        </div>
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
                                // marginTop: 12
                            }}
                        >
                        </div>
                        {/*<button type={'submit'}>Войти</button>*/}
                        <Button value={'Войти'}/>

                        <p
                            style={{
                                fontSize: 18,
                                color: '#cc9933',
                                marginBottom: 130
                            }}
                        >
                            Забыли пароль?
                        </p>

                        <p>Ещё нету аккаунта? <span onClick={() => {
                            setType('register')
                            setForm({
                                login: '',
                                password: '',
                                remember: false
                            })
                        }}>Зарегистрироваться!</span></p>
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
                        {/*<button style={{width: 240}} type={'submit'}>Зарегистрироваться!</button>*/}
                        <Button value={'Зарегистрироваться!'}/>
                    </>

            }
        </form>
    );
};

export default Authorize;
