import React, {FC, useEffect, useState} from 'react';
import {RightBar} from "widgets/RightBar/ui/RightBar";
import {LeftBar} from "widgets/LeftBar/ui/LeftBar";
import {useAppDispatch, useAppSelector} from "hooks/redux";
import axios from "axios";
import {BidsFilterDropDown} from "shared/ui/CustomDropdown/CustomDropdown";
import {logout} from "store/entities/auth/authSlice";


interface IBetsProps {
    handleChangeType: (value: string) => void;
    handleChangePeriod: (value: string) => void;
    bets: any;
    period: string;
}


const Bets: FC<IBetsProps> = ({handleChangeType, handleChangePeriod, bets, period}) => {
    const period_opts = [
        {value: 'all', label: 'Показать все', className: 'frb-one-opt'},
        {value: 'hour', label: 'Показать за последний час', className: 'frb-one-opt'},
        {value: 'today', label: 'Показать за сегодня', className: 'frb-one-opt'},
        {value: 'week', label: 'Показать за последнюю неделю', className: 'frb-one-opt'},
        {value: 'month', label: 'Показать за последний месяц', className: 'frb-one-opt'},
    ]
    const res = {
        'undefined': {
            name: 'Не рассчитано',
            style: '#CD7F32'
        },
        'win': {
            name: 'Выиграно',
            style: '#50C878'
        },
        'lose': {
            name: 'Проигрыш',
            style: 'red'
        }
    }
    const [showDropdown, setShowDropdown] = useState(false)
    return (
        <div id="lk-mid">
            <div className="lk-table">
                <div className="lkt-filter">
                    <div className="lktf-bttns">
                        <div onClick={() => handleChangeType('bets')}
                             className="lktfb-one">Пари
                        </div>
                        <div onClick={() => handleChangeType('operations')}
                             className="lktfb-one">Операции
                        </div>
                    </div>
                    <div className="lktf-shedule">
                        <div className="lktfs-bttn" style={{display: 'flex', justifyContent: 'center'}}>
                            <div className="global-ico gi-shedule"/>

                            <BidsFilterDropDown
                                title={'Все события'}
                                showDropdown={showDropdown}
                                setShowDropdown={setShowDropdown}
                                items={period_opts}
                                handleChangePeriod={handleChangePeriod}
                                period={period}
                            />

                        </div>
                    </div>
                </div>
                <div className="lkt-row lktr-title">
                    <div className="lktr-date">Дата</div>
                    <div className="lktr-time">Время</div>
                    <div className="lktr-name">Название события</div>
                    <div className="lktr-type">Тип пари</div>
                    <div className="lktr-pari-name">Название пари</div>
                    <div className="lktr-sum">Сумма</div>
                    <div className="lktr-kf">Коэффициент</div>
                    <div className="lktr-result">Реультат</div>
                </div>

                {
                    bets && bets.length !== 0
                        ? bets.map((bid: any) => (
                            <div className="lkt-row">
                                <div className="lktr-date">{bid[6].split(' ')[0]}</div>
                                <div className="lktr-time">{bid[6].split(' ')[1]}</div>
                                <div className="lktr-name">
                                    {
                                        bid[0].split(' VS ')[0]
                                    }
                                    <br/>
                                    {
                                        bid[0].split(' VS ')[1]
                                    }
                                </div>
                                <div className="lktr-type">
                                    {
                                        bid[1] === 'Исход матча(основное время)'
                                            ? 'Исход' : 'Тотал'
                                    }
                                </div>
                                <div className="lktr-pari-name">{bid[2]}</div>
                                <div className="lktr-sum">{bid[3]}
                                    <div className="global-ico gi-coin"/>
                                </div>
                                <div className="lktr-kf">{bid[4]}</div>
                                <div
                                    style={{
                                        padding: 4,
                                        //@ts-ignore
                                        backgroundColor: res[bid[5]].style,
                                        borderRadius: 6,
                                        textAlign: 'center'
                                    }}
                                    className="lktr-result">{
                                    //@ts-ignore
                                    res[bid[5]].name
                                }
                                </div>
                            </div>
                        ))
                        : <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            paddingTop: 100

                        }}>
                            <img
                                width={200}
                                height={200}
                                src={require('../../../assets/svg/unfounded.svg').default}
                                alt="-_-"
                            />
                            <h3 style={{color: '#888', marginTop: 20}}>Не найдено ставок по вашим
                                критериям</h3>
                        </div>
                }
            </div>
        </div>
    )
}

const Operations: FC<IBetsProps> = ({handleChangeType, handleChangePeriod, bets}) => {
    console.log(bets)
    return (
        <div id="lk-mid">
            <div className="lk-table">
                <div className="lkt-filter">
                    <div className="lktf-bttns">
                        <div onClick={() => handleChangeType('bets')}
                             className="lktfb-one">Пари
                        </div>
                        <div onClick={() => handleChangeType('operations')}
                             className="lktfb-one">Операции
                        </div>
                    </div>
                    <div className="lktf-shedule">
                        <div className="lktfs-bttn">
                            <div className="global-ico gi-shedule"/>
                            <span>Показать за неделю</span>
                            <div className="global-ico gi-arrow-bot-g"/>
                        </div>
                    </div>
                </div>
                <div className="lkt-row lktr-title">
                    <div className="lktr-date">Дата</div>
                    <div className="lktr-time">Время</div>
                    <div className="lktr-type">Операция</div>
                    <div className="lktr-sum">Сумма</div>
                    <div className="lktr-result">Остаток</div>
                </div>
                <h1>[soon]</h1>
            </div>
        </div>
    )
}

export const BetsScreen: FC<any> = (props: any) => {
    const {session} = useAppSelector(state => state.authReducer)
    const [bets, setBets] = useState([])
    const [period, setPeriod] = useState('all')
    const [type, setType] = useState('bets')
    const dispatch = useAppDispatch()

    useEffect(() => {
        const fetchBets = async () => {
            const {data} = await axios.post(`${process.env.REACT_APP_BASE_URL}/bid_history`, {
                period,
                user_id: session
            })
            if (data === 'session is not active') {
                dispatch(logout())
                alert('Сессия истекла. Авторизуйтесь заново')
                return window.location.href = '/profile'
            }
            setBets(data)
        }
        fetchBets()
        window.scrollTo(0, 0)
    }, [period])

    const handleChangeType = (value: string) => {
        setType(value)
    }

    const handleChangePeriod = (value: string) => {
        setPeriod(value)
    }

    return (
        <div id="content-wr">
            <LeftBar active={type}/>

            {type === 'bets' && <Bets
                handleChangeType={handleChangeType}
                handleChangePeriod={handleChangePeriod}
                bets={bets}
                period={period}
            />}
            {type === 'operations' && <Operations
                handleChangeType={handleChangeType}
                handleChangePeriod={handleChangePeriod}
                bets={bets}
                period={period}
            />}
            <RightBar/>
        </div>
    );
};
