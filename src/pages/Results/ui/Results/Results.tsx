import React, {FC, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from "hooks/redux";
import {getGames} from "store/entities/games/gameActions";
import {IGame} from "models/IGame";
import spinner from 'assets/spinner.svg'
import axios from "axios";
import {COUNTRIES, SPORTS} from "assets/consts";
import {Link, useNavigate} from "react-router-dom";
// @ts-ignore
import debounce from "lodash/debounce";
import {ModalForm} from "widgets/ModalForm/ui/ModalForm";
import {IProfileState} from "store/entities/profile/profileSlice";
import {ApiService} from "api";
import {FilterDropDown} from "shared/ui/CustomDropdown/CustomDropdown";
import Dropdown from "react-dropdown";
// @ts-ignore
import isEqual from "lodash/isEqual";
import LeagueItem from '../LeagueItem/LeagueItem';
import {LeagueListType} from "../../../../models/LeagueList";
import {SportList} from "../../../../models/ISport";
import ResultFilter from '../ResultFilter/ResultFilter';


export const Results = () => {
    const [sportList, setSportList] = useState<SportList>({})
    const {result} = useAppSelector(state => state.gameReducer)
    const [leagueList, setLeagueList] = useState<LeagueListType>({})
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
            ...params,
            beautiful_time_start: `${
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

                    <ResultFilter
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
};
