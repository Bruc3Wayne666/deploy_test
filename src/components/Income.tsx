import React, {FC, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import axios from "axios";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {IProfileState} from "../store/reducers/profile/profileSlice";
import {ApiService} from "../api";
import {logout} from "../store/reducers/auth/authSlice";
import Switch from "react-switch";
import {useLocation, useParams} from "react-router-dom";


interface TransferItemType {
    amount: number
    loook_link?: string
    remainder_time?: number
    status: string
    wallet?: string
    iden: number
}

interface TransferListType {
    count: number
    result: TransferItemType[]
}

interface TransferItemProps {
    transfer: TransferItemType,
    handlePress?: () => void,
}

// const TransferItemUSDT: FC<TransferItemProps> = ({transfer, sendAddress}) => {
//     const {
//         amount,
//         remainder_time,
//         loook_link,
//         status,
//         wallet,
//         iden
//     } = transfer
//
//     return (
//         <div className='transfer-item'>
//             <div
//                 style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                 }}
//             >
//                 <h4>Идентификатор пополнения #{iden}</h4>
//             </div>
//
//             <div
//                 style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                 }}
//             >
//                 <img
//                     src={require('../assets/images/purchase/tracker.svg').default}
//                     alt=""
//                     height={26}
//                     style={{marginRight: 14}}
//                 />
//                 <a style={{marginTop: 20}} href={loook_link && loook_link}><h3>Отслеживать пополнение</h3></a>
//             </div>
//
//             {
//                 status === 'waiting'
//                     ? <h3>Адрес актуален: <b
//                         style={{color: 'yellow'}}>{Math.floor(remainder_time ? (remainder_time / 60) : 0)}</b> минут</h3>
//                     : status === 'finish'
//                         ? <h3>Пополнено на <b>{amount}</b></h3>
//                         :
//                         <div
//                             style={{
//                                 display: 'flex',
//                                 alignItems: 'center',
//                             }}
//                         >
//                             <img
//                                 src={require('../assets/images/purchase/times.svg').default}
//                                 alt=""
//                                 height={26}
//                                 style={{marginRight: 14}}
//                             />
//                             <h3 style={{marginTop: 18}}>Адрес не актуален (просрочен)</h3>
//                         </div>
//             }
//             <h3>Адрес для оплаты: </h3>
//             <h3
//                 // ref={address}
//                 className='transfer-address'
//                 onClick={() => {
//                     navigator.clipboard.writeText(wallet ? wallet : '')
//                         .then(() => alert('Адрес скопирован в буфер обмена'))
//                 }}
//             >
//                 <span>{wallet}</span>
//             </h3>
//
//             <div
//                 style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                 }}
//             >
//                 <img
//                     src={require('../assets/images/purchase/mail.svg').default}
//                     alt=""
//                     height={26}
//                     style={{marginRight: 14}}
//                 />
//                 <h3
//                     onClick={() => sendAddress && sendAddress(wallet ? wallet : '')}
//                     style={{
//                         cursor: 'pointer',
//                         marginTop: 10
//                     }}
//                     className='transfer-option'
//                 >
//                     <span>Выслать адрес на почту</span>
//                 </h3>
//             </div>
//
//         </div>
//     )
// }

// const TransferItemCWD: FC<TransferItemProps> = ({transfer, handlePress}) => {
//     const {
//         amount,
//         iden,
//         status
//     } = transfer
//
//     return (
//         <div className='transfer-item'>
//             <div
//                 style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                 }}
//             >
//                 <h4>Идентификатор пополнения #{iden}</h4>
//             </div>
//
//             <div
//                 style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                 }}
//             >
//                 <h3>
//                     <p style={{marginBottom: 10}}>Успешно зачислено на баланс:</p>
//                     <p/>
//                     <span style={{color: 'gold', fontWeight: 900}}>{amount}</span>
//                 </h3>
//                 <br/>
//             </div>
//
//
//         </div>
//     )
// }

const Help = ({setShowHelp}: { setShowHelp: () => void }) => {
    return (
        <div className="purchase">
            <div className="pur-info">
                <h1>Инструкция по покупке <span style={{fontWeight: 'bold', color: '#cc9933'}}>CWD</span> для начинающих
                    пользователей:</h1>
                <br/>
                <p><span
                    style={{
                        fontWeight: 'bold',
                        color: '#cc9933',
                        fontSize: 18
                    }}
                >1</span> - Перейти по ссылке для регистрации кошелька</p>
                <br/>
                <p><span
                    style={{
                        fontWeight: 'bold',
                        color: '#cc9933',
                        fontSize: 18
                    }}
                >2</span> - Создать кошелек,указав необходимые данные для регистрации. Обязательно! Не потеряйте ваш
                    пароль от кошелька</p>
                <br/>
                <p><span
                    style={{
                        fontWeight: 'bold',
                        color: '#cc9933',
                        fontSize: 18
                    }}
                >3</span> - Переходим во вкладку «финансы»; выбираем «обмен CWD»</p>
                <br/>
                <p><span
                    style={{
                        fontWeight: 'bold',
                        color: '#cc9933',
                        fontSize: 18
                    }}
                >4</span> - Далее,во вкладке «купить CWD», необходимо найти рекомендованного обменника crowd-ex и
                    приобретаем необходимое количество CWD</p>
                <br/>
                <p><span style={{fontWeight: 'bold'}}>Примечание</span>: чтобы максимально повысить безопасность ваших
                    средств, четко следуйте инструкции со всеми
                    ее рекомендациями</p>

                <button
                    className='create'
                    onClick={setShowHelp}
                >
                    Вернуться назад
                </button>
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
         setShowHelp,
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
             setShowHelp: () => void,
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
                    placeholder={''}
                    type="number"
                    value={value}
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
                            if (account === '') return alert('Введите аккаунт')
                            return createWithDrawal()
                        }}
                        style={{
                            backgroundColor: '#cc9933',
                            padding: '12px 12px',
                            borderRadius: 8,
                            border: 'none',
                            outline: 'none',
                            marginBottom: 10,
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
    const [showHelp, setShowHelp] = useState(false)
    const [value, setValue] = useState(0)
    const [walletName, setWalletName] = useState('')
    // const [showAll, setShowAll] = useState(true)

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
        setAccount(val)
    }

    const handleChangeAddress = (val: string) => {
        setAddress(val)
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

    // const createTransferUSDT = useCallback(async () => {
    //     const {data} = await axios.post<TransferItemType | string>(`${process.env.REACT_APP_BASE_URL}/create_transfer`, {user_id: session})
    //
    //     if (data === 'session is not active') {
    //         dispatch(logout())
    //         alert('Сессия истекла. Авторизуйтесь заново')
    //         return window.location.href = '/profile'
    //     }
    //
    //     if (data === '1') {
    //         alert('Кошелёк уже создан')
    //     } else {
    //         // @ts-ignore
    //         setTransferListUSDT(prevState => ({...prevState, result: [data, ...prevState?.result]}))
    //     }
    // }, [session])
    //
    // const createTransferCWD = useCallback(async () => {
    //     const {data} = await axios.post<TransferItemType | string>(`${process.env.REACT_APP_BASE_URL}/added_cwd`, {
    //         user_id: session,
    //         user_cwd_account: account
    //     })
    //     if (data === 'No new additions') return alert('Нету новых пополнений')
    //     // @ts-ignore
    //     else setTransferListCWD(prevState => ({...prevState, result: [data, ...prevState?.result]}))
    // }, [session, account])

    const createWithDrawal = useCallback(async () => {
        const {data} = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_withdrawal`, {
            user_id: session,
            value: value,
            wallet_name: method === 'usd' ? address : account,
            currency: method.toUpperCase()
        })
    }, [session, account, value, walletName, method])

    const getWithDrawalsList = useCallback(async () => {
        if (!session) return null
        const {data} = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/withdrawals_list`,
            {user_id: session}
        )
        return data
    }, [session, method])

    const handleShowHelp = () => setShowHelp(prevState => !prevState)

    useEffect(() => {
        createWithDrawal()
            .then(res => res)
        getWithDrawalsList()
            .then(res => {
                // if (res === 'session is not active') {
                //     dispatch(logout())
                //     alert('Сессия истекла. Авторизуйтесь заново')
                //     return window.location.href = '/profile'
                // }
                // if (method === 'usd') return setTransferListUSDT({...res, result: res.result.reverse()})
                // else return setTransferListCWD({...res, result: res.result.reverse()})
            })
        // const interval = setInterval(() => {
        //     if (method === 'usd') {
        //         getTransferList()
        //             .then(res => setTransferListUSDT({...res, result: res.result.reverse()}))
        //     } else {
        //         getTransferList()
        //             .then(res => setTransferListCWD({...res, result: res.result.reverse()}))
        //     }
        // }, 20000)
        window.scrollTo(0, 0)


        // return () => clearInterval(interval)
    }, [session, method])

    // if (showHelp) return <Help setShowHelp={handleShowHelp}/>

    // @ts-ignore
    return (
        <div className='purchase'>
            <PurchaseMethod
                method={method}
                handleChangeMethod={handleChangeMethod}
            />
            {
                pathname === '/income' &&
                <Info
                    setShowHelp={handleShowHelp}
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

            {/*<div*/}
            {/*    className={'util'}*/}
            {/*    style={{*/}
            {/*        display: 'flex',*/}
            {/*        justifyContent: 'center',*/}
            {/*        fontSize: 18,*/}
            {/*        color: 'floralwhite',*/}
            {/*        marginBottom: 8,*/}
            {/*        cursor: 'pointer',*/}
            {/*        alignItems: 'center'*/}
            {/*    }}*/}
            {/*    onClick={() => setShowAll(prevState => !prevState)}*/}
            {/*>*/}
            {/*    <span style={{color: '#888', marginRight: 12}}>{showAll ? 'Показать все' : 'Показать последнее'}</span>*/}
            {/*    <img src={require(showAll ?*/}
            {/*        '../assets/svg/arrow_down.svg' :*/}
            {/*        '../assets/svg/arrow_up.svg'*/}
            {/*    ).default} alt="" width={22} height={22}/>*/}
            {/*</div>*/}

            {/*{*/}
            {/*    pathname === '/purchase' ?*/}
            {/*        method === 'usd'*/}
            {/*            ? transferListUSDT?.result[0] && <TransferItemUSDT*/}
            {/*            sendAddress={sendAddress}*/}
            {/*            transfer={transferListUSDT.result[0]}*/}
            {/*        />*/}
            {/*            : transferListCWD?.result[0] && <TransferItemCWD*/}
            {/*            transfer={transferListCWD.result[0]}*/}
            {/*        />*/}
            {/*        :*/}
            {/*        method === 'usd'*/}
            {/*            ? transferListUSDT?.result*/}
            {/*                .map(transfer => (<TransferItemUSDT*/}
            {/*                    sendAddress={sendAddress}*/}
            {/*                    transfer={transfer}*/}
            {/*                />))*/}
            {/*            : transferListCWD?.result*/}
            {/*                .map(transfer => (<TransferItemCWD*/}
            {/*                    transfer={transfer}*/}
            {/*                />))*/}
            {/*}*/}
        </div>
    );
};

export default Purchase;
