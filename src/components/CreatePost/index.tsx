import React from 'react'
import './style.scss'

const CreatePost = (props: any) => {
  return (
    <>
      <section className='create-post'>
        <form className='create-post-form'>
          <h2>Create a post</h2>
          <label>
            <input placeholder='Title' type='text' />
          </label>
          <label>
            <input type='textbox' className='content-input' />
          </label>
          <div>
            <button>Get r/ Recommndation</button>
            <button>Save Post</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default CreatePost
