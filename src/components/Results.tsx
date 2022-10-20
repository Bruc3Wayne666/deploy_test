import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getGames} from "../store/reducers/games/gameActions";
import {IGame} from "../models/IGame";
import Dropdown from 'react-dropdown';
import axios from "axios";


const RightBar: FC<any> = () => {
    return (
        <div id="two-right">
            <h3>[Доделать]</h3>
            <div id="pop-sob">
                <div id="pop-sob-title">Популярные события</div>
                <div id="pop-sob-menu">
                    <div className="one-ps-menu active">
                        <div className="global-ico gi-football"/>
                        <div className="psm-title">Футбол</div>
                    </div>
                    <div className="one-ps-menu">
                        <div className="global-ico gi-hockey"/>
                        <div className="psm-title">Хоккей</div>
                    </div>
                    <div className="one-ps-menu">
                        <div className="global-ico gi-basketball"/>
                        <div className="psm-title">Баскетбол</div>
                    </div>
                    <div className="one-ps-menu">
                        <div className="global-ico gi-football"/>
                        <div className="psm-title">Еще</div>
                    </div>
                    <div className="one-ps-menu">
                        <div className="global-ico gi-hockey"/>
                        <div className="psm-title">Еще</div>
                    </div>
                    <div className="one-ps-menu">
                        <div className="global-ico gi-basketball"/>
                        <div className="psm-title">Еще</div>
                    </div>
                </div>
                <h3>[Доделать]</h3>
                <div className="one-pop-sob">
                    <div className="pop-sob-title-in">Россия. Молодежное первенство</div>
                    <div className="pop-sob-teams">
                        <div>
                            <div className="global-ico gi-zenit"/>
                            ФК Химки
                        </div>
                        <div className="pst-hl"/>
                        <div>
                            <div className="global-ico gi-zenit"/>
                            Зенит Санкт-Петербург
                        </div>
                    </div>
                    <div className="pop-sob-koef">
                        <div className="psk-one">
                            <div className="psko-title">Победа 1</div>
                            <div className="psko-number">15.00</div>
                        </div>
                        <div className="psk-one">
                            <div className="psko-title">Ничья</div>
                            <div className="psko-number">15.00</div>
                        </div>
                        <div className="psk-one">
                            <div className="psko-title">Победа 2</div>
                            <div className="psko-number">15.00</div>
                        </div>
                    </div>
                </div>
                <h3>[Доделать]</h3>
                <div className="all-pop-sob">еще 135 котировок
                    <div className="global-ico gi-arrow-right"/>
                </div>
            </div>
            <div id="right-col-menu">
                <div className="one-rcm-menu">
                    <div className="global-ico gi-football"/>
                    <div className="rcm-title">Футбол</div>
                </div>
                <div className="one-rcm-menu">
                    <div className="global-ico gi-hockey"/>
                    <div className="rcm-title">Хоккей</div>
                </div>
                <div className="one-rcm-menu">
                    <div className="global-ico gi-basketball"/>
                    <div className="rcm-title">Баскетбол</div>
                </div>
                <div className="one-rcm-menu">
                    <div className="global-ico gi-volleyball"/>
                    <div className="rcm-title">Волейбол</div>
                </div>
                <div className="one-rcm-menu">
                    <div className="global-ico gi-tennis"/>
                    <div className="rcm-title">Теннис</div>
                </div>
                <div className="one-rcm-menu">
                    <div className="global-ico gi-baseball"/>
                    <div className="rcm-title">Бейсбол</div>
                </div>
                <div className="one-rcm-menu">
                    <div className="global-ico gi-american-f"/>
                    <div className="rcm-title">Американский футбол</div>
                </div>
                <div className="one-rcm-menu">
                    <div className="global-ico gi-golf"/>
                    <div className="rcm-title">Гольф</div>
                </div>
                <div className="one-rcm-menu">
                    <div className="global-ico gi-rus-biliard"/>
                    <div className="rcm-title">Русский бильярд</div>
                </div>
            </div>
        </div>
    )
}

