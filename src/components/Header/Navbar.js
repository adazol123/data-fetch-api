import React from 'react'
import NavLink from './NavList'

const Navbar = () => {
    return (
        <header className='nav_header'>
            <div className="nav_header_wrapper">
               <div class='logo-beta'>EN</div>
                <NavLink/>
                <button className='cta'>Status <span></span></button>
            </div>
        </header>
    )
}

export default Navbar

