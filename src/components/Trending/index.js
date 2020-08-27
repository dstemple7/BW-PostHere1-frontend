import React, { useState, useEffect } from 'react';
import './style.scss';
import axios from 'axios';

export default function Trending(props) {
  const [ subreddits, setSubreddits ] = useState([])

  useEffect( () => {
    axios.get('https://www.reddit.com/api/trending_subreddits.json')
      .then( res => {
        setSubreddits(res.data.subreddit_names)
      })
      .catch( err => {
        console.log(err)
      })
  }, [])

  return(
    <div className='trending-post'>

      { subreddits.map( sub => {
        return <h4>{`r/${sub}`}</h4>
      })
      }
      {}
    </div>
  )
}