import React, {Fragment, useEffect} from 'react'

import useFetch from '../hooks/useFetch'
import Feed from '../components/Feed'
import Pagination from '../components/Pagination'
import PopularTags from '../components/PopularTags'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import FeedToggler from '../components/FeedToggler'
import {getPaginator, limit} from '../utils'
import '../index.scss'

const YourFeed = ({location, match}) => {
  const {currentPage, offset} = getPaginator(location.search)
  const apiUrl = `/articles/feed?limit=${limit}&offset=${offset}`
  const [{response, isLoading, error}, doFetch] = useFetch(apiUrl)
  const url = match.url

  useEffect(() => {
    doFetch()
  }, [doFetch, currentPage])

  return (
    <main className="home-page">
      <section className="home-page__banner">
        <h1>Medium clone</h1>
        <p>A place to share knowledge</p>
      </section>
      <div className="container">
        <section className="home-page__content">
          <FeedToggler />
          {isLoading && <Loading />}
          {error && <ErrorMessage isForm={false} msg={error}/>}
          {!isLoading && response && (
            <Fragment>
              <Feed articles={response.articles} />
              <Pagination total={response.articlesCount} limit={limit} currentPage={currentPage} url={url} />
            </Fragment>
          )}
        </section>
        <aside className="home-page__sidebar">
          <PopularTags />
        </aside>
      </div>
    </main>
  )
}

export default YourFeed

