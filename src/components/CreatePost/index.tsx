import React from 'react'
import './style.scss'

const CreatePost = (props: any) => {
  return (
    <>
      <section className='create-post'>
        <h2>Create a post</h2>
        <div className='create-post-form'>
        <form >
          <input placeholder='Title' type='text' />
          <input
            type='textarea'
            className='content-input'
            placeholder='Post content'
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
