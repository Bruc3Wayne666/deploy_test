import {IGame} from "../../../../models/IGame";
import React, {FC} from "react";
import {COUNTRIES} from "../../../../assets/consts";
import GameItem from "../GameItem/GameItem";

export interface LeagueItemProps {
    result: any,
    league: any,
    showParam: string,
    handleChangeShowModal: (val: boolean) => void,
    handleSetCurrentGame: (val: IGame) => void,
    handleSetCurrentBet: ({kf, name, id}: { kf: number, name: string, id: number }) => void
}

const LeagueItem: FC<LeagueItemProps> = props => {
    const {
        result,
        league,
        showParam,
        handleChangeShowModal,
        handleSetCurrentGame,
        handleSetCurrentBet
    } = props

    let counter = 0

    result && Object.keys(result.country)
        .map(co => {
            return Object.keys(result.country[co])
                .map(sport => {
                    return Object.keys(result.country[co][sport])
                        .map(status => {
                            return Object.keys(result.country[co][sport][status])
                                .map((game, index) => {
                                    if (result.country[co][sport][status][game].league.id === String(league[0])) {
                                        counter += 1
                                    }
                                })
                        })
                })
        })

    return league[3] !== 0 && counter !== 0 ? (
        <>
            <div className="toc-title">
                <div className="global-ico">
                    <img
                        src={
                            COUNTRIES[league[2]].svg_url
                        }
                        alt={league[2]}
                        height={20}
                    />
                </div>
                <span>{
                    COUNTRIES[league[2]].ru_name
                }. {league[1]}</span>
            </div>
            {
                result && Object.keys(result.country)
                    .map(co => {
                        return Object.keys(result.country[co])
                            .map(sport => {
                                return Object.keys(result.country[co][sport])
                                    .map(status => {
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
                                                        sport={sport}
                                                    />
                                            })
                                    })
                            })
                    })
            }
        </>
    ) : <></>
}

export default LeagueItem
