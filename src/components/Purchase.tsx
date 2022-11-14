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

    return (
        <div style={{marginBottom: 30, borderRadius: 22, borderColor: "white", borderWidth: 2, borderStyle: 'solid'}}>
            <h3>{transfer.wallet}</h3>
            <br/>
            <h3>{transfer.remainder_time}</h3>
            <br/>
            <h3>{transfer.status}</h3>
        </div>
    )
}

const Purchase:FC = () => {
    const {session} = useAppSelector(state => state.authReducer)
    const [transferList, setTransferList] = useState<TransferListType>()

    useEffect(() => {
        if (session){
            getTransferList(session)
                .then(res => setTransferList(res))
        }
    }, [session])


    return (
        <div style={{marginTop: 100}}>
            {
                transferList?.result
                .map(transfer => <TransferItem transfer={transfer}/>)
            }
        </div>
    );
};

export default Purchase;
