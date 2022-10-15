import React, {FC} from 'react';

const ContentContainer:FC<any> = ({children}) => {
    return (
        <div id="content">
            {children}
        </div>
    );
};

export default ContentContainer;
