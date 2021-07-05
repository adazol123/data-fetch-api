
import {Link} from 'react-router-dom'


const NavLink = () => (
    <nav className="nav_links">
      <Link to='/'>Home</Link>
      <Link to='/crypto' >Crypto</Link>
      <Link to='/about'>About</Link>
    </nav>
  );

export default NavLink;
