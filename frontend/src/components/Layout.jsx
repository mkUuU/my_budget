import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ModeToggle } from './ModeTogle';
import { Menu, X } from 'lucide-react';
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground shadow-md relative z-50">
        <nav className="container mx-auto p-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold" onClick={closeMenu}>💰 Your Budget</Link>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-2xl">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
          <div className={`md:flex md:space-x-4 md:items-center ${isMenuOpen ? 'block' : 'hidden'} fixed md:static inset-0 md:inset-auto bg-primary/80 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-4 md:p-0 z-40`}>
            <button onClick={closeMenu} className="md:hidden absolute top-4 right-4 text-2xl">
              <X />
            </button>
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 items-center justify-center h-full md:h-auto">
              {user ? (
                <>
                  <Link to="/dashboard" className="block md:inline-block py-2 hover:underline" onClick={closeMenu}>Dashboard</Link>
                  {user.isAdmin && (
                    <Link to="/admin" className="block md:inline-block py-2 hover:underline" onClick={closeMenu}>Admin</Link>
                  )}
                  <Link to="/group-savings" className="block md:inline-block py-2 hover:underline" onClick={closeMenu}>Group Savings</Link>
                  <Link to="/profile" className="block md:inline-block py-2 hover:underline" onClick={closeMenu}>Profile</Link>
                  <button onClick={handleLogout} className="block md:inline-block py-2 hover:underline">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block md:inline-block py-2 hover:underline" onClick={closeMenu}>Login</Link>
                  <Link to="/register" className="block md:inline-block py-2 hover:underline" onClick={closeMenu}>Register</Link>
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
