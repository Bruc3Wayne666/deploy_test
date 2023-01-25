import React, {FC, useCallback, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getGames} from "../store/reducers/games/gameActions";
import axios from "axios";
import {IGame} from "../models/IGame";
import {ModalForm} from './ModalForm';
import {IProfileState} from "../store/reducers/profile/profileSlice";
import {ApiService} from "../api";
import spinner from "../assets/spinner.svg";
import {COUNTRIES, SPORTS} from '../assets/consts'
import {useLocation, useNavigate} from "react-router-dom";
import {TotalsDropdown} from "./CustomDropdown";


const LeagueItem:
    FC<{
        result: any,
        league: any,
        showParam: string,
        handleChangeShowModal: (val: boolean) => void,
        handleSetCurrentGame: (val: IGame) => void,
        handleSetCurrentBet: ({kf, name, id}: { kf: number, name: string, id: number }) => void
    }> = ({
              result,
              league,
              showParam,
              handleChangeShowModal,
              handleSetCurrentGame,
              handleSetCurrentBet
          }) => {
    return league[3] !== 0 ? (
        <>
            <div className="toc-title">
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
                                                        game={result.country[co][sport][status][game]}
                                                        showParam={showParam}
                                                        handleChangeShowModal={handleChangeShowModal}
                                                        handleSetCurrentGame={handleSetCurrentGame}
                                                        handleSetCurrentBet={handleSetCurrentBet}
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
        showParam: string,
        handleChangeShowModal: (val: boolean) => void,
        handleSetCurrentGame: (val: IGame) => void,
        handleSetCurrentBet: ({kf, name, id}: { kf: number, name: string, id: number }) => void
    }> = ({
              game,
              showParam,
              handleChangeShowModal,
              handleSetCurrentGame,
              handleSetCurrentBet
          }) => {

    const currentDate = new Date()
    const [showTotals, setShowTotals] = useState(false)

    return (
        <div className="toc-item">
            <div className="toc-i-left-side">
                <div className="global-ico gi-star"/>
                <div className="toc-i-time">
                    <div className="tocit-daypart">
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
                                ) - Number(currentDate.getDate())) === 1 ? 'Завтра в'
                                    :
                                    (Number(
                                        game
                                            .beautiful_time_start
                                            .split(' ')[0]
                                            .split('-')[2]
                                    ) - Number(currentDate.getDate())) === 2 ? 'Послезавтра в' :
                                        game
                                            .beautiful_time_start
                                            .split(' ')[0]
                        }
                    </div>
                    <div className="tocit-time">{game.beautiful_time_start.split(' ')[1]}</div>
                </div>
                <div className="toc-i-teams">
                    <div>
                        <img src={game.home_team_logo} height={14} alt=".."/>
                        {game.name.split(' VS ')[0]}
                    </div>
                    <div>
                        <img src={game.away_team_logo} height={14} alt=".."/>
                        {game.name.split(' VS ')[1]}
                    </div>
                </div>
            </div>
            <div className="toc-i-right-side">

                {
                    game.day_game
                        ? <div className="tocirs-someinfo"><span>Матч дня</span></div>
                        : <div className="tocirs-someinfo" style={{visibility: 'hidden'}}><span>Матч дня</span></div>
                }

                {
                    showParam !== 'ТОТАЛ' ?
                        <>
                            <div className="tocirs-flcol tocirs-matchtime">
                                <div className="tocirsmt-line">Основное время</div>
                            </div>
                            <div className="tocirs-flcol tocirs-koef">
                                <div className="tocirsmt-title">
                                    {
                                        game.name.split(' VS ')[0]
                                    }
                                </div>
                                <div
                                    onClick={() => {
                                        handleSetCurrentGame(game)
                                        handleChangeShowModal(true)
                                        handleSetCurrentBet({
                                            name: 'П1',
                                            //@ts-ignore
                                            kf: game.quotes && game.quotes['Исход матча(основное время)'][0]["kf"],
                                            //@ts-ignore
                                            id: game.quotes && game.quotes['Исход матча(основное время)'][0]["id"]
                                        })
                                    }}
                                    className="tocirsmt-line"
                                >
                                    {
                                        (game.quotes && game.quotes['Исход матча(основное время)'][0]) && game.quotes["Исход матча(основное время)"][0]['kf']
                                    }
                                </div>
                            </div>
                            <div className="tocirs-flcol tocirs-koef">
                                <div className="tocirsmt-title">
                                    {
                                        (game.quotes && game.quotes['Исход матча(основное время)'][1]) && game.quotes['Исход матча(основное время)'][1]["name"]
                                    }
                                </div>
                                <div
                                    onClick={() => {
                                        handleSetCurrentGame(game)
                                        handleChangeShowModal(true)
                                        handleSetCurrentBet({
                                            name: 'НИЧЬЯ',
                                            //@ts-ignore
                                            kf: game.quotes && game.quotes['Исход матча(основное время)'][1]["kf"],
                                            //@ts-ignore
                                            id: game.quotes && game.quotes['Исход матча(основное время)'][1]["id"]
                                        })
                                    }}
                                    className="tocirsmt-line"
                                >
                                    {
                                        (game.quotes && game.quotes['Исход матча(основное время)'][1]) && game.quotes["Исход матча(основное время)"][1]["kf"]
                                    }
                                </div>
                            </div>
                            <div className="tocirs-flcol tocirs-koef">
                                <div className="tocirsmt-title">
                                    {
                                        game.name.split(' VS ')[1]
                                    }
                                </div>
                                <div
                                    onClick={() => {
                                        handleSetCurrentGame(game)
                                        handleChangeShowModal(true)
                                        handleSetCurrentBet({
                                            name: 'П2',
                                            //@ts-ignore
                                            kf: game.quotes && game.quotes['Исход матча(основное время)'][2]["kf"],
                                            //@ts-ignore
                                            id: game.quotes && game.quotes['Исход матча(основное время)'][2]["id"]
                                        })
                                    }}
                                    className="tocirsmt-line"
                                >
                                    {
                                        (game.quotes && game.quotes['Исход матча(основное время)'][2]) && game.quotes['Исход матча(основное время)'][2]["kf"]
                                    }
                                </div>
                            </div>
                        </>

                        :

                        <>
                            <div className="totals">
                                {
                                    game.quotes &&
                                    <TotalsDropdown
                                        title={showTotals ? 'Скрыть' : 'Показать все тоталы'}
                                        showDropdown={showTotals}
                                        setShowDropdown={setShowTotals}
                                        items={
                                            //@ts-ignore
                                            game.quotes['ТОТАЛ']
                                        }
                                        handleSetCurrentGame={handleSetCurrentGame}
                                        handleSetCurrentBet={handleSetCurrentBet}
                                        handleChangeShowModal={handleChangeShowModal}
                                        game={game}
                                    />
                                }
                            </div>
                        </>
                }
            </div>
        </div>
    )
}


