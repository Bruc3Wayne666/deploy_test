import React, {FC, useEffect, useState} from 'react';
import axios from "axios";
import {setSession} from "store/entities/auth/authSlice";
import {useAppDispatch, useAppSelector} from "hooks/redux";
import {instance} from "api";

const Games = () => {
    const dispatch = useAppDispatch()
    const [gamesInfo, setGamesInfo] = useState([])
    const {session} = useAppSelector(state => state.authReducer)

    const getGamesInfo = async () => {
        const {data} = await instance.post('games_info_a',
            {
                user_id: session,
            }
        )
        if (data === 'session is not active') {
            alert('Сессия истекла')
            return dispatch(setSession(''))
        }
        setGamesInfo(data.games)
    }

    useEffect(() => {
        getGamesInfo()
    }, [session])

    return (
        <>
            <div className="columns">
                <div className='column'>ID</div>
                <div className='column'>Название</div>
                <div className='column'>Статус</div>
                <div className='column'>Счёт</div>
                <div className='column'>Прибыль с мат</div>
            </div>
            <div className="payouts">
                {
                    gamesInfo
                        .map(game => <GameItem game={game}/>)
                }
            </div>
        </>
    );
};

interface GameItemProps {
    game: {
        id: number
        name: string
        profit: number
        status: string,
        score: string
    }
}

const GameItem: FC<GameItemProps> = ({game}) => {
    const {
        id,
        name,
        profit,
        status,
        score
    } = game

    const statuses = {
        'live': 'LIVE',
        'not started': 'Не начался',
        'end': 'Завершён'
    }

    return (
        <div className='payout'>
            <div className="column">{id}</div>
            <div className="column">{name}</div>
            <div className={`column ${status}`}>
                <span>
                    {
                        // @ts-ignore
                        statuses[status]
                    }
                </span>
            </div>
            <div className="column">{score}</div>
            <div className="column">{profit}</div>
        </div>
    )
}

export default Games;
