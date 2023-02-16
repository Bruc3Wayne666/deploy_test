import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApiService} from "api";

export const getCountries = createAsyncThunk(
    'country/get',
    async (_, {rejectWithValue}) => {
        try {
            return await ApiService.getCountriesList()
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)
