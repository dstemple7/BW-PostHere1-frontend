import React, { useState, useEffect } from 'react';
import './style.scss';
import axios from 'axios';
import TrendingLink from './TrendingLink'

export default function Trending(props) {
  const [ subreddits, setSubreddits ] = useState([])
  const [ link, setLink ] = useState()

  useEffect( () => {
    axios.get('https://www.reddit.com/api/trending_subreddits.json')
      .then( res => {
        console.log(res.data)
        setSubreddits(res.data.subreddit_names)
        setLink(res.data.comment_url)
      })
      .catch( err => {
        console.log(err)
      })
  }, [])

  return(
    <div className='trending-post'>
      <h1>Today's trending subreddits:</h1>
      { subreddits.map( sub => {
        return (
          <TrendingLink sub={sub} />
        )
      })
      }
    </div>
  )
}