import React from 'react'
import { Link } from 'react-router-dom'


function PageNotFound() {
  return (
    <div style={{ height: '100vh' }} className='d-flex justify-content-center align-items-center'>
      <div className='text-center my-5'>
       <img className='w-25' src="https://static.vecteezy.com/system/resources/previews/019/551/975/non_2x/error-page-page-not-found-icon-in-line-style-design-isolated-on-white-background-editable-stroke-vector.jpg" alt="" />
        <h3>PAGE NOT FOUND</h3>
        <h6>The page you requested could not be found </h6>
        <Link to='/' className='btn btn-dark'>Go back Home</Link>
      </div>
    </div>
  )
}

export default PageNotFound