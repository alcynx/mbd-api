import db from "../models/db.js";  // Pastikan menambahkan ekstensi .js

export const getLokasi = (req, res) => {
  db.query("CALL getLokasi()", (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching lokasi", error: err });
    }
    res.status(200).json(results[0]);
  });
};
