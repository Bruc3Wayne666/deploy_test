import React, {useCallback, useEffect, useState} from 'react';

// @ts-ignore
import debounce from "lodash/debounce";
// @ts-ignore
import isEqual from "lodash/isEqual";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "hooks/redux";
import { IProfileState } from 'store/entities/profile/profileSlice';
import { ApiService } from 'api';
import { getGames } from 'store/entities/games/gameActions';
import {SPORTS} from 'assets/consts';
import spinner from 'assets/spinner.svg'
import {LeagueListType} from "models/LeagueList";
import LeagueItem from '../LeagueItem/LeagueItem';
import Filter from '../Filter/Filter';


const Live = () => {
    const {result} = useAppSelector(state => state.gameReducer)
    const [leagueList, setLeagueList] = useState<LeagueListType>({})
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
        search: '-',
        pic: 0
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
        search: '-',
        pic: 0
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

    useEffect(() => {
        if (session) {
            ApiService.getProfile(session)
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

            ApiService.getLeagueList(params.sport_name, 'all', 'live')
                .then(res => {
                    setLeagueList(res)
                    setIsLoading(false)
                })
        }
        , [params])

    if (result === 0 && isEqual(params, stock)) {
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
                            result === 0 ?
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
                                            src={require('../../../../assets/svg/unfounded.svg').default}
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
                                                return Object.keys(leagueList[sp])
                                                    .map(co => {
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

export default Live
