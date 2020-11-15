import React, { useState } from "react";
import Head from "next/head";
import clsx from "clsx";
import { getCompanyById } from "~/api/fetch";
import { useRouter } from "next/router";
import pkdMap from "~/data/pkd.json";
import Button from "~/components/Button";
import {
  Tag,
  CheckCircle,
  AlertOctagon,
  XOctagon,
  HelpCircle,
  Info,
  Home,
  MapPin,
} from "react-feather";
import ContentLoader from "react-content-loader";
import Container from "~/components/Container";
import CopyButton from "~/components/CopyButton";
import capitalize from "~/utils/capitalize";

const CompanyPage = ({
  imie,
  nazwisko,
  nazwa,
  nip,
  regon,
  email,
  telefon,
  strona,
  adres,
  status,
  adres_korespondencja,
  adres_dodatkowe,
  pkd,
}) => {
  const { isFallback } = useRouter();

  if (isFallback || !nazwa) {
    return (
      <Container>
        <h2 className="text-lg pb-3 text-blue-600 font-black">Dane firmy</h2>
        <ContentLoader
          speed={2}
          width={400}
          height={250}
          viewBox="0 0 400 250"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="9" ry="9" width="100%" height="32" />
          <rect x="0" y="40" rx="9" ry="9" width="100%" height="32" />
          <rect x="0" y="80" rx="9" ry="9" width="100%" height="32" />
          <rect x="0" y="120" rx="9" ry="9" width="100%" height="32" />
          <rect x="0" y="160" rx="9" ry="9" width="100%" height="32" />
          <rect x="0" y="200" rx="9" ry="9" width="100%" height="32" />
        </ContentLoader>
      </Container>
    );
  }

  return (
    <>
      <Head>
        <title>Firma - {nazwa}</title>
      </Head>
      <main className="container mx-2 sm:mx-auto mt-4">
        <h2 className="flex items-center text-lg pb-3 font-bold">
          <Info className="mr-3 w-5" /> Dane firmy
        </h2>

        <div className="md:flex lg:gap-12">
          <div className="w-1/2">
            <div className="divide-y">
              <DataPoint type="Właściciel" data={`${imie} ${nazwisko}`} />
              <DataPoint type="Nazwa" data={nazwa} />
              <DataPoint type="NIP" data={nip} />
              <DataPoint type="REGON" data={regon} />
              <DataPoint
                type="Email"
                data={email}
                link={`mailto:${email}`}
                bolder
              />
              <DataPoint
                type="Telefon"
                data={telefon}
                link={`tel:${telefon}`}
                bolder
              />
              <DataPoint type="Strona" data={strona} link={strona} bolder />
            </div>
          </div>

          <div className="w-1/2">
            <CompanyCodes codes={pkd} />
          </div>
        </div>

        <CompanyStatus status={status} />

        <h3 className="flex items-center text-lg py-3 font-bold">
          <Home className="mr-3 w-5" />
          Dane adresowe
        </h3>

        <div className="md:flex md:gap-8">
          <div>
            <h4 className="font-medium pb-2">Adres główny</h4>
            <AddressPoint address={adres} />
          </div>

          {adres_korespondencja && (
            <div>
              <h4 className="font-medium pb-2">Adres korespondencyjny</h4>
              <AddressPoint address={adres_korespondencja} />
            </div>
          )}
        </div>

        <AdditionalAddresses adresDodatkowe={adres_dodatkowe} />
      </main>
    </>
  );
};

function DataPoint({ type, data, bolder = false, link }) {
  const Element = link ? "a" : "span";

  return (
    <div className="flex items-center py-2">
      {type}:{" "}
      <Element
        href={link}
        className={clsx(
          "ml-2",
          bolder ? "font-bold" : "font-semibold",
          !data && "text-gray-700"
        )}
      >
        {data ?? <HelpCircle className="ml-1" />}
      </Element>
      {data && <CopyButton className="ml-4 shadow-sm" text={data} />}
    </div>
  );
}

