import {IGame} from "models/IGame";
import React, {FC, useState} from "react";
import {TotalsDropdown} from "shared/ui/CustomDropdown/CustomDropdown";
import {DateFormater} from "shared/lib/dateFormater";


export interface GameItemProps {
    ind: number,
    game: IGame,
    showParam: string,
    handleChangeShowModal: (val: boolean) => void,
    handleSetCurrentGame: (val: IGame) => void,
    handleSetCurrentBet: ({kf, name, id}: { kf: number, name: string, id: number }) => void,
    sport: string
}

const GameItem: FC<GameItemProps> = props => {
    const {
        game,
        showParam,
        handleChangeShowModal,
        handleSetCurrentGame,
        handleSetCurrentBet,
        sport
    } = props

    const [showTotals, setShowTotals] = useState(false)
    const {beautiful_time_start} = game

    const {day, time} = DateFormater(beautiful_time_start)

    if (game.quotes === undefined) return <></>

    return (
        <div className="toc-item">
            <div className="toc-i-left-side">
                <div className="global-ico gi-star"/>
                <div className="toc-i-time">
                    <div className="tocit-daypart">
                        {day}
                    </div>
                    <div className="tocit-time">{time}</div>
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
                                            kf: game.quotes['Исход матча(основное время)'][0]["kf"],
                                            id: game.quotes['Исход матча(основное время)'][0]["id"]
                                        })
                                    }}
                                    className="tocirsmt-line"
                                >
                                    {
                                        game.quotes['Исход матча(основное время)'][0]['kf']
                                    }
                                </div>
                            </div>
                            <div className="tocirs-flcol tocirs-koef">
                                <div className="tocirsmt-title">
                                    {
                                        game.quotes['Исход матча(основное время)'][1]["name"]
                                    }
                                </div>
                                {
                                    sport === 'basketball'
                                        ? <div className="tocirsmt-line">
                                            ---
                                        </div>
                                        : <div
                                            onClick={() => {
                                                handleSetCurrentGame(game)
                                                handleChangeShowModal(true)
                                                handleSetCurrentBet({
                                                    name: 'НИЧЬЯ',
                                                    kf: game.quotes['Исход матча(основное время)'][1]["kf"],
                                                    id: game.quotes['Исход матча(основное время)'][1]["id"]
                                                })
                                            }}
                                            className="tocirsmt-line"
                                        >
                                            {
                                                game.quotes["Исход матча(основное время)"][1]["kf"]
                                            }
                                        </div>
                                }
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
                                            kf: game.quotes['Исход матча(основное время)'][2]["kf"],
                                            id: game.quotes['Исход матча(основное время)'][2]["id"]
                                        })
                                    }}
                                    className="tocirsmt-line"
                                >
                                    {
                                        game.quotes['Исход матча(основное время)'][2]["kf"]
                                    }
                                </div>
                            </div>
                        </>

                        :

                        <>
                            <div className="totals">
                                {
                                    (game.quotes && (Object.keys(game.quotes['ТОТАЛ']).length !== 0)) ?
                                        <TotalsDropdown
                                            title={showTotals ? 'Скрыть' : 'Показать все тоталы'}
                                            showDropdown={showTotals}
                                            setShowDropdown={setShowTotals}
                                            items={game.quotes['ТОТАЛ']}
                                            handleSetCurrentGame={handleSetCurrentGame}
                                            handleSetCurrentBet={handleSetCurrentBet}
                                            handleChangeShowModal={handleChangeShowModal}
                                            game={game}
                                        /> : <p>Нет тоталов</p>
                                }
                            </div>
                        </>
                }
            </div>
        </div>
    )
}

export default GameItem
