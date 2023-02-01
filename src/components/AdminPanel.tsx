import React, {FC, FormEvent, useEffect, useState} from 'react';
import axios from "axios";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {login} from "../store/reducers/auth/authActions";
import Dropdown from "react-dropdown";
import {setSession} from "../store/reducers/auth/authSlice";
import TripleToggleSwitch from './TripleSwitcher';
import format from 'date-fns/format'


const AdminPanel = () => {
        const {session} = useAppSelector(state => state.authReducer)
        const dispatch = useAppDispatch()
        const [theme, setTheme] = useState('games')
        const [drawalsList, setDrawalsList] = useState([])
        const [userInfoBids, setUserInfoBids] = useState([])
        const [gamesInfo, setGamesInfo] = useState([])
        const [usersInfo, setUsersInfo] = useState([])
        const [isModalOpen, setIsModalOpen] = useState(false)

        const [form, setForm] = useState({
            login: '',
            password: '',
            remember: true
        })


        const handleChangeWithDrawalStatus = async (id: number, status: string) => {
            const {data} = await axios.post(`${process.env.REACT_APP_BASE_URL}/change_withdrawal_status_a`,
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
            alert(data)
        }

        const getWithDrawalsList = async () => {
            const {data} = await axios.post(`${process.env.REACT_APP_BASE_URL}/withdrawals_list_a`,
                {user_id: session}
            )
            if (data === 'session is not active') {
                alert('Сессия истекла')
                return dispatch(setSession(''))
            }
            return setDrawalsList(data.withdrawals)
        }

        const getUserInfoBids = async (id: number) => {
            const {data} = await axios.post(`${process.env.REACT_APP_BASE_URL}/user_info_bids_a`,
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
            const {data} = await axios.post(`${process.env.REACT_APP_BASE_URL}/user_transfer_a`,
                {
                    user_id: session,
                    client_id: id
                }
            )
            if (data === 'session is not active') {
                alert('Сессия истекла')
                return dispatch(setSession(''))
            }
            alert(data)
        }

        const getGamesInfo = async () => {
            const {data} = await axios.post(`${process.env.REACT_APP_BASE_URL}/games_info_a`,
                {
                    user_id: session,
                }
            )
            if (data === 'session is not active') {
                alert('Сессия истекла')
                return dispatch(setSession(''))
            }
            setGamesInfo(data.games)
        }

        const getUsersInfo = async () => {
            const {data} = await axios.post(`${process.env.REACT_APP_BASE_URL}/users_info_a`,
                {
                    user_id: session,
                    page: 1
                }
            )
            if (data === 'session is not active') {
                alert('Сессия истекла')
                return dispatch(setSession(''))
            }
            setUsersInfo(data.users)
        }


        useEffect(() => {
            if (session) {
                const fetchData = async () => {
                    if (theme === 'income') {
                        getWithDrawalsList()
                    } else if (theme === 'games') {
                        getGamesInfo()
                    } else {
                        getUsersInfo()
                    }
                }
                fetchData()
            }
        }, [theme, session])

        const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            dispatch(login(form))
        }


        return (
            session
                ? <div
                    style={{backgroundColor: '#222222', height: '100%', width: '100%', position: 'fixed', overflow: 'auto'}}
                >

                    <Switcher setTheme={setTheme}/>

                    <ExitBtn dispatch={dispatch}/>

                    {
                        isModalOpen && <Modal
                            setIsOpen={setIsModalOpen}
                            userInfoBids={userInfoBids}
                        />
                    }
                    {/*<div className='admin-panel-options'>*/}
                    {/*    <div className="admin-panel-option">Игры</div>*/}
                    {/*    <div className="admin-panel-option">Игроки</div>*/}
                    {/*    <div className="admin-panel-option">Выплаты</div>*/}
                    {/*    <br/>*/}
                    {/*    <div className="admin-panel-option">[сделать как апи будет готово]</div>*/}
                    {/*</div>*/}
                    <div className='admin-panel'>
                        <div className='table'>
                            <div className='columns'>
                                {
                                    theme === 'income'
                                        ? <>
                                            <div className='column'>ID</div>
                                            <div className='column'>Валюта</div>
                                            <div className='column'>Имя кошелька</div>
                                            <div className='column'>Сумма вывода</div>
                                            <div className='column'>Статус</div>
                                            <div className='column'>Дата</div>
                                            <div className='column'>Ссылка на игрока</div>
                                        </>
                                        : theme === 'players'
                                            ? <>
                                                <div className='column'>ID</div>
                                                <div className='column'>Почта</div>
                                                <div className='column'>Баланс</div>
                                                <div className='column'>Прибыль</div>
                                                <div className='column'>Пополнения</div>
                                                <div className='column'>Ставки</div>
                                            </>
                                            : <>
                                                <div className='column'>ID</div>
                                                <div className='column'>Название</div>
                                                <div className='column'>Статус</div>
                                                <div className='column'>Прибыль с мат</div>
                                            </>
                                }
                            </div>
                            <div className='payouts'>
                                {
                                    theme === 'income'
                                        ? drawalsList
                                            .map(drawal => <PayoutItem
                                                drawal={drawal}
                                                handleChangeWithDrawalStatus={handleChangeWithDrawalStatus}
                                                getUserInfoBids={getUserInfoBids}
                                                getUserTransfer={getUserTransfer}
                                                setIsModalOpen={setIsModalOpen}
                                            />)
                                        : theme === 'players'
                                            ? usersInfo
                                                .map(player => <PlayerItem getUserInfoBids={getUserInfoBids}
                                                                           player={player}/>)
                                            : gamesInfo
                                                .map(game => <GameItem game={game}/>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
                : <div
                    style={{backgroundColor: '#222222', height: '100%', width: '100%', position: 'fixed', overflow: 'auto'}}
                >
                    <div className='admin-auth'>
                        <h1 style={{fontWeight: 900}}>GP Admin</h1>
                        <br/>
                        <form onSubmit={handleSubmit}>
                            <input placeholder='ЛОГИН' type="text" value={form.login}
                                   onChange={e => setForm({...form, login: e.target.value})}/>
                            <input placeholder='ПАРОЛЬ' type="password" value={form.password}
                                   onChange={e => setForm({...form, password: e.target.value})}/>
                            <button type='submit'>Войти</button>
                        </form>
                    </div>
                </div>
        );
    }
;

export default AdminPanel;


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
    handleChangeWithDrawalStatus: (v1: number, v2: string) => void
    getUserInfoBids: (v: number) => void
    getUserTransfer: (v: number) => void
    setIsModalOpen: (v: boolean) => void
}

interface PlayerItemProps {
    player: {
        balance: number
        email: string
        id: number
        profit: number
    },
    getUserInfoBids: (v: number) => void
}

interface GameItemProps {
    game: {
        id: number
        name: string
        profit: number
        status: string
    }
}

const PayoutItem: FC<PayoutItemProps> = (
    {
        drawal,
        handleChangeWithDrawalStatus,
        getUserInfoBids,
        getUserTransfer,
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
                            handleChangeWithDrawalStatus(id, e.value)
                            setCurrentStatus(e.value)
                        }}
                    />
                }</div>
            <div className="column">
                {format(new Date(beatifull_time), 'dd-mm-yyyy hh:mm')}
            </div>
            <div
                onClick={() => {
                    getUserInfoBids(client_id)
                }}
                className="column">
                {client_id}
            </div>
        </div>
    )
}


