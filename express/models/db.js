import mysql from 'mysql2';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'nabila',
    password: 'mbd2024',
    database: 'pengelolaan_mentor'
});

db.connect(err => {
    if (err) throw err;
    console.log('Database connected!');
});

export default db;
