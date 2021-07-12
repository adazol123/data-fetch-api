import React from 'react'
import NavLink from './NavList'

const Navbar = () => {
    return (
        <header className='nav_header'>
            <div className="nav_header_wrapper">
               <div className='logo-beta'>EN</div>
                <NavLink/>
                <a href='https://status.entrepreneursportfolio.com/'
                rel='noreferrer'
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

