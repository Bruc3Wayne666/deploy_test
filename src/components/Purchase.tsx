import React, {FC, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import axios from "axios";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {IProfileState} from "../store/reducers/profile/profileSlice";
import {ApiService} from "../api";
import results from "./Results";
import {logout} from "../store/reducers/auth/authSlice";


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
    sendAddress: (address: string) => void
}

const TransferItem: FC<TransferItemProps> = ({transfer, sendAddress}) => {
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
                    onClick={() => sendAddress(wallet)}
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


const Info = React.memo(({createTransfer}: { createTransfer: () => void }) => {
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
                    <br/><b style={{color: 'yellowgreen'}}>USDT TRC20</b>
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

                <a href='https://www.bestchange.ru/qiwi-to-tether-trc20.html'>
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
                Создать кошелёк
            </button>
        </div>
    )
})


const Purchase: FC = () => {
    const {session} = useAppSelector(state => state.authReducer)
    const [transferList, setTransferList] = useState<TransferListType>()
    const dispatch = useAppDispatch()

    const [profile, setUserInfo] = useState<IProfileState>({
        error: false,
        message: null,
        result: null,
    })

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


        if (data === '1') {
            alert('Кошелёк уже создан')
        } else {
            // @ts-ignore
            setTransferList(prevState => ({...prevState, result: [...prevState?.result, data]}))
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
                setTransferList(res)
            })
        const interval = setInterval(() => {
            getTransferList()
                .then(res => setTransferList(res))
        }, 20000)
        window.scrollTo(0, 0)


        return () => clearInterval(interval)
    }, [session])


    return (
        <div className='purchase'>
            <Info createTransfer={createTransfer}/>
            {
                transferList?.result.reverse()
                    .map(transfer => <TransferItem sendAddress={sendAddress} transfer={transfer}/>)
            }
        </div>
    );
};

export default Purchase;
