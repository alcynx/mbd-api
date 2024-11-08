package routes

import (
    "net/http"
    "pengelolaan_mentor/controllers"
)

func RegisterRoutes() {
    http.HandleFunc("/leaders", controllers.GetAllLeaders)
    http.HandleFunc("/leaders/add", controllers.AddLeader)
    http.HandleFunc("/lokasi", controllers.GetLokasi)
}
