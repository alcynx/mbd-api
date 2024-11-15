import db from "../models/db.js";  // Pastikan menambahkan ekstensi .js

export const getAllLeaders = (req, res) => {
  db.query("CALL getAllLeaders()", (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching leaders", error: err });
    }
    res.status(200).json(results[0]);
  });
};

export const tambahLeaders = (req, res) => {
  const { nama, email, username, password, kota, provinsi } = req.body;
  db.query(
    "CALL tambahLeaders(?, ?, ?, ?, ?, ?)",
    [nama, email, username, password, kota, provinsi],
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error adding leaders", error: err });
      }
      res.status(201).json({ message: "Leaders added successfully" });
    }
  );
};

export const updateLeaders = (req, res) => {
  const { id_leaders, nama, email, username, password, kota, provinsi } =
    req.body;
  db.query(
    "CALL updateLeaders(?, ?, ?, ?, ?, ?, ?)",
    [id_leaders, nama, email, username, password, kota, provinsi],
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error updating leaders", error: err });
      }
      res.status(200).json({ message: "Leaders updated successfully" });
    }
  );
};

export const deleteLeaders = (req, res) => {
  const { id_leaders } = req.params;
  db.query("CALL hapusLeaders(?)", [id_leaders], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error deleting leaders", error: err });
    }
    res.status(200).json({ message: "Leaders deleted successfully" });
  });
};
