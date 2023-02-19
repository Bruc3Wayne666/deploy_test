import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IGame} from "../../../models/IGame";
import {getGames} from "./gameActions";


export interface ResultType {
    country: Record<string, Record<string, Record<string, IGame[]>>>
}

interface IGameState {
    error: boolean,
    result: ResultType | null | 0 | number
}

const initialState: IGameState = {
    error: false,
    result: null
}

export interface GamePayloadType {
    error: boolean,
    result: ResultType | null | 0 | number
}


export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {},
    extraReducers: {
        [getGames.fulfilled.type]: (state, action: PayloadAction<GamePayloadType>) => {
            state.error = false
            state.result = action.payload.result
        },
        [getGames.rejected.type]: (state, action: PayloadAction<GamePayloadType>) => {
            state.error = action.payload.error
        },
    },
})

export const profileActions = gameSlice.actions
export default gameSlice.reducer
