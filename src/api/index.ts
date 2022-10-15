import axios, {AxiosResponse} from 'axios'
import { AuthPayloadType } from '../store/reducers/auth/authSlice'
import {ProfilePayloadType} from "../store/reducers/profile/profileSlice";

const instance = axios.create({
	// baseURL: process.env.BASE_URL,
	baseURL: 'http://gpbetapi.ru',

})

export class ApiService {

    static async login(
        login: string,
        password: string
    ): Promise<AuthPayloadType> {
        const {data} = await instance.get('user_check_pass', {
            data: {
                login,
                password
            },
        })
        return data
    }

    static async getProfile(
        session: string
    ): Promise<ProfilePayloadType> {
        const {data} = await instance.get('user_info', {
            data: {user_id: session}
        })
        return data
    }
}
