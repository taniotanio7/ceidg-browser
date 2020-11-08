import mongoose from "mongoose";
import { companySchema } from "~/api/company";

mongoose.connect("mongodb://localhost/ceidg", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

let Company;

try {
  Company = mongoose.model("Company");
} catch {
  Company = mongoose.model("Company", companySchema);
}

export const getCompanyById = async id => await Company.findById(id).lean();
