import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ModeToggle } from './ModeTogle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { useState } from 'react';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground shadow-md">
        <nav className="container mx-auto p-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">💰 Budget Tracker</Link>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-2xl">
              <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
            </button>
          </div>
          <div className={`md:flex md:space-x-4 md:items-center ${isMenuOpen ? 'block' : 'hidden'} absolute md:static top-16 left-0 right-0 bg-primary md:bg-transparent p-4 md:p-0`}>
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
        </nav>
      </header>
      <main className="flex-grow bg-background">
        {children}
      </main>
      <footer className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto text-center">
          © 2024 Clutch Masters Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
