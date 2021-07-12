import React from 'react'
import {Link} from 'react-router-dom'
import NavLink from './NavList'

const Navbar = () => {
    return (
        <header className='nav_header'>
            <div className="nav_header_wrapper">
               <div className='logo-beta'>EN</div>
                <NavLink/>
                <a href='https://entrepreneursportfolio-com.statuspal.io/'
                target='_blank'
                >
                <button className='cta'> 
                <span>Status</span></button>
                </a> 
            </div>
        </header>
    )
}

export default Navbar

