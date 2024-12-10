import jsonwebtoken from 'jsonwebtoken';

const JWT_SECRET_KEY = 'MBD Nabila Chairunnisa'; 

export const jwt = {
    sign: (payload) => {
        return jsonwebtoken.sign(
            payload,
            JWT_SECRET_KEY, 
            { expiresIn: '1h' }
        );
    },
    verify: (token) => {
        try {
            return jsonwebtoken.verify(
                token,
                JWT_SECRET_KEY
            );
        } catch (_error) {
            return null;
        }
    },
};
