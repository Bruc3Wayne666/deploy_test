import {configureStore, combineReducers} from '@reduxjs/toolkit'
import authReducer from "./entities/auth/authSlice"
import profileReducer from "./entities/profile/profileSlice"
import gameReducer from "./entities/games/gameSlice"
import countryReducer from "./entities/countries/countrySlice"

const rootReducer = combineReducers({
	authReducer,
	profileReducer,
	gameReducer,
	countryReducer
})

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
	})
}

export type RootStateType = ReturnType<typeof rootReducer>
export type AppStoreType = ReturnType<typeof setupStore>
export type AppDispatchType = AppStoreType['dispatch']