const LeagueItem: FC<any> = ({filter, result}) => {

    // {
    //     result && Object.keys(result.country)
    //         .map(co => {
    //             // @ts-ignore
    //             return Object.keys(result.country[co])
    //                 .map(sport => {
    //                     // @ts-ignore
    //                     return Object.keys(result.country[co][sport])
    //                         .map(status => {
    //                             // @ts-ignore
    //                             return Object.keys(result.country[co][sport][status])
    //                                 .forEach((game, index) => {
    //                                     console.log(league[0], result.country[co][sport][status][game].league.id)
    //                                 })
    //                         })
    //                 })
    //         })
    // }
    const {league} = filter
    // console.log(time)

    return (
        <>
            <div className="toc-title">
                <div className="global-ico gi-football"/>
                <div className="global-ico gi-rus"/>
                <span>{league[1]}</span>
            </div>
            {
                result && Object.keys(result.country)
                    .map(co => {
                        // @ts-ignore
                        return Object.keys(result.country[co])
                            .map(sport => {
                                // @ts-ignore
                                return Object.keys(result.country[co][sport])
                                    .map(status => {
                                        // @ts-ignore
                                        return Object.keys(result.country[co][sport][status])
                                            .map((game, index) => {
                                                return (
                                                        result.country[co][sport][status][game].league.id === String(league[0])
                                                    ) &&
                                                    <GameItem
                                                        ind={index}
                                                        // @ts-ignore
                                                        status={{
                                                            'not started': 'НЕ НАЧАЛСЯ',
                                                            'live': 'LIVE',
                                                            'end': 'ЗАВЕРШЁН'
                                                        }[status]}

                                                        game={result.country[co][sport][status][game]}
                                                    />

                                                // if (time === 'all'){
                                                //     // @ts-ignore
                                                //     return result.country[co][sport][status][game].league.id === String(league[0]) &&
                                                //         <GameItem
                                                //             ind={index}
                                                //             // @ts-ignore
                                                //             status={{
                                                //                 'not started': 'НЕ НАЧАЛСЯ',
                                                //                 'live': 'LIVE',
                                                //                 'end': 'ЗАВЕРШЁН'
                                                //             }[status]}
                                                //
                                                //             game={result.country[co][sport][status][game]}
                                                //         />
                                                // } else {
                                                //     return (
                                                //         result.country[co][sport][status][game].league.id === String(league[0])
                                                //         ) &&
                                                //         <GameItem
                                                //             ind={index}
                                                //             // @ts-ignore
                                                //             status={{
                                                //                 'not started': 'НЕ НАЧАЛСЯ',
                                                //                 'live': 'LIVE',
                                                //                 'end': 'ЗАВЕРШЁН'
                                                //             }[status]}
                                                //
                                                //             game={result.country[co][sport][status][game]}
                                                //         />
                                                // }
                                            })
                                    })
                            })
                    })

            }
        </>
    )
}

const GameItem: FC<{ ind: number, game: IGame, status: string }> = ({ind, game, status}) => {
    const {name, score, time_start} = game
    const time = new Date(time_start)

    const styles = {
        'НЕ НАЧАЛСЯ': '',
        'LIVE': 's-red',
        'ЗАВЕРШЁН': 's-blue'
    }

    return (
        <div className="toc-item-res">
            <div className="tocir-num">{++ind}</div>
            <div className="tocir-name">{name}</div>
            <div className="tocir-results">{score}</div>
            <div className="torir-time">
                <div className="global-ico gi-clock"/>
                {time.getHours()}
            </div>
            <div className="torir-status">
                {    // @ts-ignore
                    <span className={styles[status]}>{status}</span>
                }
            </div>
        </div>
    )
}

// const GameItemChild: FC<any> = () => {
//     return (
//         <div className="toc-item-res res-child">
//             <div className="tocir-num">2</div>
//             <div className="tocir-name">Торпедо Москва – Сочи</div>
//             <div className="tocir-results">1:3 (0-2-1-1)</div>
//             <div className="torir-time">
//                 <div className="global-ico gi-clock"/>
//                 Сегодня в 15:00
//             </div>
//             <div className="torir-status"><span className="s-blue">Завершен</span></div>
//             <div className="torir-comment">1-й гол. 2-я на 35 мин</div>
//         </div>
//     )
// }

