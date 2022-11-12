import React, {FC, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {IProfileState} from "../store/reducers/profile/profileSlice";
import {ApiService} from "../api";
import axios from "axios";
import {useAppSelector} from "../hooks/redux";
import {login} from "../store/reducers/auth/authActions";

export const RightBar: FC = () => {
    const [{result}, setUserInfo] = useState<IProfileState>({
        error: false,
        message: null,
        result: null,
    })
    const {session} = useAppSelector(state => state.authReducer)


    useEffect(() => {
        const fetchUserInfo = async (session: string) => {
            const data = await ApiService.getProfile(session)
            setUserInfo(data)
        }
        if (session) {
            fetchUserInfo(session)
        }
    }, [])

    return (
        <div id="lk-right">
            <div className="lkr-widget">
                <div className="lkrw-title">Рассылки и уведомления</div>
                <div className="lkrw-inforow active">
                    <div className="lkrwir-text"><span>Email:</span> user_mail@mail.ru</div>
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
                    <img src={require('../assets/images/stavki-cyber.png')} alt={''}/>
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


    useEffect(() => {
        const fetchUserInfo = async (session: string) => {
            const data = await ApiService.getProfile(session)
            setUserInfo(data)
        }
        if (session) {
            fetchUserInfo(session)
        }
    }, [])

    return (
        <div id="lk-right" className="m">
            <div className="lkr-widget">
                <div className="lkrw-title">Рассылки и уведомления</div>
                <div className="lkrw-inforow active">
                    <div className="lkrwir-text"><span>Email:</span> user_mail@mail.ru</div>
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
                    <img src={require('../assets/images/stavki-cyber.png')} alt={''}/>
                </Link>
            </div>
        </div>
    );
};
