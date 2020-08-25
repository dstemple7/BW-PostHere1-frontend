import React from 'react'
import './style.scss'


initialFormValues = {
  title:'',
  body:''
}

const CreatePost = (props: any) => {
  useState[formValues, setFormValues] = useState(initialFormValues)

  return (
    <>
      <section className='create-post'>
        <h2>Create a post</h2>
        <div className='create-post-form'>
        <form >
          <input placeholder='Title' 
          type='text' 
          value=''
          />
          <input
            type='textarea'
            className='content-input'
            placeholder='Post content'
            value=''
          />
          <div className='button-group'>
            <button>Get r/ Recommendation</button>
            <button>Save Post</button>
          </div>
        </form>
        </div>
      </section>
    </>
  )
}

export default CreatePost
