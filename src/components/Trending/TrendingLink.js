import React, { useState, useEffect } from 'react';
import './style.scss';

export default function TrendingLink(props) {

  const {sub} = props;

  return (
    <a href={`https://www.reddit.com/r/${sub}`}><h4>{`r/${sub}`}</h4></a>
  )
}
