import React, {FC, useState} from "react";
import {IGame} from "../models/IGame";
// @ts-ignore
import Modal from 'react-modal';

export const ModalForm: FC<{
    handleChangeShowModal: (val: boolean) => void, showModal: boolean, currentGame: IGame, bet: {
        name: string,
        kf: number
    }
}> = ({
          handleChangeShowModal,
          showModal,
          currentGame,
          bet
      }) => {
    const {league, game_id, name, quotes} = currentGame
    const [sumValue, setSumValue] = useState(0)

    return <Modal
        closeTimeoutMS={200}
        isOpen={showModal}
        onRequestClose={() => handleChangeShowModal(false)}
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
                flexDirection: 'column'
            }
        }
        }
    >
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
                        onClick={() => setSumValue(sumValue - 1)}
                        style={{cursor: 'pointer'}}>-</span>
                    <input type='number' value={sumValue} min={0} placeholder={'Введите сумму'}/>
                    <span
                        onClick={() => setSumValue(sumValue + 1)}
                        style={{cursor: 'pointer'}}>+</span>
                </div>
            </div>
            <div className="binf">
                Возможный выигрыш
                <span className='win'>{bet.kf * sumValue} RUB</span>
            </div>
        </div>
        <div className="modal_start">
            <button>Сделать ставку</button>
        </div>
    </Modal>
}
