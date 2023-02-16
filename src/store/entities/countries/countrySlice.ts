import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {CountriesList} from "../../../assets/consts";
import {getCountries} from "./countryAction";

interface ICountriesListState {
    countries: CountriesList
}

const initialState:ICountriesListState = {
    countries: {}
}

export interface CountriesPayloadType extends CountriesList {}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: {
        [getCountries.fulfilled.type]: (state, action: PayloadAction<CountriesPayloadType>) => {
            state.countries = action.payload
        }
    },
})

export default authSlice.reducer
