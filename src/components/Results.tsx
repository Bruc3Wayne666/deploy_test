import React, {FC} from 'react';
import '../index.css'

const Results:FC = () => {
    return (
        <div id="content-wr">
            <div id="two-left">
                <div id="page-title">
                    <div id="pt-text">Результаты</div>
                    <div id="pt-stripe"/>
                </div>
                <div id="table-main">
                    <div className="filter-results">
                        <div className="fr-bttns">
                            <div className="frb-one"><span>Вид спорта</span>
                                <div className="global-ico gi-arrow-bot"/>
                            </div>
                            <div className="frb-one"><span>Все события</span>
                                <div className="global-ico gi-arrow-bot"/>
                            </div>
                            <div className="frb-one"><span>Дата</span>
                                <div className="global-ico gi-arrow-bot"/>
                            </div>
                            <div className="frb-one"><span>Время</span>
                                <div className="global-ico gi-arrow-bot"/>
                            </div>
                        </div>
                        <div className="fr-ticks">
                            <div className="frt-sqr"><span/>Только текущие</div>
                            <div className="frt-circle"><span/>Сортировать по номеру</div>
                            <div className="frt-circle"><span/>Сортировать по времени</div>
                        </div>
                        <div className="fr-search">
                            <span>Поиск</span>
                            <div className="global-ico gi-search"/>
                        </div>
                    </div>
                    <div className="table-one-cat">
                        <div className="toc-title">
                            <div className="global-ico gi-football"/>
                            <div className="global-ico gi-rus"/>
                            <span>Футбол. Россия. Премьер-лига</span></div>
                        <div className="toc-item-res">
                            <div className="tocir-num">1</div>
                            <div className="tocir-name">Торпедо Москва – Сочи</div>
                            <div className="tocir-results">1:3 (0-2-1-1)</div>
                            <div className="torir-time">
                                <div className="global-ico gi-clock"/>
                                Сегодня в 15:00
                            </div>
                            <div className="torir-status"><span className="s-blue">Завершен</span></div>
                            <div className="torir-comment">1-й гол. 2-я на 35 мин</div>
                        </div>
                        <div className="toc-item-res res-child">
                            <div className="tocir-num">2</div>
                            <div className="tocir-name">Торпедо Москва – Сочи</div>
                            <div className="tocir-results">1:3 (0-2-1-1)</div>
                            <div className="torir-time">
                                <div className="global-ico gi-clock"/>
                                Сегодня в 15:00
                            </div>
                            <div className="torir-status"><span className="s-blue">Завершен</span></div>
                            <div className="torir-comment">1-й гол. 2-я на 35 мин</div>
                        </div>
                        <div className="toc-item-res res-child">
                            <div className="tocir-num">3</div>
                            <div className="tocir-name">Торпедо Москва – Сочи</div>
                            <div className="tocir-results">1:3 (0-2-1-1)</div>
                            <div className="torir-time">
                                <div className="global-ico gi-clock"/>
                                Сегодня в 15:00
                            </div>
                            <div className="torir-status"><span className="s-blue">Завершен</span></div>
                            <div className="torir-comment">1-й гол. 2-я на 35 мин</div>
                        </div>
                        <div className="toc-item-res res-child">
                            <div className="tocir-num">4</div>
                            <div className="tocir-name">Торпедо Москва – Сочи</div>
                            <div className="tocir-results">24:17 (4-4-5-12)</div>
                            <div className="torir-time">
                                <div className="global-ico gi-clock"/>
                                Сегодня в 15:00
                            </div>
                            <div className="torir-status"><span className="s-blue">Завершен</span></div>
                            <div className="torir-comment">1-й гол. 2-я на 35 мин</div>
                        </div>
                        <div className="toc-item-res">
                            <div className="tocir-num">1</div>
                            <div className="tocir-name">Торпедо Москва – Сочи</div>
                            <div className="tocir-results">1:3 (0-2-1-1)</div>
                            <div className="torir-time">
                                <div className="global-ico gi-clock"/>
                                Сегодня в 15:00
                            </div>
                            <div className="torir-status"><span className="s-blue">Завершен</span></div>
                            <div className="torir-comment">1-й гол. 2-я на 35 мин</div>
                        </div>
                        <div className="toc-item-res res-child">
                            <div className="tocir-num">2</div>
                            <div className="tocir-name">Торпедо Москва – Сочи</div>
                            <div className="tocir-results">1:3 (0-2-1-1)</div>
                            <div className="torir-time">
                                <div className="global-ico gi-clock"/>
                                Сегодня в 15:00
                            </div>
                            <div className="torir-status"><span className="s-blue">Завершен</span></div>
                            <div className="torir-comment">1-й гол. 2-я на 35 мин</div>
                        </div>
                        <div className="toc-item-res res-child">
                            <div className="tocir-num">3</div>
                            <div className="tocir-name">Торпедо Москва – Сочи</div>
                            <div className="tocir-results">1:3 (0-2-1-1)</div>
                            <div className="torir-time">
                                <div className="global-ico gi-clock"/>
                                Сегодня в 15:00
                            </div>
                            <div className="torir-status"><span className="s-blue">Завершен</span></div>
                            <div className="torir-comment">1-й гол. 2-я на 35 мин</div>
                        </div>
                        <div className="toc-item-res res-child">
                            <div className="tocir-num">4</div>
                            <div className="tocir-name">Торпедо Москва – Сочи</div>
                            <div className="tocir-results">24:17 (4-4-5-12)</div>
                            <div className="torir-time">
                                <div className="global-ico gi-clock"/>
                                Сегодня в 15:00
                            </div>
                            <div className="torir-status"><span className="s-blue">Завершен</span></div>
                            <div className="torir-comment">1-й гол. 2-я на 35 мин</div>
                        </div>
                        <div className="toc-item-res">
                            <div className="tocir-num">1</div>
                            <div className="tocir-name">Торпедо Москва – Сочи</div>
                            <div className="tocir-results">1:3 (0-2-1-1)</div>
                            <div className="torir-time">
                                <div className="global-ico gi-clock"/>
                                Сегодня в 15:00
                            </div>
                            <div className="torir-status"><span className="s-blue">Завершен</span></div>
                            <div className="torir-comment">1-й гол. 2-я на 35 мин</div>
                        </div>
                        <div className="toc-item-res res-child">
                            <div className="tocir-num">2</div>
                            <div className="tocir-name">Торпедо Москва – Сочи</div>
                            <div className="tocir-results">1:3 (0-2-1-1)</div>
                            <div className="torir-time">
                                <div className="global-ico gi-clock"/>
                                Сегодня в 15:00
                            </div>
                            <div className="torir-status"><span className="s-blue">Завершен</span></div>
                            <div className="torir-comment">1-й гол. 2-я на 35 мин</div>
                        </div>
                        <div className="toc-item-res res-child">
                            <div className="tocir-num">3</div>
                            <div className="tocir-name">Торпедо Москва – Сочи</div>
                            <div className="tocir-results">1:3 (0-2-1-1)</div>
                            <div className="torir-time">
                                <div className="global-ico gi-clock"/>
                                Сегодня в 15:00
                            </div>
                            <div className="torir-status"><span className="s-blue">Завершен</span></div>
                            <div className="torir-comment">1-й гол. 2-я на 35 мин</div>
                        </div>
                        <div className="toc-item-res res-child">
                            <div className="tocir-num">4</div>
                            <div className="tocir-name">Торпедо Москва – Сочи</div>
                            <div className="tocir-results">24:17 (4-4-5-12)</div>
                            <div className="torir-time">
                                <div className="global-ico gi-clock"/>
                                Сегодня в 15:00
                            </div>
                            <div className="torir-status"><span className="s-blue">Завершен</span></div>
                            <div className="torir-comment">1-й гол. 2-я на 35 мин</div>
                        </div>
                    </div>
                    <div className="table-one-cat">
                        <div className="toc-title">
                            <div className="global-ico gi-football"/>
                            <div className="global-ico gi-rus"/>
                            <span>Футбол. Россия. Премьер-лига</span></div>
                        <div className="toc-item-res">
                            <div className="tocir-num">5</div>
                            <div className="tocir-name">Торпедо Москва – Сочи</div>
                            <div className="tocir-results">1:3 (0-2-1-1)</div>
                            <div className="torir-time">
                                <div className="global-ico gi-clock"/>
                                Сегодня в 15:00
                            </div>
                            <div className="torir-status"><span className="s-red">Live</span></div>
                            <div className="torir-comment">1-й гол. 2-я на 35 мин</div>
                        </div>
                        <div className="toc-item-res res-child">
                            <div className="tocir-num">6</div>
                            <div className="tocir-name">Торпедо Москва – Сочи</div>
                            <div className="tocir-results">1:3 (0-2-1-1)</div>
                            <div className="torir-time">
                                <div className="global-ico gi-clock"/>
                                Сегодня в 15:00
                            </div>
                            <div className="torir-status"><span className="s-red">Live</span></div>
                            <div className="torir-comment">1-й гол. 2-я на 35 мин</div>
                        </div>
                        <div className="toc-item-res">
                            <div className="tocir-num">1</div>
                            <div className="tocir-name">Торпедо Москва – Сочи</div>
                            <div className="tocir-results">1:3 (0-2-1-1)</div>
                            <div className="torir-time">
                                <div className="global-ico gi-clock"/>
                                Сегодня в 15:00
                            </div>
                            <div className="torir-status"><span className="s-red">Live</span></div>
                            <div className="torir-comment">1-й гол. 2-я на 35 мин</div>
                        </div>
                        <div className="toc-item-res res-child">
                            <div className="tocir-num">2</div>
                            <div className="tocir-name">Торпедо Москва – Сочи</div>
                            <div className="tocir-results">1:3 (0-2-1-1)</div>
                            <div className="torir-time">
                                <div className="global-ico gi-clock"/>
                                Сегодня в 15:00
                            </div>
                            <div className="torir-status"><span className="s-red">Live</span></div>
                            <div className="torir-comment">1-й гол. 2-я на 35 мин</div>
                        </div>
                        <div className="toc-item-res res-child">
                            <div className="tocir-num">3</div>
                            <div className="tocir-name">Торпедо Москва – Сочи</div>
                            <div className="tocir-results">1:3 (0-2-1-1)</div>
                            <div className="torir-time">
                                <div className="global-ico gi-clock"/>
                                Сегодня в 15:00
                            </div>
                            <div className="torir-status"><span className="s-red">Live</span></div>
                            <div className="torir-comment">1-й гол. 2-я на 35 мин</div>
                        </div>
                        <div className="toc-item-res res-child">
                            <div className="tocir-num">4</div>
                            <div className="tocir-name">Торпедо Москва – Сочи</div>
                            <div className="tocir-results">1:3 (0-2-1-1)</div>
                            <div className="torir-time">
                                <div className="global-ico gi-clock"/>
                                Сегодня в 15:00
                            </div>
                            <div className="torir-status"><span className="s-red">Live</span></div>
                            <div className="torir-comment">1-й гол. 2-я на 35 мин</div>
                        </div>
                        <div className="toc-item-res">
                            <div className="tocir-num">5</div>
                            <div className="tocir-name">Торпедо Москва – Сочи</div>
                            <div className="tocir-results">1:3 (0-2-1-1)</div>
                            <div className="torir-time">
                                <div className="global-ico gi-clock"/>
                                Сегодня в 15:00
                            </div>
                            <div className="torir-status"><span className="s-red">Live</span></div>
                            <div className="torir-comment">1-й гол. 2-я на 35 мин</div>
                        </div>
                        <div className="toc-item-res res-child">
                            <div className="tocir-num">6</div>
                            <div className="tocir-name">Торпедо Москва – Сочи</div>
                            <div className="tocir-results">1:3 (0-2-1-1)</div>
                            <div className="torir-time">
                                <div className="global-ico gi-clock"/>
                                Сегодня в 15:00
                            </div>
                            <div className="torir-status"><span className="s-red">Live</span></div>
                            <div className="torir-comment">1-й гол. 2-я на 35 мин</div>
                        </div>
                        <div className="toc-item-res">
                            <div className="tocir-num">1</div>
                            <div className="tocir-name">Торпедо Москва – Сочи</div>
                            <div className="tocir-results">1:3 (0-2-1-1)</div>
                            <div className="torir-time">
                                <div className="global-ico gi-clock"/>
                                Сегодня в 15:00
                            </div>
                            <div className="torir-status"><span className="s-red">Live</span></div>
                            <div className="torir-comment">1-й гол. 2-я на 35 мин</div>
                        </div>
                        <div className="toc-item-res res-child">
                            <div className="tocir-num">2</div>
                            <div className="tocir-name">Торпедо Москва – Сочи</div>
                            <div className="tocir-results">1:3 (0-2-1-1)</div>
                            <div className="torir-time">
                                <div className="global-ico gi-clock"/>
                                Сегодня в 15:00
                            </div>
                            <div className="torir-status"><span className="s-red">Live</span></div>
                            <div className="torir-comment">1-й гол. 2-я на 35 мин</div>
                        </div>
                        <div className="toc-item-res">
                            <div className="tocir-num">5</div>
                            <div className="tocir-name">Торпедо Москва – Сочи</div>
                            <div className="tocir-results">1:3 (0-2-1-1)</div>
                            <div className="torir-time">
                                <div className="global-ico gi-clock"/>
                                Сегодня в 15:00
                            </div>
                            <div className="torir-status"><span className="s-red">Live</span></div>
                            <div className="torir-comment">1-й гол. 2-я на 35 мин</div>
                        </div>
                        <div className="toc-item-res res-child">
                            <div className="tocir-num">6</div>
                            <div className="tocir-name">Торпедо Москва – Сочи</div>
                            <div className="tocir-results">1:3 (0-2-1-1)</div>
                            <div className="torir-time">
                                <div className="global-ico gi-clock"/>
                                Сегодня в 15:00
                            </div>
                            <div className="torir-status"><span className="s-red">Live</span></div>
                            <div className="torir-comment">1-й гол. 2-я на 35 мин</div>
                        </div>
                        <div className="toc-item-res">
                            <div className="tocir-num">1</div>
                            <div className="tocir-name">Торпедо Москва – Сочи</div>
                            <div className="tocir-results">1:3 (0-2-1-1)</div>
                            <div className="torir-time">
                                <div className="global-ico gi-clock"/>
                                Сегодня в 15:00
                            </div>
                            <div className="torir-status"><span className="s-red">Live</span></div>
                            <div className="torir-comment">1-й гол. 2-я на 35 мин</div>
                        </div>
                        <div className="toc-item-res res-child">
                            <div className="tocir-num">2</div>
                            <div className="tocir-name">Торпедо Москва – Сочи</div>
                            <div className="tocir-results">1:3 (0-2-1-1)</div>
                            <div className="torir-time">
                                <div className="global-ico gi-clock"/>
                                Сегодня в 15:00
                            </div>
                            <div className="torir-status"><span className="s-red">Live</span></div>
                            <div className="torir-comment">1-й гол. 2-я на 35 мин</div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="two-right">
                <div id="pop-sob">
                    <div id="pop-sob-title">Популярные события</div>
                    <div id="pop-sob-menu">
                        <div className="one-ps-menu active">
                            <div className="global-ico gi-football"/>
                            <div className="psm-title">Футбол</div>
                        </div>
                        <div className="one-ps-menu">
                            <div className="global-ico gi-hockey"/>
                            <div className="psm-title">Хоккей</div>
                        </div>
                        <div className="one-ps-menu">
                            <div className="global-ico gi-basketball"/>
                            <div className="psm-title">Баскетбол</div>
                        </div>
                        <div className="one-ps-menu">
                            <div className="global-ico gi-football"/>
                            <div className="psm-title">Еще</div>
                        </div>
                        <div className="one-ps-menu">
                            <div className="global-ico gi-hockey"/>
                            <div className="psm-title">Еще</div>
                        </div>
                        <div className="one-ps-menu">
                            <div className="global-ico gi-basketball"/>
                            <div className="psm-title">Еще</div>
                        </div>
                    </div>
                    <div className="one-pop-sob">
                        <div className="pop-sob-title-in">Россия. Молодежное первенство</div>
                        <div className="pop-sob-teams">
                            <div>
                                <div className="global-ico gi-zenit"/>
                                ФК Химки
                            </div>
                            <div className="pst-hl"/>
                            <div>
                                <div className="global-ico gi-zenit"/>
                                Зенит Санкт-Петербург
                            </div>
                        </div>
                        <div className="pop-sob-koef">
                            <div className="psk-one">
                                <div className="psko-title">Победа 1</div>
                                <div className="psko-number">15.00</div>
                            </div>
                            <div className="psk-one">
                                <div className="psko-title">Ничья</div>
                                <div className="psko-number">15.00</div>
                            </div>
                            <div className="psk-one">
                                <div className="psko-title">Победа 2</div>
                                <div className="psko-number">15.00</div>
                            </div>
                        </div>
                    </div>
                    <div className="all-pop-sob">еще 135 котировок
                        <div className="global-ico gi-arrow-right"/>
                    </div>
                </div>
                <div id="right-col-menu">
                    <div className="one-rcm-menu">
                        <div className="global-ico gi-football"/>
                        <div className="rcm-title">Футбол</div>
                    </div>
                    <div className="one-rcm-menu">
                        <div className="global-ico gi-hockey"/>
                        <div className="rcm-title">Хоккей</div>
                    </div>
                    <div className="one-rcm-menu">
                        <div className="global-ico gi-basketball"/>
                        <div className="rcm-title">Баскетбол</div>
                    </div>
                    <div className="one-rcm-menu">
                        <div className="global-ico gi-volleyball"/>
                        <div className="rcm-title">Волейбол</div>
                    </div>
                    <div className="one-rcm-menu">
                        <div className="global-ico gi-tennis"/>
                        <div className="rcm-title">Теннис</div>
                    </div>
                    <div className="one-rcm-menu">
                        <div className="global-ico gi-baseball"/>
                        <div className="rcm-title">Бейсбол</div>
                    </div>
                    <div className="one-rcm-menu">
                        <div className="global-ico gi-american-f"/>
                        <div className="rcm-title">Американский футбол</div>
                    </div>
                    <div className="one-rcm-menu">
                        <div className="global-ico gi-golf"/>
                        <div className="rcm-title">Гольф</div>
                    </div>
                    <div className="one-rcm-menu">
                        <div className="global-ico gi-rus-biliard"/>
                        <div className="rcm-title">Русский бильярд</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Results;
