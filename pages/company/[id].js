import React, { useState } from "react";
import Head from "next/head";
import clsx from "clsx";
import { getCompanyById } from "~/api/fetch";
import { useRouter } from "next/router";
import pkdMap from "~/data/pkd.json";
import Button from "~/components/Button";
import { Tag, CheckCircle, AlertOctagon, XOctagon } from "react-feather";

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
    return <p>Wczytywanie...</p>;
  }

  return (
    <>
      <Head>
        <title>Firma - {nazwa}</title>
      </Head>
      <main className="container mx-auto mt-4">
        <h2 className="text-lg pb-3 text-blue-600 font-black">Dane firmy</h2>
        <div>
          Właściciel:{" "}
          <span className="font-semibold">
            {imie} {nazwisko}
          </span>
        </div>
        <div>
          Nazwa: <span className="font-semibold">{nazwa}</span>
        </div>
        <div>
          NIP: <span className="font-semibold">{nip}</span>
        </div>
        <div>
          REGON: <span className="font-semibold">{regon}</span>
        </div>
        <div>
          Email:{" "}
          <span className={clsx("font-bold", !email && "text-red-600")}>
            {email ?? "Brak danych"}
          </span>
        </div>
        <div>
          Telefon:{" "}
          <span className={clsx("font-bold", !telefon && "text-red-600")}>
            {telefon ?? "Brak danych"}
          </span>
        </div>
        {strona && (
          <div>
            Strona: <a href={strona}>{strona}</a>
          </div>
        )}

        <CompanyStatus status={status} />

        <CompanyCodes codes={pkd} />

        <h3 className="text-lg py-3 font-bold">Dane adresowe</h3>

        <h4 className="font-medium pb-2">Adres główny</h4>
        <pre>{JSON.stringify(adres, null, 2)}</pre>

        {adres_korespondencja && (
          <>
            <h4 className="font-medium pb-2">Adres korespondencyjny</h4>
            <pre>{JSON.stringify(adres_korespondencja, null, 2)}</pre>
          </>
        )}

        {adres_dodatkowe && (
          <>
            <h4 className="font-medium pb-2">Adres dodatkowy</h4>
            <pre>{JSON.stringify(adres_dodatkowe, null, 2)}</pre>
          </>
        )}
      </main>
    </>
  );
};

function CompanyStatus({ status }) {
  const Icon = getIcon(status);

  return (
    <div className={clsx("flex p-4 my-2 -ml-4", getStatusClass(status))}>
      <Icon className="mr-3" />
      Status: <span className="ml-1 font-semibold">{status}</span>
    </div>
  );

  function getIcon(text) {
    if (text === "Wykreślony") return XOctagon;
    if (text === "Zawieszony") return AlertOctagon;
    return CheckCircle;
  }

  function getStatusClass(text) {
    if (text === "Wykreślony") return "bg-red-100 text-red-800";
    if (text === "Zawieszony") return "bg-orange-100 text-orange-800";
    return "bg-green-100 text-green-800";
  }
}

function CompanyCodes({ codes }) {
  const [open, setOpen] = useState(false);

  if (Object.entries(codes).length === 0) {
    return null;
  }

  return (
    <>
      <Button
        secondary
        icon
        className="mt-3"
        onClick={() => setOpen(status => !status)}
      >
        <Tag className="mr-2 -ml-1" />
        Kody PKD
      </Button>

      <div
        className={clsx(
          !open && "hidden",
          "mt-3 bg-gray-300 text-gray-800 p-4 -ml-4"
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
    </>
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
