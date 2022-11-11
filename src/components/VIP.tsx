import React, {FC} from 'react';
import {RightBar} from "./RightBar";

const Vip:FC = () => {
    return (
        <div id="content-wr">
            <div id="lk-mid" className="lk-vip">
                <div className="lk-vip-col">
                    <div id="lk-vip-card">
                        <div id="lk-vip-card-text">
                            <div id="lk-vip-card-number">1234 5678 9012 3456</div>
                            <div id="lk-vip-card-status">CARD HOLDER</div>
                        </div>
                        <div id="lk-vip-card-member">
                            <div className="lkvcs-one">
                                <div className="lkvcso-title">Start</div>
                                <div className="lkvcso-cond">
                                    <div>Кэшбек 3% фрибетами</div>
                                    <div>
                                        <div className="lkcso-sum">сумма ставок</div>
                                        <div>от <span>1 000000</span>
                                            <div className="global-ico gi-coin"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lkvcs-one">
                                <div className="lkvcso-title">Start</div>
                                <div className="lkvcso-cond">
                                    <div>Кэшбек 3% фрибетами</div>
                                    <div>
                                        <div className="lkcso-sum">сумма ставок</div>
                                        <div>от <span>1 000000</span>
                                            <div className="global-ico gi-coin"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lkvcs-one">
                                <div className="lkvcso-title">Start</div>
                                <div className="lkvcso-cond">
                                    <div>Кэшбек 3% фрибетами</div>
                                    <div>
                                        <div className="lkcso-sum">сумма ставок</div>
                                        <div>от <span>1 000000</span>
                                            <div className="global-ico gi-coin"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lk-vip-col">
                    <div id="lk-vip-r-text">
                        <div id="lk-vip-r-text-title">Правила получения <span>VIP-статуса:</span></div>
                        <ul>
                            <li>Берутся в учет ставки всех типов, не считая отменённых</li>
                            <li>Процент кэшбека и статус обновляются каждый месяц</li>
                            <li>Регистрация ставок происходит в момент расчета ставки</li>
                            <li>Набор от минимальной суммы ставок 1000000 cwd</li>
                        </ul>
                        <div id="lk-vip-r-text-unter">
                            Начисление фрибетов за предыдущий месяц происходит первого числа нового месяца
                        </div>
                    </div>
                    <div id="lk-contacts">
                        <div id="lkconts-title">Связаться с нами</div>
                        <div>
                            <div className="lkconts-one">
                                <div className="global-ico gi-telega"/>
                                <span>Телеграм</span> - https://t.me/gpbetalerts
                            </div>
                            <div className="lkconts-one">
                                <div className="global-ico gi-gmail"/>
                                <span>Телеграм</span> - https://t.me/gpbetalerts
                            </div>
                            <div className="lkconts-one">
                                <div className="global-ico gi-mail"/>
                                <span>Телеграм</span> - https://t.me/gpbetalerts
                            </div>
                        </div>
                        <div className="slider-logo">
                            <div className="sll-img"><img src="images/sl-logo.png" alt=""/></div>
                            <div className="sll-text">Крипто-букмекерская<br/>контора</div>
                        </div>
                    </div>
                </div>
            </div>
            <RightBar/>
        </div>
    );
};

export default Vip;
