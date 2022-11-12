import React, {FC, useCallback, useEffect, useState} from 'react';
import {IGame} from "../models/IGame";
import axios from "axios";
import {COUNTRIES, SPORTS} from "../assets/consts";
import {Link} from "react-router-dom";
import Dropdown from "react-dropdown";
import {ModalForm} from "./ModalForm";
import spinner from "../assets/spinner.svg";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {IProfileState} from "../store/reducers/profile/profileSlice";

// @ts-ignore
import debounce from "lodash/debounce";
import {ApiService} from "../api";
import {getGames} from "../store/reducers/games/gameActions";


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
        game: IGame
    }> = ({
              ind,
              game
          }) => {
    const {name, score, beautiful_time_start} = game

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
                    <span className={'s-red'}>LIVE</span>
                }
            </div>
        </div>
    )
}


const Filter: FC<any> = ({handleSearchChange, handleChangeParams, params, search, sportList}) => {
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
                          controlClassName={'frb-one-f'}
                          menuClassName={'frb-one-opts'}
                          onChange={e => handleChangeParams({...params, sport_name: e.value})}
                />

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

const Live = () => {
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
    const [params, setParams] = useState({
        sport_name: 'all',
        game_status: 'live',
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
        }, 1000),
        [params]
    )

    const handleChangeShowModal = (value: boolean) => {
        setShowModal(value)
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
            fetchLeagueList()
        }
        , [params])

    if (result === null) return <h1>В данный момент нету идущих событий в этом виде спорта</h1>

    return (
        <div id="content-wr">
            <div id="two-left">
                <div id="page-title">
                    <div id="pt-text">LIVE</div>
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
        </div>
    );
};

export default Live;