import React, {FC, useRef} from "react";
import Dropdown from "react-dropdown";

const ResultFilter: FC<any> = ({handleSearchChange, handleChangeParams, params, search, sportList}) => {
    const events_opts = [
        {value: 'all', label: 'Все события', className: 'frb-one-opt'},
        {value: 'not started', label: 'НЕ НАЧАЛСЯ', className: 'frb-one-opt'},
        {value: 'live', label: 'LIVE', className: 'frb-one-opt'},
        {value: 'end', label: 'ЗАВЕРШЁН', className: 'frb-one-opt'},
    ]
    const dateRef = useRef<HTMLInputElement>(null)
    const timeRef = useRef<HTMLInputElement>(null)

    return (
        <div className="filter-results">
            <div className="fr-bttns">

                <Dropdown options={
                    Object.keys(sportList)
                        .map(sportGame => {
                            return ({
                                value: sportGame,
                                label: sportList[sportGame].ru_name,
                                className: 'frb-one-opt'
                            })
                        })
                }
                          placeholder={'Вид спорта'}
                          controlClassName={'frb-one'}
                          menuClassName={'frb-one-opts'}
                          onChange={e => handleChangeParams({...params, sport_name: e.value})}
                />


                <Dropdown options={events_opts}
                          placeholder={'Все события'}
                          controlClassName={'frb-one'}
                          menuClassName={'frb-one-opts'}
                          onChange={e => handleChangeParams({...params, game_status: e.value})}
                />


                <div className="frb-one"
                     onClick={
                         // @ts-ignore
                         () => dateRef.current.showPicker()
                     }
                >
                    <span>Дата</span>
                    <div className="global-ico gi-arrow-bot"/>
                    <input
                        ref={dateRef}
                        value={params.beautiful_time_start.date}
                        onChange={e => {
                            if (e.target.value === '') {
                                handleChangeParams({
                                    ...params,
                                    beautiful_time_start: {
                                        ...params.beautiful_time_start,
                                        date: '-'
                                    }
                                })
                            } else {
                                handleChangeParams({
                                    ...params,
                                    beautiful_time_start: {
                                        ...params.beautiful_time_start,
                                        date: e.target.value
                                    }
                                })
                            }
                        }}
                        style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            outline: 'none'
                        }}
                        type='date'
                    />
                </div>
                <div className="frb-one"
                     onClick={
                         // @ts-ignore
                         () => timeRef.current.showPicker()
                     }
                >
                    <span>Время</span>
                    <div className="global-ico gi-arrow-bot"/>
                    <input
                        ref={timeRef}
                        value={params.beautiful_time_start.hours}
                        onChange={e => {
                            if (e.target.value === '') {
                                handleChangeParams({
                                    ...params,
                                    beautiful_time_start: {
                                        ...params.beautiful_time_start,
                                        hours: '-'
                                    }
                                })
                            } else {
                                handleChangeParams({
                                    ...params,
                                    beautiful_time_start: {
                                        ...params.beautiful_time_start,
                                        hours: e.target.value
                                    }
                                })
                            }
                        }}
                        style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            outline: 'none'
                        }}
                        type='time'
                    />
                    {
                        params.beautiful_time_start.hours !== '-' &&
                        <button
                            style={{
                                backgroundColor: 'red',
                                border: '1 px solid black',
                                borderRadius: 4,
                                cursor: "pointer"
                            }}
                            onClick={() => handleChangeParams({
                                ...params,
                                beautiful_time_start: {
                                    ...params.beautiful_time_start,
                                    hours: '-'
                                }
                            })}
                        >
                            &times; Очистить
                        </button>
                    }
                </div>
            </div>
            <div className="fr-ticks">
                <div
                    onClick={() => {
                        handleChangeParams({...params, sort_number: !params.sort_number})
                    }}
                    className='frt-circle'
                >
                    <span className={params.sort_number && 'checked'}/>
                    Сортировать по номеру
                </div>
            </div>
            <div className="fr-search">
                <input
                    placeholder={'Поиск'}
                    style={{
                        border: 'none',
                        outline: 'none',
                        backgroundColor: 'transparent',
                    }}
                    onChange={handleSearchChange}
                    type="text"
                    value={search}
                />
            </div>
        </div>
    )
}

export default ResultFilter


