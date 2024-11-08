package models

type Lokasi struct {
    ID       int    `json:"id_lokasi"`
    Kota     string `json:"kota"`
    Provinsi string `json:"provinsi"`
}

type AdminHQ struct {
    ID      int    `json:"id_admin"`
    Nama    string `json:"nama"`
    Email   string `json:"email"`
    NoTelp  string `json:"no_telp"`
}

type Leaders struct {
    ID       int    `json:"id_leaders"`
    Nama     string `json:"nama"`
    Email    string `json:"email"`
    LokasiID int    `json:"id_lokasi"`
}

type Mentor struct {
    ID          int    `json:"id_mentor"`
    Nama        string `json:"nama"`
    Email       string `json:"email"`
    NoTelp      string `json:"no_telp"`
    BidangMinat string `json:"bidang_minat"`
    LokasiID    int    `json:"id_lokasi"`
    Status      string `json:"status"`
}

type Topik struct {
    ID         int    `json:"id_topik"`
    NamaTopik  string `json:"nama_topik"`
    Deskripsi  string `json:"deskripsi"`
}

type Modul struct {
    ID            int    `json:"id_modul"`
    NamaModul     string `json:"nama_modul"`
    Deskripsi     string `json:"deskripsi"`
    CreatedByID   int    `json:"createdbyID"`
    CreatedByType string `json:"createdbyType"`
    TopikID       int    `json:"id_topik"`
}

type Event struct {
    ID            int    `json:"id_event"`
    NamaEvent     string `json:"nama_event"`
    Date          string `json:"date"`
    Deskripsi     string `json:"deskripsi"`
    Evaluasi      string `json:"evaluasi"`
    CreatedByID   int    `json:"createdbyID"`
    CreatedByType string `json:"createdbyType"`
    LokasiID      int    `json:"id_lokasi"`
    MentorID      int    `json:"id_mentor"`
    ModulID       int    `json:"id_modul"`
}
