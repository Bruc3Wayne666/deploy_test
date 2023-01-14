import React, {FC} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useAppDispatch} from "../hooks/redux";
import {logout} from "../store/reducers/auth/authSlice";
import {clear} from "../store/reducers/profile/profileSlice";

export const LeftBar: FC<any> = () => {
    const {pathname} = useLocation()
    const dispatch = useAppDispatch()

    return (
        <div id="lk-left">
            <div id="lk-left-menu">
                <Link to="/profile" className={`lklm-item ${pathname === '/profile' && 'active'}`}>
                    <div className="global-ico gi-lk-profile"/>
                    <span>Мой профиль</span></Link>
                <Link to="/purchase" className="lklm-item">
                    <div className="global-ico gi-lk-popvip"/>
                    <span>Пополнить</span></Link>
                <Link to="/purchase_history" className="lklm-item">
                    <div className="global-ico gi-lk-chistory"/>
                    <span>История пополнений</span></Link>
                <Link to="/income" className="lklm-item">
                    <div className="global-ico gi-lk-popvip"/>
                    <span>Выплата</span></Link>
                <Link to="/income_history" className="lklm-item">
                    <div className="global-ico gi-lk-ihistory"/>
                    <span>История выплат</span></Link>
                <Link to="/bets" className={`lklm-item ${pathname === '/bets' && 'active'}`}>
                    <div className="global-ico gi-lk-history"/>
                    <span>История ставок</span></Link>
                <Link to="/results" className="lklm-item">
                    <div className="global-ico gi-lk-stat"/>
                    <span>Статистика</span></Link>
                <Link to="/bets" className={`lklm-item ${pathname === '/bets' && 'active'}`}>
                <div className="global-ico gi-lk-mypary"/>
                    <span>Мои пари</span></Link>
                <Link to="/vip" className={`lklm-item ${pathname === '/vip' && 'active'}`}>
                <div className="global-ico gi-lk-bonus"/>
                    <span>Бонусы и промокоды</span></Link>
                <Link to="/help" className="lklm-item">
                    <div className="global-ico gi-lk-tehpod"/>
                    <span>Техническая поддержка</span></Link>
                <div
                    onClick={() => {
                        dispatch(clear())
                        dispatch(logout())
                    }}
                    className="lklm-item lklmi-exit"
                >
                    <div className="global-ico"/>
                    <span
                        style={{
                            backgroundColor: '#444',
                            padding: '8px 16px',
                            borderRadius: 8
                        }}
                    >
                        Выйти
                    </span>
                </div>
            </div>
        </div>
    );
};


export const LeftBarMobile: FC<any> = () => {
    const {pathname} = useLocation()
    const dispatch = useAppDispatch()

    return (
        <div id="lk-left" className="m">
            <div id="lk-left-menu">
                <Link to="/profile" className={`lklm-item ${pathname === '/profile' && 'active'}`}>
                    <div className="global-ico gi-lk-profile"/>
                    <span>Мой профиль</span></Link>
                <Link to="/purchase" className="lklm-item">
                    <div className="global-ico gi-lk-popvip"/>
                    <span>Пополнить</span></Link>
                <Link to="/purchase_history" className="lklm-item">
                    <div className="global-ico gi-lk-chistory"/>
                    <span>История пополнений</span></Link>
                <Link to="/income" className="lklm-item">
                    <div className="global-ico gi-lk-popvip"/>
                    <span>Выплата</span></Link>
                <Link to="/income_history" className="lklm-item">
                    <div className="global-ico gi-lk-ihistory"/>
                    <span>История выплат</span></Link>
                <Link to="/bets" className={`lklm-item ${pathname === '/bets' && 'active'}`}>
                    <div className="global-ico gi-lk-history"/>
                    <span>История ставок</span></Link>
                <Link to="/results" className="lklm-item">
                    <div className="global-ico gi-lk-stat"/>
                    <span>Статистика</span></Link>
                <Link to="/bets" className={`lklm-item ${pathname === '/bets' && 'active'}`}>
                    <div className="global-ico gi-lk-mypary"/>
                    <span>Мои пари</span></Link>
                <Link to="/vip" className={`lklm-item ${pathname === '/vip' && 'active'}`}>
                    <div className="global-ico gi-lk-bonus"/>
                    <span>Бонусы и промокоды</span></Link>
                <Link to="/help" className="lklm-item">
                    <div className="global-ico gi-lk-tehpod"/>
                    <span>Техническая поддержка</span></Link>
                <div
                    onClick={() => {
                        dispatch(clear())
                        dispatch(logout())
                    }}
                    className="lklm-item lklmi-exit">
                    <div className="global-ico"/>
                    <span
                        style={{
                            backgroundColor: '#444',
                            padding: '8px 16px',
                            borderRadius: 8
                        }}
                    >
                        Выйти
                    </span>
                </div>
            </div>
        </div>
    );
};
