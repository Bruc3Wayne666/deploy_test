import React, {FC} from "react";
import {IGame} from "models/IGame";
import {DateFormater} from "../../../../shared/lib/dateFormater";


export interface GameItemProps {
    ind: number,
    game: IGame,
    status: string
}

const GameItem:
    FC<GameItemProps> = props => {
    let {
        ind,
        game,
        status
    } = props
    const {name, score, beautiful_time_start} = game

    const styles = {
        'НЕ НАЧАЛСЯ': 's-orange',
        'LIVE': 's-red',
        'ЗАВЕРШЁН': 's-blue'
    }

    const {day, time} = DateFormater(beautiful_time_start)

    return (
        <div className="toc-item-res">
            <div className="tocir-num">{++ind}</div>
            <div className="tocir-name">{name}</div>
            <div className="tocir-results">{score === null ? '---' : score}</div>
            <div className="torir-time">
                <div className="global-ico gi-clock"/>
                {day}
                <br/>
                {time}
            </div>
            <div className="torir-status">
                {    // @ts-ignore
                    <span className={styles[status]}>{status}</span>
                }
            </div>
        </div>
    )
}

export default GameItem
