import React, {useState, useEffect, useContext} from 'react';
import PostForm from "../components/PostForm";
import useFetch from "../hooks/useFetch";
import {Redirect} from 'react-router-dom';
import {CurrentUserContext} from "../context/currentUser";

const CreateArticle = () => {
  const apiUrl = '/articles'
  const [{response, error}, doFetch] = useFetch(apiUrl)
  const initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: []
  }
  const [currentUserState] = useContext(CurrentUserContext);
  const [successSubmit, setSuccessSubmit] = useState(false)
  
  const handleForm = (article) => {
    console.log('handle submit', article)
    doFetch({
      method: 'post',
      data: {article}
    })
  }
  
  useEffect(() => {
     if (!response) {
       return
     }
    setSuccessSubmit(true)
  }, [response])
  
  if (currentUserState.isLoggedIn === false){
    return <Redirect to="/"/>
  }
  
  if (successSubmit) {
    return <Redirect to={`/articles/${response.article.slug}`}/>
  }
  
  return (
    <div className="container">
      <h1>Create Post</h1>
      <PostForm errors={(error && error.errors) || []}
                initialValues={initialValues}
                handleForm={handleForm}
      />
    </div>
  )}

export default CreateArticle