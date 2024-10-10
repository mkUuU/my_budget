import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login function
  const login = async (email, password) => {
    setError(null);
    try {
      if (password === 'user@123' || (email.includes('admin') && password === 'admin@123')) {
        const newUser = { 
          name: email.split('@')[0], 
          email, 
          isAdmin: email.includes('admin') && password === 'admin@123',
          profilePicture: `https://api.dicebear.com/6.x/initials/svg?seed=${email.split('@')[0]}`
        };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        navigate('/dashboard'); // Navigate to dashboard after login
      } else {
        throw new Error('Invalid credentials');
      }
    } catch {
      setError('Invalid credentials. Please try again.');
    }
  };

  // Register function
  const register = async (name, email) => {
    setError(null);
    const newUser = { 
      name, 
      email, 
      isAdmin: false,
      profilePicture: `https://api.dicebear.com/6.x/initials/svg?seed=${name}`
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    navigate('/dashboard'); // Navigate to a welcome page after registration
  };

  // Google login function (dummy)
  const googleLogin = async () => {
    setError(null);
    const dummyUser = { 
      name: 'Google User', 
      email: 'google@example.com', 
      isAdmin: false,
      profilePicture: `https://api.dicebear.com/6.x/initials/svg?seed=GoogleUser`
    };
    setUser(dummyUser);
    localStorage.setItem('user', JSON.stringify(dummyUser));
    navigate('/dashboard'); // Navigate to dashboard after Google login
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/'); // Navigate to home after logout
  };

  // Update profile function
  const updateProfile = async (profileData) => {
    const updatedUser = { ...user, ...profileData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  // Context value
  const value = {
    user,
    login,
    register,
    googleLogin,
    logout,
    updateProfile,
    error,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};