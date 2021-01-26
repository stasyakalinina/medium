import React from 'react'

const TagList = ({tags}) => {
  return (
    <ul className="tags">
      {tags.map(tag => (
        <li key={tag} className="tags__item">
          {tag}
        </li>
      ))}
    </ul>
  )
}

export default TagList