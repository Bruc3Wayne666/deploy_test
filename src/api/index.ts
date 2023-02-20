import axios from 'axios'
import {AuthPayloadType} from 'store/entities/auth/authSlice'
import {GamePayloadType} from 'store/entities/games/gameSlice';
import {ProfilePayloadType} from "store/entities/profile/profileSlice";
import {CountriesList} from "../assets/consts";
import {LeagueListType} from "../models/LeagueList";
import {SportList} from "../models/ISport";

export const instance = axios.create({
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
        if (data.error) {
            alert('Такой пользователь уже существует. Если имеются какие-то проблемы, то обратитесть в тех. поддержку.')
        } else {
            alert('Мы выслали пароль на ваш email. Проверьте в разделе СПАМ')
        }
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
            search: string,
            pic?: number
        }
    ): Promise<GamePayloadType> {
        const {data} = await instance.post('game_list', {...params, one_day: -1, days: -1})
        return data
    }

    static async placeBid(
        {user_id, id_kot, sum_bid}: { user_id: string, id_kot: string, sum_bid: string }
    ): Promise<{ game_name: string, kf: number, name_kot: string } | string> {
        const {data} = await instance.post('place_bid', {
            user_id,
            id_kot,
            sum_bid
        })
        return data
    }

    static async getCountriesList(): Promise<CountriesList> {
        const {data} = await instance.get('country')
        return data
    }

    static async getLeagueList(league_sport: string, league_cc: string, status: string): Promise<LeagueListType> {
        const {data} = await instance.post('league_list', {
            league_sport,
            league_cc,
            status
        })
        return data
    }

    static async getSportList(): Promise<SportList> {
        const {data} = await instance.get('sport_list')
        return data
    }

    static async getPossible(id_kot: string, sum_bid: number): Promise<number> {
        const {data} = await instance.post('kf_kot', {
            id_kot,
            sum_bid
        })
        return data
    }

    static async getFavouriteLeague(user_id: string): Promise<any> {
        const {data} = await instance.post('favourite_league', {
            user_id
        })
        return data
    }
}
