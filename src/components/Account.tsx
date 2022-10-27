import React, {FC, useEffect, useState} from 'react';
import '../index.css'
import {Link} from "react-router-dom";
import RightBar from "./RightBar";
import LeftBar from "./LeftBar";
import {useAppSelector} from "../hooks/redux";
import {IProfileState} from '../store/reducers/profile/profileSlice';
import {ApiService} from "../api";
import spinner from '../assets/spinner.svg'
import axios from "axios";
import {COUNTRIES} from "../assets/consts";


const Profile: FC<any> = (props: any) => {
    return (
        <div id="lk-mid">
            <div id="lk-lk-info">
                <div id="lk-lk-ava-name">
                    <div id="lk-ava">
                        <img src={require('../assets/images/ava.png')} alt={''}/>
                    </div>
                    <div id="lk-name">{props.result?.login}</div>
                </div>
                <div id="lk-lk-bal-stat">
                    <div id="lk-bal">
                        <div>Баланс:</div>
                        <div><span>{props.result?.balance}</span>
                            <div className="global-ico gi-coin-w"/>
                        </div>
                    </div>
                    <div id="lk-stat">
                        <div id="lk-stat-title">Статус профиля</div>
                        <div id="lk-stat-name">Premium</div>
                    </div>
                </div>
            </div>
            <div id="lk-lk-foot">
                <div id="lk-lk-menu">
                    <div id="lk-lk-menu-title">Любимые лиги</div>
                    {
                        props.leagues
                            .map((league: any) => (
                                <Link style={{display: 'flex', alignItems: 'center'}} className="lkm-item" to="/">
                                    <img src={
                                        //@ts-ignore
                                        COUNTRIES[league[1]].svg_url}
                                         alt={league[1]}
                                         height={12}
                                         style={{marginRight: 4}}
                                    />
                                    {
                                    //@ts-ignore
                                    COUNTRIES[league[1]].ru_name}.&nbsp;{league[0]
                                }</Link>
                            ))
                    }
                </div>
                <div id="lk-lk-bttn-fast"><Link to={'/'}>Быстрая ставка</Link></div>
            </div>
        </div>
    )
}

const Account: FC<any> = ({children}) => {
    const [{result}, setUserInfo] = useState<IProfileState>({
        error: false,
        message: null,
        result: null,
    })
    const {session} = useAppSelector(state => state.authReducer)
    const [favoriteLeagues, setFavoriteLeagues] = useState([])
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        setIsLoading(true)
        const fetchUserInfo = async (session: string) => {
            const data = await ApiService.getProfile(session)
            const leagues = await axios.post('http://gpbetapi.ru/favourite_league', {
                user_id: session
            })
            setUserInfo(data)
            setFavoriteLeagues(leagues.data)
            setIsLoading(false)
        }
        if (session) {
            fetchUserInfo(session)
        }
    }, [])

    return (
        <div id="content-wr">
            <LeftBar/>
            {
                isLoading ?
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <img src={spinner} alt="Loading results..."/>
                    </div>
                    :
                    <Profile
                        result={result}
                        leagues={favoriteLeagues}
                    />
            }
            <RightBar/>
        </div>
    );
};

export default Account;
