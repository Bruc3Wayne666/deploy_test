import React, {FC} from "react";

export interface FilterCaseProps {
    sport: string
    showParam: string
    handleChangeShowParam: (value: string) => void
    isToday: boolean
    handleChangeIsToday: (value: boolean) => void
    handleChangeParams: (props: ChangeParams) => void
    params: ParamsType
}

export interface ChangeParams {
    sport_name: string,
    quotes: string,
    country: string,
    league_id: string,
    days: number,
    one_day: number,
    sort_number: boolean
    beautiful_time_start: {
        date: string,
        hours: string
    },
    search: string,
    pic: number
}

export interface ParamsType {
    sport_name: string,
    quotes: string,
    country: string,
    league_id: string,
    days: number,
    one_day: number,
    sort_number: boolean,
    beautiful_time_start: {
        date: string,
        hours: string
    },
    search: string,
    pic: number
}

const FilterCase: FC<FilterCaseProps> = props => {
    const {
        sport,
        showParam,
        handleChangeShowParam,
        isToday,
        handleChangeIsToday
    } = props

    const sports = {
        'soccer': 'Футбол',
        'icehockey': 'Хоккей',
        'basketball': 'Баскетбол',
    }

    return (
        <div className="filter-name-cases">
            <div className="fl-name">
                <div className="global-ico gi-star"/>
                <div className="global-ico gi-football"/>
                <span>
                    {
                        //@ts-ignore
                        sports[sport] || 'Все игры'
                    }
                </span>
            </div>
            <div className="fr-ticks">
                <div className='check-circle'>
                    <input type="checkbox" checked={isToday} onChange={() => {
                        isToday ? handleChangeIsToday(false) : handleChangeIsToday(true)
                    }}/>
                    <p>Игры сегодня</p>
                </div>
            </div>
            <div className="fl-cases">
                <div
                    onClick={() => handleChangeShowParam('Исход матча(основное время)')}
                    className={`one-fl-case ${showParam !== 'ТОТАЛ' && 'active'}`}>
                    <span>Исходы</span>
                </div>
                <div
                    onClick={() => handleChangeShowParam('ТОТАЛ')}
                    className={`one-fl-case ${showParam === 'ТОТАЛ' && 'active'}`}>
                    <span>Тоталы</span>
                </div>
            </div>
        </div>
    )
}

export default FilterCase
