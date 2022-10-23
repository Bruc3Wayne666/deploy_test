import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getGames} from "../store/reducers/games/gameActions";
import axios from "axios";
import {IGame} from "../models/IGame";
import {ModalForm} from './ModalForm';
import {IProfileState} from "../store/reducers/profile/profileSlice";
import {ApiService} from "../api";
import spinner from "../assets/spinner.svg";


const LeagueItem: FC<{
    result: any, league: any, showParam: string, handleChangeShowModal: (val: boolean) => void, handleSetCurrentGame: (val: IGame) => void, handleSetCurrentBet: ({
                                                                                                                                                                      kf,
                                                                                                                                                                      name,
                                                                                                                                                                      id
                                                                                                                                                                  }: { kf: number, name: string, id: number }) => void
}> = ({
          result,
          league,
          showParam,
          handleChangeShowModal,
          handleSetCurrentGame,
          handleSetCurrentBet
      }) => {
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
    )
}

const GameItem: FC<{
    ind: number, game: IGame, showParam: string, handleChangeShowModal: (val: boolean) => void, handleSetCurrentGame: (val: IGame) => void, handleSetCurrentBet: ({
                                                                                                                                                                      kf,
                                                                                                                                                                      name,
                                                                                                                                                                      id
                                                                                                                                                                  }: { kf: number, name: string, id: number }) => void
}> = ({
          ind,
          game,
          showParam,
          handleChangeShowModal,
          handleSetCurrentGame,
          handleSetCurrentBet
      }) => {
    return (
        <div className="toc-item">
            <div className="toc-i-left-side">
                <div className="global-ico gi-star"/>
                <div className="toc-i-time">
                    <div className="tocit-daypart">{game.beautiful_time_start.split(' ')[0]}</div>
                    <div className="tocit-time">{game.beautiful_time_start.split(' ')[1]}</div>
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
                {
                    showParam !== 'ТОТАЛ' ?
                        <>
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
                                        game.quotes && game.quotes['Исход матча(основное время)'][2]["kf"]
                                    }
                                </div>
                            </div>
                        </> :
                        <>
                            <div className="tocirs-flcol tocirs-matchtime">
                                <div className="tocirsmt-title">placeholder</div>
                            </div>
                            <div className="totals">
                                <div>
                                    <h3>ТОТАЛЫ</h3>
                                </div>
                                <div style={{display: 'flex'}}>
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        {
                                            // @ts-ignore
                                            game.quotes && game.quotes['ТОТАЛ']
                                                .map((item: any, index: number) => {
                                                    if (index % 2 === 0) return <div className='total'>
                                                        {item.name}
                                                    </div>
                                                })
                                        }

                                    </div>
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        {
                                            // @ts-ignore
                                            game.quotes && game.quotes['ТОТАЛ']
                                                .map((item: any, index: number) => {
                                                    if (index % 2 === 1) return <div className='total'>
                                                        {item.name}
                                                    </div>
                                                })
                                        }
                                    </div>
                                </div>
                            </div>
                        </>
                }
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

const FilterCase: FC<any> = ({sport, handleChangeShowParam}) => {
    const sports = {
        'soccer': 'Футбол',
        'icehockey': 'Хоккей'
    }
    return (
        <div className="filter-name-cases">
            <div className="fl-name">
                <div className="global-ico gi-star"/>
                <div className="global-ico gi-football"/>
                <span>
                    {                // @ts-ignore
                        sports[sport]}
                </span></div>
            <div className="fl-cases">
                <div
                    onClick={() => handleChangeShowParam('Исход матча(основное время)')}
                    className="one-fl-case"><span>Исходы</span></div>
                <div
                    onClick={() => handleChangeShowParam('ТОТАЛ')}
                    className="one-fl-case"><span>Тоталы</span></div>
                {/*<div className="one-fl-case"><span>Двойные шансы</span></div>*/}
                {/*<div className="one-fl-case"><span>Форы</span></div>*/}
                {/*<div className="one-fl-case"><span>Забью гол</span></div>*/}
            </div>
        </div>
    )
}


const Main: FC = () => {
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
    const [params, setParams] = useState({
        sport_name: 'all',
        quotes: 'all',
        country: 'all',
        league_id: 'all',
        days: 10,
        one_day: 0,
        sort_number: false
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
    }) => {
        setParams({...params})
    }

    const handleChangeShowParam = (param: string) => {
        setShowParam(param)
    }

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
        setIsLoading(true)
        dispatch(getGames({...params, game_status: 'not started'}))
        const fetchLeagueList = async () => {
            const {data} = await axios.post('http://gpbetapi.ru/league_list', {
                league_sport: params.sport_name,
                league_cc: 'all'
            })
            setLeagueList(data)
            setIsLoading(false)
        }
        fetchLeagueList()
    }, [params])

    useEffect(() => {
        const fetchUserInfo = async (session: string) => {
            const data = await ApiService.getProfile(session)
            setUserInfo(data)
        }
        if (session) {
            fetchUserInfo(session)
        }
    }, [])

    // @ts-ignore
    return (
        <div id="content-wr">
            <div id="two-left">

                <div id="page-title">
                    <div id="pt-text"> Рекомендуем</div>
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
                                                        // eslint-disable-next-line array-callback-return
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
