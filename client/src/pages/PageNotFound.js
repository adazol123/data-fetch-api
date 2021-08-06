import React from 'react'
import {Link} from 'react-router-dom'
const PageNotFound = () => {
    return (
        <div className='not-found'>
            <h2>404 Page | <span>not found</span></h2>
            <Link to='/'><button>Redirect back to <span>Home Page</span></button></Link>
        </div>
    )
}

export default PageNotFound
