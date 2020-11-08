import Head from "next/head";
import { Formik, Form, useFormikContext } from "formik";
import Field from "~/components/Field";
import isValidNip from "~/utils/validators/isValidNIP";
import isValidRegon from "~/utils/validators/isValidREGON";
import axios from "axios";
import FormikSubmit from "~/components/FormikSubmit";
import { useState } from "react";
import Link from "next/link";
import FormikClear from "~/components/FormikClear";

const SearchForm = () => {
  const { values, status, errors } = useFormikContext();

  return (
    <section>
      <h2 className="text-lg font-bold">Wprowadź dane</h2>
      <Form>
        <div className="flex gap-10">
          <Field
            autoComplete="off"
            label="NIP"
            name="nip"
            className="mt-3 w-48"
            disabled={!!values.regon}
            description={
              !!values.regon &&
              "Możesz wybrać tylko jeden parametr do wyszukiwania"
            }
          />
          <Field
            autoComplete="off"
            label="REGON"
            name="regon"
            className="mt-3 w-48"
            disabled={!!values.nip}
            description={
              !!values.nip &&
              "Możesz wybrać tylko jeden parametr do wyszukiwania"
            }
          />
        </div>
        <div className="flex gap-4 mt-4">
          <FormikSubmit>Szukaj firmy</FormikSubmit>
          <FormikClear>Wyczyść</FormikClear>
        </div>
        {(status?.error || errors?.general) && (
          <div className="mt-3 text-red-600">
            {status?.error || errors?.general}
          </div>
        )}
      </Form>
    </section>
  );
};

const Results = ({ results }) => {
  if (results?.length) {
    return (
      <section className="mt-8">
        <h2 className="text-lg font-bold">Wyniki</h2>
        {results.map(result => (
          <Link key={result._id} href={`/company/${result._id}`}>
            <a className="block my-2">{result.nazwa}</a>
          </Link>
        ))}
      </section>
    );
  }

  if (results !== null) {
    return (
      <section className="mt-4">
        <p className="font-lg font-bold text-red-800">Brak wyników</p>
      </section>
    );
  }

  return null;
};

export default function Home() {
  const [results, setResults] = useState(null);

  return (
    <>
      <Head>
        <title>Wyszukiwarka Firm</title>
      </Head>
      <main className="container mx-auto mt-4">
        <Formik
          initialValues={{
            nip: "",
            regon: "",
          }}
          validate={validate}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={handleSubmit}
          onReset={handleReset}
        >
          <SearchForm />
        </Formik>
        <Results results={results} />
      </main>
    </>
  );

  function validate(values) {
    if (values.nip) {
      const isInvalid = isValidNip("Nieprawidłowy NIP")(values.nip);
      if (isInvalid) return { nip: isInvalid };
    }

    if (values.regon) {
      const isInvalid = isValidRegon("Nieprawidłowy REGON")(values.nip);
      if (isInvalid) return { regon: isInvalid };
    }

    if (values.nip && values.regon) {
      return { general: "Podaj tylko jedną wartość - NIP lub REGON" };
    }

    if (!(values.nip || values.regon)) {
      return { general: "Jedna z wartości - NIP lub REGON jest wymagana" };
    }
  }

  function handleReset(values, { setStatus }) {
    setStatus({});
    setResults(null);
  }

  async function handleSubmit(values, { setStatus }) {
    setStatus({});
    try {
      const response = await axios.get("/api/company/search", {
        params: values,
      });
      setResults(response.data);
      return results;
    } catch (e) {
      console.error(e);
    }
  }
}
