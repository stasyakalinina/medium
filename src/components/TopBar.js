import React, {Fragment, useContext} from 'react';
import {Link, NavLink} from "react-router-dom";

import '../index.scss';
import {CurrentUserContext} from "../context/currentUser";

const TopBar = () => {
    const [currentUseState] = useContext(CurrentUserContext);
    
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
                    {
                        !currentUseState.isLoggedIn && (
                            <Fragment>
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
                            </Fragment>
                        )
                    }
                    {
                        currentUseState.isLoggedIn && (
                            <Fragment>
                                <li className="nav__item">
                                    <NavLink to="/articles/new" className="nav__link">
                                        <i className="ion-compose nav__icon">
                                            &nbsp;New Post
                                        </i>
                                    </NavLink>
                                </li>
                                <li className="nav__item">
                                    <NavLink to="/settings" className="nav__link">
                                        <i className="ion-gear-a nav__icon">
                                            &nbsp;Settings
                                        </i>
                                    </NavLink>
                                </li>
                                <li className="nav__item">
                                    <NavLink to={`/profile/${currentUseState.currentUser.username}`} className="nav__link">
                                        <img className="user-pic"
                                             src={currentUseState.currentUser.image}
                                             alt="avatar"/>
                                        {currentUseState.currentUser.username}
                                    </NavLink>
                                </li>
                            </Fragment>
                        )
                    }
                </ul>
            </nav>
        </header>
    )
}

export default TopBar;