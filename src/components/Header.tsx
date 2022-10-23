import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import {Slide} from 'react-slideshow-image';
import '../index.css'

// const SimpleSlider: FC<any> = () => {
// return (
//     <ImageSlider effectDelay={500} autoPlayDelay={3000}>
//         <Slide>
//             <div>
//                 <span
//                     style={{fontWeight: 'bold'}}>2 000 <div
//                     className="global-ico gi-coin"
//                 /></span> новым игрокам<br/>в приложении
//             </div>
//         </Slide>
//         <Slide>
//             <div>
//                 <span
//                     style={{fontWeight: 'bold'}}><div
//                     className="global-ico gi-coin"
//                 /></span> Бонус всем новым клиентам<br/>до 15 000
//             </div>
//         </Slide>
//         <Slide>
//             <div>
//                 <span
//                     style={{fontWeight: 'bold'}}><div
//                     className="global-ico gi-coin"
//                 /></span>VIP-кешбек<br/>до 5% каждый месяц
//             </div>
//         </Slide>
//     </ImageSlider>
// )
// return (
//     <div className="slide-container">
//         <Slide>
//             {[1,2,3,4,5,6,7,8,9].map((slideImage, index)=> (
//                 <div className="each-slide" key={index}>
//                     <div>
//                         <span>l;k,lkmk</span>
//                     </div>
//                 </div>
//             ))}
//         </Slide>
//     </div>
// )
// }

const Header: FC = () => {
    return (
        <header>
            <div id="top-header">
                <div id="th-menu">
                    <Link to="/">Спорт</Link>
                    <Link id="thm-live" to="/">Live <span/></Link>
                    <Link to="/results">Киберспорт</Link>
                    <Link to="/discounts">Акции</Link>
                    <Link to="/">Статистика</Link>
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
                                    <img src={require("../assets/images/head-slider-1.png")} alt="img"/>
                                </Link>
                            </div>
                            <div className="mhslo-text">
                                <div className="slider-logo">
                                    <div className="sll-img">
                                        <img src={require("../assets/images/sl-logo.png")} alt="logo"/>
                                    </div>
                                    <div className="sll-text">Крипто-букмекерская<br/>контора</div>
                                </div>
                                <div className="slider-bot-text">
                                    <div>
                                                        <span
                                                            style={{fontWeight: 'bold'}}>2 000 <div
                                                            className="global-ico gi-coin"
                                                        /></span> новым игрокам<br/>в приложении
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
                            <div className="mhslmo-text">
                                <h3>Новым игрокам в приложении</h3>
                                <h4>2 000 <div className="global-ico gi-coin-w"/></h4>
                            </div>
                        </div>
                    </div>
                    <div className="mhslm-one">
                        <div className="mhslmo-wr">
                            <div className="global-ico gi-gift"/>
                            <div className="mhslmo-text">
                                <h3>Бонус всем новым клиентам</h3>
                                <h4>до 15 000 <div className="global-ico gi-coin-w"/></h4>
                            </div>
                        </div>
                    </div>
                    <div className="mhslm-one">
                        <div className="mhslmo-wr">
                            <div className="global-ico gi-vip"/>
                            <div className="mhslmo-text">
                                <h3>VIP-кешбек</h3>
                                <h4>до 5% каждый месяц</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
