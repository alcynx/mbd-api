import { jwt } from '../models/jwt.js';

export const verifyRole = (roles) => {
    return (req, res, next) => {
        const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(403).json({ message: 'Token tidak ditemukan' });
        }

        const decoded = jwt.verify(token);
        if (!decoded) {
            return res.status(401).json({ message: 'Token tidak valid atau telah kedaluwarsa' });
        }

        if (!roles.includes(decoded.role)) {
            return res.status(403).json({ message: 'Anda tidak memiliki hak akses' });
        }

        req.user = decoded;  
        next(); 
    };
};
