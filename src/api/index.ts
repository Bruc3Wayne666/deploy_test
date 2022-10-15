import axios, {AxiosResponse} from 'axios'
import { AuthPayloadType } from '../store/reducers/auth/authSlice'

const instance = axios.create({
	// baseURL: process.env.BASE_URL,
	baseURL: 'http://gpbetapi.ru',

})

export class ApiService {
	static async login(
		login: string,
		password: string
	): Promise<AuthPayloadType> {
		const { data } = await instance.get('user_check_pass', {
			data: {
				login,
				password
			},
		})
		return data
	}
}
