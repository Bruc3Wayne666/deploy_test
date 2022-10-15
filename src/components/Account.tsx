import React, {FC} from 'react';
import '../index.css'
import {Link} from "react-router-dom";
import RightBar from "./RightBar";
import LeftBar from "./LeftBar";

const Discounts: FC = () => {
    return (
        <div id="lk-mid">
            <div className="lk-accii-one" id="accia-1">
                <div className="lkao-wr">
                    <div className="lkao-title">Индивидуальные<br/>условия сотрудничества</div>
                    <div className="lkao-undertitle">от 15% прибыли БК</div>
                </div>
                <div className="lkao-text">
                    <div className="lkaot-title">VIP - статусы:</div>
                    <div className="lkaot-undertitle">Кешбек от 3 до 7% фрибетами</div>
                </div>
            </div>
            <div className="lk-accii-one" id="accia-2">
                <div className="lkao-wr">
                    <div className="lkao-title">Индивидуальные<br/>условия сотрудничества</div>
                    <div className="lkao-undertitle">от 15% прибыли БК</div>
                </div>
                <div className="lkao-text">
                    <div className="lkaot-title">VIP - статусы:</div>
                    <div className="lkaot-undertitle">RevShare - Быстрая поддержка, возможность получения от 15% прибыли БК.
                        Страховой лимит, все виды выплат.<br/>Связаться с нами: gpbet.sup@gmail.com
                    </div>
                </div>
            </div>
        </div>
    )
}

const Profile: FC = () => {
    return (
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
    )
}

const Account: FC = () => {
    return (
        <div id="content-wr">
            <LeftBar/>
            {/*<Profile />*/}

            {/*<h1>[ПОТОМ УЗНАТЬ КАК БУДЕТ ПОЯВЛЯТЬСЯ СТРАНИЦА АКЦИЙ]</h1>*/}

            <Discounts />
            <RightBar/>
        </div>
    );
};

export default Account;
