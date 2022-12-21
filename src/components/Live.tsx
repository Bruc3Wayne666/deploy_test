import React, {FC, useCallback, useEffect, useState} from 'react';
import {IGame} from "../models/IGame";
import axios from "axios";
import {COUNTRIES, SPORTS} from "../assets/consts";
import Dropdown from "react-dropdown";
import spinner from "../assets/spinner.svg";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {IProfileState} from "../store/reducers/profile/profileSlice";

// @ts-ignore
import debounce from "lodash/debounce";
// @ts-ignore
import isEqual from "lodash/isEqual";
import {ApiService} from "../api";
import {getGames} from "../store/reducers/games/gameActions";
import {useNavigate} from "react-router-dom";


const LeagueItem: FC<any> = ({filter, result}) => {
    const {league} = filter

    return league[4] !== 0 ? (
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
    ) : <></>
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

                Начался в

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
    const {result} = useAppSelector(state => state.gameReducer)
    const [leagueList, setLeagueList] = useState({})
    const dispatch = useAppDispatch()
    const {session} = useAppSelector(state => state.authReducer)
    const navigate = useNavigate()
    const [profile, setUserInfo] = useState<IProfileState>({
        error: false,
        message: null,
        result: null,
    })
    const [isActive, setIsActive] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [search, setSearch] = useState('')
    // const [showModal, setShowModal] = useState(false)
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
    const stock = {
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
        search: string
    }) => {
        setParams({...params})
    }

    const handleSearchChange = (e: any) => {
        setSearch(e.target.value)
        setIsActive(e.target.value.length === 0)
        setParams({
            ...params,
            search: e.target.value
        })
        handleSearch(e.target.value)
    }

    const handleSearch = useCallback(
        debounce((value: string) => {
            setParams({
                ...params,
                search: value === '' ? '-' : value
            })
        }, 1000),
        [search]
    )

    const fetchUserInfo = useCallback(async (session: string) => {
        return await ApiService.getProfile(session)
    }, [session])

    const fetchLeagueList = useCallback(async () => {
        const {data} = await axios.post(`${process.env.REACT_APP_BASE_URL}/league_list`, {
            league_sport: params.sport_name,
            league_cc: 'all',
            status: 'live'
        })
        return data
    }, [params])

    useEffect(() => {
        if (session) {
            fetchUserInfo(session)
                .then(res => setUserInfo(res))
        }
        window.scrollTo(0, 0)
    }, [session])

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
        }
        , [params])

    if ((result === 0 || result === null) && !isActive) {
        return (
            <div
                style={{
                    // height: window.innerWidth <= 1440 ? '80vh' : '',
                    marginTop: window.innerWidth > 1440 ? 160 : '60%',
                    // border: '1px solid white',
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
                    В данный момент нету идущих событий
                </p>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        marginTop: 12,
                        backgroundColor: '#cc9933',
                        padding: '8px 12px',
                        borderRadius: 8,
                        border: 'none',
                        cursor: 'pointer'
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
                            (result === 1 && !isEqual(params, stock)) ?
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
