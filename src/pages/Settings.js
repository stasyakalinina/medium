import React, {useContext, useEffect, useState} from 'react'
import {Redirect} from 'react-router-dom'

import useFetch from "../hooks/useFetch";
import useLocalStorage from "../hooks/useLocalStorage";
import {CurrentUserContext} from "../context/currentUser";
import ErrorMessage from "../components/ErrorMessage";

const Settings = () => {
  const [currentUserState, dispatch] = useContext(CurrentUserContext)
  console.log({currentUserState})
  const apiUrl = '/user'
  const [{response, error}, doFetch] = useFetch(apiUrl)
  const [image, setImage] = useState('')
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [, setToken] = useLocalStorage('token')
  const [successLogOut, setSuccessLogOut] = useState(false)
  
  const handleSubmit = (e) => {
    e.preventDefault();
    doFetch({
      method: 'put',
      data: {
        user: {
          ...currentUserState.currentUser,
          image,
          username,
          bio,
          email,
          password
        }
      }
    })
  }
  
  const logout = (e) => {
    e.preventDefault();
    setToken('')
    dispatch({type: 'LOGOUT'})
    setSuccessLogOut(true)
  }
  
  useEffect(() => {
    if (!currentUserState.currentUser) {
      return
    }
    setImage(currentUserState.currentUser.image)
    setUsername(currentUserState.currentUser.username)
    if (currentUserState.currentUser.bio) {
      setBio(currentUserState.currentUser.bio)
    }
    setEmail(currentUserState.currentUser.email)
  }, [currentUserState.currentUser])
  
  useEffect(() => {
    if (!response){
      return
    }
    dispatch({type: 'SET_AUTHORIZED', payload: response.user})
  }, [response, dispatch])
  
  if (successLogOut) {
     return <Redirect to="/" />
  }
  
  return (
    <section className="settings container">
      <h1>Settings</h1>
      {error && <ErrorMessage msg={error.errors} isForm={true}/>}
      <form className="settings__form form" onSubmit={handleSubmit}>
        <fieldset className="form__field">
          <input type="text"
                 className="form__input"
                 placeholder="URL profile picture"
                 value={image}
                 onChange={(e) => setImage(e.target.value)}/>
        </fieldset>
        <fieldset className="form__field">
          <input type="text"
                 className="form__input"
                 placeholder="Username"
                 value={username}
                 onChange={(e) => setUsername(e.target.value)}/>
        </fieldset>
        <fieldset className="form__field">
            <textarea className="form__input"
                      placeholder="Short bio"
                      rows="8"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}></textarea>
        </fieldset>
        <fieldset className="form__field">
          <input type="email"
                 className="form__input"
                 placeholder="Email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}/>
        </fieldset>
        <fieldset className="form__field">
          <input type="password"
                 className="form__input"
                 placeholder="Password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}/>
        </fieldset>
        <fieldset className="form__field form__field--submit">
          <button type="submit"
                  className="form__btn">
            Update Settings
          </button>
        </fieldset>
      </form>
      <hr/>
      <button className="settings__btn" onClick={logout}>Log out</button>
    </section>
  )}

export default Settings