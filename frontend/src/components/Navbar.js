import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Project Management System</Link>
            </div>
            <div className="navbar-links">
                {user ? (
                    <>
                        {user.role === 'admin' && (
                            <Link to="/admin">Admin Panel</Link>
                        )}
                        {user.role === 'customer' && (
                            <Link to="/customer">Customer Portal</Link>
                        )}
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
