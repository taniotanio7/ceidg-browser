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
          height={150}
          viewBox="0 12 400 150"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="12" rx="5" ry="5" width="220" height="10" />
          <rect x="0" y="32" rx="5" ry="5" width="220" height="10" />
          <rect x="0" y="50" rx="5" ry="5" width="220" height="10" />
          <rect x="0" y="71" rx="5" ry="5" width="220" height="10" />
          <rect x="0" y="91" rx="5" ry="5" width="220" height="10" />
          <rect x="0" y="112" rx="5" ry="5" width="220" height="10" />
        </ContentLoader>
      </Container>
    );
  }

  return (
    <>
      <Head>
        <title>Firma - {nazwa}</title>
      </Head>
      <main className="container mx-auto mt-4">
        <h2 className="flex items-center text-lg pb-3 font-bold">
          <Info className="mr-2 w-5" /> Dane firmy
        </h2>

        <div className="md:flex lg:gap-12">
          <div className="w-1/2">
            <div className="divide-y">
              <DataPoint type="Właściciel" data={`${imie} ${nazwisko}`} />
              <DataPoint type="Nazwa" data={nazwa} />
              <DataPoint type="NIP" data={nip} />
              <DataPoint type="REGON" data={regon} />
              <DataPoint type="Email" data={email} bolder />
              <DataPoint type="Telefon" data={telefon} bolder />
            </div>
            {strona && (
              <div>
                Strona: <a href={strona}>{strona}</a>
              </div>
            )}

            <CompanyStatus status={status} />
          </div>

          <div className="w-1/2">
            <CompanyCodes codes={pkd} />
          </div>
        </div>

        <h3 className="text-lg py-3 font-bold">Dane adresowe</h3>

        <div className="md:flex md:gap-4">
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

        {adres_dodatkowe && (
          <>
            <h4 className="font-medium pb-2">
              Adres{adres_dodatkowe.length > 1 ? "y" : ""} dodatkow
              {adres_dodatkowe.length > 1 ? "e" : "y"}
            </h4>
            <pre>{JSON.stringify(adres_dodatkowe, null, 2)}</pre>
          </>
        )}
      </main>
    </>
  );
};

function DataPoint({ type, data, bolder = false }) {
  return (
    <div className="flex items-center py-2">
      {type}:{" "}
      <span
        className={clsx(
          "ml-2",
          bolder ? "font-bold" : "font-semibold",
          !data && "text-gray-700"
        )}
      >
        {data ?? <HelpCircle className="ml-1" />}
      </span>
      {data && <CopyButton className="ml-2" text={data} />}
    </div>
  );
}

function CompanyStatus({ status }) {
  const Icon = getIcon(status);

  return (
    <div
      className={clsx(
        "flex p-4 mt-3 mb-12 -ml-4 rounded-lg shadow-2xl",
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
          "mt-5 bg-gray-300 text-gray-800 p-4 -ml-4 md:ml-0 rounded-lg shadow-2xl"
        )}
      >
        <ul className="divide-y divide-gray-400">
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

function AddressPoint({ address }) {
  if (!address) return null;

  return (
    <div className="text-sm text-gray-800 bg-gray-100 p-3 shadow-lg rounded-lg">
      <div>
        {address.Ulica} {address.Budynek}
      </div>
      <div>
        {address.KodPocztowy} {address.Miejscowosc}
        {address.Poczta !== address.Miejscowosc && (
          <span className="ml-1 text-gray-700 text-sm">
            (poczta: {address.Poczta})
          </span>
        )}
      </div>
      <div className="text-xs text-gray-600">
        gmina {address.Gmina}, powiat {address.Powiat}, woj.{" "}
        {capitalize(address.Wojewodztwo)}
      </div>
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
    revalidate: 60,
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
