import React, {FC} from "react";
import {IGame} from "models/IGame";
import {DateFormater} from "../../../../shared/lib/dateFormater";

interface GameItemProps {
    ind: number,
    game: IGame
}

const GameItem: FC<GameItemProps> = props => {
    let {ind, game} = props
    const {name, score, beautiful_time_start} = game
    const {time} = DateFormater(beautiful_time_start)

    return (
        <div className="toc-item-res">
            <div className="tocir-num">{++ind}</div>
            <div className="tocir-name">{name}</div>
            <div className="tocir-results">{score}</div>
            <div className="torir-time">
                <div className="global-ico gi-clock"/>
                Начался в
                <br/>
                {time}
            </div>
            <div className="torir-status">
                {
                    <span className={'s-red'}>LIVE</span>
                }
            </div>
        </div>
    )
}

export default GameItem
