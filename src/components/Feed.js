import React from 'react';
import {Link} from "react-router-dom";
import TagList from './TagList';
import ArticleMeta from "./ArticleMeta";

const Feed = ({articles}) => {
    return (
      <ul className="articles" >
        {articles.map((article, index) => (
          <li key={index} className="articles__item">
            <div className="article">
              <ArticleMeta data={article} />
              <div className="article__preview">
                <h3 className="article__title">{article.title}</h3>
                <p className="article__description">{article.description}</p>
                <Link className="article__more" to={`/articles/${article.slug}`} >Read more...</Link>
                <TagList tags={article.tagList} />
              </div>
            </div>
            </li>
          ))}
      </ul>
    )
};

export default Feed