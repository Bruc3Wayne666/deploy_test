import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApiService} from "../../../api";

export const getProfile = createAsyncThunk(
    'profile/getProfile',
    async (
        {session}: { session: string },
        {rejectWithValue}
    ) => {
        try {
            return await ApiService.getProfile(session)
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)
