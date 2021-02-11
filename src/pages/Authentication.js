import React, {useState, useEffect, useContext} from 'react'
import {Link, Redirect} from 'react-router-dom'

import useFetch from '../hooks/useFetch'
import useLocalStorage from '../hooks/useLocalStorage'
import {CurrentUserContext} from '../context/currentUser'
import ErrorMessage from '../components/ErrorMessage'

const Authentication = (props) => {
  const isLogin = props.match.path === '/login'
  const apiUrl = isLogin ? '/users/login' : '/users'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [isSuccessSubmit, setIsSuccessSubmit] = useState(false)
  const [{response, isLoading, error}, doFetch] = useFetch(apiUrl)
  const [, setStoredValue] = useLocalStorage('token')
  const [, dispatch] = useContext(CurrentUserContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    const user = isLogin ? {email, password} : {email, password, username}
    doFetch({
      method: 'post',
      data: {
        user,
      },
    })
  }

  useEffect(() => {
    if (!response) {
      return
    }
    setStoredValue(response.user.token)
    setIsSuccessSubmit(true)
    dispatch({type:'SET_AUTHORIZED', payload: response.user})
  }, [dispatch, response, setStoredValue])

  if (isSuccessSubmit) {
    return <Redirect to="/" />
  }

  return (
    <div className="auth">
      <h1 className="auth__title">{isLogin ? 'Sign In' : 'Sign Up'}</h1>
      <Link to={isLogin ? '/login' : '/register'} className="auth__link">
        {isLogin ? 'Need an account?' : 'Have an account?'}
      </Link>
      <form className="auth__form" onSubmit={handleSubmit}>
        {error && <ErrorMessage msg={error.errors} isForm={true}/>}
        {!isLogin && (
          <fieldset>
            <input
              type="text"
              className="auth__input"
              placeholder="Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </fieldset>
        )}
        <fieldset>
          <input
            type="email"
            className="auth__input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <input
            type="password"
            className="auth__input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>
        <button className="auth__btn" type="submit" disabled={isLoading}>
          {isLogin ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
    </div>
  )
}

export default Authentication
