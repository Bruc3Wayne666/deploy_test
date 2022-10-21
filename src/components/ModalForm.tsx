import React, { FC } from 'react';

const ModalForm: FC<any> = ({show}) => {
    return show && (
        <div>
            <h1>MODAL WINDOW</h1>
        </div>
    );
};

export default ModalForm;
