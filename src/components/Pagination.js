import React from 'react';
import classNames from 'classnames';

import {range} from '../utils';
import {Link} from 'react-router-dom'

const PaginationItem = ({page, currentPage, url}) => {
  const liClasses = classNames({
    'pagination__item': true,
    'active': page === currentPage
  });
  
  return (
    <li className={liClasses}>
      <Link to={`${url}?page=${page}`} className="pagination__link">
        {page}
      </Link>
    </li>
  )
}

const Pagination = ({total, limit, url, currentPage}) => {
  const pagesCount = Math.ceil(total / limit);
  const pages = range(1, pagesCount);
  
  return (
    <ul className="pagination">
      {pages.map(page => (
         <PaginationItem key={page}
                         page={page}
                         currentPage={currentPage}
                         url={url}
         />
      ))}
    </ul>
  )
};

export default Pagination;