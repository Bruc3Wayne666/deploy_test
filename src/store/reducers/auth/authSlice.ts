import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { login } from './authAction'

interface IAuthState {
	userId: string | null
	error: string
}

const initialState: IAuthState = {
	userId: '',
	error: '',
}

export interface AuthPayloadType {
	userId: string
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout(state) {
			state.userId = null
		},
	},
	extraReducers: {
		// [login.pending.type]: state => {
		// 	state.
		// }
		[login.fulfilled.type]: (state, action: PayloadAction<AuthPayloadType>) => {
			state.error = ''
			state.userId = action.payload.userId
		},
		[login.rejected.type]: (state, action: PayloadAction<string>) => {
			state.error = action.payload
		},
	},
})

export const authActions = authSlice.actions
export default authSlice.reducer
