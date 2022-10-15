import React, {FC} from 'react';
import '../index.css'
import {Link} from "react-router-dom";

const Account: FC = () => {
    return (
        <div id="content-wr">
            <div id="lk-left">
                <div id="lk-left-menu">
                    <Link to="/" className="lklm-item active">
                        <div className="global-ico gi-lk-profile"/>
                        <span>Мой профиль</span></Link>
                    <Link to="/" className="lklm-item">
                        <div className="global-ico gi-lk-popvip"/>
                        <span>Пополнения и выплаты</span></Link>
                    <Link to="/" className="lklm-item">
                        <div className="global-ico gi-lk-history"/>
                        <span>История ставок</span></Link>
                    <Link to="/" className="lklm-item">
                        <div className="global-ico gi-lk-stat"/>
                        <span>Статистика</span></Link>
                    <Link to="/" className="lklm-item">
                        <div className="global-ico gi-lk-mypary"/>
                        <span>Мои пари</span></Link>
                    <Link to="/" className="lklm-item">
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
            <div id="lk-mid">
                <div id="lk-lk-info">
                    <div id="lk-lk-ava-name">
                        <div id="lk-ava">
                            <img src={require('../assets/images/ava.png')} alt={''}/>
                        </div>
                        <div id="lk-name">NickName</div>
                    </div>
                    <div id="lk-lk-bal-stat">
                        <div id="lk-bal">
                            <div>Баланс:</div>
                            <div><span>3200</span>
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
            <div id="lk-right">
                <div className="lkr-widget">
                    <div className="lkrw-title">Рассылки и уведомления</div>
                    <div className="lkrw-inforow active">
                        <div className="lkrwir-text"><span>Email:</span> user_mail@mail.ru</div>
                        <div className="lkrwir-tick-bttn">
                            <div className="lkrwir-bttn"/>
                        </div>
                    </div>
                    <div className="lkrw-inforow">
                        <div className="lkrwir-text"><span>Push-уведомления</span></div>
                        <div className="lkrwir-tick-bttn">
                            <div className="lkrwir-bttn"/>
                        </div>
                    </div>
                </div>
                <div className="lkr-widget">
                    <div className="lkrw-title">Контакты</div>
                    <div className="lkrw-inforow">
                        <div className="lkrwir-text"><span>Email:</span> user_mail@mail.ru</div>
                    </div>
                </div>
                <div className="lkr-widget">
                    <div className="lkrw-title">Личные данные</div>
                    <div className="lkrw-inforow active">
                        <div className="lkrwir-text"><span>Статус идентификации:</span></div>
                        <div className="global-ico gi-tick"/>
                    </div>
                    <div className="lkrw-inforow">
                        <div className="lkrwir-text"><span>Email:</span> user_mail@mail.ru</div>
                        <div className="global-ico gi-tick"/>
                    </div>
                </div>
                <div className="lkr-widget no-border">
                    <Link className="lkr-ssilki" to="/">
                        <img src={require('../assets/images/stavki-cyber.png')} alt={''}/>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Account;
