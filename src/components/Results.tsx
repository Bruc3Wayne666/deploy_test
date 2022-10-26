import React, {FC, useCallback, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getGames} from "../store/reducers/games/gameActions";
import {IGame} from "../models/IGame";
import Dropdown from 'react-dropdown';
import spinner from '../assets/spinner.svg'
import axios from "axios";
import {COUNTRIES} from "../assets/consts";
import {Link} from "react-router-dom";
// @ts-ignore
import debounce from "lodash/debounce";
import {ModalForm} from "./ModalForm";
import {IProfileState} from "../store/reducers/profile/profileSlice";
import {ApiService} from "../api";


const PopEvent: FC<any> = ({handleSetCurrentGame, handleChangeShowModal, handleSetCurrentBet}) => {
    const [popEvent, setPopEvent] = useState<IGame | null>(null)
    const [sportList, setSportList] = useState<any>({})
    const [sport, setSport] = useState('icehockey')

    useEffect(() => {
        const fetchEvent = async () => {
            const {data} = await axios.post('http://gpbetapi.ru/pop_game', {
                sport_name: sport
            })
            setPopEvent(data)
        }
        fetchEvent()
    }, [sport])

    useEffect(() => {
        const fetchSportList = async () => {
            const {data} = await axios.get('http://gpbetapi.ru/sport_list')
            setSportList(data)
        }
        fetchSportList()
    }, [])

    return (
        <div id="pop-sob">
            <div id="pop-sob-title">Популярные события</div>
            <div id="pop-sob-menu">
                {
                    Object.keys(sportList)
                        .map(sportGame => {
                            if (sportGame !== 'all') {
                                return (
                                    <div
                                        onClick={() => setSport(sportGame)}
                                        className={`one-ps-menu ${sport === sportGame && 'active'}`}>
                                        <img src={require(`../assets/images/${sportGame}.png`)} height={12}
                                             alt={sportGame}/>
                                        <div className="psm-title">{sportList[sportGame].ru_name}</div>
                                    </div>
                                )
                            }
                        })
                }

            </div>

            <div className="one-pop-sob">
                <div className="pop-sob-title-in">
                    {
                        //@ts-ignore
                        COUNTRIES[popEvent?.cc]?.ru_name
                    }. {popEvent?.league.name}</div>
                <div className="pop-sob-teams">
                    <div>
                        <img src={popEvent?.home_team_logo} alt={popEvent?.home_team} height={10} style={{marginRight: 20}}/>
                        &nbsp;
                        {popEvent?.home_team}
                    </div>
                    <div className="pst-hl"/>
                    <div>
                        <img src={popEvent?.away_team_logo} alt={popEvent?.away_team} height={10} style={{marginRight: 20}}/>
                        &nbsp;
                        {popEvent?.away_team}
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
                                    //@ts-ignore
                                    kf: popEvent.quotes && popEvent.quotes['Исход матча(основное время)'][0]["kf"],
                                    //@ts-ignore
                                    id: popEvent.quotes && popEvent.quotes['Исход матча(основное время)'][0]["id"]
                                })
                            }}
                            className="psko-number">{
                            popEvent?.quotes?.["Исход матча(основное время)"][0]["kf"]
                        }</div>
                    </div>
                    <div className="psk-one">
                        <div className="psko-title">Ничья</div>
                        <div
                            onClick={() => {
                                handleSetCurrentGame(popEvent)
                                handleChangeShowModal(true)
                                handleSetCurrentBet({
                                    name: 'НИЧЬЯ',
                                    //@ts-ignore
                                    kf: popEvent.quotes && popEvent.quotes['Исход матча(основное время)'][1]["kf"],
                                    //@ts-ignore
                                    id: popEvent.quotes && popEvent.quotes['Исход матча(основное время)'][1]["id"]
                                })
                            }}
                            className="psko-number">{
                            popEvent?.quotes?.["Исход матча(основное время)"][1]["kf"]
                        }</div>
                    </div>
                    <div className="psk-one">
                        <div className="psko-title">Победа 2</div>
                        <div
                            onClick={() => {
                                handleSetCurrentGame(popEvent)
                                handleChangeShowModal(true)
                                handleSetCurrentBet({
                                            name: 'П2',
                                    //@ts-ignore
                                    kf: popEvent.quotes && popEvent.quotes['Исход матча(основное время)'][2]["kf"],
                                    //@ts-ignore
                                    id: popEvent.quotes && popEvent.quotes['Исход матча(основное время)'][2]["id"]
                                })
                            }}
                            className="psko-number">{
                            popEvent?.quotes?.["Исход матча(основное время)"][2]["kf"]
                        }</div>
                    </div>
                </div>
            </div>
            <div className="all-pop-sob">еще {
                //@ts-ignore
                popEvent?.kot_count} котировок
                <div className="global-ico gi-arrow-right"/>
            </div>
        </div>
    )
}

