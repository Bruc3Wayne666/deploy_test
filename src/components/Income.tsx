import React, {FC, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import axios from "axios";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {IProfileState} from "../store/reducers/profile/profileSlice";
import {ApiService} from "../api";
import {logout} from "../store/reducers/auth/authSlice";
import Switch from "react-switch";
import {useLocation} from "react-router-dom";


interface DrawalItemType {
    currency: string
    status: string
    value: number
    wallet_name: string
}

interface DrawalListType {
    error: boolean
    results: DrawalItemType[]
}

interface DrawalItemProps {
    drawal: DrawalItemType,
}

const DrawalItem: FC<DrawalItemProps> = ({drawal}) => {
    const {
        currency,
        status,
        value,
        wallet_name
    } = drawal

    return (
        <div className='drawal-item'>

            <div style={{display: 'flex', alignItems: 'center'}}>
                <img
                    src={require('../assets/svg/wallet.svg').default}
                    height={22}
                    style={{marginRight: 10}}
                    alt=""
                />
                <p>Имя кошелька: <span
                    style={{fontSize: 22, color: 'lightblue'}}
                >
                {wallet_name}
            </span></p>
            </div>

            <br/>

            <div style={{display: 'flex', alignItems: 'center'}}>
                <img
                    src={
                        status === 'success'
                            ? require('../assets/svg/status-success.svg').default
                            : require('../assets/svg/status-inwork.svg').default
                    }
                    height={22}
                    style={{marginRight: 10}}
                    alt=""
                />
                <p>Статус: <span
                    style={{fontSize: 22, color: 'lightblue'}}
                >
                {status === 'success' ? 'успешно завершено' : 'в процессе'}
            </span></p>
            </div>

            <br/>

            <div style={{display: 'flex', alignItems: 'center'}}>
                <img
                    src={require('../assets/svg/money_sum.svg').default}
                    height={22}
                    style={{marginRight: 10}}
                    alt=""
                />
                <p>Сумма вывода: <span
                    style={{fontSize: 22, color: 'gold', fontWeight: 'bold'}}
                >
                {value}
            </span></p>
            </div>

            <br/>

            <div style={{display: 'flex', alignItems: 'center'}}>
                <img
                    src={require('../assets/svg/crypto.svg').default}
                    height={22}
                    style={{marginRight: 10}}
                    alt=""
                />
                <p>Валюта: <span
                    style={{fontSize: 22, color: 'lightblue'}}
                >
                {currency}
            </span></p>
            </div>

        </div>
    )
}


const Info =
    ({
         handleChangeAccount,
         handleChangeAddress,
         handleChangeValue,
         createWithDrawal,
         account,
         address,
         value,
         method
     }:
         {
             handleChangeAccount: (v: string) => any,
             handleChangeAddress: (v: string) => any,
             handleChangeValue: (v: number) => any,
             createWithDrawal: () => any,
             account: string,
             address: string,
             value: number,
             method: string
         }) => {
        return (
            <div className='pur-info' style={{paddingBottom: 0}}>

                <p>
                    {
                        method === 'usd'
                            ? 'Введите USDT адрес'
                            : 'Введите название аккаунта'
                    }
                </p>
                <input
                    onChange={method === 'usd' ? e => handleChangeAddress(e.target.value) : e => handleChangeAccount(e.target.value)}
                    placeholder={account === '' ? method === 'usd'
                        ? 'Введите USDT адрес'
                        : 'Введите название аккаунта' : ''}
                    type="text"
                    value={method === 'usd' ? address : account}
                />

                <br/>

                <p>Сумма вывода</p>
                <input
                    onChange={e => handleChangeValue(Number(e.target.value))}
                    placeholder={value === 0 ? '0' : ''}
                    type="number"
                    value={value !== 0 ? value : ''}
                />

                <br/>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <button
                        onClick={() => {
                            if ((method === 'usd' && address === '') || (method === 'cwd' && account === '')) {
                                return alert(method === 'usd' ? 'Введите адрес' : 'Введите аккаунт')
                            }
                            if (value === 0) {
                                return alert('Введите сумму для вывода')
                            }
                            return createWithDrawal()
                        }}
                        style={{
                            backgroundColor: '#cc9933',
                            padding: '12px 12px',
                            borderRadius: 8,
                            border: 'none',
                            outline: 'none',
                            marginBottom: 28,
                            cursor: 'pointer'
                        }}
                    >
                        Запрос на вывод
                    </button>
                </div>
            </div>
        )
    }


const PurchaseMethod: FC<any> = ({
                                     handleChangeMethod,
                                     method
                                 }: { handleChangeMethod: (val: string) => any, method: string }) => {
    // const [purchase, setPurchase] = useState('usd')

    return (
        <div className="purchaseSwitcher">
            <div className="methods">
                <h2 style={{fontWeight: 600}}>Валюта:&nbsp;</h2>

                <Switch
                    onChange={() => handleChangeMethod(method)}
                    width={104}
                    offColor={'#00aa00'}
                    onColor={'#000033'}
                    height={30}
                    handleDiameter={38}
                    uncheckedIcon={<div style={{
                        fontSize: 20,
                        height: '100%',
                        paddingRight: 32,
                        display: 'flex',
                        alignItems: 'center',
                        paddingTop: 2,
                        fontWeight: 600,
                        justifyContent: 'center',
                        color: '#222'
                    }}>USD</div>}
                    checkedIcon={<div style={{
                        fontSize: 20,
                        height: '100%',
                        paddingLeft: 32,
                        display: 'flex',
                        alignItems: 'center',
                        paddingTop: 2,
                        fontWeight: 600,
                        justifyContent: 'center'
                    }}>CWD</div>}
                    uncheckedHandleIcon={<div style={{height: '100%'}}><img
                        src={require('../assets/svg/usd.svg').default}
                        alt={''}/></div>}
                    checkedHandleIcon={<div
                        style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><img
                        src={require('../assets/images/gi-coin.png')} width='56%' height='80%' alt={''}/></div>}
                    // src={require('../assets/svg/cwd.svg').default} alt={''}/></div>}
                    checked={method !== 'usd'}
                />
            </div>
        </div>
    )
}


const Purchase: FC = () => {
    const {pathname} = useLocation()
    const {session} = useAppSelector(state => state.authReducer)
    const [method, setMethod] = useState('usd')
    const dispatch = useAppDispatch()
    const [account, setAccount] = useState('')
    const [address, setAddress] = useState('')
    const [value, setValue] = useState(0)
    const [drawalsList, setDrawalsList] = useState<DrawalListType>()

    const [profile, setUserInfo] = useState<IProfileState>({
        error: false,
        message: null,
        result: null,
    })


    const handleChangeMethod = (val: string) => {
        if (val === 'cwd') return setMethod('usd')
        return setMethod('cwd')
    }

    const handleChangeAccount = (val: string) => {
        setAccount(val.trim())
    }

    const handleChangeAddress = (val: string) => {
        setAddress(val.trim())
    }

    const handleChangeValue = (val: number) => {
        setValue(val)
    }

    const fetchUserInfo = useCallback(async (session: string) => {
        return await ApiService.getProfile(session)
    }, [session])

    useEffect(() => {
        if (session) {
            fetchUserInfo(session)
                .then(res => {
                    // @ts-ignore
                    if (res === 'session is not active') {
                        dispatch(logout())
                        alert('Сессия истекла. Авторизуйтесь заново')
                        return window.location.href = '/profile'
                    }
                    setUserInfo(res)
                })
        }
    }, [session])

    const createWithDrawal = useCallback(async () => {
        if (profile.result?.balance && Number(profile.result.balance) < value) return alert('Недостаточно средств на балансе')
        const {data} = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_withdrawal`, {
            user_id: session,
            value: value,
            wallet_name: method === 'usd' ? address : account,
            currency: method === 'usd' ? 'USDT' : 'CWD'
        })

        await getWithDrawalsList()
    }, [session, account, value, method])

    const getWithDrawalsList = useCallback(async () => {
        if (!session) return null
        const {data} = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/withdrawals_list`,
            {user_id: session}
        )
        setDrawalsList({...data, results: data.results.reverse()})
    }, [session, method])

    useEffect(() => {
        getWithDrawalsList().then()
        window.scrollTo(0, 0)
    }, [session, method])

    // @ts-ignore
    return (
        <div className='purchase'>
            {
                pathname === '/income'
                    ? <PurchaseMethod
                        method={method}
                        handleChangeMethod={handleChangeMethod}
                    />
                    : <div style={{display: 'flex', justifyContent: 'center', marginBottom: 22}}>
                        <h1>История выплат</h1>
                    </div>
            }

            {
                pathname === '/income' &&
                <Info
                    handleChangeAccount={handleChangeAccount}
                    handleChangeAddress={handleChangeAddress}
                    handleChangeValue={handleChangeValue}
                    createWithDrawal={createWithDrawal}
                    account={account}
                    address={address}
                    value={value}
                    method={method}
                />
            }

            {
                pathname === '/income' &&
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: 16,
                        marginTop: 20
                    }}
                >
                    <span>Последняя выплата</span>
                </div>
            }
            {
                pathname === '/income'
                    ? drawalsList?.results[0] && <DrawalItem
                    drawal={drawalsList.results[0]}
                />
                    : drawalsList?.results
                        .map(drawal => (<DrawalItem
                            drawal={drawal}
                        />))
            }
        </div>
    );
};

export default Purchase;