function AdditionalAddresses({ adresDodatkowe }) {
  const adresy = adresDodatkowe?.Adres
    ? Array.isArray(adresDodatkowe?.Adres)
      ? adresDodatkowe?.Adres
      : [adresDodatkowe?.Adres]
    : [];

  if (adresy.length) {
    return (
      <>
        <h4 className="font-medium pt-5 pb-2">
          Adres{adresy.length > 1 ? "y" : ""} dodatkow
          {adresy.length > 1 ? "e" : "y"}
        </h4>
        <div className="flex md:gap-8">
          {adresy.map((adres, i) => (
            <AddressPoint key={i} address={adres} additional />
          ))}
        </div>
      </>
    );
  }

  return null;
}

function CompanyStatus({ status }) {
  const Icon = getIcon(status);

  return (
    <div
      className={clsx(
        "flex p-4 mt-3 md:mt-12 mb-12 max-w-3xl mx-auto rounded-lg shadow-2xl",
        getStatusClass(status)
      )}
    >
      <Icon className="mr-3" />
      Status: <span className="ml-1 font-semibold">{status}</span>
    </div>
  );

  function getIcon(text) {
    if (text === "Wykreślony") return XOctagon;
    if (text === "Aktywny") return CheckCircle;
    return AlertOctagon;
  }

  function getStatusClass(text) {
    if (text === "Wykreślony") return "bg-red-200 text-red-800";
    if (text === "Aktywny") return "bg-green-200 text-green-800";
    return "bg-orange-200 text-orange-800";
  }
}

function CompanyCodes({ codes }) {
  const [open, setOpen] = useState(false);

  if (Object.entries(codes).length === 0) {
    return null;
  }

  return (
    <div>
      <Button
        secondary
        icon
        className="mt-3"
        onClick={() => setOpen(status => !status)}
      >
        <Tag className="mr-2 -ml-1" />
        {open ? "Ukryj" : "Pokaż"} kody PKD
      </Button>

      <div
        className={clsx(
          !open && "hidden",
          "mt-5 bg-gray-200 text-gray-800 p-4 -ml-4 md:ml-0 rounded-lg shadow-2xl"
        )}
      >
        <ul className="divide-y divide-gray-300">
          {Object.entries(codes).map(([kod, desc]) => (
            <li className="py-2" key={kod}>
              {kod}: {desc}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function AddressPoint({ address, additional = false }) {
  if (!address) return null;

  const color = additional ? "indigo" : "pink";

  return (
    <div className="mt-3 text-sm mx-6 md:mx-0 min-w-32 relative text-warmGray-800 bg-warmGray-100 p-3 shadow-lg rounded-lg">
      <div
        className={`absolute bg-white rounded-full p-2 shadow-lg bg-${color}-100 text-${color}-800`}
        style={{ top: "-1rem", right: "-1rem" }}
      >
        <MapPin />
      </div>
      <div>
        {address.Ulica} {address.Budynek}
      </div>
      <div>
        {address.KodPocztowy} {address.Miejscowosc}
        {address.Poczta !== address.Miejscowosc && (
          <span className="ml-1 text-warmGray-700 text-sm">
            (poczta: {address.Poczta})
          </span>
        )}
      </div>
      {address.Gmina && address.Powiat && (
        <div className="text-xs text-warmGray-600">
          gmina {address.Gmina}, powiat {address.Powiat},
          {address.Wojewodztwo && ` woj. ${capitalize(address.Wojewodztwo)}`}
        </div>
      )}
    </div>
  );
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  if (!params.id) {
    return {
      notFound: true,
    };
  }

  const data = await getCompanyById(params.id);

  const pkd = preparePKD(data.pkd.split(","));

  return {
    props: {
      adres: data.adres,
      adres_korespondencja: data.adres_korespondencja,
      adres_dodatkowe: data.adres_dodatkowe,
      imie: data.imie,
      nazwisko: data.nazwisko,
      nip: data.nip,
      regon: data.regon,
      nazwa: data.nazwa,
      email: data.email,
      strona: data.strona,
      status: data.status,
      pkd: findPKDs(pkd),
    },
    revalidate: 21600, // 6h
  };

  function preparePKD(codes) {
    return codes.map(
      pkd => `${pkd.slice(0, 2)}.${pkd.slice(2, 4)}.${pkd.slice(4)}`
    );
  }

  function findPKDs(codes) {
    return codes.reduce((prev, pkd) => ({ ...prev, [pkd]: pkdMap[pkd] }), {});
  }
}

export default CompanyPage;
