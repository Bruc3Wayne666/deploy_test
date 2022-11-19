import React, {FC} from 'react';

const CyberSport:FC = () => {
    return (
        <div
            style={{
                marginTop: window.innerWidth > 1440 ? 100 : 300,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
        }}>
            <h1>Мы работаем над этим</h1>
            <h1>Совсем скоро!</h1>
        </div>
    );
};

export default CyberSport;
