import React, {FC, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import axios from "axios";
import {useAppSelector} from "../hooks/redux";


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
    transfer: TransferItemType
}

const TransferItem: FC<TransferItemProps> = ({transfer}) => {
    const {
        amount,
        remainder_time,
        loook_link,
        status,
        wallet,
        iden
    } = transfer

    const address = useRef(null)

    return (
        <div className='transfer-item'>
            <h4>📂Идентификатор пополнения #{iden}</h4>
            <a href={loook_link}><h3>🔍 Отслеживать пополнение</h3></a>
            {
                status === 'waiting'
                    ? <h3>⏳ Адрес актуален: <b style={{color: 'red'}}>{Math.floor(remainder_time / 60)}</b> минут</h3>
                    : status === 'finish'
                        ? <h3>💵 Пополнено на <b>{amount}</b></h3>
                        : <h3>❌ Адрес не актуален (просрочен)</h3>
            }
            <h3>🏷 Адрес для оплаты: </h3>
            <h3
                ref={address}
                className='transfer-address'
                onClick={() => {
                    navigator.clipboard.writeText(wallet)
                        .then(() => alert('Адрес скопирован в буфер обмена'))
                }}
            >
                <span>{wallet}</span>
            </h3>

            <h3 className='transfer-option'>📩 <span>Выслать адрес на почту</span></h3>
        </div>
    )
}


const Info = React.memo(({createTransfer}: {createTransfer: () => void}) => {
    return (
        <div className='pur-info'>
            <h1 className='header'>📬 Способ пополнения: <br/> 💲 <b style={{color: '#111'}}>USDT TRC20</b></h1>
            <a href='https://www.bestchange.ru/qiwi-to-tether-trc20.html'>
                <h3 className='exchanger-list'>📊 <b style={{color: '#111'}}>Список обменников</b></h3>
            </a>
            <h3>🕒 Оплата будет засчитана после 1 подтверждения сетью</h3>
            <h3>🧾 Для каждого пополнения создавайте новый счёт</h3>
            <h3>🆘 Не бойтесь, поддержка сайта вас не оставит</h3>
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

    const createTransfer = useCallback(async () => {
        const {data} = await axios.post<TransferItemType | string>('http://gpbetapi.ru/create_transfer', {user_id: session})
        if (data === '1') alert('Кошелёк уже создан')
    }, [session])

    const getTransferList = useCallback(async () => {
        if (!session) return null
        const {data} = await axios.post('http://gpbetapi.ru/transfer_list', {user_id: session})
        return data
    }, [session])

    useEffect(() => {
        getTransferList()
            .then(res => setTransferList(res))
        const interval = setInterval(() => {
            getTransferList()
                .then(res => setTransferList(res))
        }, 20000)


        return () => clearInterval(interval)
    }, [session])


    return (
        <div className='purchase'>
            <Info createTransfer={createTransfer}/>
            {
                transferList?.result.reverse()
                    .map(transfer => <TransferItem transfer={transfer}/>)
            }
        </div>
    );
};

export default Purchase;
