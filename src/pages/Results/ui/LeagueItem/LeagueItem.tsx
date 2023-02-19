import React, {FC} from "react";
import {COUNTRIES} from "../../../../assets/consts";
import {ResultType} from "../../../../store/entities/games/gameSlice";
import GameItem from "../GameItem/GameItem";


export interface LeagueItemProps {
    f_status: string
    result: ResultType
    filter: {
        league: any
    }
}

const LeagueItem: FC<any> = props => {
    const {filter, result, f_status} = props
    const {league} = filter
    let counter = 0

    result && Object.keys(result.country)
        .map(co => {
            return Object.keys(result.country[co])
                .map(sport => {
                    return Object.keys(result.country[co][sport])
                        .map(status => {
                            return Object.keys(result.country[co][sport][status])
                                .map((_, index) => {
                                    if (result.country[co][sport][status][index].league.id === String(league[0])) {
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
                                            .map((_, index) => {
                                                return (
                                                        result.country[co][sport][status][index].league.id === String(league[0])
                                                    ) &&
                                                    <GameItem
                                                        ind={index}
                                                        // @ts-ignore
                                                        status={{
                                                            'not started': 'НЕ НАЧАЛСЯ',
                                                            'live': 'LIVE',
                                                            'end': 'ЗАВЕРШЁН'
                                                        }[status]}

                                                        game={result.country[co][sport][status][index]}
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

export default LeagueItem
