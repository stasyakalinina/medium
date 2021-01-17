import {useEffect, useState, useCallback} from 'react'
import axios from "axios";

import useLocalStorage from "./useLocalStorage";

const useFetch = (url) => {
   const baseUrl = 'https://conduit.productionready.io/api'
   const [response, setResponse] = useState(null)
   const [isLoading, setIsLoading] = useState(false)
   const [error, setError] = useState(null)
   const [options, setOptions] = useState({})
   const [token] = useLocalStorage('token')
   //
   const doFetch = useCallback((options) => {
      debugger
      setOptions(options);
      setIsLoading(true);
   }, [])
   
   useEffect(() => {
      
      const requestOptions = {
         ...options,
         ...{
            headers: {
               authorization: token ? `Token ${token}` : ''
            }
         }
      }
      debugger
      if (!isLoading) {
         return
      }
      
      axios(baseUrl + url, requestOptions
      ).then(res => {
         console.log("result success", res)
         setResponse(res.data)
         setIsLoading(false)
         
      }).catch(err => {
         console.log('error', err.response.data)
         setError(err.response.data)
         setIsLoading(false)
      })
   }, [isLoading, options, url, token]);
   
   return [{response, isLoading, error}, doFetch];
}

export default useFetch;