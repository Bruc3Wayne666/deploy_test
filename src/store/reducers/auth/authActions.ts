import { ApiService } from './../../../api/index'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const login = createAsyncThunk(
	'auth/login',
	async (
		{ login, password, remember }: { login: string; password: string, remember: boolean },
		{ rejectWithValue }
	) => {
		try {
			const data = await ApiService.login(login, password)
			if (data && remember) {
				localStorage.setItem('login', login)
				localStorage.setItem('password', password)
				localStorage.setItem('isAuth', String(true))
			}
			return data
		} catch (e) {
			return rejectWithValue(e)
		}
	}
)

export const register = createAsyncThunk(
	'auth/register',
	async (
		{ login, password, remember }: { login: string; password: string, remember: boolean },
		{ rejectWithValue }
	) => {
		try {
			const data = await ApiService.register(login, password)
			if (data && remember) {
				localStorage.setItem('login', login)
				localStorage.setItem('password', password)
				localStorage.setItem('isAuth', String(true))
			}
			return data
		} catch (e) {
			return rejectWithValue(e)
		}
	}
)
