import React, {FC, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useAppSelector} from "hooks/redux";
import {IProfileState} from "store/entities/profile/profileSlice";
import {ApiService} from "api";


const HeaderMobile: FC = () => {
    const {session} = useAppSelector(state => state.authReducer)
    const [{result}, setUserInfo] = useState<IProfileState>({
        error: false,
        message: null,
        result: null,
    })

    useEffect(() => {
        if (session) {
            ApiService.getProfile(session)
                .then(res => setUserInfo(res))
        }
    }, [session])

    return (
        <div id="mobile-header">
            <div
                style={{
                    width: '50%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Link to={'/'}>
                    <img
                        src={require('../../../../assets/logo.png')}
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
            }}>

                <Link to={'/profile'}>
                    <span style={{color: 'white', fontWeight: 300}}>
                        {session ? 'МОЙ ПРОФИЛЬ' : 'АВТОРИЗАЦИЯ'}
                    </span>
                </Link>
            </div>
        </div>
    )
};

export default HeaderMobile;
