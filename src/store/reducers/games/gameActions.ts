import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApiService} from "../../../api";

export const getGames = createAsyncThunk(
    'profile/getProfile',
    async (
        {
            sport_name,
            time,
            quotes,
            country,
            league_id
        }: {
            sport_name: string,
            time: string,
            quotes: string,
            country: string,
            league_id: string
        },
        {rejectWithValue}
    ) => {
        try {
            return await ApiService.getGames({
                sport_name,
                time,
                quotes,
                country,
                league_id
            })
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)
