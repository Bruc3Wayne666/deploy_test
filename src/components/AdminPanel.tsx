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
        const [userInfoBids, setUserInfoBids] = useState(null)
        const [userTransfers, setUserTransfers] = useState(null)
        const [gamesInfo, setGamesInfo] = useState([])
        const [usersInfo, setUsersInfo] = useState([])
        const [isModalOpen, setIsModalOpen] = useState(false)
        const [show, setShow] = useState('')
        const [page, setPage] = useState(1)

        const [form, setForm] = useState({
            login: '',
            password: '',
            remember: true
        })


        const handleChangeWithDrawalStatus = async (id: number, status: string, setCurrentStatus: (v: string) => void) => {
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
            setCurrentStatus(status)
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

            setUserTransfers(data.transfers)
            setIsModalOpen(true)
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
                    page
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
        }, [theme, session, page])

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
                        theme === 'players' && <Pages setPage={setPage} page={page}/>
                    }

                    {
                        isModalOpen && <Modal
                            setIsOpen={setIsModalOpen}
                            userInfoBids={userInfoBids}
                            userTransfers={userTransfers}
                            userTransfer={userTransfers}
                            show={show}
                        />
                    }

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
                                            <div className='column'>Транзакции игрока</div>
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
                                                <div className='column'>Счёт</div>
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
                                                setShow={setShow}
                                            />)
                                        : theme === 'players'
                                            ? usersInfo
                                                .map(player => <PlayerItem
                                                    getUserTransfer={getUserTransfer}
                                                    getUserInfoBids={getUserInfoBids}
                                                    player={player}
                                                    setShow={setShow}
                                                />)
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
    handleChangeWithDrawalStatus: (v1: number, v2: string, v3: (v: string) => void) => void
    getUserInfoBids: (v: number) => void
    getUserTransfer: (v: number) => void
    setIsModalOpen: (v: boolean) => void
    setShow: (v: string) => void
}

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

interface GameItemProps {
    game: {
        id: number
        name: string
        profit: number
        status: string,
        score: string
    }
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
                {format(new Date(beatifull_time), 'dd-mm-yyyy hh:mm')}
            </div>
            <div
                onClick={() => {
                    setShow('bids')
                    getUserInfoBids(client_id)
                }}
                className="column">
                Показать
            </div>
            <div
                onClick={() => {
                    setShow('transfer')
                    getUserTransfer(client_id)
                }}
                className="column">
                Показать
            </div>
        </div>
    )
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

