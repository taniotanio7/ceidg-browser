import React from "react";
import Head from "next/head";
import clsx from "clsx";
import { getCompanyById } from "~/api/fetch";
import { useRouter } from "next/router";

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

        <div className={clsx("p-4 my-2 -ml-4", getStatusClass(status))}>
          Status: <span className="font-semibold">{status}</span>
        </div>

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

function getStatusClass(text) {
  if (text === "Wykreślony") return "bg-red-100";
  if (text === "Zawieszony") return "bg-orange-100";
  return "bg-green-100";
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
      pkd: data.pkd.split(","),
    },
    revalidate: 60,
  };
}

export default CompanyPage;
