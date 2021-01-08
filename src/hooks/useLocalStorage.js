import {useState} from 'react';

const useLocalStorage = (key, initialValue = '') => {
    const [value, setValue] = useState(() => {
        return localStorage.getItem(key) || initialValue
    })
    
    const setStoredValue = (value) => {
        setValue(value)
        localStorage.setItem(key, value)
    }
    
    return [value, setStoredValue];
};

export default useLocalStorage;