const FilterCountry: FC<any> = ({handleChangeParams, params}) => {
    const [countries, setCountries] = useState({})

    useEffect(() => {
        const fetchCountries = async () => {
            const {data} = await axios.get(`${process.env.REACT_APP_BASE_URL}/country`)
            setCountries(data)
        }
        fetchCountries()
    }, [])

    return (
        <div id="filter-contry">
            {
                Object.keys(countries)
                    .map(sport => {
                        if (sport === params.sport_name) {
                            // @ts-ignore
                            return Object.keys(countries[params.sport_name])
                                .map(co => {
                                    return (
                                        <div
                                            onClick={() => handleChangeParams({...params, country: co})}
                                            className={`one-contry-f ${params.country === co && 'active'}`}
                                        >
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    flexDirection: "column",
                                                    justifyContent: "space-between"
                                                }}
                                            >
                                                <img
                                                    // @ts-ignore
                                                    src={COUNTRIES[co].svg_url}
                                                    height={16}
                                                    alt=''
                                                    style={{marginBottom: 6}}
                                                />
                                                {  // @ts-ignore
                                                    COUNTRIES[co].ru_name
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                        }
                    })
            }
        </div>
    )
}

const FilterCase: FC<any> = ({sport, handleChangeShowParam}) => {
    const sports = {
        'soccer': 'Футбол',
        'icehockey': 'Хоккей',
        'basketball': 'Баскетбол',
    }
    return (
        <div className="filter-name-cases">
            <div className="fl-name">
                <div className="global-ico gi-star"/>
                <div className="global-ico gi-football"/>
                <span>
                    {                // @ts-ignore
                        sports[sport] || 'Все игры'}
                </span></div>
            <div className="fl-cases">
                <div
                    onClick={() => handleChangeShowParam('Исход матча(основное время)')}
                    className="one-fl-case"><span>Исходы</span></div>
                <div
                    onClick={() => handleChangeShowParam('ТОТАЛ')}
                    className="one-fl-case"><span>Тоталы</span></div>
            </div>
        </div>
    )
}


const Main: FC = () => {
    const {pathname} = useLocation()
    const [profile, setUserInfo] = useState<IProfileState>({
        error: false,
        message: null,
        result: null,
    })
    const {result} = useAppSelector(state => state.gameReducer)
    const {session} = useAppSelector(state => state.authReducer)
    const [leagueList, setLeagueList] = useState({})
    const dispatch = useAppDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const [params, setParams] = useState({
        sport_name: pathname === '/' ? 'all' : pathname.slice(1),
        quotes: 'all',
        country: 'all',
        league_id: 'all',
        days: 10,
        one_day: 0,
        sort_number: false,
        beautiful_time_start: '- -',
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

    const handleChangeParams = (params: {
        sport_name: string,
        quotes: string,
        country: string,
        league_id: string,
        days: number,
        one_day: number,
        sort_number: boolean
        beautiful_time_start: string,
        search: string,
        pic: number
    }) => {
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


    useEffect(() => {
        setIsLoading(true)
        dispatch(getGames({...params, game_status: 'not started'}))
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

    // @ts-ignore
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
                        <div className="orm-title">{
                            //@ts-ignore
                            SPORTS['all'].ru_name}</div>
                    </div>
                    {
                        Object.keys(SPORTS).reverse()
                            .map((sportGame: string) => {
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
                                                <img src={require(`../assets/images/${sportGame}.png`)} height={50}
                                                     alt={sportGame}/>
                                            </div>
                                            <div className="orm-title">{
                                                //@ts-ignore
                                                SPORTS[sportGame].ru_name}</div>
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
                            //@ts-ignore
                            session={session}
                        />
                    }

                    <FilterCountry
                        handleChangeParams={handleChangeParams}
                        params={params}
                    />
                    <FilterCase
                        sport={params.sport_name}
                        handleChangeShowParam={handleChangeShowParam}
                    />


                    {
                        isLoading ?
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <img src={spinner} alt="Loading results..."/>
                            </div>
                            : result === 1
                                ? <h1>[штука что нету матчей у такого спорта]</h1>
                                : <div className="table-one-cat">
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
                        //@ts-ignore
                        Object.keys(SPORTS).reverse()
                            .map(sportGame => {
                                if (sportGame !== 'all') {
                                    // @ts-ignore
                                    return (
                                        <div
                                            onClick={() => handleChangeParams({
                                                ...params,
                                                sport_name: sportGame,
                                                country: 'all'
                                            })}
                                            className="one-rcm-menu">
                                            <img src={require(`../assets/images/${sportGame}.png`)} height={20}
                                                 alt={sportGame} style={{marginRight: 12}}/>
                                            <div className="rcm-title">{
                                                //@ts-ignore
                                                SPORTS[sportGame].ru_name}</div>
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
            setSport(Object.keys(data).reverse()[0])
        }
        setSportList(data)
    }, [])

    useEffect(() => {
        fetchEvent()
            .then(res => setPopEvent(res))
    }, [sport])

    useEffect(() => {
        fetchSportList()
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
                    Object.keys(sportList).reverse()
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
            <div className="all-pop-sob">ещё {
                //@ts-ignore
                popEvent?.kot_count} котировок
                <div className="global-ico gi-arrow-right"/>
            </div>
        </div>
    )
}

export default Main;
