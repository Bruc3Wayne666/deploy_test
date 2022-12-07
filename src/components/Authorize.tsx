import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch} from "../hooks/redux";
import {login, register} from '../store/reducers/auth/authActions';

// @ts-ignore
// import {useAlert} from 'react-alert';
import axios from "axios";


const Button: FC<{ value: string }> = ({value}) => {

    return (
        <button
            style={{cursor: 'pointer', backgroundColor: 'red', borderRadius: 8}}
            type={'submit'}>
            {value}
        </button>
    )
}

const Authorize: FC = () => {
    const dispatch = useAppDispatch()
    const [type, setType] = useState('login')
    const [forgot, setForgot] = useState(false)
    const [form, setForm] = useState({
        login: '',
        password: '',
        remember: true
    })
    const [email, setEmail] = useState('')
    const [recovery, setRecovery] = useState('')
    // const alert = useAlert()

    const handleReset = (e: any) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_BASE_URL}/reset_password`, {
            login: recovery
        })
            .then(() => {
                setForgot(false)
                setRecovery('')
                // alert.show('Мы выслали пароль на ваш email')
                alert('Мы выслали пароль на ваш email')
            })
            .catch(() => {
                // alert.show('Что-то пошло не так')
                alert('Что-то пошло не так')
            })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()

        if (type === 'login') {
            dispatch(login(form))
        } else if (type === 'register') {
            dispatch(register(email))
            setType('login')
            // alert.show('Мы выслали пароль на ваш email. Проверьте в разделе СПАМ')
            alert('Мы выслали пароль на ваш email. Проверьте в разделе СПАМ')
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    if (forgot) return (
        <form
            className={'auth-form'}
            onSubmit={handleReset}
        >
            <>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 30
                    }}
                >
                    <img
                        src={require('../assets/auth_logo.jpeg')}
                        height={90}
                        // width={90}
                        alt="GPBet"
                        style={{borderRadius: 8}}
                    />
                </div>
                <div style={{marginBottom: 12}}>
                    <p style={{fontSize: 14}}>Введите email для восстановления пароля</p>
                </div>
                <input
                    value={recovery}
                    onChange={e => setRecovery(e.target.value)}
                    placeholder={'Ваш логин'}
                    type="text"
                />
                <div
                    style={{
                        display: 'flex',
                        // marginTop: 12
                    }}
                >
                </div>
                {/*<button type={'submit'}>Войти</button>*/}
                <Button value={'Отправить пароль'}/>

                <p
                    style={{cursor: 'pointer'}}
                    onClick={() => setForgot(false)}
                >Вернуться обратно</p>
            </>
        </form>
    )

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
                                src={require('../assets/auth_logo.jpeg')}
                                height={90}
                                // width={90}
                                alt="GPBet"
                                style={{borderRadius: 8}}
                            />
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
                            {/*<p>Запомнить&nbsp;меня</p>*/}
                            {/*<input*/}
                            {/*    checked={form.remember}*/}
                            {/*    style={{*/}
                            {/*        margin: 'auto',*/}
                            {/*        marginLeft: 6*/}
                            {/*    }}*/}
                            {/*    onChange={e => setForm({...form, remember: e.target.checked})}*/}
                            {/*    type={'checkbox'}*/}
                            {/*/>*/}
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

                        <button
                            style={{
                                cursor: 'pointer',
                                marginTop: -6,
                                borderRadius: 8,
                                backgroundColor: 'forestgreen'
                            }}
                            onClick={() => {
                                setType('register')
                                setForm({
                                    login: '',
                                    password: '',
                                    remember: false
                                })
                            }}
                        >
                            Зарегистрироваться
                        </button>

                        <p
                            onClick={() => setForgot(true)}
                            style={{
                                cursor: 'pointer',
                                fontSize: 18,
                                color: '#cc9933',
                                marginBottom:
                                    (window.innerWidth > 1440)
                                        ? 20
                                        : (window.innerWidth > 640)
                                            ? 100
                                            : 20
                            }}
                        >
                            Забыли пароль?
                        </p>

                        {/*<p className='suggest-reg'>Ещё нету аккаунта? <span onClick={() => {*/}
                        {/*    setType('register')*/}
                        {/*    setForm({*/}
                        {/*        login: '',*/}
                        {/*        password: '',*/}
                        {/*        remember: false*/}
                        {/*    })*/}
                        {/*}}>Зарегистрироваться!</span></p>*/}
                    </>

                    :

                    <>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: 30
                            }}
                        >
                            <img
                                src={require('../assets/auth_logo.jpeg')}
                                height={90}
                                // width={90}
                                alt="GPBet"
                                style={{borderRadius: 8}}
                            />
                        </div>
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

                        </div>
                        {/*<button style={{width: 240}} type={'submit'}>Зарегистрироваться!</button>*/}
                        <Button value={'Зарегистрироваться!'}/>

                        <p style={{marginBottom: 200}}>Уже есть аккаунт? <span onClick={() => {
                            setType('login')
                            setForm({
                                login: '',
                                password: '',
                                remember: false
                            })
                            setEmail('')
                        }}>Войти!</span></p>
                    </>
            }
        </form>
    );
};


export default Authorize;
