import React, {FC, useEffect, useState} from 'react';
import {setSession} from "store/entities/auth/authSlice";
import {useAppDispatch, useAppSelector} from "hooks/redux";
import Dropdown from "react-dropdown";
import Modal from "../../Modal/Modal";
import {instance} from "../../../../../api";

const Payouts = () => {
    const dispatch = useAppDispatch()
    const [show, setShow] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [drawalsList, setDrawalsList] = useState([])
    const [userTransfers, setUserTransfers] = useState(null)
    const [userInfoBids, setUserInfoBids] = useState(null)
    const {session} = useAppSelector(state => state.authReducer)

    const getUserInfoBids = async (id: number) => {
        const {data} = await instance.post('user_info_bids_a',
            {
                user_id: session,
                client_id: id,
            }
        )
        if (data === 'session is not active') {
            alert('Сессия истекла')
            return dispatch(setSession(''))
        }
        setUserInfoBids(data.bids)
        setIsModalOpen(true)
    }

    const getUserTransfer = async (id: number) => {
        const {data} = await instance.post('user_transfer_a',
            {
                user_id: session,
                client_id: id
            }
        )
        if (data === 'session is not active') {
            alert('Сессия истекла')
            return dispatch(setSession(''))
        }

        setUserTransfers(data.transfers)
        setIsModalOpen(true)
    }

    const handleChangeWithDrawalStatus = async (id: number, status: string, setCurrentStatus: (v: string) => void) => {
        const {data} = await instance.post('change_withdrawal_status_a',
            {
                user_id: session,
                withdrawal_id: id,
                status
            }
        )
        if (data === 'session is not active') {
            alert('Сессия истекла')
            return dispatch(setSession(''))
        }
        setCurrentStatus(status)
        alert(data)
    }

    const getWithDrawalsList = async () => {
        const {data} = await instance.post('withdrawals_list_a',
            {user_id: session}
        )
        if (data === 'session is not active') {
            alert('Сессия истекла')
            return dispatch(setSession(''))
        }
        return setDrawalsList(data.withdrawals)
    }

    useEffect(() => {
        getWithDrawalsList()
    }, [session])

    return (
        <>
            {
                isModalOpen && <Modal
                    setIsOpen={setIsModalOpen}
                    userInfoBids={userInfoBids}
                    userTransfers={userTransfers}
                    userTransfer={userTransfers}
                    show={show}
                />
            }

            <div className="columns">
                <div className='column'>ID</div>
                <div className='column'>Валюта</div>
                <div className='column'>Имя кошелька</div>
                <div className='column'>Сумма вывода</div>
                <div className='column'>Статус</div>
                <div className='column'>Дата</div>
                <div className='column'>Транзакции игрока</div>
                <div className='column'>Ставки игрока</div>
            </div>
            <div className="payouts">
                {
                    drawalsList
                        .map(drawal => <PayoutItem
                            drawal={drawal}
                            handleChangeWithDrawalStatus={handleChangeWithDrawalStatus}
                            getUserInfoBids={getUserInfoBids}
                            getUserTransfer={getUserTransfer}
                            setIsModalOpen={setIsModalOpen}
                            setShow={setShow}
                        />)
                }
            </div>
        </>
    );
};

interface PayoutItemProps {
    drawal: {
        beatifull_time: string
        client_id: number
        currency: string
        id: number
        our_currency: number
        status: string
        time_stamp: number
        wallet_name: string
    },
    handleChangeWithDrawalStatus: (v1: number, v2: string, v3: (v: string) => void) => void
    getUserInfoBids: (v: number) => void
    getUserTransfer: (v: number) => void
    setIsModalOpen: (v: boolean) => void
    setShow: (v: string) => void
}

const PayoutItem: FC<PayoutItemProps> = (
    {
        drawal,
        handleChangeWithDrawalStatus,
        getUserInfoBids,
        getUserTransfer,
        setShow
    }
) => {
    const {
        beatifull_time,
        client_id,
        currency,
        id,
        our_currency,
        status,
        wallet_name
    } = drawal

    const [currentStatus, setCurrentStatus] = useState(status)

    const statuses = {
        'in work': 'В процессе',
        'fail': 'Провал',
        'success': 'Успешно'
    }
    const opt_statuses = [
        {value: 'in work', label: 'В процессе', className: 'admin-dropdown-option'},
        {value: 'fail', label: 'Провал', className: 'admin-dropdown-option'},
        {value: 'success', label: 'Успешно', className: 'admin-dropdown-option'},
    ]


    return (
        <div className='payout'>
            <div className="column">{id}</div>
            <div className="column">{currency}</div>
            <div
                onClick={() => getUserTransfer(client_id)}
                className="column"
            >
                {wallet_name}
            </div>
            <div className="column">{our_currency}</div>
            <div
                className="column"
            >
                {
                    <Dropdown
                        options={opt_statuses}
                        placeholder={
                            // @ts-ignore
                            statuses[currentStatus]
                        }
                        controlClassName={'admin-dropdown'}
                        menuClassName={'admin-dropdown-menu'}
                        onChange={e => {
                            handleChangeWithDrawalStatus(id, e.value, setCurrentStatus)
                        }}
                    />
                }</div>
            <div className="column">
                {beatifull_time.slice(4, 25)}
                {/*{format(new Date(beatifull_time), 'dd-mm-yyyy hh:mm')}*/}
            </div>
            <div
                onClick={() => {
                    setShow('transfer')
                    getUserTransfer(client_id)
                }}
                className="column">
                Показать
            </div>
            <div
                onClick={() => {
                    setShow('bids')
                    getUserInfoBids(client_id)
                }}
                className="column">
                Показать
            </div>
        </div>
    )
}

export default Payouts;
