import React, {FC, useEffect, useMemo, useState} from 'react';
import axios from "axios";
import {useAppSelector} from "../hooks/redux";


const getTransferList = async (session: string) => {
    const {data} = await axios.post('http://gpbetapi.ru/transfer_list', {user_id: session})
    return data
}

const createTransfer = async (session: string) => {
    const {data} = await axios.post('http://gpbetapi.ru/create_transfer', {user_id: session})
    return data
}

interface TransferItemType {
    amount?: number
    loook_link: string
    remainder_time: number
    status: string
    wallet: string
}

interface TransferListType {
    count: number
    result: TransferItemType[]
}

interface TransferItemProps {
    transfer: TransferItemType
}

const TransferItem: FC<TransferItemProps> = ({transfer}) => {
    const {
        amount,
        remainder_time,
        loook_link,
        status,
        wallet
    } = transfer

    return (
        <div className='transfer-item'>
            <h4>📂Идентификатор пополнения # (жду)</h4>
            <a href={loook_link}><h3>🔍 Отслеживать пополнение</h3></a>
            {
                status === 'waiting'
                    ? <h3>⏳ Адрес актуален: <b>{Math.floor(remainder_time / 60)}</b> минут</h3>
                    : status === 'finish'
                        ? <h3>💵 Пополнено на <b>{amount}</b></h3>
                        : <h3>❌ Адрес не актуален</h3>
            }
            <h3>🏷 Адрес для оплаты:    </h3>
            <h3
                className='transfer-address'
                onClick={() => {
                    navigator.clipboard.writeText(wallet)
                    alert('Адрес скопирован в буфер обмена')
                }}
            >
                <span>{wallet}</span>
            </h3>

            <h3 className='transfer-option'>📩 <span>Выслать адрес на почту</span></h3>
        </div>
    )
}


const Info: FC<{session: string | null}> = ({session}) => {
    return (
        <div className='pur-info'>
            <h1 className='header'>📬 Способ пополнения: <br/> 💲 <b>USDT TRC20</b></h1>
            <a href='https://www.bestchange.ru/qiwi-to-tether-trc20.html'>
                <h3 className='exchanger-list'>📊 <b>Список обменников</b></h3>
            </a>
            <h3>🕒 Оплата будет засчитана после 1 подтверждения сетью</h3>
            <h3>🧾 Для каждого пополнения создавайте новый счёт</h3>
            <h3>🆘 Не бойтесь, поддержка сайта вас не оставит</h3>
            <button
                className='create'
                onClick={() => session && createTransfer(session)}
            >
                Пополнить
            </button>
        </div>
    )
}

const Purchase: FC = () => {
    const {session} = useAppSelector(state => state.authReducer)
    const [transferList, setTransferList] = useState<TransferListType>()

    useEffect(() => {
        if (session) {
            getTransferList(session)
                .then(res => setTransferList(res))
        }
    }, [session])


    return (
        <div className='purchase'>
            <Info session={session}/>
            {
                transferList?.result.reverse()
                    .map(transfer => <TransferItem transfer={transfer}/>)
            }
        </div>
    );
};

export default Purchase;
