import React, {FC} from 'react';


const Help: FC = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: window.innerWidth > 1440 ? '10%' : '30%'
            }}
        >
            <h1>Ссылка на Telegram: @TimurkaABS</h1>
        </div>
    );
};

export default Help;
