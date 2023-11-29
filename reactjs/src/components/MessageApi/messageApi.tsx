

import { message } from 'antd';
import { L } from '../../lib/abpUtility';


export const success = (content:string) => {
    message.open({
        type:"success",
        content: L(content),
        duration: 2,
        style: {
            fontSize: "16px",
            borderRadius: "50px", 
        },
    });
};
export const error = (content:string) => {
    message.open({
        type:"error",
        content: L(content),
        duration: 2,
        style: {
            fontSize: "16px",
            borderRadius: "50px", 
        },
    });
};



export const warning = (content:string) => {
    message.open({
        type:"warning",
        content: L(content),
        duration: 2,
        style: {
            fontSize: "16px",
            borderRadius: "50px", 
        },
    });
};
