package controllers

import (
    "encoding/json"
    "log"
    "net/http"
    "pengelolaan_mentor/database"
    "pengelolaan_mentor/models"
)

func GetAllLeaders(w http.ResponseWriter, r *http.Request) {
    rows, err := database.DB.Query("CALL getAllLeaders()")
    if err != nil {
        log.Println("Error fetching leaders:", err)
        http.Error(w, "Internal Server Error", http.StatusInternalServerError)
        return
    }
    defer rows.Close()

    var leaders []models.Leaders
    for rows.Next() {
        var leader models.Leaders
        if err := rows.Scan(&leader.ID, &leader.Nama, &leader.Email, &leader.LokasiID); err != nil {
            log.Println("Error scanning leader:", err)
            http.Error(w, "Internal Server Error", http.StatusInternalServerError)
            return
        }
        leaders = append(leaders, leader)
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(leaders)
}

func AddLeader(w http.ResponseWriter, r *http.Request) {
    var leader models.Leaders
    if err := json.NewDecoder(r.Body).Decode(&leader); err != nil {
        http.Error(w, "Bad Request", http.StatusBadRequest)
        return
    }

    _, err := database.DB.Exec("CALL tambahLeader(?, ?, ?)", leader.Nama, leader.Email, leader.LokasiID)
    if err != nil {
        log.Println("Error adding leader:", err)
        http.Error(w, "Internal Server Error", http.StatusInternalServerError)
        return
    }

    w.WriteHeader(http.StatusCreated)
    w.Write([]byte("Leader added successfully"))
}
