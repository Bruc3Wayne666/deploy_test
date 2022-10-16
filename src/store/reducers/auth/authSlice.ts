import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { login } from './authActions'

interface IAuthState {
	session: string | null
	error: string
}

const initialState: IAuthState = {
	session: '',
	error: '',
}

export interface AuthPayloadType {
	user_id: string
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout(state) {
			state.session = null
		},
	},
	extraReducers: {
		// [login.pending.type]: state => {
		// 	state.
		// }
		[login.fulfilled.type]: (state, action: PayloadAction<AuthPayloadType>) => {
			state.error = ''
			state.session = action.payload.user_id
		},
		[login.rejected.type]: (state, action: PayloadAction<string>) => {
			state.error = action.payload
		},
	},
})

export const authActions = authSlice.actions
export default authSlice.reducer
