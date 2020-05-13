import React from 'react';
import './receiptWindow.css';

const ReceiptWindow = props => {

    return(
        <div class="receiptWindow" onClick={props.toggleReceiptImg}>
            <img src={props.currReceiptImg} class="receiptImgBig"></img>
        </div>
    )

};

export default ReceiptWindow;