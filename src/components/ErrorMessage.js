import React from 'react';
import '../index.scss';

const ErrorMessage = ({msg, isForm}) => {
    let errorMessages = msg
    console.log({msg})
    if (isForm) {
        errorMessages = Object.keys(msg).map((name) => {
            const messages = msg[name].join(' ');
            return `${name} ${messages}`;
        })
    }
    
    return (
        <ul className="errors">
            {
                errorMessages.map((item) => (
                        <li className="errors__item" key={item}>{item}</li>
                ))
            }
        </ul>
    )
};

export default ErrorMessage;