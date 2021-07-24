
import { NavLink as Links} from 'react-router-dom'


const NavLink = () => (
    <nav className="nav_links">
      <Links to='/'  exact>Crypto</Links>
      <Links to='/news' >News</Links>
      <Links to='/about'>About</Links>
    </nav>
  );

export default NavLink;
