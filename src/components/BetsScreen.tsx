import React, {FC, useEffect, useState} from 'react';
import RightBar from "./RightBar";
import LeftBar from "./LeftBar";
import {useAppSelector} from "../hooks/redux";
import axios from "axios";


interface IBetsProps {
    handleChangeType: (value: string) => void;
    handleChangePeriod: (value: string) => void;
    bets: any;
}


const Bets: FC<IBetsProps> = ({handleChangeType,handleChangePeriod, bets}) => {
    return (
        <div id="lk-mid">
            <div className="lk-table">
                <div className="lkt-filter">
                    <div className="lktf-bttns">
                        <div onClick={() => handleChangeType('bets')}
                             className="lktfb-one">Пари</div>
                        <div onClick={() => handleChangeType('operations')}
                             className="lktfb-one">Операции</div>
                    </div>
                    <div className="lktf-shedule">
                        <div className="lktfs-bttn">
                            <div className="global-ico gi-shedule"/>
                            <span>Показать за неделю</span>
                            <div className="global-ico gi-arrow-bot-g"/>
                        </div>
                    </div>
                </div>
                <div className="lkt-row lktr-title">
                    <div className="lktr-date">Дата</div>
                    <div className="lktr-time">Время</div>
                    <div className="lktr-time">Название события</div>
                    <div className="lktr-type">Тип пари</div>
                    <div className="lktr-sum">Сумма</div>
                    <div className="lktr-result">Реультат</div>
                </div>

                {
                    bets.map((bid: any) => (
                            <div className="lkt-row">
                                <div className="lktr-date">{bid[6].split(' ')[0]}</div>
                                <div className="lktr-time">{bid[6].split(' ')[1]}</div>
                                <div className="lktr-name">{bid[0]}</div>
                                <div className="lktr-type">{bid[1]}</div>
                                <div className="lktr-sum">{bid[3]}
                                    <div className="global-ico gi-coin"/>
                                </div>
                                <div className="lktr-result">{bid[5]}</div>
                            </div>
                        ))
                }
            </div>
        </div>
    )
}

const Operations: FC<IBetsProps> = ({handleChangeType, handleChangePeriod, bets}) => {
    console.log(bets)
    return (
        <div id="lk-mid">
            <div className="lk-table">
                <div className="lkt-filter">
                    <div className="lktf-bttns">
                        <div onClick={() => handleChangeType('bets')}
                            className="lktfb-one">Пари</div>
                        <div onClick={() => handleChangeType('operations')}
                            className="lktfb-one">Операции</div>
                    </div>
                    <div className="lktf-shedule">
                        <div className="lktfs-bttn">
                            <div className="global-ico gi-shedule"/>
                            <span>Показать за неделю</span>
                            <div className="global-ico gi-arrow-bot-g"/>
                        </div>
                    </div>
                </div>
                <div className="lkt-row lktr-title">
                    <div className="lktr-date">Дата</div>
                    <div className="lktr-time">Время</div>
                    <div className="lktr-type">Операция</div>
                    <div className="lktr-sum">Сумма</div>
                    <div className="lktr-result">Остаток</div>
                </div>
                <h1>[soon]</h1>
                {/*{*/}
                {/*    result.bid_history*/}
                {/*        .map((bid: any) => (*/}
                {/*            <div className="lkt-row">*/}
                {/*                <div className="lktr-date">{bid[6].split(' ')[0]}</div>*/}
                {/*                <div className="lktr-time">{bid[6].split(' ')[1]}</div>*/}
                {/*                <div className="lktr-type">Двойной исход</div>*/}
                {/*                <div className="lktr-sum">10 000*/}
                {/*                    <div className="global-ico gi-coin"/>*/}
                {/*                </div>*/}
                {/*                <div className="lktr-result">10 000*/}
                {/*                    <div className="global-ico gi-coin"/>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        ))*/}
                {/*}*/}
            </div>
        </div>
    )
}

const BetsScreen: FC<any> = (props: any) => {
    const {session} = useAppSelector(state => state.authReducer)
    const [bets, setBets] = useState([])
    const [period, setPeriod] = useState('all')
    const [type, setType] = useState('bets')

    useEffect(() => {
        const fetchBets = async () => {
            const {data} = await axios.post('http://gpbetapi.ru/bid_history', {
                period,
                login: localStorage.getItem('login'),
                password: localStorage.getItem('password'),
                user_id: session
            })
            setBets(data)
        }
        fetchBets()
    }, [period])

    const handleChangeType = (value: string) => {
        setType(value)
    }

    const handleChangePeriod = (value: string) => {
        setPeriod(value)
    }

    return (
        <div id="content-wr">
            <LeftBar active={type}/>
            {type === 'bets' && <Bets
                handleChangeType={handleChangeType}
                handleChangePeriod={handleChangePeriod}
                bets={bets}
            />}
            {type === 'operations' && <Operations
                handleChangeType={handleChangeType}
                handleChangePeriod={handleChangePeriod}
                bets={bets}
            />}
            <RightBar/>
        </div>
    );
};

export default BetsScreen;
