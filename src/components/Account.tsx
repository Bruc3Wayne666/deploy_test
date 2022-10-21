import React, {FC, useEffect, useState} from 'react';
import '../index.css'
import {Link} from "react-router-dom";
import RightBar from "./RightBar";
import LeftBar from "./LeftBar";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getProfile} from "../store/reducers/profile/profileActions";
import {IProfileState} from '../store/reducers/profile/profileSlice';
import {ApiService} from "../api";


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
                    <h3>[Доделать]</h3>
                    <div id="lk-lk-menu-title">Любимые лиги</div>
                    <Link className="lkm-item" to="/">Росси. Премьер лига</Link>
                    <Link className="lkm-item" to="/">Росси. Премьер лига</Link>
                    <Link className="lkm-item" to="/">Росси. Премьер лига</Link>
                    <Link className="lkm-item" to="/">Росси. Премьер лига</Link>
                    <Link className="lkm-item" to="/">Росси. Премьер лига</Link>
                    <Link className="lkm-item" to="/">Росси. Премьер лига</Link>
                </div>
                <div id="lk-lk-bttn-fast">Быстрая ставка</div>
            </div>
        </div>
    )
}

const Account: FC<any> = ({children}) => {
    // const { error, message, result } = useAppSelector(state => state.profileReducer)
    const [{result}, setUserInfo] = useState<IProfileState>({
        error: false,
        message: null,
        result: null,
    })
    const {session} = useAppSelector(state => state.authReducer)
    // const dispatch = useAppDispatch()


    useEffect(()  => {
        const fetchUserInfo = async (session: string) => {
            const data = await ApiService.getProfile(session)
            setUserInfo(data)
        }
        if (session){
            fetchUserInfo(session)
        }
    }, [])
    // useEffect(() => {
    //     if (session) {
    //         dispatch(getProfile({session}))
    //     }
    // }, [session])

    return (
        <div id="content-wr">
            <LeftBar/>
            <Profile
                result={result}
            />
            <RightBar/>
        </div>
    );
};

export default Account;
