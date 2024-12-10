import db from '../models/db.js';
import { jwt } from '../models/jwt.js';

export const login = (req, res) => {
    const { username, password } = req.body;

    const query = 'CALL login(?, ?)';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error executing procedure', error: err.message });
        }
        if (results[0].length === 0) {
            return res.status(401).json({ message: 'Username atau password salah' });
        }

        const user = results[0][0];
        
        // Membuat token dengan masa kadaluarsa 1 jam
        const token = jwt.sign({
            id: user.id,
            username: user.username,
            role: user.role
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: false, 
            maxAge: 3600000
        });

        res.json({ message: 'Login berhasil', user });
    });
};

export const logout = (req, res) => {
    res.cookie("token", "", {
        maxAge: 0, 
    });

    res.json({
        message: "Berhasil logout",
    });
};

