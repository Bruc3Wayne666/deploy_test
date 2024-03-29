import React, {FC, useEffect, useState} from "react";
import {IGame} from "models/IGame";
// @ts-ignore
import Modal from 'react-modal';
import {IProfileState} from "store/entities/profile/profileSlice";
import {ApiService} from "api";
import {logout} from "store/entities/auth/authSlice";
import {useAppDispatch} from "hooks/redux";


interface ModalFormProps {
    handleChangeShowModal: (val: boolean) => void,
    showModal: boolean,
    currentGame: IGame,
    bet: {
        name: string,
        kf: number,
        id: number
    },
    user: IProfileState,
    session: string
}

export const ModalForm: FC<ModalFormProps> = props => {
    const {
        handleChangeShowModal,
        showModal,
        currentGame,
        bet,
        user,
        session
    } = props
    const {
        league,
        away_team,
        home_team,
        away_team_logo,
        home_team_logo
    } = currentGame
    const [sumValue, setSumValue] = useState(0)
    const [bidSuccess, setBidSuccess] = useState(false)
    const [possible, setPossible] = useState(0)
    const [profile, setUserInfo] = useState<IProfileState>({
        error: false,
        message: null,
        result: null,
    })

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (session) {
            ApiService.getProfile(session)
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

    useEffect(() => {
        ApiService.getPossible(String(bet.id), sumValue)
            .then(res => setPossible(res))
    }, [sumValue, currentGame])

    useEffect(() => {
        setPossible(0)
    }, [])

    const handleSubmit = () => {
        if (sumValue === 0) return alert('Нужно ввести сумму')
        // @ts-ignore
        if (user.result?.balance >= sumValue) {
            ApiService.placeBid({
                user_id: session,
                id_kot: String(bet.id),
                sum_bid: String(sumValue)
            })
                .then(res => {
                    if (res === 'sum_bid is lower 150') {
                        setBidSuccess(false)
                        setPossible(0)
                        setSumValue(0)
                        return alert('Сумма ставки должна быть не менее 100')
                    }
                    setBidSuccess(true)
                    setPossible(0)
                })
        } else {
            setBidSuccess(false)
            handleChangeShowModal(false)
            alert('Недостаточно средств')
            setPossible(0)
            setSumValue(0)
        }
    }

    return <Modal
        closeTimeoutMS={200}
        isOpen={showModal}
        onRequestClose={() => {
            setSumValue(0)
            setBidSuccess(false)
            setPossible(0)
            handleChangeShowModal(false)
        }}

        className='modal'

        style={{
            overlay: {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.45)',
                zIndex: 99,
                display: 'flex',
                justifyContent: 'center'
            },
            content: {
                width: window.innerWidth <= 1440 ? 400 : 600,
                height: 420,
                position: 'absolute',
                top: 100,
                background: 'black',
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                borderRadius: '12px',
                outline: 'none',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                border: 'none'
            }
        }
        }
    >
        <div
            className='times'
            onClick={() => {
                setSumValue(0)
                handleChangeShowModal(false)
                setBidSuccess(false)
                setPossible(0)
            }}
        >
            &times;
        </div>

        {bidSuccess ?
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    flex: 1
                }}
            >
                <div className="icon icon--order-success svg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="154px" height="154px">
                        <g fill="none" stroke="#22AE73" strokeWidth="2">
                            <circle cx="77" cy="77" r="72"
                                    style={{strokeDasharray: '480px, 480px', strokeDashoffset: '960px'}}/>
                            <circle id="colored" fill="#22AE73" cx="77" cy="77" r="72"
                                    style={{strokeDasharray: '480px, 480px', strokeDashoffset: '960px'}}/>
                            <polyline className="st0" stroke="#fff" strokeWidth="10"
                                      points="43.5,77.8 63.7,97.9 112.2,49.4 "
                                      style={{strokeDasharray: '100px, 100px', strokeDashoffset: '200px'}}/>
                        </g>
                    </svg>
                </div>

                <span
                    style={{
                        fontSize: 22,
                        marginTop: 20
                    }}
                >
                    Ставка успешно сделана
                </span>
                <div
                    style={{
                        position: 'absolute',
                        bottom: 56
                    }}
                >
                    <button
                        onClick={() => {
                            setSumValue(0)
                            setPossible(0)
                            handleChangeShowModal(false)
                            setBidSuccess(false)
                        }}
                        style={{
                            backgroundColor: 'grey',
                            color: 'white',
                            fontSize: 20,
                            borderRadius: 8,
                            padding: 8,
                            cursor: 'pointer'
                        }}
                    >
                        Вернутся на главный экран
                    </button>
                </div>
            </div>
            :
            <>
                <div className="modal_info">
                    <div style={{
                        position: 'absolute',
                        top: 3,
                        fontSize: 12,
                    }}>
                        Ваш баланс: {user.result?.balance}
                    </div>
                    <div style={{
                        position: 'absolute',
                        top: 3,
                        fontSize: 12,
                        right: 42
                    }}>
                        Минимальная ставка: 100
                    </div>
                    <div className="league">
                        {league.name}
                    </div>
                    <div className="teams">
                <span>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <div style={{
                            flex: 1,
                            fontSize: 14,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                             className='team'>
                            <img
                                src={home_team_logo}
                                alt={''}
                                height={80}
                                style={{marginBottom: 12}}
                            />
                            {home_team}
                    </div>

                        <div style={{flex: 1, fontSize: 56}} className="name">
                            <span style={{fontSize: 56}} className='linear-wipe'>VS</span>
                        </div>

                        <div style={{
                            flex: 1,
                            fontSize: 14,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                             className='team'>
                        <img
                            src={away_team_logo}
                            alt={''}
                            width={80}
                            style={{marginBottom: 12}}
                        />
                            {away_team}
                    </div>
                    </div>
                </span>
                        <div className="status">НЕ НАЧАЛСЯ</div>
                    </div>
                    <div className="totals">
                <span>
                {
                    (bet.name !== 'П1' && bet.name !== 'П2' && bet.name !== 'НИЧЬЯ') ? 'ТОТАЛ' : '1X2'
                }
                    &nbsp;
                    {bet.name}
                </span>
                        <span className='kf'>
                    {possible}
                </span>
                    </div>
                </div>
                <div className="modal_bid">
                    <div className="binf">
                        Итоговый коэффициент
                        <span>{possible}</span>
                    </div>
                    <div className="binf">
                        Сумма ставки
                        <div>
                    <span
                        onClick={() => {
                            if ((sumValue - 10) >= 0) setSumValue(sumValue - 10)
                        }}
                        style={{cursor: 'pointer'}}>-</span>
                            <input type='text' value={sumValue} placeholder={'Введите сумму'} onChange={e => {
                                if (Number(e.target.value)) {
                                    setSumValue(Number(e.target.value))
                                } else if (e.target.value === '') {
                                    setSumValue(0)
                                }
                            }
                            }/>
                            <span
                                onClick={() => setSumValue(sumValue + 10)}
                                style={{cursor: 'pointer'}}>+</span>
                        </div>
                    </div>
                    <div className="binf">
                        Возможный выигрыш
                        <span className='win'>{(sumValue * possible).toFixed(2)} CWD</span>
                    </div>
                </div>
                <div className="modal_start">
                    <button
                        onClick={handleSubmit}
                    >
                        Сделать ставку
                    </button>
                </div>
            </>
        }
    </Modal>
}
