import React from 'react';
import {Link} from "react-router-dom";

const ArticleMeta = ({data}) => {
  return (
    <div className="article-meta">
      <Link to={`/profiles/${data.author.username}`} className="article-meta__ava">
        <img src={data.author.image} alt="author pic"/>
      </Link>
      <p className="article-meta__info">
        <Link to={`/profiles/${data.author.username}`} className="article-meta__author">
          {data.author.username}
        </Link>
        <span className="article-meta__date">{data.createdAt}</span>
      </p>
    </div>
  )
}

export default ArticleMeta;