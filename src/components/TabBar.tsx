import React, {FC} from 'react';
import {Link, useLocation} from "react-router-dom";

const TabBar: FC<any> = () => {
    const {pathname} = useLocation()

    return (
        <div className='tabbar'>
            <Link to={'/'}>
                <div className={`tabbar-item ${pathname === '/' && 'active'}`}>
                    <img
                        src={require('../assets/svg/sport_tabbar.svg').default}
                        alt="sport"/>
                    Спорт
                </div>
            </Link>
            <Link to={'/results'}>
                <div className={`tabbar-item ${pathname === '/results' && 'active'}`}>
                    <img src={require('../assets/svg/cyber_tabbar.svg').default} alt="cybersport"/>
                    Киберспорт
                </div>
            </Link>
            <Link to={'/live'}>
                <div className={`tabbar-item ${pathname === '/live' && 'active'}`}>
                    <img src={require('../assets/svg/live_tabbar.svg').default} alt="live"/>
                    LIVE
                </div>
            </Link>
            <Link to={'/bets'}>
                <div className={`tabbar-item ${pathname === '/bets' && 'active'}`}>
                    <img src={require('../assets/svg/bets_tabbar.svg').default} alt="my bets"/>
                    Мои пари
                </div>
            </Link>
            <Link to={'/profile'}>
                <div className={`tabbar-item ${pathname === '/profile' && 'active'}`}>
                    <img src={require('../assets/svg/profile_tabbar.svg').default} alt="profile"/>
                    Профиль
                </div>
            </Link>
        </div>
    );
};

export default TabBar;
