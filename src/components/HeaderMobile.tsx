import React, {FC, useCallback, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useAppSelector} from "../hooks/redux";
import {IProfileState} from "../store/reducers/profile/profileSlice";
import {ApiService} from "../api";


const HeaderMobile: FC = () => {
    const {session} = useAppSelector(state => state.authReducer)
    const [{result}, setUserInfo] = useState<IProfileState>({
        error: false,
        message: null,
        result: null,
    })

    const fetchUserInfo = useCallback((async (session: string) => {
        return await ApiService.getProfile(session)
    }), [session])


    useEffect(() => {
        if (session) {
            fetchUserInfo(session)
                .then(res => setUserInfo(res))
        }
    }, [session])

    return (
        <div id="mobile-header">
            <div
                style={{
                    width: '50%',
                    height: '100%',
                    borderRight: '1px solid #222',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Link to={'/'}>
                    <img
                        // height={'100%'}
                        src={require('../assets/logo.png')}
                        alt='GPBet'
                    />
                </Link>
            </div>
            <div style={{
                height: '100%',
                backgroundColor: '#C78F30',
                // backgroundColor: '#087537',
                display: 'flex',
                alignItems: 'center',
                paddingRight: 6,
                paddingLeft: 6,
                width: '50%',
                justifyContent: 'center',
                borderLeft: '1px solid #222'
            }}>

                <Link to={'/profile'}>
                    <span style={{color: 'white', fontWeight: 300}}>
                        {session ? result?.login : 'АВТОРИЗАЦИЯ'}
                    </span>
                </Link>
            </div>
        </div>
    )
};

export default HeaderMobile;
