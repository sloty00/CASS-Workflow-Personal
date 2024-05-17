import jwt from 'jsonwebtoken';

const secretKey = 'secreto123';

export function verificarToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        console.log(token);
        return res.status(401).json({ mensaje: 'Token no proporcionado' });
    }

    jwt.verify(token, secretKey, (error, decoded) => {
        if (error) {
            console.log(token);
            return res.status(401).json({ mensaje: 'Token inválido' });
        }
        console.log(token);
        req.usuario = decoded.usuario;
        next();
        console.log(token);
    });
}