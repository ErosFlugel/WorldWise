//Tools
import { Link, Outlet } from 'react-router-dom';

//Styles
import styles from './Sidebar.module.css';

//Components
import Logo from './Logo';
import AppNav from './AppNav';
import Footer from './Footer';

function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Link to={'/'}>
        <Logo />
      </Link>
      <AppNav />
      <Outlet />
      <Footer />
    </div>
  );
}

export default SideBar;
