package controllers

import (
    "encoding/json"
    "log"
    "net/http"
    "pengelolaan_mentor/database"
    "pengelolaan_mentor/models"
)

func GetLokasi(w http.ResponseWriter, r *http.Request) {
    rows, err := database.DB.Query("CALL getLokasi()")
    if err != nil {
        log.Println("Error fetching lokasi:", err)
        http.Error(w, "Internal Server Error", http.StatusInternalServerError)
        return
    }
    defer rows.Close()

    var lokasi []models.Lokasi
    for rows.Next() {
        var loc models.Lokasi
        if err := rows.Scan(&loc.ID, &loc.Kota, &loc.Provinsi); err != nil {
            log.Println("Error scanning lokasi:", err)
            http.Error(w, "Internal Server Error", http.StatusInternalServerError)
            return
        }
        lokasi = append(lokasi, loc)
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(lokasi)
}
