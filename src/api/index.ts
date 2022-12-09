import axios from 'axios'
import { AuthPayloadType } from '../store/reducers/auth/authSlice'
import { GamePayloadType } from '../store/reducers/games/gameSlice';
import {ProfilePayloadType} from "../store/reducers/profile/profileSlice";

const instance = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL
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
        email: string
    ): Promise<AuthPayloadType> {
        const {data} = await instance.post('new_user', {
            login: email
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
            sort_number: boolean,
            beautiful_time_start: string,
            search: string
        }
    ): Promise<GamePayloadType> {
        const {data} = await instance.post('game_list', {...params, one_day: -1, days: -1})
        return data
    }

    static async placeBid(
        {user_id, id_kot, sum_bid}: {user_id: string, id_kot: string, sum_bid: string}
    ): Promise<{game_name: string, kf: number, name_kot: string}> {
        const { data } = await instance.post('place_bid', {
            user_id,
            id_kot,
            sum_bid
        })
        return data
    }
}
