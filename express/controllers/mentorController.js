import db from '../models/db.js';

// Add mentor
export const tambahMentor = (req, res) => {
    const { p_nama, p_username, p_email, p_password, p_no_telp, p_kota, p_provinsi, p_bidang_minat } = req.body;

    const query = 'CALL tambah_mentor(?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [p_nama, p_username, p_email, p_password, p_no_telp, p_kota, p_provinsi, p_bidang_minat], (err, results) => {
        if (err) {
            console.error('Error details:', err);
            return res.status(500).json({ message: 'Error executing procedure', error: err.message });
        }
        res.status(201).json({ message: 'Mentor berhasil ditambahkan' });
    });
};

// Edit mentor
export const editMentor = (req, res) => {
    const { p_id_user, p_nama, p_username, p_email, p_password, p_no_telp, p_kota, p_provinsi, p_bidang_minat, p_status } = req.body;

    const query = 'CALL edit_mentor(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [p_id_user, p_nama, p_username, p_email, p_password, p_no_telp, p_kota, p_provinsi, p_bidang_minat, p_status], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error executing procedure', error: err.message });
        }
        res.status(200).json({ message: 'Mentor berhasil diperbarui' });
    });
};

// Delete mentor
export const hapusMentor = (req, res) => {
    const { p_id_user } = req.params;
    const id = parseInt(p_id_user);  // Convert string to integer

    if (isNaN(id)) {
        return res.status(400).json({ message: 'ID user tidak valid' });
    }

    const query = 'CALL hapus_mentor(?)';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error executing procedure:', err);
            return res.status(500).json({ message: 'Error executing procedure', error: err.message });
        }

        if (results && results[0] && results[0].affectedRows === 0) {
            return res.status(404).json({ message: 'Mentor tidak ditemukan' });
        }

        res.status(200).json({ message: 'Mentor berhasil dihapus' });
    });
};

// Get mentor list
export const getMentor = (req, res) => {
    const query = 'CALL get_mentor()';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error executing procedure', error: err.message });
        }
        res.json(results[0]);
    });
};

export const searchMentor = (req, res) => {
    const { p_nama, p_kota, p_bidang_minat } = req.body;

    const query = 'CALL search_mentor(?, ?, ?)';
    db.query(query, [p_nama, p_kota, p_bidang_minat], (err, results) => {
        if (err) {
            console.error('Error details:', err);  // Menampilkan error lebih lengkap
            return res.status(500).json({ message: 'Error executing procedure', error: err.message });
        }

        // Menampilkan hasil pencarian mentor
        res.status(200).json(results[0]);  // results[0] adalah hasil yang dikembalikan oleh stored procedure
    });
};

export const getProfilMentorById = (req, res) => {
    // Ambil p_id_user dari params dan log nilai ID yang diterima
    const { p_id_user } = req.params;
    console.log("ID yang diterima:", p_id_user); // Log nilai ID

    // Query untuk memanggil prosedur
    const query = 'CALL get_profil_mentor_by_id(?)';

    // Jalankan query
    db.query(query, [p_id_user], (err, results) => {
        // Tangani error jika ada
        if (err) {
            return res.status(500).json({ message: 'Error executing procedure', error: err.message });
        }
        
        // Periksa apakah data profil mentor ada di results[0]
        if (!results || results[0].length === 0) {
            return res.status(404).json({ message: 'Profil mentor atau data event tidak ditemukan' });
        }

        // Ambil data profil mentor dari results[0]
        const profilMentor = results[0][0];

        // Kirim respon dengan data profil mentor dan total event mentor
        res.json({
            profil: profilMentor,
        });
    });
};
