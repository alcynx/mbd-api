import jwt from "jsonwebtoken";
import db from "../models/db.js"; // Pastikan menambahkan ekstensi .js

const JWT_SECRET = process.env.JWT_SECRET;

// Fungsi untuk login
export const loginUser = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username dan password harus diisi!" });
  }

  db.query(
    "CALL LoginUser(?, ?, @role, @message)",
    [username, password],
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error executing procedure", error: err });
      }

      db.query("SELECT @role AS role, @message AS message", (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error fetching role/message", error: err });
        }

        const { role, message } = result[0];

        if (role) {
          const token = jwt.sign({ username, role }, JWT_SECRET, {
            expiresIn: "1h",
          });

          return res.status(200).json({
            role,
            message,
            token,
          });
        } else {
          return res
            .status(401)
            .json({ message: "Username atau password salah" });
        }
      });
    }
  );
};

// Fungsi untuk memverifikasi token
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // mengambil token setelah "Bearer"

  if (!token) return res.status(401).json({ message: "Token tidak ditemukan" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ message: "Token tidak valid atau kadaluarsa" });
    req.user = user;
    next();
  });
};
