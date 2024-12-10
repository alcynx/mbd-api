import { jwt } from '../models/jwt.js'; 

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token; 

    if (!token) {
        return res.status(401).json({ message: 'Token tidak ditemukan. Silakan login terlebih dahulu.' });
    }

    const decoded = jwt.verify(token);

    if (!decoded) {
        return res.status(401).json({ message: 'Token tidak valid atau sudah kedaluwarsa.' });
    }

    req.user = decoded;
    next(); 
};
