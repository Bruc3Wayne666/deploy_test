import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getGames} from "../store/reducers/games/gameActions";
import axios from "axios";
import {IGame} from "../models/IGame";


const LeagueItem: FC<any> = ({result, league, showParam}) => {

    return (
        <>
            <div className="toc-title">
                <div className="global-ico gi-star"/>
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
                                                        game={result.country[co][sport][status][game]}
                                                        showParam={showParam}
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

const GameItem: FC<{ ind: number, game: IGame, showParam: string }> = ({ind, game, showParam}) => {
    return (
        <div className="toc-item">
            <div className="toc-i-left-side">
                <div className="global-ico gi-star"/>
                <div className="toc-i-time">
                    <div className="tocit-daypart">[сделать время]</div>
                    <div className="tocit-time">[сделать время]</div>
                </div>
                <div className="toc-i-teams">
                    <div>
                        <div className="global-ico gi-zenit"/>
                        {game.name.split(' VS ')[0]}
                    </div>
                    <div>
                        <div className="global-ico gi-zenit"/>
                        {game.name.split(' VS ')[1]}
                    </div>
                </div>
            </div>
            <div className="toc-i-right-side">
                <div className="tocirs-someinfo"><span>Матч дня</span></div>
                <div className="tocirs-flcol tocirs-matchtime">
                    <div className="tocirsmt-title">placeholder</div>
                    <div className="tocirsmt-line">Основное время</div>
                </div>
                <div className="tocirs-flcol tocirs-koef">
                    <div className="tocirsmt-title">
                        {
                            game.name.split(' VS ')[0]
                        }
                    </div>
                    <div className="tocirsmt-line">
                        {
                            game.quotes && game.quotes['Исход матча(основное время)'][0]["kf"]
                        }
                    </div>
                </div>
                <div className="tocirs-flcol tocirs-koef">
                    <div className="tocirsmt-title">
                        {
                            game.quotes && game.quotes['Исход матча(основное время)'][1]["name"]
                        }
                    </div>
                    <div className="tocirsmt-line">
                        {
                            game.quotes && game.quotes['Исход матча(основное время)'][1]["kf"]
                        }
                    </div>
                </div>
                <div className="tocirs-flcol tocirs-koef">
                    <div className="tocirsmt-title">
                        {
                            game.name.split(' VS ')[1]
                        }
                    </div>
                    <div className="tocirsmt-line">
                        {
                            game.quotes && game.quotes['Исход матча(основное время)'][2]["kf"]
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

const FilterCountry: FC<any> = ({handleChangeParams, params}) => {
    return (
        <div id="filter-contry">
            <div
                onClick={() => handleChangeParams({...params, country: 'all'})}
                className="one-contry-f">Все
            </div>
            <div
                onClick={() => handleChangeParams({...params, country: 'ru'})}
                className="one-contry-f">Россия
            </div>
            <div
                onClick={() => handleChangeParams({...params, country: 'us'})}
                className="one-contry-f">США
            </div>
        </div>
    )
}

const FilterCase: FC<any> = ({handleChangeShowParam}) => {
    return (
        <div className="filter-name-cases">
            <div className="fl-name">
                <div className="global-ico gi-star"/>
                <div className="global-ico gi-football"/>
                <span>[название спорта на русском]</span></div>
            <div className="fl-cases">
                <div
                    onClick={() => handleChangeShowParam('result')}
                    className="one-fl-case"><span>Исходы</span></div>
                <div
                    onClick={() => handleChangeShowParam('total')}
                    className="one-fl-case"><span>Тоталы</span></div>
                {/*<div className="one-fl-case"><span>Двойные шансы</span></div>*/}
                {/*<div className="one-fl-case"><span>Форы</span></div>*/}
                {/*<div className="one-fl-case"><span>Забью гол</span></div>*/}
            </div>
        </div>
    )
}


const Main: FC = () => {
    const {result} = useAppSelector(state => state.gameReducer)
    const [leagueList, setLeagueList] = useState({})
    const dispatch = useAppDispatch()
    const [params, setParams] = useState({
        sport_name: 'all',
        quotes: 'all',
        country: 'all',
        league_id: 'all',
        days: 10,
        one_day: 0,
        sort_number: false
    })
    const [showParam, setShowParam] = useState('result')

    const handleChangeParams = (params: {
        sport_name: string,
        quotes: string,
        country: string,
        league_id: string,
        days: number,
        one_day: number,
        sort_number: boolean
    }) => {
        setParams({...params})
    }

    const handleChangeShowParam = (param: string) => {
        setShowParam(param)
    }


    useEffect(() => {
            dispatch(getGames({...params, game_status: 'not started'}))
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


    return (
        <div id="content-wr">


            <div id="two-left">

                <div id="page-title">
                    <div id="pt-text">Рекомендуем</div>
                    <div id="pt-stripe"/>
                </div>

                <div id="rec-menu">
                    <div
                        onClick={() => handleChangeParams({...params, sport_name: 'soccer'})}
                        className="one-rec-menu">
                        <div className="global-ico gi-football"/>
                        <div className="orm-title">Футбол</div>
                    </div>
                    <div
                        onClick={() => handleChangeParams({...params, sport_name: 'icehockey'})}
                        className="one-rec-menu">
                        <div className="global-ico gi-hockey"/>
                        <div className="orm-title">Хоккей</div>
                    </div>
                </div>


                <div id="table-main">

                    <FilterCountry
                        handleChangeParams={handleChangeParams}
                        params={params}
                    />
                    <FilterCase/>


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
                                                    if (params.country === 'all') {
                                                        return <LeagueItem
                                                            league={league}
                                                            result={result}
                                                        />
                                                    } else if (params.country === co) {
                                                        return <LeagueItem
                                                            league={league}
                                                            result={result}
                                                            showParam={showParam}
                                                        />
                                                    }
                                                })
                                        })
                                })
                        }

                    </div>
                </div>

            </div>

            <div id="two-right">
                <h2>[что-то]</h2>
                <div id="pop-sob">
                    <div id="pop-sob-title">Популярные события</div>
                    <div id="pop-sob-menu">
                        <div className="one-ps-menu active">
                            <div className="global-ico gi-football"></div>
                            <div className="psm-title">Футбол</div>
                        </div>
                        <div className="one-ps-menu">
                            <div className="global-ico gi-hockey"></div>
                            <div className="psm-title">Хоккей</div>
                        </div>
                        <div className="one-ps-menu">
                            <div className="global-ico gi-basketball"></div>
                            <div className="psm-title">Баскетбол</div>
                        </div>
                        <div className="one-ps-menu">
                            <div className="global-ico gi-football"></div>
                            <div className="psm-title">Еще</div>
                        </div>
                        <div className="one-ps-menu">
                            <div className="global-ico gi-hockey"></div>
                            <div className="psm-title">Еще</div>
                        </div>
                        <div className="one-ps-menu">
                            <div className="global-ico gi-basketball"></div>
                            <div className="psm-title">Еще</div>
                        </div>
                    </div>
                    <div className="one-pop-sob">
                        <div className="pop-sob-title-in">Россия. Молодежное первенство</div>
                        <div className="pop-sob-teams">
                            <div>
                                <div className="global-ico gi-zenit"></div>
                                ФК Химки
                            </div>
                            <div className="pst-hl"></div>
                            <div>
                                <div className="global-ico gi-zenit"></div>
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
                    <div className="all-pop-sob">еще 135 котировок
                        <div className="global-ico gi-arrow-right"></div>
                    </div>
                </div>

                <h2>[что-то]</h2>
                <div id="right-col-menu">
                    <div className="one-rcm-menu">
                        <div className="global-ico gi-football"></div>
                        <div className="rcm-title">Футбол</div>
                    </div>
                    <div className="one-rcm-menu">
                        <div className="global-ico gi-hockey"></div>
                        <div className="rcm-title">Хоккей</div>
                    </div>
                    <div className="one-rcm-menu">
                        <div className="global-ico gi-basketball"></div>
                        <div className="rcm-title">Баскетбол</div>
                    </div>
                    <div className="one-rcm-menu">
                        <div className="global-ico gi-volleyball"></div>
                        <div className="rcm-title">Волейбол</div>
                    </div>
                    <div className="one-rcm-menu">
                        <div className="global-ico gi-tennis"></div>
                        <div className="rcm-title">Теннис</div>
                    </div>
                    <div className="one-rcm-menu">
                        <div className="global-ico gi-baseball"></div>
                        <div className="rcm-title">Бейсбол</div>
                    </div>
                    <div className="one-rcm-menu">
                        <div className="global-ico gi-american-f"></div>
                        <div className="rcm-title">Американский футбол</div>
                    </div>
                    <div className="one-rcm-menu">
                        <div className="global-ico gi-golf"></div>
                        <div className="rcm-title">Гольф</div>
                    </div>
                    <div className="one-rcm-menu">
                        <div className="global-ico gi-rus-biliard"></div>
                        <div className="rcm-title">Русский бильярд</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
