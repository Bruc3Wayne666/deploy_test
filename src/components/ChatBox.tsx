import React, {useEffect} from 'react';

const ChatBox = () => {
    // useEffect(() => {
    //     const script = document.createElement('script');
    //
    //     script.src = 'https://code.jivo.ru/widget/MgAeR2eRHq';
    //     script.async = true;
    //
    //     document.querySelector('.chatbox')?.appendChild(script);
    //
    //     return () => {
    //         document.body.removeChild(script);
    //     }
    // }, [])

    return (
        <div id={'chatbox'} style={{zIndex: 9999, position: 'fixed'}}>
            ChatBox
        </div>
    );
};

export default ChatBox;
