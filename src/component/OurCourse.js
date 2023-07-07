import React from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import './OurCourse.css'
const OurCourse = () => {
   
  return ( <section className='courses'>
  <div className='course1 active'>


  <span className='level1'><h1>html</h1></span> 
 
  </div>
  <div className='course2 active'>



  <span className='level2'><h1>css</h1></span>

</div>
<div className='course3 active'>


<span className='level3'><h1>java</h1></span>

</div>

</section> 
  )
}

export default OurCourse




