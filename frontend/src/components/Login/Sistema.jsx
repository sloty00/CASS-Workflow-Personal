import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoginForm from './loginForm';

const Sistema = () => {
    const [token, setToken] = useState('');

    useEffect(() => {
        const verificarToken = async () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                try {
                    const response = await axios.get('http://localhost:5000/ruta-protegida', {
                        headers: {
                            Authorization: `Bearer ${storedToken}`
                        }
                    });
                    setToken(storedToken);
                } catch (error) {
                    console.error('Error al verificar token:', error);
                    setToken('');
                    localStorage.removeItem('token');
                }
            }
        };
        verificarToken();
    }, []);

    const handleLogin = (newToken) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
    };

    const handleLogout = () => {
        setToken('');
        localStorage.removeItem('token');
    };

    const renderContent = () => {
        if (!token) {
            return <LoginForm onLogin={handleLogin} />;
        } else {
            return (
                <div>
                    <p>`Estás autenticado! {token}`</p>
                    <button onClick={handleLogout}>Cerrar Sesión</button>
                </div>
            );
        }
    };

    return (
        <div>
            {renderContent()}
        </div>
    );
};

export default Sistema;