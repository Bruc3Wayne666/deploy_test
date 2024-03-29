import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import '../../../../app/styles/index.css'


const Header: FC = () => {
    return (
        <header>
            <div id="top-header">
                <div id="th-menu">
                    <Link to="/">Спорт</Link>
                    <Link id="thm-live" to="/live">Live <span/></Link>
                    <Link to="/cyber">Киберспорт</Link>
                    <Link to="/discounts">Акции</Link>
                    <Link to="/results">Статистика</Link>
                </div>
                <div id="th-lk">
                    <Link to="/profile">
                        <div className="global-ico gi-lk"/>
                        Личный кабинет</Link>
                </div>
            </div>
            <div id="mid-header">
                <div id="mh-slider">
                    <div className="mhsl-one">
                        <div className="mhslo-wr">
                            <div className="mhslo-img">
                                <Link to='/'>
                                    <img src={require("../../../../assets/images/head-slider-1.png")} alt="img"/>
                                </Link>
                            </div>
                            <div className="mhslo-text">
                                <div className="slider-logo">
                                    <div className="sll-img">
                                        <img src={require("../../../../assets/images/sl-logo.png")} alt="logo"/>
                                    </div>
                                    <div className="sll-text">Крипто-букмекерская<br/>контора</div>
                                </div>
                                <div className="slider-bot-text">
                                    <div style={{fontWeight: 'bold'}}>
                                                        <span style={{display: 'flex', alignItems: 'center'}}>2 000
                                                            <div className="global-ico gi-coin"/></span> новым
                                        игрокам<br/>в приложении
                                    </div>
                                    {/*<SimpleSlider />*/}
                                    <div id="dots-wr">
                                        <div className="check-dot active"/>
                                        <div className="check-dot"/>
                                        <div className="check-dot"/>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="mh-slider-menu">
                    <div className="mhslm-one">
                        <div className="mhslmo-wr">
                            <div className="global-ico gi-phone"/>
                            <Link to={'profile'}>
                                <div className="mhslmo-text">
                                    <h3>Новым игрокам в приложении</h3>
                                    <h4 style={{display: 'flex', alignItems: 'center'}}>2 000 <div className="global-ico gi-coin-w"/></h4>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="mhslm-one">
                        <div className="mhslmo-wr">
                            <div className="global-ico gi-gift"/>
                            <Link to={'profile'}>
                                <div className="mhslmo-text">
                                    <h3>Бонус всем новым клиентам</h3>
                                    <h4 style={{display: 'flex', alignItems: 'center'}}>до 15 000 <div className="global-ico gi-coin-w"/></h4>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="mhslm-one">
                        <div className="mhslmo-wr">
                            <div className="global-ico gi-vip"/>
                            <Link to={'vip'}>
                                <div className="mhslmo-text">
                                    <h3>VIP-кешбек</h3>
                                    <h4>до 5% каждый месяц</h4>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
