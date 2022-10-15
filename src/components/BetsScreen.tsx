import React, {FC, useState} from 'react';
import RightBar from "./RightBar";
import LeftBar from "./LeftBar";


interface IBetsProps {
    handleChangeType: (value: string) => void;
}


const Bets: FC<IBetsProps> = ({handleChangeType}) => {
    return (
        <div id="lk-mid">
            <div className="lk-table">
                <div className="lkt-filter">
                    <div className="lktf-bttns">
                        <div onClick={() => handleChangeType('bets')}
                             className="lktfb-one">Пари</div>
                        <div onClick={() => handleChangeType('operations')}
                             className="lktfb-one">Операции</div>
                    </div>
                    <div className="lktf-shedule">
                        <div className="lktfs-bttn">
                            <div className="global-ico gi-shedule"/>
                            <span>Показать за неделю</span>
                            <div className="global-ico gi-arrow-bot-g"/>
                        </div>
                    </div>
                </div>
                <div className="lkt-row lktr-title">
                    <div className="lktr-date">Дата</div>
                    <div className="lktr-time">Время</div>
                    <div className="lktr-type">Тип пари</div>
                    <div className="lktr-sum">Сумма</div>
                    <div className="lktr-result">Реультат</div>
                </div>
                <div className="lkt-row">
                    <div className="lktr-date">01.10.2022</div>
                    <div className="lktr-time">20:54:46</div>
                    <div className="lktr-type">Двойной исход</div>
                    <div className="lktr-sum">10 000
                        <div className="global-ico gi-coin"/>
                    </div>
                    <div className="lktr-result">Реультат</div>
                </div>
                <div className="lkt-row">
                    <div className="lktr-date">01.10.2022</div>
                    <div className="lktr-time">20:54:46</div>
                    <div className="lktr-type">Двойной исход</div>
                    <div className="lktr-sum">10 000
                        <div className="global-ico gi-coin"/>
                    </div>
                    <div className="lktr-result">Реультат</div>
                </div>
                <div className="lkt-row">
                    <div className="lktr-date">01.10.2022</div>
                    <div className="lktr-time">20:54:46</div>
                    <div className="lktr-type">Двойной исход</div>
                    <div className="lktr-sum">10 000
                        <div className="global-ico gi-coin"/>
                    </div>
                    <div className="lktr-result">Реультат</div>
                </div>
                <div className="lkt-row">
                    <div className="lktr-date">01.10.2022</div>
                    <div className="lktr-time">20:54:46</div>
                    <div className="lktr-type">Двойной исход</div>
                    <div className="lktr-sum">10 000
                        <div className="global-ico gi-coin"/>
                    </div>
                    <div className="lktr-result">Реультат</div>
                </div>
                <div className="lkt-row">
                    <div className="lktr-date">01.10.2022</div>
                    <div className="lktr-time">20:54:46</div>
                    <div className="lktr-type">Двойной исход</div>
                    <div className="lktr-sum">10 000
                        <div className="global-ico gi-coin"/>
                    </div>
                    <div className="lktr-result">Реультат</div>
                </div>
                <div className="lkt-row">
                    <div className="lktr-date">01.10.2022</div>
                    <div className="lktr-time">20:54:46</div>
                    <div className="lktr-type">Двойной исход</div>
                    <div className="lktr-sum">10 000
                        <div className="global-ico gi-coin"/>
                    </div>
                    <div className="lktr-result">Реультат</div>
                </div>
                <div className="lkt-row">
                    <div className="lktr-date">01.10.2022</div>
                    <div className="lktr-time">20:54:46</div>
                    <div className="lktr-type">Двойной исход</div>
                    <div className="lktr-sum">10 000
                        <div className="global-ico gi-coin"/>
                    </div>
                    <div className="lktr-result">Реультат</div>
                </div>
                <div className="lkt-row">
                    <div className="lktr-date">01.10.2022</div>
                    <div className="lktr-time">20:54:46</div>
                    <div className="lktr-type">Двойной исход</div>
                    <div className="lktr-sum">10 000
                        <div className="global-ico gi-coin"/>
                    </div>
                    <div className="lktr-result">Реультат</div>
                </div>
                <div className="lkt-row">
                    <div className="lktr-date">01.10.2022</div>
                    <div className="lktr-time">20:54:46</div>
                    <div className="lktr-type">Двойной исход</div>
                    <div className="lktr-sum">10 000
                        <div className="global-ico gi-coin"/>
                    </div>
                    <div className="lktr-result">Реультат</div>
                </div>
            </div>
        </div>
    )
}

