import {Schema} from "mongoose";

export const companySchema = new Schema({
  imie: String,
  nazwisko: String,
  nip: String,
  region: String,
  nazwa: String,
  email: String,
  strona: String,
  telefon: String,
  adres: {
    Miejscowosc: String,
    Budynek: String,
    KodPocztowy: String,
    Poczta: String
  },
  adres_korespondencja: {
    TERC: String,
    SIMC: String,
    ULIC: String,
    Miejscowosc: String,
    Ulica: String,
    Budynek: String,
    Lokal: String,
    KodPocztowy: String,
    Poczta: String,
    Gmina: String,
    Powiat: String,
    Wojewodztwo: String
  },
  adres_dodatkowe: {
    Adres: Array
  },
  status: String,
  pkd: String
}, {collection: 'companies'})
