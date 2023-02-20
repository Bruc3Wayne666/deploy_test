import React, {FC, useCallback, useEffect, useState} from 'react';
import 'app/styles/index.css'
import {Link} from "react-router-dom";
import {RightBar, RightBarMobile} from "widgets/RightBar/ui/RightBar";
import {LeftBar, LeftBarMobile} from "widgets/LeftBar/ui/LeftBar";
import {useAppDispatch, useAppSelector} from "hooks/redux";
import {IProfileState} from 'store/entities/profile/profileSlice';
import {ApiService} from "api";
import spinner from 'assets/spinner.svg'
import {COUNTRIES} from "assets/consts";
import {logout} from "store/entities/auth/authSlice";


const status = {
    'beginer': {
        background: 'linear-gradient(123deg, rgba(0,0,0,1) 0%, rgba(61, 61, 61, 1) 25%, rgba(122,122,122,0.5) 50%, rgba(0,0,0,1) 75%, rgba(0,0,0,1) 100%',
        color: 'white'
    },
    'start': {
        background: 'linear-gradient(-72deg, #dedede, #ffffff 16%,#dedede 21%, #ffffff 24%,#ffffff 27%, #dedede 36%, #ffffff 45%, #ffffff 60%, #dedede 72%,#ffffff 80%,#dedede 84%,#a1a1a1)',
        color: '#cc3b39'
    },
    'medium': {
        background: 'radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%), radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%)',
        color: 'white'
    },
    'master': {
        background: 'linear-gradient(137deg, rgba(244,80,23,0.9), rgba(11,14,89,0.9))',
        color: 'white'
    }
}

interface ProfileProps {
    result: {
        balance: string,
        login: string,
        rassilka: number,
        rank: string
    } | null,
    leagues: string[]
}

const Profile: FC<ProfileProps> = props => {
    const {result} = props

    return (
        <div id="lk-mid">
            <div id="lk-lk-info">
                <div id="lk-lk-ava-name">
                    <div id="lk-ava">
                        <img src={require('../../../assets/images/ava.png')} alt={''}/>
                    </div>
                    <div id="lk-name">{result?.login}</div>
                </div>
                <div id="lk-lk-bal-stat">
                    <div id="lk-bal">
                        <div>Баланс:</div>
                        <Link
                            to={'/purchase'}
                            style={{display: 'flex', alignItems: 'center'}}
                        >
                            <span
                                style={{display: 'block'}}
                            >
                                {result?.balance}
                            </span>
                            <div className="global-ico gi-coin-w"/>
                        </Link>
                    </div>
                    <div id="lk-stat">
                        <div id="lk-stat-title">Статус профиля</div>
                        <div id="lk-stat-name" style={{
                            //@ts-ignore
                            background: result?.rank && status[result.rank].background,
                            //@ts-ignore
                            color: result?.rank && status[result.rank].color
                        }}>
                            {result?.rank}
                        </div>
                    </div>
                </div>
            </div>
            <div id="lk-lk-foot">
                <div id="lk-lk-menu">
                    {
                        props.leagues.length === 0 ?
                            <div id="lk-lk-menu-title">
                                <p style={{marginBottom: 6}}>Нет любимых лиг.</p>
                                <p>Сделайте ставку.</p>
                            </div>
                            :
                            <>
                                <div id="lk-lk-menu-title">Любимые лиги</div>
                                {
                                    props.leagues
                                        .map(league => (
                                            <Link
                                                style={{display: 'flex', alignItems: 'center'}}
                                                className="lkm-item"
                                                to="/"
                                            >
                                                <img
                                                    src={COUNTRIES[league[1]].svg_url}
                                                    alt={league[1]}
                                                    height={12}
                                                    style={{marginRight: 4}}
                                                />
                                                {COUNTRIES[league[1]].ru_name}.&nbsp;{league[0]}
                                            </Link>
                                        ))
                                }
                            </>
                    }
                </div>
                <Link to={'/'}>
                    <div id="lk-lk-bttn-fast">Быстрая ставка</div>
                </Link>
            </div>
        </div>
    )
}

const Account = () => {
    const dispatch = useAppDispatch()
    const [{result}, setUserInfo] = useState<IProfileState>({
        error: false,
        message: null,
        result: null,
    })
    const {session} = useAppSelector(state => state.authReducer)
    const [favoriteLeagues, setFavoriteLeagues] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchUserInfo = useCallback(async (session: string) => {
        const data = await ApiService.getProfile(session)
        const leagues = await ApiService.getFavouriteLeague(session)

        // @ts-ignore
        if (data === 'session is not active') {
            dispatch(logout())
            return alert('Сессия истекла. Авторизуйтесь заново')
        }
        setUserInfo(data)
        setFavoriteLeagues(leagues)
    }, [session])


    useEffect(() => {
        setIsLoading(true)
        if (session) {
            fetchUserInfo(session)
                .then(() => setIsLoading(false))
        }
        window.scrollTo(0, 0)
    }, [session])

    return (
        <div id="content-wr">
            <RightBarMobile/>

            <LeftBar/>

            <LeftBarMobile/>
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

export default Account
