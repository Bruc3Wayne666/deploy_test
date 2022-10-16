import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApiService} from "../../../api";

export const getGames = createAsyncThunk(
    'profile/getProfile',
    async (
        {
            sport_name,
            time,
            quotes,
            country
         }: {
            sport_name: string,
            time: string,
            quotes: string,
            country: string
        },
        {rejectWithValue}
    ) => {
        try {
            return await ApiService.getGames({
                sport_name,
                time,
                quotes,
                country
            })
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)
