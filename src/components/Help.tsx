import React, {FC, useEffect} from 'react';
import {LeftBar, LeftBarMobile} from "./LeftBar";
import {RightBar} from "./RightBar";


const Help: FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div id='content-wr'>
            <LeftBar/>
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
                        <div className="lkaot-undertitle">RevShare - Быстрая поддержка, возможность получения от 15%
                            прибыли БК. Страховой лимит, все виды выплат.<br/>Связаться с нами: gpbet.sup@gmail.com
                        </div>
                    </div>
                </div>
            </div>
            <RightBar/>
        </div>
    );
};

export default Help;
