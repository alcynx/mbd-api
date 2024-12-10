import db from '../models/db.js';

export const tambahTopik = (req, res) => {
    const { p_nama_topik, p_deskripsi } = req.body;

    const query = 'CALL tambah_topik(?, ?)';
    db.query(query, [p_nama_topik, p_deskripsi], (err, results) => {
        if (err) {
            console.error('Error details:', err);  // Menampilkan error lebih lengkap
            return res.status(500).json({ message: 'Error executing procedure', error: err.message });
        }
        res.status(201).json({ message: 'Topik berhasil ditambahkan' });
    });
};

export const editTopik = (req, res) => {
    const { p_id_topik, p_nama_topik, p_deskripsi } = req.body;

    const query = 'CALL edit_topik(?, ?, ?)';
    db.query(query, [p_id_topik, p_nama_topik, p_deskripsi], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error executing procedure', error: err.message });
        }
        res.status(200).json({ message: 'Topik berhasil diperbarui' });
    });
};

export const hapusTopik = (req, res) => {
    const { p_id_topik } = req.params;
    const id = parseInt(p_id_topik);  // Mengonversi string menjadi integer

    if (isNaN(id)) {
        return res.status(400).json({ message: 'ID topik tidak valid' });
    }

    const query = 'CALL hapus_topik(?)';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error executing procedure:', err);
            return res.status(500).json({ message: 'Error executing procedure', error: err.message });
        }

        if (results && results[0] && results[0].affectedRows === 0) {
            return res.status(404).json({ message: 'Topik tidak ditemukan' });
        }

        res.status(200).json({ message: 'Topik berhasil dihapus' });
    });
};

export const getTopik = (req, res) => {
    const query = 'CALL get_topik()';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error executing procedure', error: err.message });
        }
        res.json(results[0]);
    });
};
