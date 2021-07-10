import React from 'react'
import NavLink from './NavList'

const Navbar = () => {
    return (
        <header className='nav_header'>
            <div className="nav_header_wrapper">
                <h4>adazolhub</h4>
                <NavLink/>
                <button className='cta'>Status <span></span></button>
            </div>
        </header>
    )
}

export default Navbar
