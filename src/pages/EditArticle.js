import React, {useState, useEffect, useContext} from 'react';
import PostForm from "../components/PostForm";
import useFetch from "../hooks/useFetch";
import {Redirect} from 'react-router-dom';
import {CurrentUserContext} from "../context/currentUser";

const EditArticle = ({match}) => {
  const slug = match.params.slug
  const apiUrl = `/articles/${slug}`
  const [{response: fetchArticleResponse}, doFetchArticle] = useFetch(apiUrl)
  const [{response: updateArticleResponse, error: updateArticleError}, doUpdate] = useFetch(apiUrl)
  const [initialValues, setInitialValues] = useState(null)
  const [currentUserState] = useContext(CurrentUserContext)
  const [successSubmit, setSuccessSubmit] = useState(false)
  
  useEffect(() => {
    doFetchArticle()
  }, [doFetchArticle])
  
  useEffect(() => {
    if (!fetchArticleResponse) {
        return
    }
    setInitialValues({
      title: fetchArticleResponse.article.title,
      description: fetchArticleResponse.article.description,
      body: fetchArticleResponse.article.body,
      tagList: fetchArticleResponse.article.tagList,
    })
  }, [fetchArticleResponse])
  
  const handleForm = (article) => {
    doUpdate({
      method: 'put',
      data: {article}
    })
  }

  useEffect(() => {
    if (!updateArticleResponse) {
      return
    }
    setSuccessSubmit(true)
  }, [updateArticleResponse])

  if (currentUserState.isLoggedIn === false) {
    return <Redirect to="/"/>
  }

  if (successSubmit) {
    return <Redirect to={`/articles/${slug}`}/>
  }
  
  return (
    <div className="container">
      <h1>Edit Post</h1>
      <PostForm errors={(updateArticleError && updateArticleError.errors) || []}
                initialValues={initialValues}
                handleForm={handleForm}
      />
    </div>
  )}

export default EditArticle