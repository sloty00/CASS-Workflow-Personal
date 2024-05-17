import React, { useState } from 'react';
import axios from 'axios';
import { Grid, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const LoginForm = ({ onLogin }) => {
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/logintoken', {
                usuario,
                contraseña
            });
            const { token } = response.data;
            onLogin(token);
        } catch (error) {
            console.error('Error al autenticar:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                        type='email'
                        label="Correo"
                        variant="outlined"
                        fullWidth
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        required
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                        label="Contraseña"
                        variant="outlined"
                        fullWidth
                        type="password"
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                        required
                />
            </Grid>
            <Grid item xs={12}>
                <Button 
                variant="contained"
                        color="primary"
                        fullWidth 
                        type="submit">
                Iniciar Sesión
                </Button>
            </Grid>
            </Grid>
        </form>
    );
};

export default LoginForm;