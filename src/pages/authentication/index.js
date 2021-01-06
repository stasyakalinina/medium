import React, {useState} from 'react'
import {Link} from "react-router-dom";

const Authentication = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('data', email, password);
    }
    
    return (
        <div className="auth">
            <h1>Login</h1>
            <Link to="register" className="auth__link">
                Need an account?
            </Link>
            <form className="auth__form"
                  onSubmit={handleSubmit}
            >
                <fieldset>
                   <input type="email"
                          className="auth__input"
                          placeholder="Email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                   />
                </fieldset>
                <fieldset>
                    <input type="password"
                           className="auth__input"
                           placeholder="Password"
                           value={password}
                           onChange={e => setPassword(e.target.value)}
                    />
                </fieldset>
                <button className="auth__btn" type="submit">Sign in</button>
            </form>
        </div>
    )
};

export default Authentication;