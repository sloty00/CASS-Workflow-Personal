import express from 'express';
import jwt from 'jsonwebtoken';
import { verificarTokenYAD } from '../Middleware/verificarTokenYAD.js';
import { adClient } from '../Middleware/verificarTokenYAD.js';

const router = express.Router();
const secretKey = 'secreto123';

router.post('/logintoken', (req, res) => {
    const { usuario, contraseña } = req.body;

    if (!usuario || !contraseña) {
        return res.status(401).json({ mensaje: 'Credenciales incompletas' });
    }

    // Autenticación con Active Directory
    adClient.authenticate(usuario, contraseña, (err, auth) => {
        if (err || !auth) {
            return res.status(401).json({ mensaje: 'Autenticación de Active Directory fallida' });
        }

        // Generar token
        const token = jwt.sign({ usuario }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    });
});

router.get('/ruta-protegida', verificarTokenYAD, (req, res) => {
    res.json({ mensaje: 'Ruta protegida', usuario: req.usuario });
});

export default router;

/*

router.post('/logintoken', (req, res) => {
    const usuario = req.body.usuario; // Cambiar si el nombre del campo es diferente
    const contraseña = req.body.contraseña; // Cambiar si el nombre del campo es diferente

    // Aquí deberías validar las credenciales
    if (usuario === 'admintoken' && contraseña === 'Cass.Token.2024#') {
        // Generar token
        const token = jwt.sign({ usuario }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }
});

router.get('/ruta-protegida', verificarTokenYAD, (req, res) => {
    res.json({ mensaje: 'Ruta protegida', usuario: req.usuario });
});

export default router;
*/