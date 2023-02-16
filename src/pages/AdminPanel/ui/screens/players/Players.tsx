import React, {FC, useEffect, useState} from 'react';
import axios from "axios";
import {setSession} from "store/entities/auth/authSlice";
import {useAppDispatch, useAppSelector} from "hooks/redux";
import Modal from '../../Modal/Modal';
import {instance} from "../../../../../api";

const Players = () => {
    const dispatch = useAppDispatch()
    const [usersInfo, setUsersInfo] = useState([])
    const [show, setShow] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [userTransfers, setUserTransfers] = useState(null)
    const [userInfoBids, setUserInfoBids] = useState(null)
    const {session} = useAppSelector(state => state.authReducer)
    const [page, setPage] = useState(1)


    const getUsersInfo = async () => {
        const {data} = await instance.post('users_info_a',
            {
                user_id: session,
                page
            }
        )
        if (data === 'session is not active') {
            alert('Сессия истекла')
            return dispatch(setSession(''))
        }
        setUsersInfo(data.users)
    }

    const getUserInfoBids = async (id: number) => {
        const {data} = await axios.post('user_info_bids_a',
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
        const {data} = await axios.post('user_transfer_a',
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

    useEffect(() => {
        getUsersInfo()
    }, [session, page])

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

            <Pages setPage={setPage} page={page}/>
            <div className="columns">
                <div className='column'>ID</div>
                <div className='column'>Почта</div>
                <div className='column'>Баланс</div>
                <div className='column'>Прибыль</div>
                <div className='column'>Пополнения</div>
                <div className='column'>Ставки</div>
            </div>
            <div className="payouts">
                {
                    usersInfo
                        .map(player => <PlayerItem
                            getUserTransfer={getUserTransfer}
                            getUserInfoBids={getUserInfoBids}
                            player={player}
                            setShow={setShow}
                        />)
                }
            </div>
        </>
    );
};

interface PlayerItemProps {
    player: {
        balance: number
        email: string
        id: number
        profit: number
    },
    getUserInfoBids: (v: number) => void
    getUserTransfer: (v: number) => void
    setShow: (v: string) => void
}

const PlayerItem: FC<PlayerItemProps> = ({player, getUserInfoBids, getUserTransfer, setShow}) => {
    const {
        balance,
        email,
        id,
        profit
    } = player

    return (
        <div className='payout'>
            <div className="column">{id}</div>
            <div className="column">{email}</div>
            <div className="column">{balance}</div>
            <div className="column">{profit}</div>
            <div
                onClick={() => {
                    setShow('transfer')
                    getUserTransfer(id)
                }}
                className="column">Показать
            </div>
            <div
                onClick={() => {
                    setShow('bids')
                    getUserInfoBids(id)
                }}
                className="column">Показать
            </div>
        </div>
    )
}


const Pages: FC<any> = ({setPage, page}: { setPage: (v: number) => void, page: number }) => {
    return (
        <div className="pages">
            <div
                onClick={() => {
                    if (page === 1) {
                        return
                    }
                    setPage(page - 1)
                }}
                className="move">{'<'}</div>
            {page}
            <div
                onClick={() => setPage(page + 1)}
                className="move">{'>'}</div>
        </div>
    )
}

export default Players;