const PlayerItem: FC<PlayerItemProps> = ({player, getUserInfoBids}) => {
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
            <div className="column">---</div>
            <div
                onClick={() => {
                    getUserInfoBids(id)
                }}
                className="column">шо сюда выводить?
            </div>
        </div>
    )
}

const GameItem: FC<GameItemProps> = ({game}) => {
    const {
        id,
        name,
        profit,
        status
    } = game

    const statuses = {
        'live': 'LIVE',
        'not started': 'Не начался',
        'end': 'Завершён'
    }

    return (
        <div className='payout'>
            <div className="column">{id}</div>
            <div className="column">{name}</div>
            <div className={`column ${status}`}>
                <span>
                    {
                        // @ts-ignore
                        statuses[status]
                    }
                </span>
            </div>
            <div className="column">{profit}</div>
        </div>
    )
}


interface IBidItem {
    id: number
    kf: string
    name_kot: string
    name_sob: string
    name_ukot: string
    status: string
    summa: number
    time_place: string
    time_place_unix: number
}

interface ModalProps {
    setIsOpen: (v: boolean) => void
    userInfoBids?: IBidItem[]
}

interface ModalBidItemProps {
    bid: IBidItem
}

const ModalBidItem: FC<ModalBidItemProps> = ({bid}) => {
    const {
        id,
        kf,
        name_kot,
        name_sob,
        name_ukot,
        status,
        summa,
        time_place
    } = bid

    return (
        <div className='bid-item'>
            <div className="field" style={{color: 'gold'}}>{id}</div>
            <div className="field" style={{flex: 0.3, color: 'skyblue', fontWeight: 600}}>{kf}</div>
            <div className="field" style={{flex: 0.42}}>{name_kot}</div>
            <div className="field" style={{flex: 1}}>{name_sob}</div>
            <div className="field" style={{flex: 0.6}}>{name_ukot}</div>
            <div className={`field ${status === 'win' ? 'win' : 'lose'}`} style={{flex: 0.2}}>
                {
                    status === 'win' ? 'Выигрыш' : 'Проигрыш'
                }
            </div>
            <div className="field" style={{flex: 0.3, color: 'lightgreen', fontWeight: 600}}>{summa}</div>
            <div className="field" style={{flex: 0.4}}>{time_place}</div>
        </div>
    )
}

