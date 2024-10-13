import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ModeToggle } from './ModeTogle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground shadow-md relative z-50">
        <nav className="container mx-auto p-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">💰 Budget Tracker</Link>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-2xl">
              <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
            </button>
          </div>
          <div className={`md:flex md:space-x-4 md:items-center ${isMenuOpen ? 'block' : 'hidden'} fixed md:static inset-0 md:inset-auto bg-primary/80 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-4 md:p-0 z-40`}>
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 items-center justify-center h-full md:h-auto">
              {user ? (
                <>
                  <Link to="/dashboard" className="block md:inline-block py-2 hover:underline">Dashboard</Link>
                  {user.isAdmin && (
                    <Link to="/admin" className="block md:inline-block py-2 hover:underline">Admin</Link>
                  )}
                  <Link to="/group-savings" className="block md:inline-block py-2 hover:underline">Group Savings</Link>
                  <Link to="/profile" className="block md:inline-block py-2 hover:underline">Profile</Link>
                  <button onClick={logout} className="block md:inline-block py-2 hover:underline">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block md:inline-block py-2 hover:underline">Login</Link>
                  <Link to="/register" className="block md:inline-block py-2 hover:underline">Register</Link>
                </>
              )}
              <ModeToggle />
            </div>
          </div>
        </nav>
      </header>
      <main className="flex-grow bg-background">
        {children}
      </main>
      <footer className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto text-center">
          © 2023 Budget Tracker. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
