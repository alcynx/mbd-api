import db from '../models/db.js';

// Menambah program
export const tambahProgram = (req, res) => {
    const { p_nama_program, p_deskripsi } = req.body;

    const query = 'CALL tambah_program(?, ?)';
    db.query(query, [p_nama_program, p_deskripsi], (err, results) => {
        if (err) {
            console.error('Error details:', err);  // Menampilkan error lebih lengkap
            return res.status(500).json({ message: 'Error executing procedure', error: err.message });
        }
        res.status(201).json({ message: 'Program berhasil ditambahkan' });
    });
};

// Mengedit program
export const editProgram = (req, res) => {
    const { p_id_program, p_nama_program, p_deskripsi } = req.body;

    const query = 'CALL edit_program(?, ?, ?)';
    db.query(query, [p_id_program, p_nama_program, p_deskripsi], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error executing procedure', error: err.message });
        }
        res.status(200).json({ message: 'Program berhasil diperbarui' });
    });
};

// Menghapus program
export const hapusProgram = (req, res) => {
    const { p_id_program } = req.params;
    const id = parseInt(p_id_program);  // Mengonversi string menjadi integer

    if (isNaN(id)) {
        return res.status(400).json({ message: 'ID program tidak valid' });
    }

    const query = 'CALL hapus_program(?)';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error executing procedure:', err);
            return res.status(500).json({ message: 'Error executing procedure', error: err.message });
        }

        // Log hasil query untuk memahami struktur data yang diterima
        console.log(results);

        // Hasil query bisa berbeda tergantung pada implementasi prosedur di database
        // Jika hasil pertama berisi affectedRows, maka cek itu
        if (results && results[0] && results[0].affectedRows === 0) {
            return res.status(404).json({ message: 'Program tidak ditemukan' });
        }

        res.status(200).json({ message: 'Program berhasil dihapus' });
    });
};

// Mendapatkan daftar program
export const getProgram = (req, res) => {
    const query = 'CALL get_program()';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error executing procedure', error: err.message });
        }
        res.json(results[0]);  // Mengembalikan hasil data program
    });
};

export const getProgramById = (req, res) => {
    const { p_id_program } = req.params;

    const query = 'CALL get_program_by_id(?)';
    db.query(query, [p_id_program], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error executing procedure', error: err.message });
        }
        res.json(results[0]);
    });
};
