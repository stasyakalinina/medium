import React from 'react';
import {Link} from "react-router-dom";

const Feed = ({articles}) => {
    return (
        <ul className="articles" >
            {articles.map((article, index) => (
                <li key={index} className="articles__item">
                    <div className="article">
                        <p className="article__ava" >
                            <Link to={`/profiles/${article.author.username}`}>
                                <img src={article.author.image} alt="author pic"/>
                            </Link>
                        </p>
                        <p className="article__author" >
                            <Link to={`/profiles/${article.author.username}`}>
                                {article.author.username}
                            </Link>
                            <span className="article__date">{article.createdAt}</span>
                        </p>
                        <Link className="article__preview" to={`/articles/${article.slug}`}>
                            <h3 className="article__title">{article.title}</h3>
                            <p className="article__description">{article.description}</p>
                            <ul className="tags">
                                {article.tagList.map(tag => (
                                    <li key={tag} className="tags__item">
                                        {tag}
                                    </li>
                                ))}
                            </ul>
                        </Link>
                    </div>
                </li>
            ))}
        </ul>
    )
};

export default Feed;