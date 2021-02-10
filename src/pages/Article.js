import React, {Fragment, useEffect} from 'react';
import useFetch from '../hooks/useFetch'
import {Link} from "react-router-dom";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import ArticleMeta from "../components/ArticleMeta";
import TagList from "../components/TagList";

const Article = (props) => {
  const slug = props.match.params.slug
  const apiUrl = `/articles/${slug}`
  const [{response, error, isLoading}, doFetch] = useFetch(apiUrl)

  useEffect(() => {
    doFetch()
  }, [doFetch])
  console.log(response)
  return (
    <section className="article-page">
      {isLoading && <Loading/>}
      {error && <ErrorMessage />}
      {!isLoading && response && (
        <section className="article-page__banner">
          <div className="container">
            <h1>{response.article.title}</h1>
            <ArticleMeta data={response.article}/>
          </div>
        </section>
      )}
      <div className="container">
        {isLoading && <Loading/>}
        {error && <ErrorMessage />}
        {!isLoading && response && (
          <section className="article-page__content">
            <p>{response.article.body}</p>
            <TagList tags={response.article.tagList} />
          </section>
        )}
      </div>
    </section>
  )
}

export default Article;