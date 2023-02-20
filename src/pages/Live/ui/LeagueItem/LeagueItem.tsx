import React, {FC} from "react";
import {COUNTRIES} from "../../../../assets/consts";
import GameItem from "../GameItem/GameItem";

const LeagueItem: FC<any> = ({filter, result}) => {
    const {league} = filter

    return league[4] !== 0 ? (
        <>
            <div className="toc-title">
                <div className="global-ico gi-star">

                </div>
                <div className="global-ico">
                    <img
                        src={COUNTRIES[league[2]].svg_url}
                        alt={league[2]}
                        height={20}
                    />
                </div>
                <span>{COUNTRIES[league[2]].ru_name}. {league[1]}</span>
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
                                                        game={result.country[co][sport][status][index]}
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