const Operations: FC<IBetsProps> = ({handleChangeType}) => {
    return (
        <div id="lk-mid">
            <div className="lk-table">
                <div className="lkt-filter">
                    <div className="lktf-bttns">
                        <div onClick={() => handleChangeType('bets')}
                            className="lktfb-one">Пари</div>
                        <div onClick={() => handleChangeType('operations')}
                            className="lktfb-one">Операции</div>
                    </div>
                    <div className="lktf-shedule">
                        <div className="lktfs-bttn">
                            <div className="global-ico gi-shedule"/>
                            <span>Показать за неделю</span>
                            <div className="global-ico gi-arrow-bot-g"/>
                        </div>
                    </div>
                </div>
                <div className="lkt-row lktr-title">
                    <div className="lktr-date">Дата</div>
                    <div className="lktr-time">Время</div>
                    <div className="lktr-type">Операция</div>
                    <div className="lktr-sum">Сумма</div>
                    <div className="lktr-result">Остаток</div>
                </div>
                <div className="lkt-row">
                    <div className="lktr-date">01.10.2022</div>
                    <div className="lktr-time">20:54:46</div>
                    <div className="lktr-type">Двойной исход</div>
                    <div className="lktr-sum">10 000
                        <div className="global-ico gi-coin"/>
                    </div>
                    <div className="lktr-result">10 000
                        <div className="global-ico gi-coin"/>
                    </div>
                </div>
                <div className="lkt-row">
                    <div className="lktr-date">01.10.2022</div>
                    <div className="lktr-time">20:54:46</div>
                    <div className="lktr-type">Двойной исход</div>
                    <div className="lktr-sum">10 000
                        <div className="global-ico gi-coin"/>
                    </div>
                    <div className="lktr-result">10 000
                        <div className="global-ico gi-coin"/>
                    </div>
                </div>
                <div className="lkt-row">
                    <div className="lktr-date">01.10.2022</div>
                    <div className="lktr-time">20:54:46</div>
                    <div className="lktr-type">Двойной исход</div>
                    <div className="lktr-sum">10 000
                        <div className="global-ico gi-coin"/>
                    </div>
                    <div className="lktr-result">10 000
                        <div className="global-ico gi-coin"/>
                    </div>
                </div>
                <div className="lkt-row">
                    <div className="lktr-date">01.10.2022</div>
                    <div className="lktr-time">20:54:46</div>
                    <div className="lktr-type">Двойной исход</div>
                    <div className="lktr-sum">10 000
                        <div className="global-ico gi-coin"/>
                    </div>
                    <div className="lktr-result">10 000
                        <div className="global-ico gi-coin"/>
                    </div>
                </div>
                <div className="lkt-row">
                    <div className="lktr-date">01.10.2022</div>
                    <div className="lktr-time">20:54:46</div>
                    <div className="lktr-type">Двойной исход</div>
                    <div className="lktr-sum">10 000
                        <div className="global-ico gi-coin"/>
                    </div>
                    <div className="lktr-result">10 000
                        <div className="global-ico gi-coin"/>
                    </div>
                </div>
                <div className="lkt-row">
                    <div className="lktr-date">01.10.2022</div>
                    <div className="lktr-time">20:54:46</div>
                    <div className="lktr-type">Двойной исход</div>
                    <div className="lktr-sum">10 000
                        <div className="global-ico gi-coin"/>
                    </div>
                    <div className="lktr-result">10 000
                        <div className="global-ico gi-coin"/>
                    </div>
                </div>
                <div className="lkt-row">
                    <div className="lktr-date">01.10.2022</div>
                    <div className="lktr-time">20:54:46</div>
                    <div className="lktr-type">Двойной исход</div>
                    <div className="lktr-sum">10 000
                        <div className="global-ico gi-coin"/>
                    </div>
                    <div className="lktr-result">10 000
                        <div className="global-ico gi-coin"/>
                    </div>
                </div>
                <div className="lkt-row">
                    <div className="lktr-date">01.10.2022</div>
                    <div className="lktr-time">20:54:46</div>
                    <div className="lktr-type">Двойной исход</div>
                    <div className="lktr-sum">10 000
                        <div className="global-ico gi-coin"/>
                    </div>
                    <div className="lktr-result">10 000
                        <div className="global-ico gi-coin"/>
                    </div>
                </div>
                <div className="lkt-row">
                    <div className="lktr-date">01.10.2022</div>
                    <div className="lktr-time">20:54:46</div>
                    <div className="lktr-type">Двойной исход</div>
                    <div className="lktr-sum">10 000
                        <div className="global-ico gi-coin"/>
                    </div>
                    <div className="lktr-result">10 000
                        <div className="global-ico gi-coin"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

const BetsScreen: FC = () => {
    const [type, setType] = useState('bets')

    const handleChangeType = (value: string) => {
        setType(value)
    }

    return (
        <div id="content-wr">
            <LeftBar active={type}/>
            {type === 'bets' && <Bets handleChangeType={handleChangeType}/>}
            {type === 'operations' && <Operations handleChangeType={handleChangeType}/>}
            <RightBar/>
        </div>
    );
};

export default BetsScreen;
