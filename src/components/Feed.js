import React from 'react';
import {Link} from "react-router-dom";

const Feed = ({articles}) => {

    return (
      <ul className="articles" >
        {articles.map((article, index) => (

          <li key={index} className="articles__item">
            <div className="article">
              <div className="article__meta">
                <Link to={`/profiles/${article.author.username}`} className="article__ava">
                  <img src={article.author.image} alt="author pic"/>
                </Link>
                <p className="article__info">
                  <Link to={`/profiles/${article.author.username}`} className="article__author">
                    {article.author.username}
                  </Link>
                  <span className="article__date">{article.createdAt}</span>
                </p>
              </div>
              <div className="article__preview">
                <h3 className="article__title">{article.title}</h3>
                <p className="article__description">{article.description}</p>
                <Link className="article__more" to={`/articles/${article.slug}`} >Read more...</Link>
                <ul className="article__tags tags">
                  {article.tagList.map(tag => (
                    <li key={tag} className="tags__item">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            </li>
          ))}
      </ul>
    )
};

export default Feed