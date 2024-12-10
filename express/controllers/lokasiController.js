import db from '../models/db.js';

export const tambahLokasi = (req, res) => {
    const { kota, provinsi } = req.body;

    const query = 'CALL tambah_lokasi(?, ?)';
    db.query(query, [kota, provinsi], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error executing procedure', error: err.message });
        }
        res.status(201).json({ message: 'Lokasi berhasil ditambahkan' });
    });
};

export const editLokasi = (req, res) => {
    const { id_lokasi, kota, provinsi } = req.body;

    const query = 'CALL edit_lokasi(?, ?, ?)';
    db.query(query, [id_lokasi, kota, provinsi], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error executing procedure', error: err.message });
        }
        res.json({ message: 'Lokasi berhasil diperbarui' });
    });
};

export const hapusLokasi = (req, res) => {
    const { id_lokasi } = req.params;

    const query = 'CALL hapus_lokasi(?)';
    db.query(query, [id_lokasi], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error executing procedure', error: err.message });
        }
        res.json({ message: 'Lokasi berhasil dihapus' });
    });
};

export const getLokasi = (req, res) => {
    const query = 'CALL get_lokasi()';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error executing procedure', error: err.message });
        }
        res.json(results[0]);
    });
};
