import React, {FC, useCallback, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useAppSelector} from "../hooks/redux";
import {IProfileState} from "../store/reducers/profile/profileSlice";
import {ApiService} from "../api";


// const Btn: FC = () => {
//     return (
//         <div style={{display: 'flex', flexDirection: 'column', marginRight: 14}}>
//             <div style={{
//                 width: 24, height: 5, backgroundColor: 'white', margin: 2
//             }}></div>
//             <div style={{
//                 width: 24, height: 5, backgroundColor: 'white', margin: 2
//             }}></div>
//             <div style={{
//                 width: 24, height: 5, backgroundColor: 'white', margin: 2
//             }}></div>
//         </div>
//     )
// }

const HeaderMobile: FC = () => {
    // const [show, setShow] = useState(false)
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
                    style={{height: '100%'}}
                >
                    <Link to={'/'}>
                    <img
                        height={'100%'}
                        src={require('../assets/logo.png')}
                        alt='GPBet'
                    />
                    </Link>
                </div>
            <div>
                <Link to={'/profile'}>
                    <span style={{color: '#222', fontWeight: 600}}>
                        {session ? result?.login : 'АВТОРИЗАЦИЯ'}
                    </span>
                </Link>
            </div>
        </div>
    )
};

export default HeaderMobile;