const GameItem: FC<GameItemProps> = ({game}) => {
    const {
        id,
        name,
        profit,
        status,
        score
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
            <div className="column">{score}</div>
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
    userTransfer: any
    userInfoBids?: IBidItem[] | null
    userTransfers?: {
        input: {
            amount: number,
            amount_cwd: number,
            amount_usd: number,
            beatifull_time: string,
            id: number,
            status: string,
            time: number,
            type: string,
            user_cwd_acccount: string,
            user_id: number,
            user_login: string,
            wallet_adress: string | null,
            wallet_private_key: string | null
        }[]
        output: {
            beatifull_time: string
            currency: string
            id: number
            our_currency: number
            status: string
            time_stamp: number
            user_id: number
            wallet_name: string
        }[]
    } | null
    show: string
}

interface ModalBidItemProps {
    bid?: IBidItem
    transfer?: {
        amount?: number,
        amount_cwd?: number,
        amount_usd?: number,
        beatifull_time: string,
        time?: number,
        type?: string,
        user_cwd_acccount?: string,
        user_id: number,
        user_login?: string,
        wallet_adress?: string | null,
        wallet_private_key?: string | null
        currency?: string
        id: number
        our_currency?: number
        status?: string
        time_stamp?: number
        wallet_name?: string
    }
    show: string
    option?: string
}

const ModalBidItem: FC<ModalBidItemProps> = ({bid, transfer, show, option}) => {
    const statuses = {
        'in work': 'В процессе',
        'fail': 'Провал',
        'success': 'Успешно'
    }

    return (
        <div className='bid-item'>
            {
                (bid && show === 'bids') &&
                <>
                    <div className="field" style={{color: 'gold'}}>{bid.id}</div>
                    <div className="field" style={{flex: 0.3, color: 'skyblue', fontWeight: 600}}>{bid.kf}</div>
                    <div className="field" style={{flex: 0.42}}>{bid.name_kot}</div>
                    <div className="field" style={{flex: 1}}>{bid.name_sob}</div>
                    <div className="field" style={{flex: 0.6}}>{bid.name_ukot}</div>
                    <div className={`field ${bid.status === 'win' ? 'win' : 'lose'}`} style={{flex: 0.2}}>
                        {
                            bid.status === 'win' ? 'Выигрыш' : 'Проигрыш'
                        }
                    </div>
                    <div className="field" style={{flex: 0.3, color: 'lightgreen', fontWeight: 600}}>{bid.summa}</div>
                    <div className="field" style={{flex: 0.4}}>{bid.time_place}</div>
                </>
            }

            {
                (transfer && show === 'transfer' && option === 'input') &&
                <>
                    <div className="field" style={{flex: 0.2}}>{transfer.id}</div>
                    <div className="field" style={{flex: 0.2}}>{transfer.amount}</div>
                    <div className="field" style={{flex: 0.35}}>{transfer.amount_cwd}</div>
                    <div className="field" style={{flex: 0.35}}>{transfer.amount_usd}</div>
                    <div className="field" style={{flex: 0.3}}>{
                        //@ts-ignore
                        statuses[transfer.status]
                    }</div>
                    <div className="field" style={{flex: 0.2}}>{transfer.type}</div>
                    <div className="field" style={{flex: 0.6}}>{transfer.user_login}</div>
                    <div className="field" style={{flex: 0.4}}>{transfer.user_cwd_acccount}</div>
                    <div className="field" style={{flex: 0.35}}>{transfer.user_id}</div>
                    <div className="field"
                         style={{flex: 0.55}}>{transfer.wallet_adress === null ? '---' : transfer.wallet_adress}</div>
                    <div className="field"
                         style={{flex: 0.4}}>{transfer.wallet_private_key === null ? '---' : transfer.wallet_private_key}</div>
                    <div className="field"
                         style={{flex: 0.3}}>{format(new Date(transfer.beatifull_time), 'dd-mm-yyyy')}</div>
                </>
            }
            {
                (transfer && show === 'transfer' && option === 'output') &&
                <>
                    <div className="field" style={{flex: 0.1}}>{transfer.id}</div>
                    <div className="field" style={{flex: 0.2}}>{transfer.currency}</div>
                    <div className="field" style={{flex: 0.3}}>{
                        //@ts-ignore
                        statuses[transfer.status]
                    }</div>
                    <div className="field" style={{flex: 0.3}}>{transfer.our_currency}</div>
                    <div className="field" style={{flex: 0.3}}>{transfer.user_id}</div>
                    <div className="field"
                         style={{flex: 0.4}}>{transfer.wallet_name === null ? '---' : transfer.wallet_name}</div>
                    <div className="field"
                         style={{flex: 0.7}}>{format(new Date(transfer.beatifull_time), 'dd-mm-yyyy')}</div>
                </>
            }

        </div>
    )
}

const Modal: FC<ModalProps> = ({setIsOpen, userInfoBids, userTransfers, show}) => {
    const [option, setOption] = useState('input')

    return (
        <div className='admin-panel-modal'>
            <div className="window">
                <div onClick={() => setIsOpen(false)} className='close-btn'><span>&times;</span></div>
                {
                    show === 'transfer' &&
                    <button className='switchb' onClick={() => setOption(option === 'input' ? 'output' : 'input')}>
                        {option === 'input' ? 'Показать выводы' : 'Показать пополнения'}
                    </button>
                }
                <div className='bid-items'>
                    <div className='bid-items-header'>
                        {
                            (userInfoBids && show === 'bids') &&
                            <>
                                <div className="field">ID</div>
                                <div className="field" style={{flex: 0.3}}>Коэффициент</div>
                                <div className="field" style={{flex: 0.42}}>Название котировки</div>
                                <div className="field" style={{flex: 1}}>Имя события</div>
                                <div className="field" style={{flex: 0.6}}>Исход</div>
                                <div className="field" style={{flex: 0.2}}>Статус</div>
                                <div className="field" style={{flex: 0.3}}>Сумма</div>
                                <div className="field" style={{flex: 0.4}}>Время</div>
                            </>
                        }
                        {
                            (userTransfers && show === 'transfer' && option === 'input') &&
                            <>
                                <div className="field" style={{flex: 0.2}}>ID</div>
                                <div className="field" style={{flex: 0.2}}>Кол-во</div>
                                <div className="field" style={{flex: 0.35}}>Кол-во CWD</div>
                                <div className="field" style={{flex: 0.35}}>Кол-во USD</div>
                                <div className="field" style={{flex: 0.3}}>Статус</div>
                                <div className="field" style={{flex: 0.2}}>Валюта</div>
                                <div className="field" style={{flex: 0.6}}>Логин</div>
                                <div className="field" style={{flex: 0.4}}>Аккаунт</div>
                                <div className="field" style={{flex: 0.35}}>ID игрока</div>
                                <div className="field" style={{flex: 0.55}}>Кошелёк</div>
                                <div className="field" style={{flex: 0.4}}>Приватный ключ</div>
                                <div className="field" style={{flex: 0.3}}>Дата</div>
                            </>
                        }
                        {
                            (userTransfers && show === 'transfer' && option === 'output') &&
                            <>
                                <div className="field" style={{flex: 0.1}}>ID</div>
                                <div className="field" style={{flex: 0.2}}>Валюта</div>
                                <div className="field" style={{flex: 0.3}}>Статус</div>
                                <div className="field" style={{flex: 0.3}}>Наша валюта</div>
                                <div className="field" style={{flex: 0.3}}>ID игрока</div>
                                <div className="field" style={{flex: 0.4}}>Кошелёк</div>
                                <div className="field" style={{flex: 0.7}}>Дата</div>
                            </>
                        }
                    </div>
                    {
                        (userInfoBids && show === 'bids')
                        && userInfoBids.map(bid => <ModalBidItem show={show} bid={bid}/>)
                    }
                    {
                        (userTransfers && show === 'transfer' && option === 'input')
                        && userTransfers.input.map(transfer => <ModalBidItem option={option} show={show}
                                                                             transfer={transfer}/>)
                    }
                    {
                        (userTransfers && show === 'transfer' && option === 'output')
                        && userTransfers.output.map(transfer => <ModalBidItem option={option} show={show}
                                                                              transfer={transfer}/>)
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