const RightBar: FC<any> = ({handleSetCurrentGame, handleChangeShowModal, handleSetCurrentBet}) => {
    const [sportList, setSportList] = useState<any>({})

    useEffect(() => {
        const fetchSportList = async () => {
            const {data} = await axios.get('http://gpbetapi.ru/sport_list')
            setSportList(data)
        }
        fetchSportList()
    }, [])

    return (
        <div id="two-right">

            <PopEvent
                handleSetCurrentGame={handleSetCurrentGame}
                handleChangeShowModal={handleChangeShowModal}
                handleSetCurrentBet={handleSetCurrentBet}
            />

            <div id="right-col-menu">
                {
                    Object.keys(sportList)
                        .map(sportGame => {
                            if (sportGame !== 'all') {
                                return (
                                    <div className="one-rcm-menu">
                                        {/*<div className="global-ico gi-football">*/}
                                        <img src={require(`../assets/images/${sportGame}.png`)} height={20}
                                             alt={sportGame} style={{marginRight: 12}}/>
                                        {/*</div>*/}
                                        <Link to={`/${sportGame}`}
                                              className="rcm-title">{sportList[sportGame].ru_name}</Link>
                                    </div>
                                )
                            }
                        })
                }
            </div>
        </div>
    )
}

const LeagueItem: FC<any> = ({filter, result}) => {
    const {league} = filter

    return (
        <>
            <div className="toc-title">
                <div className="global-ico gi-star">

                </div>
                <div className="global-ico gi-rus">
                    <img
                        src={
                            //@ts-ignore
                            COUNTRIES[league[2]].svg_url
                        }
                        alt={league[2]}
                    />
                </div>
                <span>{                        //@ts-ignore

                    COUNTRIES[league[2]].ru_name
                }. {league[1]}</span>
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
                                            })
                                    })
                            })
                    })

            }
        </>
    )
}

const GameItem:
    FC<{
        ind: number,
        game: IGame,
        status: string
    }> = ({
              ind,
              game,
              status
          }) => {
    const {name, score, beautiful_time_start} = game
    // const time = new Date(time_start)

    const styles = {
        'НЕ НАЧАЛСЯ': '',
        'LIVE': 's-red',
        'ЗАВЕРШЁН': 's-blue'
    }

    const currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)

    return (
        <div className="toc-item-res">
            <div className="tocir-num">{++ind}</div>
            <div className="tocir-name">{name}</div>
            <div className="tocir-results">{score}</div>
            <div className="torir-time">
                <div className="global-ico gi-clock"/>
                {
                    (Number(
                        game
                            .beautiful_time_start
                            .split(' ')[0]
                            .split('-')[2]
                    ) - Number(currentDate.getDate())) === 0 ? 'Сегодня в' :
                        (Number(
                            game
                                .beautiful_time_start
                                .split(' ')[0]
                                .split('-')[2]
                        ) - Number(currentDate.getDate())) === 1 ? 'Завтра в' :
                            game
                                .beautiful_time_start
                                .split(' ')[0]
                }

                <br/>

                {beautiful_time_start.split(' ')[1]}
            </div>
            <div className="torir-status">
                {    // @ts-ignore
                    <span className={styles[status]}>{status}</span>
                }
            </div>
        </div>
    )
}


