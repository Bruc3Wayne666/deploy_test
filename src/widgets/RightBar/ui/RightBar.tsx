import React, {FC, useCallback, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {IProfileState} from "../../../store/entities/profile/profileSlice";
import {ApiService} from "../../../api";
import axios from "axios";
import {useAppSelector} from "../../../hooks/redux";

export const RightBar: FC = () => {
    const [{result}, setUserInfo] = useState<IProfileState>({
        error: false,
        message: null,
        result: null,
    })
    const {session} = useAppSelector(state => state.authReducer)


    const fetchUserInfo = async (session: string) => {
        return await ApiService.getProfile(session)
    }

    useEffect(() => {
        if (session) {
            fetchUserInfo(session)
                .then(res => setUserInfo(res))
        }
    }, [session])

    const setMailing = useCallback(async () => {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/change_ras`, {user_id: session})
        if (session){
            fetchUserInfo(session)
                .then(res => setUserInfo(res))
        }
    }, [session])

    return (
        <div id="lk-right">
            <div className="lkr-widget">
                <div className="lkrw-title">Рассылки и уведомления</div>
                <div
                    className={`lkrw-inforow ${result?.rassilka === 1 && 'active'}`}
                    onClick={setMailing}
                >
                    <div className="lkrwir-text"><span>Email:</span> {result?.login}</div>
                    <div className="lkrwir-tick-bttn">
                        <div className="lkrwir-bttn"/>
                    </div>
                </div>
            </div>
            <div className="lkr-widget">
                <div className="lkrw-title">Контакты</div>
                <div className="lkrw-inforow">
                    <div className="lkrwir-text"><span>Email:</span> gpbethelp@gmail.com</div>
                </div>
            </div>
            <div className="lkr-widget">
                <div className="lkrw-title">Личные данные</div>
                <div className="lkrw-inforow active">
                    <div className="lkrwir-text"><span>Статус идентификации:</span></div>
                    <div className="global-ico gi-tick"/>
                </div>
                <div className="lkrw-inforow">
                    <div className="lkrwir-text"><span>Email:</span> {result?.login}</div>
                    <div className="global-ico gi-tick"/>
                </div>
            </div>
            <div className="lkr-widget no-border">
                <Link className="lkr-ssilki" to="/">
                    <img src={require('../../../assets/images/stavki-cyber.png')} alt={''}/>
                </Link>
            </div>
        </div>
    );
};


export const RightBarMobile: FC = () => {
    const [{result}, setUserInfo] = useState<IProfileState>({
        error: false,
        message: null,
        result: null,
    })
    const {session} = useAppSelector(state => state.authReducer)

    const fetchUserInfo = async (session: string) => {
        return await ApiService.getProfile(session)
    }

    useEffect(() => {
        if (session) {
            fetchUserInfo(session)
                .then(res => setUserInfo(res))
        }
    }, [session])

    const setMailing = useCallback(async () => {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/change_ras`, {user_id: session})
        if (session){
            fetchUserInfo(session)
                .then(res => setUserInfo(res))
        }
    }, [session])

    return (
        <div id="lk-right" className="m">
            <div className="lkr-widget">
                <div className="lkrw-title">Рассылки и уведомления</div>
                <div
                    className={`lkrw-inforow ${result?.rassilka === 1 && 'active'}`}
                    onClick={setMailing}
                >
                    <div className="lkrwir-text"><span>Email:</span> {result?.login}</div>
                    <div className="lkrwir-tick-bttn">
                        <div className="lkrwir-bttn"/>
                    </div>
                </div>
            </div>
            <div className="lkr-widget">
                <div className="lkrw-title">Контакты</div>
                <div className="lkrw-inforow">
                    <div className="lkrwir-text"><span>Email:</span> gpbethelp@gmail.com</div>
                </div>
            </div>
            <div className="lkr-widget">
                <div className="lkrw-title">Личные данные</div>
                <div className="lkrw-inforow active">
                    <div className="lkrwir-text"><span>Статус идентификации:</span></div>
                    <div className="global-ico gi-tick"/>
                </div>
                <div className="lkrw-inforow">
                    <div className="lkrwir-text"><span>Email:</span> {result?.login}</div>
                    <div className="global-ico gi-tick"/>
                </div>
            </div>
            <div className="lkr-widget no-border">
                <Link className="lkr-ssilki" to="/">
                    <img src={require('../../../assets/images/stavki-cyber.png')} alt={''}/>
                </Link>
            </div>
        </div>
    );
};
