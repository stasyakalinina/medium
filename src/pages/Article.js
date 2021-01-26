import React, {useEffect} from 'react';
import useFetch from '../hooks/useFetch'

const Article = (props) => {
  const slug = props.match.params.slug
  const apiUrl = `/articles/${slug}`
  const [{response, error, isLoading}, doFetch] = useFetch(apiUrl)

  useEffect(() => {
    doFetch()
  }, [doFetch])

  return (
    <section>Article</section>
  )
}

export default Article;