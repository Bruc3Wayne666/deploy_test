import React, {FC, useState} from "react";
import {IGame} from "../models/IGame";
// @ts-ignore
import Modal from 'react-modal';
import {IProfileState} from "../store/reducers/profile/profileSlice";
import {ApiService} from "../api";

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
    const {league, name} = currentGame
    const [sumValue, setSumValue] = useState(0)
    const [bidSuccess, setBidSuccess] = useState(false)

    const handleSubmit = () => {
        // @ts-ignore
        if (user.result?.balance >= sumValue){
            ApiService.placeBid({
                user_id: session,
                id_kot: String(bet.id),
                sum_bid: String(sumValue)
            })
                .then(res => setBidSuccess(true))
        } else {
            setBidSuccess(false)
            handleChangeShowModal(false)
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
        style={{
            overlay: {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.45)',
            },
            content: {
                minWidth: 400,
                height: 420,
                position: 'absolute',
                top: 100,
                left: '30%',
                right: '30%',
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
                    <div className="league">
                        {/*<img src={require('../assets/pngegg.png')} height={16} alt=""/>*/}
                        {league.name}
                    </div>
                    <div className="teams">
                <span>
                    {/*<img src={require('../assets/sp.png')} height={24} alt=""/>*/}
                    <span className='team'>{name}</span>
                    {/*<img src={require('../assets/cs.png')} height={24} alt=""/>*/}
                </span>
                        {/*<div className="status">LIVE</div>*/}
                        <div className="status">НЕ НАЧАЛСЯ</div>
                        {/*<div className="count">2:0</div>*/}
                    </div>
                    <div className="totals">
                <span>
                1Х2 {bet.name}
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
                                if (Number(e.target.value)) setSumValue(Number(e.target.value))
                            }
                            }/>
                            <span
                                onClick={() => setSumValue(sumValue + 10)}
                                style={{cursor: 'pointer'}}>+</span>
                        </div>
                    </div>
                    <div className="binf">
                        Возможный выигрыш
                        <span className='win'>{Math.round(bet.kf * sumValue * 100) / 100} RUB</span>
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
