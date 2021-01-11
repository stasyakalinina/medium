import React, {useEffect} from 'react';

import useFetch from "../../hooks/useFetch";
import Feed from "../../components/Feed";

const GlobalFeed = () => {
    const apiUrl = '/articles?limit=10&offset=0';
    const [{response, isLoading, error}, doFetch] = useFetch(apiUrl);
    
    useEffect(() => {
        doFetch()
    }, [doFetch]);
    
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
                    <Feed articles={response.articles}/>
                )}
            </section>
            <aside className="home-page__sidebar">
                <h2>Popular tags</h2>
            </aside>
        </main>
    )
}

export default GlobalFeed;