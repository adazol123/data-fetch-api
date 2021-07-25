import React, {useContext} from 'react'
import { useLocation, Link } from 'react-router-dom'
import NavLink from './NavList'
import DataContext from '../../util/DataContext'

const Navbar = () => {
    const { setShowCoin} = useContext(DataContext)
    let location = useLocation()
    const current = JSON.parse(localStorage.getItem("CoinV1"));

    if (current && location.pathname === `/crypto/${current.id}`) {
        console.log(location.pathname)
        return (
            <header className='nav_header nav_secondary'>
            <div className="nav_header_wrapper">
                <Link to='/' replace>
                <button className='nav_cancel_button' onClick={() =>
                    setShowCoin(prev => !prev)
                }> ￩
                <span>Back</span></button>
                </Link>
                <h5>{current.name}  <span> ({current.symbol.toUpperCase()})</span></h5>
                <a href='https://entrepreneursportfolio.statuspage.io'
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
    return (
        <header className='nav_header'>
            <div className="nav_header_wrapper">
               <div className='logo-beta'>EN</div>
                <NavLink/>
                <a href='https://entrepreneursportfolio.statuspage.io'
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

