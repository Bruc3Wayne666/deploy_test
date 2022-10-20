import axios from 'axios'
import { AuthPayloadType } from '../store/reducers/auth/authSlice'
import { GamePayloadType } from '../store/reducers/games/gameSlice';
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
        const {data} = await instance.post('user_check_pass', {
                login,
                password
        })
        return data
    }

    static async register(
        login: string,
        password: string
    ): Promise<AuthPayloadType> {
        const {data} = await instance.post('new_user', {
            login,
            password
        })
        return data
    }

    static async getProfile(
        session: string
    ): Promise<ProfilePayloadType> {
        const {data} = await instance.post('user_info', {
            user_id: session
        })
        return data
    }


    static async getGames(
        params: {
            sport_name: string,
            game_status: string,
            quotes: string,
            country: string,
            league_id: string,
            days: number,
            one_day: number,
            sort_number: boolean
        }
    ): Promise<GamePayloadType> {
        const {data} = await instance.post('game_list', params)
        return data
    }
}
