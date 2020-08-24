import React from 'react'
import './style.scss'

const CreatePost = (props: any) => {
  return (
    <>
      <section className='create-post'>
      <h2>Create a post</h2>
        <form className='create-post-form'>
          <label>
            <input placeholder='Title' type='text' />
          </label>
          <label>
            <input type='textbox' className='content-input' />
          </label>
          <div className='button-group'>
            <button>Get r/ Recommendation</button>
            <button>Save Post</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default CreatePost
