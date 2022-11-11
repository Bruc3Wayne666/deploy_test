import React, {FC} from 'react';
import {Link} from "react-router-dom";

export const RightBar: FC = () => {
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
    );
};


export const RightBarMobile: FC = () => {
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
    );
};