const Modal: FC<ModalProps> = ({setIsOpen, userInfoBids}) => {

    return (
        <div className='admin-panel-modal'>
            <div className="window">
                <div onClick={() => setIsOpen(false)} className='close-btn'><span>&times;</span></div>

                <div className='bid-items'>
                    <div className='bid-items-header'>
                        <div className="field">ID</div>
                        <div className="field" style={{flex: 0.3}}>Коэффициент</div>
                        <div className="field" style={{flex: 0.42}}>Название котировки</div>
                        <div className="field" style={{flex: 1}}>Имя события</div>
                        <div className="field" style={{flex: 0.6}}>Исход</div>
                        <div className="field" style={{flex: 0.2}}>Статус</div>
                        <div className="field" style={{flex: 0.3}}>Сумма</div>
                        <div className="field" style={{flex: 0.4}}>Время</div>
                    </div>
                    {
                        userInfoBids
                        && userInfoBids.length !== 0
                            ? userInfoBids.map(bid => <ModalBidItem bid={bid}/>)
                            : <div><h1>Пусто</h1></div>
                    }
                </div>
            </div>
        </div>
    )
}


const Switcher = ({setTheme}: { setTheme: (v: string) => void }) => {
    const labels = {
        left: {
            title: "Игры",
            value: "games"
        },
        right: {
            title: "Игроки",
            value: "players"
        },
        center: {
            title: "Выплаты",
            value: "income"
        },
    };

    // @ts-ignore
    const onChange = (value) => {
        // @ts-ignore
        setTheme(labels[value].value);
    }

    return (
        <div>
            <TripleToggleSwitch
                // @ts-ignore
                labels={labels}
                onChange={onChange}
            />
        </div>
    );
}


const ExitBtn: FC<any> = ({dispatch}) => {
    return (
        <div onClick={() => dispatch(setSession(''))} className='exit-btn'>
            <img
                src={require('../assets/svg/exit.svg').default}
                alt="Выйти"
                width={40}
                height={40}
            />
        </div>
    )
}
