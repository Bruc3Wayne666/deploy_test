import React, {FC, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import axios from "axios";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {IProfileState} from "../store/reducers/profile/profileSlice";
import {ApiService} from "../api";
import results from "./Results";
import {logout} from "../store/reducers/auth/authSlice";
import Switch from "react-switch";


interface TransferItemType {
    amount?: number
    loook_link: string
    remainder_time: number
    status: string
    wallet: string
    iden: number
}

interface TransferListType {
    count: number
    result: TransferItemType[]
}

interface TransferItemProps {
    transfer: TransferItemType,
    sendAddress?: (address: string) => void,
    handlePress?: () => void,
}

const TransferItemUSDT: FC<TransferItemProps> = ({transfer, sendAddress}) => {
    const {
        amount,
        remainder_time,
        loook_link,
        status,
        wallet,
        iden
    } = transfer

    // const address = useRef(null)

    return (
        <div className='transfer-item'>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <h4>Идентификатор пополнения #{iden}</h4>
            </div>

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <img
                    src={require('../assets/images/purchase/tracker.svg').default}
                    alt=""
                    height={26}
                    style={{marginRight: 14}}
                />
                <a style={{marginTop: 20}} href={loook_link}><h3>Отслеживать пополнение</h3></a>
            </div>

            {
                status === 'waiting'
                    ? <h3>Адрес актуален: <b style={{color: 'yellow'}}>{Math.floor(remainder_time / 60)}</b> минут</h3>
                    : status === 'finish'
                        ? <h3>Пополнено на <b>{amount}</b></h3>
                        :
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <img
                                src={require('../assets/images/purchase/times.svg').default}
                                alt=""
                                height={26}
                                style={{marginRight: 14}}
                            />
                            <h3 style={{marginTop: 18}}>Адрес не актуален (просрочен)</h3>
                        </div>
            }
            <h3>Адрес для оплаты: </h3>
            <h3
                // ref={address}
                className='transfer-address'
                onClick={() => {
                    navigator.clipboard.writeText(wallet)
                        .then(() => alert('Адрес скопирован в буфер обмена'))
                }}
            >
                <span>{wallet}</span>
            </h3>

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <img
                    src={require('../assets/images/purchase/mail.svg').default}
                    alt=""
                    height={26}
                    style={{marginRight: 14}}
                />
                <h3
                    onClick={() => sendAddress && sendAddress(wallet)}
                    style={{
                        cursor: 'pointer',
                        marginTop: 10
                    }}
                    className='transfer-option'
                >
                    <span>Выслать адрес на почту</span>
                </h3>
            </div>

        </div>
    )
}

const TransferItemCWD: FC<TransferItemProps> = ({transfer, handlePress}) => {
    const {
        amount,
        remainder_time,
        loook_link,
        status,
        wallet,
        iden
    } = transfer
    const [account, setAccount] = useState('')

    // const address = useRef(null)

    return (
        <div className='transfer-item'>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <h4>Идентификатор пополнения #{iden}</h4>
            </div>

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <img
                    src={require('../assets/images/purchase/exchange.svg').default}
                    alt=""
                    height={26}
                    style={{marginRight: 14}}
                />
                <a style={{marginTop: 20}} href={loook_link}><h3>Сайт пополнения</h3></a>
            </div>

            {/*{*/}
            {/*    status === 'waiting'*/}
            {/*        ? <h3>Адрес актуален: <b style={{color: 'yellow'}}>{Math.floor(remainder_time / 60)}</b> минут</h3>*/}
            {/*        : status === 'finish'*/}
            {/*            ? <h3>Пополнено на <b>{amount}</b></h3>*/}
            {/*            :*/}
            {/*            <div*/}
            {/*                style={{*/}
            {/*                    display: 'flex',*/}
            {/*                    alignItems: 'center',*/}
            {/*                }}*/}
            {/*            >*/}
            {/*                <img*/}
            {/*                    src={require('../assets/images/purchase/times.svg').default}*/}
            {/*                    alt=""*/}
            {/*                    height={26}*/}
            {/*                    style={{marginRight: 14}}*/}
            {/*                />*/}
            {/*                <h3 style={{marginTop: 18}}>Адрес не актуален (просрочен)</h3>*/}
            {/*            </div>*/}
            {/*}*/}
            <h3>Переведите средства на аккаунт:</h3>
            <h3
                className='transfer-address'
                onClick={() => {
                    navigator.clipboard.writeText(wallet)
                        .then(() => alert('Аккаунт скопирован в буфер обмена'))
                }}
            >
                <span style={{fontSize: 24}}>BEBRA</span>
            </h3>

            <br/>
            <p>Введите аккаунт с которого пополняли</p>
            <input
                onChange={e => setAccount(e.target.value)}
                placeholder={account === '' ? 'Введите аккаунт' : 'none'}
                type="text"
                value={account}
            />

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <button
                    onClick={() => {
                        if (account === '') return alert('Введите аккаунт')
                        return alert('Какое-то действие')
                    }}
                    style={{
                        backgroundColor: '#cc9933',
                        padding: '12px 12px',
                        borderRadius: 8,
                        border: 'none',
                        outline: 'none',
                        marginBottom: 10
                }}
                >
                    Я пополнил
                </button>
            </div>

        </div>
    )
}


const Info = React.memo(({createTransfer, method}: { createTransfer: () => void, method: string }) => {
    return (
        <div className='pur-info'>

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {/*<img*/}
                {/*    src={require('../assets/images/purchase/cash.svg').default}*/}
                {/*    alt=""*/}
                {/*    height={26}*/}
                {/*    style={{marginRight: 14}}*/}
                {/*/>*/}
                <h1 className='header'>Способ пополнения:</h1>
            </div>

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                    // border: '1px solid white',
                    // marginTop: -8
                }}
            >
                {/*<img*/}
                {/*    src={require('../assets/images/purchase/dollar.svg').default}*/}
                {/*    alt=""*/}
                {/*    height={26}*/}
                {/*    style={{marginRight: 14}}*/}
                {/*/>*/}
                <h1 className='header' style={{marginTop: -18}}>
                    <br/><b style={{color: 'yellowgreen'}}>{method === 'usd' ? 'USDT TRC20' : 'CWD'}</b>
                </h1>
            </div>

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <img
                    src={require('../assets/images/purchase/exchanger.svg').default}
                    alt=""
                    height={26}
                    style={{marginRight: 14}}
                />

                <a
                    href={
                        method === 'usd'
                            ? 'https://www.bestchange.ru/qiwi-to-tether-trc20.html'
                            : 'https://cwd.global/finance-dashboard'
                    }
                >
                    <h3 className='exchanger-list'><b style={{color: 'lightgreen'}}>Список обменников</b></h3>
                </a>
            </div>

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <img
                    src={require('../assets/images/purchase/clock.svg').default}
                    alt=""
                    height={26}
                    style={{marginRight: 14}}
                />
                <h3 style={{marginTop: 8}}>Оплата будет засчитана после 1 подтверждения сетью</h3>
            </div>


            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <img
                    src={require('../assets/images/purchase/account.svg').default}
                    alt=""
                    height={26}
                    style={{marginRight: 14}}
                />
                <h3 style={{marginTop: 6}}>Для каждого пополнения создавайте новый счёт</h3>
            </div>

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <img
                    src={require('../assets/images/purchase/support.svg').default}
                    alt=""
                    height={26}
                    style={{marginRight: 14}}
                />
                <h3 style={{marginTop: 8}}>Не бойтесь, поддержка сайта вас не оставит</h3>
            </div>

            <button
                className='create'
                onClick={createTransfer}
            >
                {method === 'usd' ? 'Создать кошелёк USDT' : 'Пополнить в CWD'}
            </button>
        </div>
    )
})


