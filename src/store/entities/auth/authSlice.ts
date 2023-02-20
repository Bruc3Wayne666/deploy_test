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
			localStorage.removeItem('isAuth')
			localStorage.removeItem('session')
			localStorage.clear()
			state.error = ''
			state.session = ''
		},
		setSession(state, action: PayloadAction<string>) {
			state.error = ''
			state.session = action.payload
		}
	},
	extraReducers: {
		[login.fulfilled.type]: (state, action: PayloadAction<AuthPayloadType>) => {
			state.error = ''
			state.session = action.payload.user_id
		},
		[login.rejected.type]: (state, action: PayloadAction<string>) => {
			state.error = action.payload
		}
	},
})

export const {logout, setSession} = authSlice.actions
export default authSlice.reducer
