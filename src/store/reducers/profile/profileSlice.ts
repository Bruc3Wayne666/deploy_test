import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getProfile } from './profileActions'

interface IProfileState {
    error: boolean,
    message: null | string,
    login: null | string,
    result: {
        balance: string,
        bid_history: string[][],
        id: string,
        login: string
    } | null
}

const initialState: IProfileState = {
    error: false,
    message: null,
    result: null,
    login: null
}

export interface ProfilePayloadType {
    error: boolean,
    message: null | string,
    result: {
        balance: string,
        bid_history: string[][],
        id: string,
        login: string
    } | null,
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: {
        // [login.pending.type]: state => {
        // 	state.
        // }
        [getProfile.fulfilled.type]: (state, action: PayloadAction<ProfilePayloadType>) => {
            state.error = false
            state.result = action.payload.result
        },
        [getProfile.rejected.type]: (state, action: PayloadAction<ProfilePayloadType>) => {
            state.error = action.payload.error
        },
    },
})

export const profileActions = profileSlice.actions
export default profileSlice.reducer
