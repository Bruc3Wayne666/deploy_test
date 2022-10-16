import { ApiService } from './../../../api/index'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const login = createAsyncThunk(
	'auth/login',
	async (
		{ login, password }: { login: string; password: string },
		{ rejectWithValue }
	) => {
		try {
			return await ApiService.login(login, password)
		} catch (e) {
			return rejectWithValue(e)
		}
	}
)