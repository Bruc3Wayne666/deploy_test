import React, {FC, useCallback, useEffect, useState} from "react";
import {IGame} from "../models/IGame";
// @ts-ignore
import Modal from 'react-modal';
import {IProfileState} from "../store/reducers/profile/profileSlice";
import {ApiService} from "../api";
import axios from "axios";


export const ModalForm: FC<{
    handleChangeShowModal: (val: boolean) => void, showModal: boolean, currentGame: IGame, bet: {
        name: string,
        kf: number,
        id: number
    }, user: IProfileState, session: string
}> = ({
          handleChangeShowModal,
          showModal,
          currentGame,
          bet,
          user,
          session
      }) => {
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

    const fetchUserInfo = useCallback(async (session: string) => {
        return await ApiService.getProfile(session)
    }, [session])

    useEffect(() => {
        if (session) {
            fetchUserInfo(session)
                .then(res => setUserInfo(res))
        }
    }, [session])

    useEffect(() => {
        const fetchPossible = async () => {
            const {data} = await axios.post(`${process.env.REACT_APP_BASE_URL}/kf_kot`, {
                id_kot: String(bet.id),
                sum_bid: sumValue
            })
            setPossible(data)
        }
        fetchPossible()
    }, [sumValue])

    const handleSubmit = () => {
        // @ts-ignore
        if (user.result?.balance >= sumValue) {
            ApiService.placeBid({
                user_id: session,
                id_kot: String(bet.id),
                sum_bid: String(sumValue)
            })
                .then(res => setBidSuccess(true))
        } else {
            setBidSuccess(false)
            handleChangeShowModal(false)
            alert('Недостаточно средств')
            setSumValue(0)
            // window.location.href = '/purchase'
        }
    }

    return <Modal
        closeTimeoutMS={200}
        isOpen={showModal}
        onRequestClose={() => {
            setSumValue(0)
            setBidSuccess(false)
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
                // minWidth: 400,
                // maxWidth: 600,
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
                <img src={require('../assets/icons8-tick-64.png')} alt=""/>
                <span
                    style={{
                        fontSize: 30,
                        marginTop: 60
                    }}
                >
                    Ставка успешно сделана
                </span>
                <div
                    style={{
                        position: 'absolute',
                        bottom: 66
                    }}
                >
                    <button
                        onClick={() => {
                            setSumValue(0)
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
                        fontSize: 12
                    }}>
                        Ваш баланс: {user.result?.balance}
                    </div>
                    <div className="league">
                        {/*<img src={require('../assets/pngegg.png')} height={16} alt=""/>*/}
                        {league.name}
                    </div>
                    <div className="teams">
                <span>
                    {/*<img src={require('../assets/sp.png')} height={24} alt=""/>*/}
                    <div
                        style={{
                            // border: '1px solid white',
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
                    {/*<img src={require('../assets/cs.png')} height={24} alt=""/>*/}
                </span>
                        {/*<div className="status">LIVE</div>*/}
                        <div className="status">НЕ НАЧАЛСЯ</div>
                        {/*<div className="count">2:0</div>*/}
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
                    {bet.kf}
                </span>
                    </div>
                </div>
                <div className="modal_bid">
                    <div className="binf">
                        Итоговый коэффициент
                        <span>{bet.kf}</span>
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
                                if (Number(e.target.value)){
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
                        <span className='win'>{possible} CWD</span>
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
