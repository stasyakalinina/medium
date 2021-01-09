import {useEffect, useState} from 'react'
import axios from "axios";

const useFetch = (url) => {
   const baseUrl = 'https://conduit.productionready.io/api'
   const [response, setResponse] = useState(null)
   const [isLoading, setIsLoading] = useState(false)
   const [error, setError] = useState(null)
   const [options, setOptions] = useState({})
   
   const doFetch = (options) => {
      setOptions(options);
      setIsLoading(true);
   }
   
   useEffect(() => {
      if (!isLoading) {
         return
      }
      
      axios(baseUrl + url, options
      ).then(res => {
         console.log("result success", res)
         setResponse(res.data)
         setIsLoading(false)
         
      }).catch(err => {
         console.log('error', err.response.data)
         setError(err.response.data)
         setIsLoading(false)
      })
   }, [isLoading, options, url]);
   
   return [{response, isLoading, error}, doFetch]
}

export default useFetch;