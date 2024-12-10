import db from '../models/db.js';

export const tambahEvent = (req, res) => {
    const {
        p_nama_event,
        p_tgl_event,
        p_deskripsi,
        p_evaluasi,
        p_id_lokasi,
        p_id_program,
    } = req.body;

    const p_createdby = req.user.id;

    const query = 'CALL tambah_event(?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [
        p_nama_event,
        p_tgl_event,
        p_deskripsi,
        p_evaluasi,
        p_createdby,
        p_id_lokasi,
        p_id_program,
    ], (err, results) => {
        if (err) {
            console.error('Error details:', err);
            return res.status(500).json({ message: 'Error executing procedure', error: err.message });
        }
        res.status(201).json({ message: 'Event berhasil ditambahkan' });
    });
};

export const tambahMentorEvent = (req, res) => {
    const {
        p_event_id,
        p_nama,
        p_username,
        p_email,
        p_password,
        p_no_telp,
        p_kota,
        p_provinsi,
        p_bidang_minat
    } = req.body;

    const query = 'CALL tambah_mentor_event(?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [
        p_event_id,
        p_nama,
        p_username,
        p_email,
        p_password,
        p_no_telp,
        p_kota,
        p_provinsi,
        p_bidang_minat
    ], (err, results) => {
        if (err) {
            console.error('Error SQL State:', err.sqlState);
            console.error('Error SQL Message:', err.sqlMessage);

            // Tangani error berdasarkan pesan dari prosedur
            if (err.sqlState === '45000') {
                return res.status(400).json({
                    message: err.sqlMessage // Pesan error langsung dari prosedur
                });
            }

            return res.status(500).json({
                message: 'Terjadi kesalahan pada server.',
                error: err.message
            });
        }

        res.status(201).json({ message: 'Mentor berhasil ditambahkan ke event' });
    });
};


export const tambahModulEvent = (req, res) => {
    const {
        p_event_id,
        p_nama_modul,
        p_deskripsi_modul,
        p_dokumen,
        p_id_topik,
        p_nama_topik,
        p_deskripsi_topik
    } = req.body;

    const p_createdby = req.user.id;

    const query = 'CALL tambah_modul_event(?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [
        p_event_id,
        p_nama_modul,
        p_deskripsi_modul,
        p_dokumen,
        p_id_topik,
        p_nama_topik,
        p_deskripsi_topik,
        p_createdby
    ], (err, results) => {
        if (err) {
            console.error('Error details:', err);
            return res.status(500).json({ message: 'Error executing procedure', error: err.message });
        }
        res.status(201).json({ message: 'Modul berhasil ditambahkan ke event' });
    });
};

export const getEvent = (req, res) => {
    const query = 'CALL get_event()';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error executing procedure', error: err.message });
        }
        res.json(results[0]);
    });
};

export const getEventDetail = (req, res) => {
    const { event_id } = req.params;
    const query = 'CALL get_event_detail(?)';
    db.query(query, [event_id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error executing procedure', error: err.message });
        }
        if (!results[0]) {
            return res.status(404).json({ message: 'Event tidak ditemukan' });
        }
        res.json(results[0]);
    });
};

export const editEvent = (req, res) => {
    const {
        p_id_event,
        p_nama_event,
        p_tgl_event,
        p_deskripsi,
        p_evaluasi,
        p_id_lokasi,
        p_id_program
    } = req.body;

    const query = 'CALL edit_event(?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [
        p_id_event,
        p_nama_event,
        p_tgl_event,
        p_deskripsi,
        p_evaluasi,
        p_id_lokasi,
        p_id_program
    ], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error executing procedure', error: err.message });
        }
        res.status(200).json({ message: 'Event berhasil diperbarui' });
    });
};

export const hapusEvent = (req, res) => {
    const { p_id_event } = req.params;
    const query = 'CALL hapus_event(?)';
    db.query(query, [p_id_event], (err, results) => {
        if (err) {
            console.error('Error details:', err);
            return res.status(500).json({ message: 'Error executing procedure', error: err.message });
        }
        res.status(200).json({ message: 'Event berhasil dihapus' });
    });
};

export const getEventByMentor = (req, res) => {
    const { p_nama_mentor } = req.params;

    const query = 'CALL get_event_by_mentor(?)';
    db.query(query, [p_nama_mentor], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error executing procedure', error: err.message });
        }
        res.json(results[0]);
    });
};

export const getEventById = (req, res) => {
    const { p_id_event } = req.params;
    
    const query = 'CALL get_event_by_id(?)';
    db.query(query, [p_id_event], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error executing procedure', error: err.message });
        }

        // Log hasil dari query
        console.log('Results:', JSON.stringify(results, null, 2));

        if (results && results[0] && results[0].length > 0) {
            // Pastikan ada hasil pertama (data event) dan data modul terkait
            const eventData = results[0][0]; // Data event pertama
            
            console.log('Event Data:', eventData); // Log data event

            // Total modul diharapkan ada di dalam eventData
            const totalModul = eventData.total_modul_in_event;

            console.log('Total Modul:', totalModul); // Log total modul

            // Gabungkan data event dengan total modul
            eventData.total_modul_in_event = totalModul;

            return res.json(eventData); // Kirim data event beserta total modul
        } else {
            return res.status(404).json({ message: 'Event not found' });
        }
    });
};