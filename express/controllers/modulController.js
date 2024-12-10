import db from '../models/db.js';

export const tambahModul = (req, res) => {
    const {
        p_nama_modul,
        p_deskripsi_modul,
        p_dokumen,
        p_id_topik,
        p_nama_topik,
        p_deskripsi_topik,
    } = req.body;

    const p_createdby = req.user.id; // Ambil ID pengguna yang terautentikasi dari req.user

    const query = 'CALL tambah_modul(?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [
        p_nama_modul,
        p_deskripsi_modul,
        p_dokumen,
        p_id_topik,
        p_nama_topik,
        p_deskripsi_topik,
        p_createdby, // Gunakan ID pengguna sebagai createdby
    ], (err, results) => {
        if (err) {
            console.error('Error details:', err);
            return res.status(500).json({ message: 'Error executing procedure', error: err.message });
        }
        res.status(201).json({ message: 'Modul berhasil ditambahkan' });
    });
};

export const editModul = (req, res) => {
    const { p_id_modul, p_nama_modul, p_deskripsi_modul, p_dokumen, p_id_topik } = req.body;

    const query = 'CALL edit_modul(?, ?, ?, ?, ?)';
    db.query(query, [p_id_modul, p_nama_modul, p_deskripsi_modul, p_dokumen, p_id_topik], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error executing procedure', error: err.message });
        }
        res.status(200).json({ message: 'Modul berhasil diperbarui' });
    });
};

export const hapusModul = (req, res) => {
    const { p_id_modul } = req.params;
    const id = parseInt(p_id_modul);  // Mengonversi string menjadi integer

    if (isNaN(id)) {
        return res.status(400).json({ message: 'ID modul tidak valid' });
    }

    const query = 'CALL hapus_modul(?)';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error executing procedure:', err);
            return res.status(500).json({ message: 'Error executing procedure', error: err.message });
        }

        if (results && results[0] && results[0].affectedRows === 0) {
            return res.status(404).json({ message: 'Modul tidak ditemukan' });
        }

        res.status(200).json({ message: 'Modul berhasil dihapus' });
    });
};

export const getModul = (req, res) => {
    const query = 'CALL get_modul()';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error executing procedure', error: err.message });
        }
        res.json(results[0]);
    });
};

export const getModulById = (req, res) => {
    const { p_id_modul } = req.params;

    const query = 'CALL get_modul_by_id(?)';
    db.query(query, [p_id_modul], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error executing procedure', error: err.message });
        }

        if (!results[0]) {
            return res.status(404).json({ message: 'Modul tidak ditemukan' });
        }

        res.json(results[0]);
    });
};
