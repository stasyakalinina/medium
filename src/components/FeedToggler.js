import React, {useContext} from 'react'
import {NavLink} from 'react-router-dom'

import {CurrentUserContext} from '../context/currentUser'

const FeedToggler = ({tagName}) => {
  const [currentUserState] = useContext(CurrentUserContext)
  return (
    <section className="feedToggler">
      <ul className="feedToggler__list">
        {currentUserState.isLoggedIn && (
          <li className="feedToggler__item">
          <NavLink to='/feed' className="feedToggler__link">
            Your feed
          </NavLink>
        </li>
        )}
        <li className="feedToggler__item">
          <NavLink to='/' className="feedToggler__link" exact>
            Global feed
          </NavLink>
        </li>
        {tagName && (
          <li className="feedToggler__item">
            <NavLink to={`/tags/${tagName}`} className="feedToggler__link">
              <i className="ion-pound"></i>
              {tagName}
            </NavLink>
          </li>
        )}
      </ul>
    </section>
  )
}
export default FeedToggler