const Filter: FC<any> = ({handleChangeParams, params}) => {
    const sp_opts = [
        // {value: 'all', label: 'Все', className: 'frb-one-opt'},
        {value: 'basketball', label: 'Баскетбол', className: 'frb-one-opt'},
        {value: 'icehockey', label: 'Хоккей', className: 'frb-one-opt'},
        {value: 'soccer', label: 'Футбол', className: 'frb-one-opt'},
    ]

    const events_opts = [
        {value: 'all', label: 'Все события', className: 'frb-one-opt'},
        {value: 'not started', label: 'НЕ НАЧАЛСЯ', className: 'frb-one-opt'},
        {value: 'live', label: 'LIVE', className: 'frb-one-opt'},
        {value: 'end', label: 'ЗАВЕРШЁН', className: 'frb-one-opt'},
    ]

    return (
        <div className="filter-results">
            <div className="fr-bttns">
                <Dropdown options={sp_opts} placeholder={'Вид спорта'}
                          controlClassName={'frb-one'}
                          menuClassName={'frb-one-opts'}
                          onChange={e => handleChangeParams({...params, sport_name: e.value})}
                />
                <Dropdown options={events_opts} placeholder={'Все события'}
                          controlClassName={'frb-one'}
                          menuClassName={'frb-one-opts'}
                          onChange={e => handleChangeParams({...params, game_status: e.value})}
                />
                <div className="frb-one"><span>Дата [сделать штуку которая выбирает время]</span>
                    <div className="global-ico gi-arrow-bot"/>
                </div>
                <div className="frb-one"><span>Время [и тут тоже сделать кое-что]</span>
                    <div className="global-ico gi-arrow-bot"/>
                </div>
            </div>
            <div className="fr-ticks">
                <div className="frt-sqr"><span/>Только текущие</div>
                <div className="frt-circle"><span/>Сортировать по номеру</div>
                <div className="frt-circle"><span/>Сортировать по времени</div>
            </div>
            <div className="fr-search">
                <span>Поиск</span>
                <div className="global-ico gi-search"/>
            </div>
        </div>
    )
}

const Results: FC<any> = () => {
        const {result} = useAppSelector(state => state.gameReducer)
        const [leagueList, setLeagueList] = useState({})
        const dispatch = useAppDispatch()
        const [params, setParams] = useState({
            sport_name: 'all',
            game_status: 'all',
            quotes: 'all',
            country: 'all',
            league_id: 'all',
            days: 10,
            one_day: 0,
            sort_number: false
        })

        const handleChangeParams = (params: {
            sport_name: string,
            game_status: string,
            quotes: string,
            country: string,
            league_id: string,
            days: number,
            one_day: number,
            sort_number: boolean
        }) => {
            setParams({...params})
        }


        useEffect(() => {
                dispatch(getGames(params))
                const fetchLeagueList = async () => {
                    const {data} = await axios.post('http://gpbetapi.ru/league_list', {
                        league_sport: params.sport_name,
                        league_cc: 'all'
                    })
                    setLeagueList(data)
                }
                fetchLeagueList()
                console.log(params)
            }
            , [params])

        // @ts-ignore
        // @ts-ignore
        // @ts-ignore
        return (
            <div id="content-wr">
                <div id="two-left">
                    <div id="page-title">
                        <div id="pt-text">Результаты</div>
                        <div id="pt-stripe"/>
                    </div>
                    <h3>[Сделать формой с сортировкой]</h3>
                    <div id="table-main">

                        <Filter
                            handleChangeParams={handleChangeParams}
                            params={params}
                        />


                        <div className="table-one-cat">
                            {
                                Object.keys(leagueList)
                                    .map(sp => {
                                        // @ts-ignore
                                        return Object.keys(leagueList[sp])
                                            .map(co => {
                                                // @ts-ignore
                                                return leagueList[sp][co]
                                                    .map((league: any[]) => {
                                                        return <LeagueItem
                                                            filter={{
                                                                league,
                                                                status: params.game_status
                                                            }}
                                                            result={result}
                                                        />
                                                    })
                                            })
                                    })
                            }

                        </div>


                    </div>
                </div>


                {/*Доделать*/}
                <RightBar/>
            </div>
        );
    }
;

export default Results;
