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
    <section className="auth container">
      <h1 className="auth__title">{isLogin ? 'Sign In' : 'Sign Up'}</h1>
      <Link to={isLogin ? '/login' : '/register'} className="auth__link">
        {isLogin ? 'Need an account?' : 'Have an account?'}
      </Link>
      <form className="auth__form form" onSubmit={handleSubmit}>
        {error && <ErrorMessage msg={error.errors} isForm={true}/>}
        {!isLogin && (
          <fieldset className="form__field">
            <input
              type="text"
              className="form__input"
              placeholder="Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </fieldset>
        )}
        <fieldset className="form__field">
          <input
            type="email"
            className="form__input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>
        <fieldset className="form__field">
          <input
            type="password"
            className="form__input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>
        <button className="form__btn" type="submit" disabled={isLoading}>
          {isLogin ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
    </section>
  )
}

export default Authentication
