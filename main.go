package main

import (
    "log"
    "net/http"
    "pengelolaan_mentor/database"
    "pengelolaan_mentor/routes"
)

func main() {
    database.Connect()
    routes.RegisterRoutes()

    log.Println("Server started at :8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
