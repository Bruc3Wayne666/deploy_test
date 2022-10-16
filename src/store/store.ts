import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authReducer from "./reducers/auth/authSlice"
import profileReducer from "./reducers/profile/profileSlice"
import gameReducer from "./reducers/games/gameSlice"

const rootReducer = combineReducers({
	authReducer,
	profileReducer,
	gameReducer
})

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
	})
}

export type RootStateType = ReturnType<typeof rootReducer>
export type AppStoreType = ReturnType<typeof setupStore>
export type AppDispatchType = AppStoreType['dispatch']
