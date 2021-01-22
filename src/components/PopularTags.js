import React, {Fragment, useEffect} from 'react'
import useFetch from '../hooks/useFetch'
import Loading from './Loading'
import ErrorMessage from './ErrorMessage'
import {Link} from 'react-router-dom'

const PopularTags = () => {
  const [{response, isLoading, error}, doFetch] = useFetch('/tags')
  
  useEffect(() => {
      doFetch()
  }, [doFetch])
  
  if (isLoading || !response) {
    return <Loading />
  }
  
  if (error) {
    return <ErrorMessage isForm={false} msg={error}/>
  }
  
  return (
    <Fragment>
      <h2>Popular tags</h2>
      <ul className="tags">
        {
          response.tags.map(tag => (
            <li key={tag} className="tags__item">
              <Link to={`/tags/${tag}`} className="tags__link">
                {tag}
              </Link>
            </li>
          ))
        }
      </ul>
    </Fragment>
  )
}

export default PopularTags