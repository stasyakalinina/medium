import React, {useState} from 'react'

const PostForm = ({handleForm, errors, initialValues}) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [description, setDescription] = useState('');
  const [tagList, setTagList] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    handleForm({foo: "bar"})
  }
  
  return (
    <section className="editor-page">
      <div className="editor-page__wrapper">
        errors
        <form className="editor-page__form form" onSubmit={handleSubmit}>
          <fieldset>
            <input type="text"
                   className="form__input"
                   placeholder="Article title"
                   value={title}
                   onChange={(e) => setTitle(e.target.value)}/>
          </fieldset>
          <fieldset>
            <input type="text"
                   className="form__input"
                   placeholder="What is this article about?"
                   value={description}
                   onChange={(e) => setDescription(e.target.value)}/>
          </fieldset>
          <fieldset>
            <textarea className="form__input"
                      placeholder="Write your article"
                      rows="8"
                      value={body}
                      onChange={(e) => setBody(e.target.value)}> </textarea>
          </fieldset>
          <fieldset>
            <input type="text"
                   className="form__input"
                   placeholder="Enter tags"
                   value={tagList}
                   onChange={(e) => setTagList(e.target.value)}/>
          </fieldset>
          <fieldset>
            <button type="submit"
                    className="form__btn">
              Publish Article
            </button>
          </fieldset>
        </form>
      </div>
    </section>
  )
}

export default PostForm