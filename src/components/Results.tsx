import React, {FC, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getGames} from "../store/reducers/games/gameActions";
import {IGame} from "../models/IGame";
import spinner from '../assets/spinner.svg'
import axios from "axios";
import {COUNTRIES, SPORTS} from "../assets/consts";
import {Link, useNavigate} from "react-router-dom";
// @ts-ignore
import debounce from "lodash/debounce";
import {ModalForm} from "./ModalForm";
import {IProfileState} from "../store/reducers/profile/profileSlice";
import {ApiService} from "../api";
import {FilterDropDown} from "./CustomDropdown";
import Dropdown from "react-dropdown";
// @ts-ignore
import isEqual from "lodash/isEqual";


const PopEvent: FC<any> = ({handleSetCurrentGame, handleChangeShowModal, handleSetCurrentBet}) => {
    const [popEvent, setPopEvent] = useState<IGame | null | string>(null)
    const [sportList, setSportList] = useState<any>({})
    const [sport, setSport] = useState('')


    const fetchEvent = useCallback(async () => {
        const {data} = await axios.post(`${process.env.REACT_APP_BASE_URL}/pop_game`, {
            sport_name: sport
        })
        return data
    }, [sport])

    const fetchSportList = useCallback(async () => {
        const {data} = await axios.get(`${process.env.REACT_APP_BASE_URL}/sport_list`)
        if (Object.keys(data).length >= 2) {
            setSport(Object.keys(data)[1])
        }
        setSportList(data)
    }, [])

    useEffect(() => {
        fetchEvent()
            .then(res => setPopEvent(res))
    }, [sport])

    useEffect(() => {
        fetchSportList()
        window.scrollTo(0, 0)
    }, [])


    if (Object.keys(sportList).length === 0 || sportList == null) return (
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
                    Object.keys(sportList)
                        .map(sportGame => {
                            if (sportGame !== 'all') {
                                console.log(sportGame)
                                console.log(12)
                                return (
                                    <div
                                        onClick={() => setSport(sportGame)}
                                        className={`one-ps-menu ${sport === sportGame && 'active'}`}>
                                        <img
                                            src={require(`../assets/images/${sportGame}.png`)}
                                            height={12}
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
                    popEvent !== 'No game in this sport' ?
                        <>
                            <div className="pop-sob-title-in">
                                {
                                    popEvent &&
                                    //@ts-ignore
                                    COUNTRIES[popEvent?.cc]?.ru_name
                                    //@ts-ignore
                                }. {popEvent?.league?.name}</div>
                            <div className="pop-sob-teams">
                                <div>
                                    <img src={
                                        //@ts-ignore
                                        popEvent?.home_team_logo} alt={popEvent?.home_team} height={10}
                                         style={{marginRight: 20}}/>
                                    &nbsp;
                                    {   //@ts-ignore
                                        popEvent?.home_team}
                                </div>
                                <div className="pst-hl"/>
                                <div>
                                    <img src={//@ts-ignore
                                        popEvent?.away_team_logo} alt={popEvent?.away_team} height={10}
                                         style={{marginRight: 20}}/>
                                    &nbsp;
                                    {
                                        //@ts-ignore
                                        popEvent?.away_team}
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
                                        //@ts-ignore
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
                                        //@ts-ignore
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
                                        //@ts-ignore
                                        popEvent?.quotes?.["Исход матча(основное время)"][2]["kf"]
                                    }</div>
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
            <div className="all-pop-sob">еще {
                //@ts-ignore
                popEvent?.kot_count} котировок
                <div className="global-ico gi-arrow-right"/>
            </div>
        </div>
    )
}

const LeagueItem: FC<any> = ({filter, result, f_status}) => {
    const {league} = filter
    let counter = 0

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
                                    if (result.country[co][sport][status][game].league.id === String(league[0])) {
                                        counter += 1
                                    }
                                })
                        })
                })
        })

    return ((league[3] + league[4] + league[5]) !== 0 && counter !== 0) ? (
        <>
            <div className="toc-title">
                <div className="global-ico gi-star">

                </div>
                <div className="global-ico">
                    <img
                        src={
                            //@ts-ignore
                            COUNTRIES[league[2]].svg_url
                        }
                        alt={league[2]}
                        height={20}
                    />
                </div>
                <span>{
                    //@ts-ignore
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
                                                        key={index}
                                                    />
                                            })
                                    })
                            })
                    })
            }
        </>
    ) : <></>
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

    const styles = {
        'НЕ НАЧАЛСЯ': 's-orange',
        'LIVE': 's-red',
        'ЗАВЕРШЁН': 's-blue'
    }

    const currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)

    return (
        <div className="toc-item-res">
            <div className="tocir-num">{++ind}</div>
            <div className="tocir-name">{name}</div>
            <div className="tocir-results">{score === null ? '---' : score}</div>
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
    const dateRef = useRef<HTMLInputElement>(null)
    const timeRef = useRef<HTMLInputElement>(null)

    // const [showSportDropdown, setShowSportDropdown] = useState(false)
    // const [showEventDropdown, setShowEventDropdown] = useState(false)

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


                <div className="frb-one"
                     onClick={
                         // @ts-ignore
                         () => dateRef.current.showPicker()
                     }
                >
                    <span>Дата</span>
                    <div className="global-ico gi-arrow-bot"/>
                    <input
                        ref={dateRef}
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
                <div className="frb-one"
                     onClick={
                         // @ts-ignore
                         () => timeRef.current.showPicker()
                     }
                >
                    <span>Время</span>
                    <div className="global-ico gi-arrow-bot"/>
                    <input
                        ref={timeRef}
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
        const [isLoading, setIsLoading] = useState(false)
        const [search, setSearch] = useState('')
        const navigate = useNavigate()
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
            search: '-',
            pic: 1
        })

        const stock = {
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
            search: '-',
            pic: 1
        }

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
            search: string,
            pic: number
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
            }, 1000),
            [search]
        )

        const fetchLeagueList = useCallback(async () => {
            const {data} = await axios.post(`${process.env.REACT_APP_BASE_URL}/league_list`, {
                league_sport: params.sport_name,
                league_cc: 'all',
                status: params.game_status
            })
            return data
        }, [params])

        useEffect(() => {
            setIsLoading(true)
            dispatch(getGames({
                ...params, beautiful_time_start: `${
                    params.beautiful_time_start.date
                } ${params.beautiful_time_start.hours}`
            }))
            fetchLeagueList()
                .then(res => {
                    setLeagueList(res)
                    setIsLoading(false)
                })
        }, [params])


        if (result === 1 && isEqual(params, stock)) {
            window.scrollTo(0, 0)
            return (
                <div
                    style={{
                        marginTop: window.innerWidth > 1440 ? 160 : '60%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 16,
                        flexDirection: 'column'
                    }}>
                    <p
                        style={{
                            fontSize: 18
                        }}
                    >
                        В данный момент нет идущих событий
                    </p>
                    <button
                        onClick={() => navigate(-1)}
                        style={{
                            marginTop: 12,
                            backgroundColor: '#cc9933',
                            padding: '8px 12px',
                            borderRadius: 8,
                            border: 'none'
                        }}
                    >
                        Вернутся назад
                    </button>
                </div>
            )
        }


        return (
            <div id="content-wr">
                <div id="two-left">
                    <div id="page-title">
                        <div id="pt-text">Результаты</div>
                        <div id="pt-stripe"/>
                    </div>
                    <div id="table-main">

                        <Filter
                            handleSearchChange={handleSearchChange}
                            handleChangeParams={handleChangeParams}
                            params={params}
                            search={search}
                            sportList={SPORTS}
                        />

                        {
                            isLoading ?
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <img src={spinner} alt="Loading results..."/>
                                </div>
                                :
                                result === 1 ?
                                    <div className="table-one-cat">
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flexDirection: 'column'
                                        }}>
                                            <img
                                                width={200}
                                                height={200}
                                                src={require('../assets/svg/unfounded.svg').default}
                                                alt="-_-"
                                            />
                                            <h3 style={{color: '#888', marginTop: 20}}>Не найдено матчей по вашим
                                                критериям</h3>
                                        </div>
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
                                                                        }}
                                                                        f_status={params.game_status}
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
            </div>
        );
    }
;

export default Results;
