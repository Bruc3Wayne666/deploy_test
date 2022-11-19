import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {IGame} from "../../../models/IGame";
import {getGames} from "./gameActions";

interface IGameState {
    error: boolean,
    result: {
        country: {
            ru?: { // переделать чтобы несколько стран было (enum)
                basketball?: {
                    end: IGame[],
                    live: IGame[],
                    "not started": IGame[]
                },
                icehockey?: {
                end: IGame[],
                live: IGame[],
                "not started": IGame[]
                },
                soccer?: {
                    end: IGame[],
                    live: IGame[],
                    "not started": IGame[]
                }
            }
        }
    } | null | 0
}

const initialState: IGameState = {
    error: false,
    result: null
}

export interface GamePayloadType {
    error: boolean,
    result: {
        country: any
            // {
            // ru?: { // переделать чтобы несколько стран было (enum)
            //     basketball?: {
            //         end: IGame[],
            //         live: IGame[],
            //         "not started": IGame[]
            //     }
            // },
            // gb?: { // переделать чтобы несколько стран было (enum)
            // basketball?: {
            //     end: IGame[],
            //     live: IGame[],
            //     "not started": IGame[]
            // }
        // }
        } | null
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {},
    extraReducers: {
        // [login.pending.type]: state => {
        // 	state.
        // }
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
