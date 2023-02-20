import React, {FC} from "react";
import Dropdown from "react-dropdown";

const Filter: FC<any> = ({handleSearchChange, handleChangeParams, params, search, sportList}) => {
    return (
        <div className="filter-results">
            <div className="fr-bttns">

                <Dropdown options={
                    Object.keys(sportList)
                        .map(sportGame => {
                            return ({
                                value: sportGame,
                                label: sportList[sportGame].ru_name,
                                className: 'frb-one-opt2'
                            })
                        })
                }
                          placeholder={'Вид спорта'}
                          controlClassName={'frb-one-f'}
                          menuClassName={'frb-one-opts2'}
                          onChange={e => handleChangeParams({...params, sport_name: e.value})}
                />

            </div>
            <div className="fr-ticks">
                <div
                    onClick={() => {
                        console.log(2)
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

export default Filter
