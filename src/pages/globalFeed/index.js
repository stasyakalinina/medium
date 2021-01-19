import React, {Fragment, useEffect} from 'react'

import useFetch from '../../hooks/useFetch'
import Feed from '../../components/Feed'
import Pagination from '../../components/Pagination'
import {getPaginator, limit} from '../../utils'

const GlobalFeed = ({location, match}) => {
  const {currentPage, offset} = getPaginator(location.search)
  const apiUrl = `/articles?limit=${limit}&offset=${offset}`
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
      <section className="home-page__content">
        {isLoading && <p>Loading...</p>}
        {error && <p>Something went wrong...</p>}
        {!isLoading && response && (
          <Fragment>
            <Feed articles={response.articles} />
            <Pagination total={response.articlesCount} limit={limit} currentPage={currentPage} url={url} />
          </Fragment>
        )}
      </section>
      <aside className="home-page__sidebar">
        <h2>Popular tags</h2>
      </aside>
    </main>
  )
}

export default GlobalFeed
