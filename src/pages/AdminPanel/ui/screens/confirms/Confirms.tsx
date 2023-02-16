import React, {FC, useEffect, useState} from 'react';
import {setSession} from "store/entities/auth/authSlice";
import {useAppDispatch, useAppSelector} from "hooks/redux";
import {instance} from "api";

const Confirms = () => {
    const dispatch = useAppDispatch()
    const [confList, setConfList] = useState([])
    const {session} = useAppSelector(state => state.authReducer)
    const [isLoading, setIsLoading] = useState(false)


    const confirmGame = async (score: string, id: number) => {
        instance.post('adm_confirmation_game', {
            id,
            score
        }).then(() => alert(`Подтверждён счёт (${score})`))
    }

    const getConfList = async () => {
        const {data} = await instance.post('adm_list_games',
            {
                user_id: session,
            }
        )
        if (data === 'session is not active') {
            alert('Сессия истекла')
            return dispatch(setSession(''))
        }
        setConfList(data.result)
        setIsLoading(false)
    }

    useEffect(() => {
        setIsLoading(true)
        getConfList()
    }, [])

    if (isLoading) return <img style={{margin: 'auto'}} src={require('../../../../../assets/spinner.svg').default}
                               alt='' width={100} height={100}/>

    return (
        <>
            <div className="columns">
                <div className='column'>ID</div>
                <div className='column'>Название</div>
                <div className='column'>Счёт</div>
            </div>
            <div className="payouts">
                {
                    confList
                        .map(conf => <ConfItem
                            conf={conf}
                            confirmGame={confirmGame}
                        />)
                }
            </div>
        </>
    );
};

interface ConfItemProps {
    conf: {
        id: number
        name: string
        score: string
    },
    confirmGame: (v: string, id: number) => void
}


const ConfItem: FC<ConfItemProps> = ({conf, confirmGame}) => {
    const [toChange, setToChange] = useState(false)
    const [score, setScore] = useState({
        t1: '',
        t2: ''
    })

    return (
        <div className='payout'>
            <div className="column">{conf.id}</div>
            <div className="column">{conf.name}</div>
            <div className="column">
                {conf.score}
                <button
                    style={{
                        cursor: 'pointer',
                        marginLeft: 60,
                        marginRight: 12,
                        fontSize: 12,
                        backgroundColor: 'green',
                        border: 'none',
                        borderRadius: 8
                    }}
                    onClick={() => {
                        if (score.t1 !== '' && score.t2 !== '') {
                            confirmGame(`${score.t1}-${score.t2}`, conf.id)
                        } else if (score.t1 === '' && score.t2 === '') {
                            confirmGame(conf.score, conf.id)
                        } else {
                            alert('Неправильно введён счёт')
                        }
                        setToChange(false)
                        setScore({t1: '', t2: ''})
                    }}>Подтвердить
                </button>
                {
                    toChange
                        ? <button
                            style={{
                                cursor: 'pointer',
                                fontSize: 12,
                                backgroundColor: 'red',
                                border: 'none',
                                borderRadius: 8
                            }}
                            onClick={() => {
                                setScore({t1: '', t2: ''})
                                setToChange(false)
                            }}
                        >
                            Отмена
                        </button>
                        : <button
                            style={{
                                cursor: 'pointer',
                                fontSize: 12,
                                backgroundColor: 'yellow',
                                color: 'black',
                                border: 'none',
                                borderRadius: 8
                            }}
                            onClick={() => setToChange(true)}>Изменить</button>
                }
                {
                    toChange &&
                    <div style={{display: 'flex'}}>
                        <input
                            style={{
                                width: 60,
                                borderRadius: 8,
                                border: '2px solid green',
                                backgroundColor: 'transparent'
                            }}
                            onChange={e => setScore({...score, t1: e.target.value})} value={score.t1} type="number"/>
                        <h3>-</h3>
                        <input
                            style={{
                                width: 60,
                                borderRadius: 8,
                                border: '2px solid green',
                                backgroundColor: 'transparent'
                            }}
                            onChange={e => setScore({...score, t2: e.target.value})} value={score.t2} type="number"/>
                    </div>
                }
            </div>
        </div>
    )
}

export default Confirms;
