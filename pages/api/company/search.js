import mongoose, {Schema} from 'mongoose';

mongoose.connect("mongodb://localhost/ceidg", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

const companySchema = new Schema({
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

let Company

try {
  Company = mongoose.model("Company");
} catch {
  Company = mongoose.model("Company", companySchema);
}

export default async (req, res) => {
  const nip = req.query?.nip || null;
  const regon = req.query?.regon || null;

  if (!(nip || regon)) {
    return res.status(400).json({error: 'Musisz podać NIP lub REGON'});
  }

  if (nip && regon) {
    return res.status(400).json({error: 'Możesz podać tylko jeden parametr - NIP lub REGON'});
  }

  const requestData = {};
  if (regon) {
    requestData["regon"] = regon;
  }
  if (nip) {
    requestData["nip"] = nip;
  }

  const result = await Company.find(requestData);
  res.status(200).json(result)
}
