import React from 'react';
import {Link, NavLink} from "react-router-dom";
import '../index.scss';

const TopBar = () => {
    return (
        <header className="header">
            <nav className="header__nav nav">
                <Link to="/" className="nav__logo">
                   Medium
                </Link>
                <ul className="nav__list">
                    <li className="nav__item">
                        <NavLink to="/" className="nav__link" exact>
                            Home
                        </NavLink>
                    </li>
                    <li className="nav__item">
                        <NavLink to="/login" className="nav__link">
                            Sign in
                        </NavLink>
                    </li>
                    <li className="nav__item">
                        <NavLink to="/register" className="nav__link">
                            Sign up
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default TopBar;