const PurchaseMethod: FC<any> = ({
                                     handleChangeMethod,
                                     method
                                 }: { handleChangeMethod: (val: string) => any, method: string }) => {
    // const [purchase, setPurchase] = useState('usd')

    return (
        <div className="purchaseSwitcher">
            <div className="methods">
                <h2 style={{fontWeight: 600}}>Валюта:&nbsp;</h2>
                {/*<div*/}
                {/*    onClick={() => setPurchase('usd')}*/}
                {/*    className={`method usd ${purchase === 'usd' && 'active'}`}*/}
                {/*>*/}
                {/*    USD*/}
                {/*</div>*/}
                {/*<div*/}
                {/*    onClick={() => setPurchase('cwd')}*/}
                {/*    className={`method cwd ${purchase === 'cwd' && 'active'}`}*/}
                {/*>*/}
                {/*    CWD*/}
                {/*</div>*/}

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
                    checkedHandleIcon={<div style={{height: '100%'}}><img
                        src={require('../assets/svg/cwd.svg').default} alt={''}/></div>}
                    checked={method !== 'usd'}
                />
            </div>
        </div>
    )
}


const Purchase: FC = () => {
    const {session} = useAppSelector(state => state.authReducer)
    const [transferListUSDT, setTransferListUSDT] = useState<TransferListType>()
    const [transferListCWD, setTransferListCWD] = useState<TransferListType>()
    const [method, setMethod] = useState('usd')
    const dispatch = useAppDispatch()

    const [profile, setUserInfo] = useState<IProfileState>({
        error: false,
        message: null,
        result: null,
    })

    const handleChangeMethod = (val: string) => {
        if (val === 'cwd') return setMethod('usd')
        return setMethod('cwd')
    }

    const sendAddress = (address: string) => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/send_adress`, {
            login: profile.result?.login,
            adress: address
        })
            .then(() => alert('Адрес выслан на ваш email'))
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

    const createTransfer = useCallback(async () => {
        const {data} = await axios.post<TransferItemType | string>(`${process.env.REACT_APP_BASE_URL}/create_transfer`, {user_id: session})

        if (data === 'session is not active') {
            dispatch(logout())
            alert('Сессия истекла. Авторизуйтесь заново')
            return window.location.href = '/profile'
        }

        if (data === '1') {
            alert('Кошелёк уже создан')
        } else {
            // @ts-ignore
            setTransferListUSDT(prevState => ({...prevState, result: [data, ...prevState?.result]}))
        }
    }, [session])

    const getTransferList = useCallback(async () => {
        if (!session) return null
        const {data} = await axios.post(`${process.env.REACT_APP_BASE_URL}/transfer_list`, {user_id: session})
        return data
    }, [session])

    useEffect(() => {
        getTransferList()
            .then(res => {
                if (res === 'session is not active') {
                    dispatch(logout())
                    alert('Сессия истекла. Авторизуйтесь заново')
                    return window.location.href = '/profile'
                }
                setTransferListUSDT({...res, result: res.result.reverse()})
            })
        const interval = setInterval(() => {
            getTransferList()
                .then(res => setTransferListUSDT({...res, result: res.result.reverse()}))
        }, 20000)
        window.scrollTo(0, 0)


        return () => clearInterval(interval)
    }, [session])


    return (
        <div className='purchase'>
            <PurchaseMethod
                method={method}
                handleChangeMethod={handleChangeMethod}
            />
            <Info
                createTransfer={createTransfer}
                method={method}
            />
            {
                method === 'usd'
                    ? transferListUSDT?.result
                        .map(transfer => <TransferItemUSDT sendAddress={sendAddress} transfer={transfer}/>)
                    // : transferListCWD?.result
                    : transferListUSDT?.result
                        .map(transfer => <TransferItemCWD transfer={transfer}/>)
            }
        </div>
    );
};

export default Purchase;
