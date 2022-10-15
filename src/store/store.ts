import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authReducer from "./reducers/auth/authSlice"

const rootReducer = combineReducers({
	authReducer,
})

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
	})
}

export type RootStateType = ReturnType<typeof rootReducer>
export type AppStoreType = ReturnType<typeof setupStore>
export type AppDispatchType = AppStoreType['dispatch']