const Filter: FC<any> = ({handleSearchChange, handleChangeParams, params, search, sportList}) => {
    const events_opts = [
        {value: 'all', label: 'Все события', className: 'frb-one-opt'},
        {value: 'not started', label: 'НЕ НАЧАЛСЯ', className: 'frb-one-opt'},
        {value: 'live', label: 'LIVE', className: 'frb-one-opt'},
        {value: 'end', label: 'ЗАВЕРШЁН', className: 'frb-one-opt'},
    ]

    return (
        <div className="filter-results">
            <div className="fr-bttns">
                <Dropdown options={
                    Object.keys(sportList)
                        .map(sportGame => {
                            return ({
                                value: sportGame,
                                label: sportList[sportGame].ru_name,
                                className: 'frb-one-opt'
                            })
                        })
                }
                          placeholder={'Вид спорта'}
                          controlClassName={'frb-one'}
                          menuClassName={'frb-one-opts'}
                          onChange={e => handleChangeParams({...params, sport_name: e.value})}
                />
                <Dropdown options={events_opts}
                          placeholder={'Все события'}
                          controlClassName={'frb-one'}
                          menuClassName={'frb-one-opts'}
                          onChange={e => handleChangeParams({...params, game_status: e.value})}
                />
                <div className="frb-one"><span>Дата</span>
                    <div className="global-ico gi-arrow-bot"/>
                    <input
                        value={params.beautiful_time_start.date}
                        onChange={e => {
                            if (e.target.value === '') {
                                handleChangeParams({
                                    ...params,
                                    beautiful_time_start: {
                                        ...params.beautiful_time_start,
                                        date: '-'
                                    }
                                })
                            } else {
                                handleChangeParams({
                                    ...params,
                                    beautiful_time_start: {
                                        ...params.beautiful_time_start,
                                        date: e.target.value
                                    }
                                })
                            }
                        }}
                        style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            outline: 'none'
                        }}
                        type='date'
                    />
                </div>
                <div className="frb-one"><span>Время</span>
                    <div className="global-ico gi-arrow-bot"/>
                    <input
                        value={params.beautiful_time_start.hours}
                        onChange={e => {
                            if (e.target.value === '') {
                                handleChangeParams({
                                    ...params,
                                    beautiful_time_start: {
                                        ...params.beautiful_time_start,
                                        hours: '-'
                                    }
                                })
                            } else {
                                handleChangeParams({
                                    ...params,
                                    beautiful_time_start: {
                                        ...params.beautiful_time_start,
                                        hours: e.target.value
                                    }
                                })
                            }
                        }}
                        style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            outline: 'none'
                        }}
                        type='time'
                    />
                    {
                        params.beautiful_time_start.hours !== '-' &&
                        <button
                            style={{
                                backgroundColor: 'red',
                                border: '1 px solid black',
                                borderRadius: 4,
                                cursor: "pointer"
                            }}
                            onClick={() => handleChangeParams({
                                ...params,
                                beautiful_time_start: {
                                    ...params.beautiful_time_start,
                                    hours: '-'
                                }
                            })}
                        >
                            &times; Очистить
                        </button>
                    }
                </div>
            </div>
            <div className="fr-ticks">
                <div
                    onClick={() => {
                        console.log(2)
                        handleChangeParams({...params, sort_number: !params.sort_number})
                    }}
                    className='frt-circle'
                >
                    <span className={params.sort_number && 'checked'}/>
                    Сортировать по номеру
                </div>
            </div>
            <div className="fr-search">
                <input
                    placeholder={'Поиск'}
                    style={{
                        border: 'none',
                        outline: 'none',
                        backgroundColor: 'transparent',
                    }}
                    onChange={handleSearchChange}
                    type="text"
                    value={search}
                />
            </div>
        </div>
    )
}

