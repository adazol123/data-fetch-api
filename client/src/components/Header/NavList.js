
import { NavLink as Links} from 'react-router-dom'


const NavLink = () => (
    <nav className="nav_links">
      <Links to='/'  exact>Home</Links>
      <Links to='/crypto' >Crypto</Links>
      <Links to='/about'>About</Links>
    </nav>
  );

export default NavLink;
