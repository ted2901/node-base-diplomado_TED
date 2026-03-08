import jwt from 'jsonwebtoken';
import env from '../config/env.js';
import logger from '../logs/logger.js';

export default function authenticateToken(req, res, next) {
    //obtener el toiken de la cabecera de autenticación
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    //verificar decodificar token
    jwt.verify(token, env.jwt_secret, (err, user) => {
        if (err) return res.sendStatus(403);

        req.user = user;
        next();
    })
}