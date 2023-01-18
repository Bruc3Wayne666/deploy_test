import React, {FC, useEffect} from 'react';
import {useNavigate} from "react-router-dom";

const CyberSport:FC = () => {
    const navigate = useNavigate()
    // if (result === 0 || result == null) {
    //     return (
    //         <div
    //             style={{
    //                 // height: window.innerWidth <= 1440 ? '80vh' : '',
    //                 marginTop: window.innerWidth > 1440 ? 160 : '60%',
    //                 // border: '1px solid white',
    //                 display: 'flex',
    //                 alignItems: 'center',
    //                 justifyContent: 'center',
    //                 padding: 16,
    //                 flexDirection: 'column'
    //             }}>
    //             <p
    //                 style={{
    //                     fontSize: 18
    //                 }}
    //             >
    //                 В данный момент нет идущих событий
    //             </p>
    //             <button
    //                 onClick={() => navigate(-1)}
    //                 style={{
    //                     marginTop: 12,
    //                     backgroundColor: '#cc9933',
    //                     padding: '8px 12px',
    //                     borderRadius: 8,
    //                     border: 'none'
    //                 }}
    //             >
    //                 Вернутся назад
    //             </button>
    //         </div>
    //     )
    // }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    return (
        <div
            style={{
                marginTop: window.innerWidth > 1440 ? 100 : 300,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
        }}>
            <h1>Мы работаем над этим</h1>
            <h1>Совсем скоро!</h1>
            <button
                onClick={() => navigate(-1)}
                style={{
                    marginTop: 12,
                    backgroundColor: '#cc9933',
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: 'none',
                    cursor: 'pointer'
                }}
            >
                Вернутся назад
            </button>
        </div>
    );
};

export default CyberSport;
