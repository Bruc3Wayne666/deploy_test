import React, {FC, useCallback, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "hooks/redux";
import {getGames} from "store/entities/games/gameActions";
import axios from "axios";
import {IGame} from "models/IGame";
import {ModalForm} from 'widgets/ModalForm/ui/ModalForm';
import {IProfileState} from "store/entities/profile/profileSlice";
import {ApiService} from "api";
import spinner from "assets/spinner.svg";
import {SPORTS} from 'assets/consts'
import {useLocation, useNavigate} from "react-router-dom";
import {LeagueListType} from "../../../../models/LeagueList";
import {SportList} from "../../../../models/ISport";
import LeagueItem from '../LeagueItem/LeagueItem';
import PopEvent from 'widgets/PopEvent/ui/PopEvent';
import FilterCountry from '../FilterCountry/FilterCountry';
import FilterCase, { ChangeParams, ParamsType } from '../FilterCase/FilterCase';


export const Main: FC = () => {
    const {pathname} = useLocation()
    const [profile, setUserInfo] = useState<IProfileState>({
        error: false,
        message: null,
        result: null,
    })
    const {result} = useAppSelector(state => state.gameReducer)
    const {session} = useAppSelector(state => state.authReducer)
    const [leagueList, setLeagueList] = useState<LeagueListType>({})
    const dispatch = useAppDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const [params, setParams] = useState<ParamsType>({
        sport_name: pathname === '/' ? 'all' : pathname.slice(1),
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
    const [currentGame, setCurrentGame] = useState<IGame | null>(null)
    const [currentBet, setCurrentBet] = useState({
        name: '',
        kf: 0,
        id: 0
    })
    const [showParam, setShowParam] = useState('Исход матча(основное время)')
    const [showModal, setShowModal] = useState(false)
    const [sportList, setSportList] = useState<SportList>({})
    const [isToday, setIsToday] = useState(false)

    const handleChangeIsToday = (value: boolean) => {
        setIsToday(value)
        if (value) {
            const date = new Date().toLocaleString('ru-RU', {
                timeZone: 'Europe/Moscow',
                hourCycle: 'h23',
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            })
            setParams(
                {
                    ...params,
                    beautiful_time_start: {
                        ...params.beautiful_time_start,
                        date: `${date.split('.')[2]}-${date.split('.')[1]}-${date.split('.')[0]}`
                    },
                }
            )
        } else {
            setParams(
                {
                    ...params,
                    beautiful_time_start: {
                        date: '-',
                        hours: '-'
                    },
                }
            )
        }
    }


    const handleChangeParams = (params: ChangeParams) => {
        setParams({...params})
    }

    const handleChangeShowParam = (param: string) => {
        setShowParam(param)
    }

    const handleChangeShowModal = (value: boolean) => {
        if (session) {
            setShowModal(value)
        } else {
            window.location.href = '/profile'
        }
    }

    const handleSetCurrentGame = (bid: IGame) => {
        setCurrentGame({...bid})
    }

    const handleSetCurrentBet = ({name, kf, id}: { name: string, kf: number, id: number }) => {
        setCurrentBet({name, kf, id})
    }


    const fetchLeagueList = useCallback(async () => {
        const {data} = await axios.post(`${process.env.REACT_APP_BASE_URL}/league_list`, {
            league_sport: params.sport_name,
            league_cc: 'all',
            status: 'not started'
        })
        return data
    }, [params])


    const fetchUserInfo = useCallback(async (session: string) => {
        return await ApiService.getProfile(session)
    }, [session])

    const fetchSportList = useCallback(async () => {
        const {data} = await axios.get(`${process.env.REACT_APP_BASE_URL}/sport_list`)
        setSportList(data)
    }, [])


    useEffect(() => {
        fetchSportList()
    }, [params])


    useEffect(() => {
        setIsLoading(true)
        dispatch(getGames({
            ...params,
            game_status: 'not started',
            beautiful_time_start: `${
                params.beautiful_time_start.date
            } ${params.beautiful_time_start.hours}`,
            pic: isToday ? 1 : 0
        }))
        fetchLeagueList()
            .then(res => {
                setLeagueList(res)
                setIsLoading(false)
            })
    }, [params])

    useEffect(() => {
        if (session) {
            fetchUserInfo(session)
                .then(res => setUserInfo(res))
        }
        window.scrollTo(0, 0)
    }, [session])

    if (result === 0) {
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
                        fontSize: 18,
                        textAlign: 'center',
                    }}
                >
                    В данный момент нет предстоящих событий
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
                    <div id="pt-text"> Рекомендуем</div>
                    <div id="pt-stripe"/>
                </div>

                <div id="rec-menu">
                    <div
                        onClick={() => handleChangeParams({
                            ...params,
                            sport_name: 'all',
                            country: 'all'
                        })}
                        className="one-rec-menu">
                        <div className="orm-title">
                            {SPORTS['all'].ru_name}
                        </div>
                    </div>
                    {
                        Object.keys(sportList).reverse()
                            .map((sportGame: string, id) => {
                                if (sportGame !== 'all') {
                                    return (
                                        <div
                                            onClick={() => handleChangeParams({
                                                ...params,
                                                sport_name: sportGame,
                                                country: 'all'
                                            })}
                                            className="one-rec-menu">
                                            <div className="global-ico">
                                                <img
                                                    src={require(`../../../../assets/images/${sportGame}.png`)}
                                                    height={50}
                                                    alt={sportGame}/>
                                            </div>
                                            <div className="orm-title">{SPORTS[sportGame].ru_name}</div>
                                        </div>
                                    )
                                }
                            })
                    }
                </div>


                <div id="table-main">
                    {
                        currentGame && <ModalForm
                            handleChangeShowModal={handleChangeShowModal}
                            showModal={showModal}
                            currentGame={currentGame}
                            bet={currentBet}
                            user={profile}
                            session={session ? session : ''}
                        />
                    }

                    <FilterCountry
                        handleChangeParams={handleChangeParams}
                        params={params}
                    />
                    <FilterCase
                        sport={params.sport_name}
                        showParam={showParam}
                        handleChangeShowParam={handleChangeShowParam}
                        handleChangeParams={handleChangeParams}
                        params={params}
                        isToday={isToday}
                        handleChangeIsToday={handleChangeIsToday}
                    />


                    {
                        isLoading ?
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <img src={spinner} alt="Loading results..."/>
                            </div>
                            : result === 1
                                ? <div className="table-one-cat">
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
                                : <div className="table-one-cat">
                                    {
                                        Object.keys(leagueList)
                                            .map(sp => {
                                                return Object.keys(leagueList[sp])
                                                    .map((co, id) => {
                                                        return leagueList[sp][co]
                                                            .map((league: any[]) => {
                                                                if (params.country === 'all') {
                                                                    return <LeagueItem
                                                                        league={league}
                                                                        result={result}
                                                                        showParam={showParam}
                                                                        handleChangeShowModal={handleChangeShowModal}
                                                                        handleSetCurrentGame={handleSetCurrentGame}
                                                                        handleSetCurrentBet={handleSetCurrentBet}
                                                                    />
                                                                } else if (params.country === co) {
                                                                    return <LeagueItem
                                                                        league={league}
                                                                        result={result}
                                                                        showParam={showParam}
                                                                        handleChangeShowModal={handleChangeShowModal}
                                                                        handleSetCurrentGame={handleSetCurrentGame}
                                                                        handleSetCurrentBet={handleSetCurrentBet}
                                                                    />
                                                                }
                                                            })
                                                    })
                                            })
                                    }

                                </div>
                    }
                </div>

            </div>


            <div id="two-right">

                <PopEvent
                    handleSetCurrentGame={handleSetCurrentGame}
                    handleChangeShowModal={handleChangeShowModal}
                    handleSetCurrentBet={handleSetCurrentBet}
                />

                <div id="right-col-menu">
                    {
                        Object.keys(sportList).reverse()
                            .map((sportGame, id) => {
                                if (sportGame !== 'all') {
                                    return (
                                        <div
                                            onClick={() => handleChangeParams({
                                                ...params,
                                                sport_name: sportGame,
                                                country: 'all'
                                            })}
                                            className="one-rcm-menu">
                                            <img src={require(`../../../../assets/images/${sportGame}.png`)} height={20}
                                                 alt={sportGame} style={{marginRight: 12}}/>
                                            <div className="rcm-title">
                                                {SPORTS[sportGame].ru_name}
                                            </div>
                                        </div>
                                    )
                                }
                            })
                    }
                </div>
            </div>
        </div>
    )
};
