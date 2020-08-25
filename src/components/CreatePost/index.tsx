import React, {useState} from 'react'
import './style.scss'

const initialFormValues = {
  title:'',
  body:''
}

const CreatePost = (props: any) => {
  const [formValues, setFormValues] = useState(initialFormValues)

    const onFormChange = (e:any) => {
      
    }

    const onSavePost = (e:any) => {
      e.preventDefault()
      
      setFormValues(initialFormValues)
    }

  return (
    <>
      <section className='create-post'>
        <h2>Create a post</h2>
        <div className='create-post-form'>
        <form >
          <input placeholder='Title' 
          type='text' 
          name='title'
          value={formValues.title}
          />
          <input
            name = 'title'
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
