import React, {FC} from 'react';
import { Link } from 'react-router-dom';

const LeftBar: FC<any> = (active: string) => {
    return (
        <div id="lk-left">
            <div id="lk-left-menu">
                <Link to="/profile" className="lklm-item">
                    <div className="global-ico gi-lk-profile"/>
                    <span>Мой профиль</span></Link>
                <Link to="/" className="lklm-item">
                    <div className="global-ico gi-lk-popvip"/>
                    <span>Пополнения и выплаты</span></Link>
                <Link to="/bets" className="lklm-item">
                    <div className="global-ico gi-lk-history"/>
                    <span>История ставок</span></Link>
                <Link to="/" className="lklm-item">
                    <div className="global-ico gi-lk-stat"/>
                    <span>Статистика</span></Link>
                <Link to="/bets" className="lklm-item active">
                    <div className="global-ico gi-lk-mypary"/>
                    <span>Мои пари</span></Link>
                <Link to="/vip" className="lklm-item">
                    <div className="global-ico gi-lk-bonus"/>
                    <span>Бонусы и промокоды</span></Link>
                <Link to="/" className="lklm-item">
                    <div className="global-ico gi-lk-tehpod"/>
                    <span>Техническая поддержка</span></Link>
                <Link to="/" className="lklm-item lklmi-exit">
                    <div className="global-ico"/>
                    <span>Выйти</span></Link>
            </div>
        </div>
    );
};

export default LeftBar;
