import {IGame, IPopEvent} from "../../../models/IGame";
import React, {FC, useCallback, useEffect, useState} from "react";
import {SportList} from "../../../models/ISport";
import axios from "axios";
import {COUNTRIES} from "../../../assets/consts";

export interface PopEventProps {
    handleSetCurrentGame: (bid: IGame) => void
    handleSetCurrentBet: ({name, kf, id}: { name: string, kf: number, id: number }) => void
    handleChangeShowModal: (value: boolean) => void
}

const PopEvent: FC<PopEventProps> = ({handleSetCurrentGame, handleChangeShowModal, handleSetCurrentBet}) => {
    const [popEvent, setPopEvent] = useState<IPopEvent>()
    const [sportList, setSportList] = useState<SportList>({})
    const [sport, setSport] = useState('')

    const fetchEvent = useCallback(async () => {
        if (sport === '') return
        const {data} = await axios.post(`${process.env.REACT_APP_BASE_URL}/pop_game`, {
            sport_name: sport
        })
        return data
    }, [sport])

    const fetchSportList = useCallback(async () => {
        const {data} = await axios.get(`${process.env.REACT_APP_BASE_URL}/sport_list`)
        if (Object.keys(data).length >= 2) {
            setSport(Object.keys(data).reverse()[0])
        }
        setSportList(data)
    }, [])

    useEffect(() => {
        fetchEvent()
            .then(res => {
                setPopEvent(res)
            })
    }, [sport])

    useEffect(() => {
        fetchSportList()
    }, [])


    if (Object.keys(sportList).length === 0) return (
        <div id="pop-sob">
            <div id="pop-sob-title">Популярные события</div>
            <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div className="one-ps-menu">
                    Нет популярных событий
                </div>
            </div>
        </div>
    )

    return (
        <div id="pop-sob">
            <div id="pop-sob-title">Популярные события</div>
            <div id="pop-sob-menu">
                {
                    Object.keys(sportList).reverse()
                        .map((sportGame, id) => {
                            if (sportGame !== 'all') {
                                return (
                                    <div
                                        onClick={() => setSport(sportGame)}
                                        className={`one-ps-menu ${sport === sportGame && 'active'}`}>
                                        <img src={require(`../../../assets/images/${sportGame}.png`)} height={12}
                                             alt={sportGame}/>
                                        <div className="psm-title">{sportList[sportGame].ru_name}</div>
                                    </div>
                                )
                            }
                        })
                }

            </div>

            <div className="one-pop-sob">
                {
                    popEvent ?
                        <>
                            <div className="pop-sob-title-in">
                                {
                                    `${COUNTRIES[popEvent.cc].ru_name}. ${popEvent.league.name}`
                                }
                            </div>
                            <div className="pop-sob-teams">
                                <div>
                                    <img
                                        src={popEvent.home_team_logo}
                                        alt={popEvent.home_team}
                                        height={10}
                                        style={{marginRight: 20}}/>
                                    &nbsp;
                                    {popEvent.home_team}
                                </div>
                                <div className="pst-hl"/>
                                <div>
                                    <img
                                        src={popEvent.away_team_logo}
                                        alt={popEvent?.away_team}
                                        height={10}
                                        style={{marginRight: 20}}/>
                                    &nbsp;
                                    {popEvent.away_team}
                                </div>
                            </div>
                            <div className="pop-sob-koef">
                                <div className="psk-one">
                                    <div className="psko-title">Победа 1</div>
                                    <div
                                        onClick={() => {
                                            handleSetCurrentGame(popEvent)
                                            handleChangeShowModal(true)
                                            handleSetCurrentBet({
                                                name: 'П1',
                                                kf: popEvent.quotes['Исход матча(основное время)'][0]["kf"],
                                                id: popEvent.quotes['Исход матча(основное время)'][0]["id"]
                                            })
                                        }}
                                        className="psko-number">{
                                        popEvent.quotes["Исход матча(основное время)"][0]["kf"]
                                    }</div>
                                </div>
                                <div className="psk-one">
                                    <div className="psko-title">Ничья</div>
                                    {
                                        sport === 'basketball'
                                            ? <div className='psko-number'>
                                                ---
                                            </div>
                                            :
                                            <div
                                                onClick={() => {
                                                    handleSetCurrentGame(popEvent)
                                                    handleChangeShowModal(true)
                                                    handleSetCurrentBet({
                                                        name: 'НИЧЬЯ',
                                                        kf: popEvent.quotes['Исход матча(основное время)'][1]["kf"],
                                                        id: popEvent.quotes['Исход матча(основное время)'][1]["id"]
                                                    })
                                                }}
                                                className="psko-number">{
                                                popEvent.quotes["Исход матча(основное время)"][1]["kf"]
                                            }</div>
                                    }
                                </div>
                                {/*}*/}
                                <div className="psk-one">
                                    <div className="psko-title">Победа 2</div>
                                    <div
                                        onClick={() => {
                                            handleSetCurrentGame(popEvent)
                                            handleChangeShowModal(true)
                                            handleSetCurrentBet({
                                                name: 'П2',
                                                kf: popEvent.quotes['Исход матча(основное время)'][2]["kf"],
                                                id: popEvent.quotes['Исход матча(основное время)'][2]["id"]
                                            })
                                        }}
                                        className="psko-number"
                                    >
                                        {popEvent.quotes["Исход матча(основное время)"][2]["kf"]}
                                    </div>
                                </div>
                            </div>
                        </> :
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: 'lightgray'
                            }}
                        >
                            <h3>Нет матча в текущем виде спорта</h3>
                        </div>
                }
            </div>
            <div className="all-pop-sob">ещё 135 котировок
                <div className="global-ico gi-arrow-right"/>
            </div>
        </div>
    )
}

export default PopEvent
