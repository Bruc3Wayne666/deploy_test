import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApiService} from "../../../api";

export const getGames = createAsyncThunk(
    'profile/getProfile',
    async (
        {
            sport_name,
            game_status,
            quotes,
            country,
            league_id,
            days,
            one_day,
            sort_number,
            beautiful_time_start,
            search,
            pic
        }: {
            sport_name: string,
            game_status: string,
            quotes: string,
            country: string,
            league_id: string,
            days: number,
            one_day: number,
            sort_number: boolean,
            beautiful_time_start: string,
            search: string,
            pic? : number
        },
        {rejectWithValue}
    ) => {
        try {
            return await ApiService.getGames({
                sport_name,
                game_status,
                quotes,
                country,
                league_id,
                days,
                one_day,
                sort_number,
                beautiful_time_start,
                search,
                pic
            })
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)
