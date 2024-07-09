import React, { useState } from 'react';
import { auth, provider } from "../../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { Grid, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [openCredentialsDialog, setOpenCredentialsDialog] = useState(false); // Estado para controlar el diálogo de credenciales incorrectas
    const [openEmptyFieldsDialog, setOpenEmptyFieldsDialog] = useState(false); // Nuevo estado para controlar el diálogo de campos vacíos

    const signin = (e) => {
        e.preventDefault();
        if (!email.trim() || !password.trim()) {
            setOpenEmptyFieldsDialog(true); // Abrir el diálogo de campos vacíos si el correo o la contraseña están vacíos
            return;
        }
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential);
            window.location.href = "/index";
        }).catch((error) => {
            console.log(error);
            setOpenCredentialsDialog(true); // Abrir el diálogo de credenciales incorrectas en caso de error
        })
    };

    const signinWithGoogle = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log(user);
            window.location.href = "/index";
        })
        .catch((error) => {
            console.log(error);
            setOpenCredentialsDialog(true); // Abrir el diálogo de credenciales incorrectas en caso de error
        });
    };

    const handleCloseCredentialsDialog = () => {
        setOpenCredentialsDialog(false); // Cerrar el diálogo de credenciales incorrectas
    };

    const handleCloseEmptyFieldsDialog = () => {
        setOpenEmptyFieldsDialog(false); // Cerrar el diálogo de campos vacíos
    };

    return (
        <div className='sign-in-container max-wg-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300'>
            <div className='titleContainer' style={{display:'flex', justifyContent:'center', alignItems:'center', width: '-webkit-fill-available',}}>
                <h1>Ingresa Cuenta</h1>
            </div><br></br>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        type='email'
                        label="Correo"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Contraseña"
                        variant="outlined"
                        fullWidth
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={signin}
                    >
                        Ingresar
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        onClick={signinWithGoogle}
                    >
                        Ingresar con Google
                    </Button>
                </Grid>
            </Grid>
            <Dialog
                open={openCredentialsDialog}
                onClose={handleCloseCredentialsDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Credenciales incorrectas"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Las credenciales ingresadas no son válidas. Por favor, inténtalo de nuevo.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCredentialsDialog} color="primary">
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openEmptyFieldsDialog}
                onClose={handleCloseEmptyFieldsDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Campos vacíos"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Por favor, completa todos los campos antes de continuar.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEmptyFieldsDialog} color="primary">
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default SignIn;
