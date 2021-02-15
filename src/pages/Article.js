import React, {useState,useEffect, useContext} from 'react'
import {Link, Redirect} from "react-router-dom"
import useFetch from '../hooks/useFetch'
import Loading from "../components/Loading"
import ErrorMessage from "../components/ErrorMessage"
import ArticleMeta from "../components/ArticleMeta"
import TagList from "../components/TagList"
import {CurrentUserContext} from "../context/currentUser";

const Article = (props) => {
  const slug = props.match.params.slug
  const apiUrl = `/articles/${slug}`
  const [{response: fetchArticleResponse, error: fetchArticleError, isLoading: fetchArticleLoading}, doFetch] = useFetch(apiUrl)
  const [{response: deleteArticleResponse}, doDeleteArticle] = useFetch(apiUrl)
  const [currentUserState] = useContext(CurrentUserContext)
  const [successDelete, setSuccessDelete] = useState(false)
  
  const isAuthor = () => {
    if (!fetchArticleResponse || !currentUserState.isLoggedIn) {
        return false
    }
    return fetchArticleResponse.article.author.username === currentUserState.currentUser.username
  }
  
  const deleteArticle = (e) => {
    doDeleteArticle({
      method: 'delete'
    })
  }

  useEffect(() => {
    doFetch()
  }, [doFetch])
  
  useEffect(() => {
    if (!deleteArticleResponse) {
      return
    }
    setSuccessDelete(true)
  }, [deleteArticleResponse])
  
  if (successDelete) {
    return <Redirect to="/" />
  }
 
  return (
    <section className="article-page">
      {fetchArticleLoading && <Loading/>}
      {fetchArticleError && <ErrorMessage />}
      {!fetchArticleLoading && fetchArticleResponse && (
        <section className="article-page__banner">
          <div className="container">
            <h1>{fetchArticleResponse.article.title}</h1>
            <ArticleMeta data={fetchArticleResponse.article}/>
            {isAuthor() && (
              <p className="article-page__tools article-tools">
                <Link className="article-tools__edit"
                  to={`/articles/${fetchArticleResponse.article.slug}/edit`}>
                  <i className="ion-edit"> </i>
                  Edit Article
                </Link>
                <button className="article-tools__delete"
                        onClick={deleteArticle}>
                  <i className="ion-trash-a"> </i>
                  Delete Article
                </button>
              </p>
            )}
          </div>
        </section>
      )}
      <div className="container">
        {fetchArticleLoading && <Loading/>}
        {fetchArticleError && <ErrorMessage />}
        {!fetchArticleLoading && fetchArticleResponse && (
          <section className="article-page__content">
            <p>{fetchArticleResponse.article.body}</p>
            <TagList tags={fetchArticleResponse.article.tagList} />
          </section>
        )}
      </div>
    </section>
  )
}

export default Article;