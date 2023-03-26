import React, {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {getCountries} from "../../../../store/entities/countries/countryAction";
import {COUNTRIES} from "../../../../assets/consts";

const FilterCountry: FC<any> = ({handleChangeParams, params}) => {
    const {countries} = useAppSelector(state => state.countryReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch])

    return (
        <div id="filter-contry">
            {
                Object.keys(countries)
                    .map(sport => {
                        if (sport === params.sport_name) {
                            return Object.keys(countries[params.sport_name])
                                .map(co => {
                                    return (
                                        <div
                                            onClick={() => handleChangeParams({...params, country: co})}
                                            className={`one-contry-f ${params.country === co && 'active'}`}
                                        >
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    flexDirection: "column",
                                                    justifyContent: "space-between"
                                                }}
                                            >
                                                <img
                                                    src={COUNTRIES[co].svg_url}
                                                    height={16}
                                                    alt=''
                                                    style={{marginBottom: 6}}
                                                />
                                                {
                                                    COUNTRIES[co].ru_name !== ''
                                                        ? `${COUNTRIES[co].ru_name}`
                                                        : 'Мировые события'
                                                        // : `${co.toUpperCase()}`
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                        }
                    })
            }
        </div>
    )
}

export default FilterCountry
