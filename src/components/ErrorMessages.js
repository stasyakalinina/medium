import React from 'react';
import '../index.scss';

const ErrorMessages = ({msg}) => {
    const errorMessages = Object.keys(msg).map((name) => {
        const messages = msg[name].join(' ');
        return `${name} ${messages}`;
    })
    
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

export default ErrorMessages;