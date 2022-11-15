import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getProfile } from './profileActions'

export interface IProfileState {
    error: boolean,
    message: null | string,
    // login: null | string,
    result: {
        balance: string,
        login: string,
        rassilka: number
    } | null
}

const initialState: IProfileState = {
    error: false,
    message: null,
    result: null,
    // login: null
}

export interface ProfilePayloadType {
    error: boolean,
    message: null | string,
    result: {
        balance: string,
        login: string,
        rassilka: number
    } | null,
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        clear(state){
            state.error = false
            state.message = null
            state.result = null
            // state.result = null
        }
    },
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

export const {clear} = profileSlice.actions
export default profileSlice.reducer
