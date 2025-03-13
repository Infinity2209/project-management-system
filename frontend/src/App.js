import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import AdminPanel from './components/AdminPanel';
import CustomerPortal from './components/CustomerPortal';
import LoginPage from './components/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';



import './App.css';


function App() {
    return (
        <AuthProvider>
            <Router>
        <div className="App">
          <Navbar />

                    <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminPanel />
                </ProtectedRoute>
              }
            />

            <Route
              path="/customer"
              element={
                <ProtectedRoute requiredRole="customer">
                  <CustomerPortal />
                </ProtectedRoute>
              }
            />

                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}


export default App;