const Results: FC<any> = () => {
        const [sportList, setSportList] = useState<any>({})
        const {result} = useAppSelector(state => state.gameReducer)
        const [leagueList, setLeagueList] = useState({})
        const dispatch = useAppDispatch()
        const {session} = useAppSelector(state => state.authReducer)
        const [profile, setUserInfo] = useState<IProfileState>({
            error: false,
            message: null,
            result: null,
        })
        const [isLoading, setIsLoading] = useState(false)
        const [search, setSearch] = useState('')
        const [showModal, setShowModal] = useState(false)
        const [currentGame, setCurrentGame] = useState<IGame | null>(null)
        const [currentBet, setCurrentBet] = useState({
            name: '',
            kf: 0,
            id: 0
        })
        const [params, setParams] = useState({
            sport_name: 'all',
            game_status: 'all',
            quotes: 'all',
            country: 'all',
            league_id: 'all',
            days: 10,
            one_day: 0,
            sort_number: false,
            beautiful_time_start: {
                date: '-',
                hours: '-'
            },
            search: '-'
        })

        const handleChangeParams = (params: {
            sport_name: string,
            game_status: string,
            quotes: string,
            country: string,
            league_id: string,
            days: number,
            one_day: number,
            sort_number: boolean,
            beautiful_time_start: {
                date: string,
                hours: string
            },
            search: string
        }) => {
            setParams({...params})
        }

        const handleSearchChange = (e: any) => {
            setSearch(e.target.value)
            setParams({
                ...params,
                search: e.target.value
            })
            handleSearch(e.target.value)
        }

        const handleSearch = useCallback(
            debounce((value: string) => {
                console.log(params)
                setParams({
                    ...params,
                    search: value === '' ? '-' : value
                })
                console.log(params)
            }, 1000),
            [params]
        )

        const handleChangeShowModal = (value: boolean) => {
            setShowModal(value)
        }

        const handleSetCurrentGame = (bid: IGame) => {
            setCurrentGame({...bid})
        }

        const handleSetCurrentBet = ({name, kf, id}: { name: string, kf: number, id: number }) => {
            setCurrentBet({name, kf, id})
        }


        useEffect(() => {
            const fetchUserInfo = async (session: string) => {
                const data = await ApiService.getProfile(session)
                setUserInfo(data)
            }
            if (session) {
                fetchUserInfo(session)
            }
        }, [])

        useEffect(() => {
                setIsLoading(true)
                const fetchSportList = async () => {
                    const {data} = await axios.get('http://gpbetapi.ru/sport_list')
                    setSportList(data)
                }
                dispatch(getGames({
                    ...params, beautiful_time_start: `${
                        params.beautiful_time_start.date
                    } ${params.beautiful_time_start.hours}`
                }))
                const fetchLeagueList = async () => {
                    const {data} = await axios.post('http://gpbetapi.ru/league_list', {
                        league_sport: params.sport_name,
                        league_cc: 'all'
                    })
                    setLeagueList(data)
                    setIsLoading(false)
                }
                fetchSportList()
                fetchLeagueList()
            }
            , [params])

        return (
            <div id="content-wr">
                <div id="two-left">
                    <div id="page-title">
                        <div id="pt-text">Результаты</div>
                        <div id="pt-stripe"/>
                    </div>
                    <div id="table-main">

                        {
                            currentGame && <ModalForm
                                handleChangeShowModal={handleChangeShowModal}
                                showModal={showModal}
                                currentGame={currentGame}
                                bet={currentBet}
                                user={profile}
                                //@ts-ignore
                                session={session}
                            />
                        }

                        <Filter
                            handleSearchChange={handleSearchChange}
                            handleChangeParams={handleChangeParams}
                            params={params}
                            search={search}
                            sportList={sportList}
                        />

                        {
                            isLoading ?
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <img src={spinner} alt="Loading results..."/>
                                </div>
                                :
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
                        }
                    </div>
                </div>
                <RightBar
                    handleSetCurrentGame={handleSetCurrentGame}
                    handleChangeShowModal={handleChangeShowModal}
                    handleSetCurrentBet={handleSetCurrentBet}
                />
            </div>
        );
    }
;

export default Results;
