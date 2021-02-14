import React, {useState, useEffect} from 'react'
import ErrorMessage from "./ErrorMessage";

const PostForm = ({handleForm, errors, initialValues}) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [description, setDescription] = useState('');
  const [tagList, setTagList] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const article = {
      title,
      body,
      description,
      tagList: tagList.split(' ')
    }
    handleForm(article);
  }
  
  useEffect(() => {
     if (!initialValues) {
       return;
     }
     setTitle(initialValues.title)
     setBody(initialValues.body)
     setDescription(initialValues.description)
     setTagList(initialValues.tagList.join(' '))
  }, [initialValues])
  
  return (
    <section className="editor-page">
      <div className="editor-page__wrapper">
        {errors.length > 0 && <ErrorMessage msg={errors} />}
        <form className="editor-page__form form" onSubmit={handleSubmit}>
          <fieldset className="form__field">
            <input type="text"
                   className="form__input"
                   placeholder="Article title"
                   value={title}
                   onChange={(e) => setTitle(e.target.value)}/>
          </fieldset>
          <fieldset className="form__field">
            <input type="text"
                   className="form__input"
                   placeholder="What is this article about?"
                   value={description}
                   onChange={(e) => setDescription(e.target.value)}/>
          </fieldset>
          <fieldset className="form__field">
            <textarea className="form__input"
                      placeholder="Write your article"
                      rows="8"
                      value={body}
                      onChange={(e) => setBody(e.target.value)}></textarea>
          </fieldset>
          <fieldset className="form__field">
            <input type="text"
                   className="form__input"
                   placeholder="Enter tags"
                   value={tagList}
                   onChange={(e) => setTagList(e.target.value)}/>
          </fieldset>
          <fieldset className="form__field form__field--submit">
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