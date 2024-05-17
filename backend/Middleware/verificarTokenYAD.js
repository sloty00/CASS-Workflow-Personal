import jwt from 'jsonwebtoken';
import ActiveDirectory from 'activedirectory2';

const secretKey = 'secreto123';

export const adClient = new ActiveDirectory({
    url: process.env.AD_URL,
    baseDN: process.env.AD_BASE_DN,
    username: process.env.AD_USERNAME,
    password: process.env.AD_PASSWORD
});

export function verificarTokenYAD(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ mensaje: 'Token no proporcionado' });
    }

    jwt.verify(token, secretKey, (error, decoded) => {
        if (error) {
            return res.status(401).json({ mensaje: 'Token inválido' });
        }

        // Autenticación con Active Directory
        const { usuario } = decoded;
        const contraseña = req.body.contraseña;

        adClient.authenticate(usuario, contraseña, (err, auth) => {
            if (err || !auth) {
                return res.status(401).json({ mensaje: 'Autenticación de Active Directory fallida' });
            }

            // Usuario autenticado correctamente
            req.usuario = usuario; // Guardar el usuario en el request para usarlo en las rutas protegidas
            next();
        });
    });
}