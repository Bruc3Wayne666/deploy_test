import React, {FC} from 'react';

export const ContentContainer:FC<any> = ({children}) => {
    return (
        <div id="content">
            {children}
        </div>
    );
};
