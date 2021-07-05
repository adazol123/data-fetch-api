import React from 'react'
import NavLink from './NavList'

const Navbar = () => {
    return (
        <header className='nav_header'>
            <div className="nav_header_wrapper">
                <h3>API</h3>
                <NavLink/>
                <button className='cta'>CTA</button>
            </div>
        </header>
    )
}

export default Navbar
