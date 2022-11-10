import React, {FC, useState} from 'react';
import {Link} from "react-router-dom";


const Btn: FC = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', marginRight: 14}}>
            <div style={{
                width: 24, height: 5, backgroundColor: 'white', margin: 2
            }}></div>
            <div style={{
                width: 24, height: 5, backgroundColor: 'white', margin: 2
            }}></div>
            <div style={{
                width: 24, height: 5, backgroundColor: 'white', margin: 2
            }}></div>
        </div>
    )
}

const HeaderMobile: FC = () => {
    const [show, setShow] = useState(false)

    if (!show) return (
        <div id="mobile-header">
            <div
                style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 52}}
            >
                <div style={{width: '24%'}}>
                    <button
                        onClick={() => setShow(true)}
                        style={{backgroundColor: '#cc9933', border: 'none', display: 'flex', justifyContent: 'space-between', height: 52, alignItems: 'center'}}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-around'
                            }}
                        >
                            <Btn/>
                            <span>
                                GPBET
                            </span>
                        </div>
                    </button>
                </div>
                <div>
                    <Link to={'/profile'}>АВТОРИЗАЦИЯ</Link>
                </div>
            </div>
        </div>
    )

    return (
        <header>
            <div>
                <Link to='/'>
                    <div style={{
                        cursor: 'pointer',
                        backgroundColor: '#CC9933',
                        height: 42,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottom: 'solid 1px darkgrey'
                    }}>Спорт</div>
                </Link>
                <Link to='/'>
                    <div style={{
                        cursor: 'pointer',
                        backgroundColor: '#CC9933',
                        height: 42,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottom: 'solid 1px darkgrey'
                    }}>Live</div>
                </Link>
                <Link to='/results'>
                    <div style={{
                        cursor: 'pointer',
                        backgroundColor: '#CC9933',
                        height: 42,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottom: 'solid 1px darkgrey'
                    }}>Киберспорт</div>
                </Link>
                <Link to='/discounts'>
                    <div style={{
                        cursor: 'pointer',
                        backgroundColor: '#CC9933',
                        height: 42,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottom: 'solid 1px darkgrey'
                    }}>Акции</div>
                </Link>
                <Link to='/'>
                    <div style={{
                        cursor: 'pointer',
                        backgroundColor: '#CC9933',
                        height: 42,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottom: 'solid 1px darkgrey'
                    }}>Статистика</div>
                </Link>
                <div onClick={() => setShow(false)} style={{
                    cursor: 'pointer',
                    backgroundColor: 'transparent',
                    height: 42,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottom: 'solid 1px darkgrey'
                }}>Скрыть</div>
            </div>
        </header>
    );
};

export default HeaderMobile;
