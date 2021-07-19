import React from 'react'
import {Link} from 'react-router-dom'
const PageNotFound = () => {
    return (
        <div className='not-found'>
            <h2>404 Page | <span>not found</span></h2>
            <p>Redirect back to <Link to='/'>Home Page</Link></p>
        </div>
    )
}

export default PageNotFound
