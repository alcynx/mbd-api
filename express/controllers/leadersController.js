import db from '../models/db.js';

export const tambahLeaders = (req, res) => {
    const { p_nama, p_username, p_email, p_password, p_no_telp, p_kota, p_provinsi } = req.body;

    const query = 'CALL tambah_leaders(?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [p_nama, p_username, p_email, p_password, p_no_telp, p_kota, p_provinsi], (err, results) => {
        if (err) {
            console.error('Error details:', err);  
            return res.status(500).json({ message: 'Error executing procedure', error: err.message });
        }
        res.status(201).json({ message: 'Leaders berhasil ditambahkan' });
    });
};

export const editLeader = (req, res) => {
    const { p_id_user, p_nama, p_username, p_email, p_password, p_no_telp, p_kota, p_provinsi } = req.body;

    const query = 'CALL edit_leader(?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [p_id_user, p_nama, p_username, p_email, p_password, p_no_telp, p_kota, p_provinsi], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error executing procedure', error: err.message });
        }
        res.status(200).json({ message: 'Leaders berhasil diperbarui' });
    });
};

export const hapusLeaders = (req, res) => {
    const { p_id_user } = req.params;
    const id = parseInt(p_id_user);

    if (isNaN(id)) {
        return res.status(400).json({ message: 'ID user tidak valid' });
    }

    const query = 'CALL hapus_leaders(?)';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error executing procedure:', err);
            return res.status(500).json({ message: 'Error executing procedure', error: err.message });
        }

        console.log(results);
        if (results && results[0] && results[0].affectedRows === 0) {
            return res.status(404).json({ message: 'Leaders not found' });
        }

        res.status(200).json({ message: 'Leaders berhasil dihapus' });
    });
};

export const getLeaders = (req, res) => {
    const query = 'CALL get_leaders()';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error executing procedure', error: err.message });
        }
        res.json(results[0]);
    });
};
