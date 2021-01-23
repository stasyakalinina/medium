import React from 'react'
import {NavLink} from 'react-router-dom'

const FeedToggler = ({tagName}) => {
  return (
    <section className="feedToggler">
      <ul className="feedToggler__list">
        <li className="feedToggler__item">
          <NavLink to='/feed' className="feedToggler__link">
            Your feed
          </NavLink>
        </li>
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