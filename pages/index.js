import Head from "next/head";
import { Formik, Form, useFormikContext } from "formik";
import Field from "~/components/Field";
import isValidNip from "~/utils/validators/isValidNIP";
import isValidRegon from "~/utils/validators/isValidREGON";
import axios from "axios";
import FormikSubmit from "~/components/FormikSubmit";
import { useState } from "react";
import Link from "next/link";
import { Search, ArrowRight, Frown } from "react-feather";
import FormikClear from "~/components/FormikClear";
import Container from "~/components/Container";
import ContentLoader from "react-content-loader";

const SearchForm = () => {
  const { values, status, errors } = useFormikContext();

  return (
    <div className="flex justify-center md:mt-10">
      <section className="p-4 bg-blueGray-200 w-80 rounded-xl shadow-2xl">
        <h2 className="text-lg font-bold text-center text-blueGray-800">
          Wprowadź dane
        </h2>
        <Form>
          <Field
            autoComplete="off"
            label="NIP"
            name="nip"
            textColor="blueGray"
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
            textColor="blueGray"
            className="mt-3 w-48"
            disabled={!!values.nip}
            description={
              !!values.nip &&
              "Możesz wybrać tylko jeden parametr do wyszukiwania"
            }
          />
          <div className="flex justify-between mt-4">
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
    </div>
  );
};

const ResultItem = ({ result }) => {
  return (
    <Link href={`/company/${result._id}`}>
      <a className="flex my-2 px-4 py-3 bg-coolGray-50 text-coolGray-700 border border-coolGray-200 hover:border-coolGray-300 shadow-sm hover:shadow-md transition-all rounded-xl">
        <span>{result.nazwa}</span>
        <ArrowRight className="ml-auto text-coolGray-600" />
      </a>
    </Link>
  );
};

const Results = ({ results }) => {
  const { isSubmitting } = useFormikContext();

  if (results === null) return null;

  return (
    <section>
      <h2 className="flex items-center text-lg font-bold">
        <Search className="mr-2" />
        Wyniki
      </h2>
      {isSubmitting && (
        <ContentLoader
          speed={2}
          width="100%"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          className="my-2"
        >
          <rect x="0" y="0" rx="9" ry="9" width="100%" height="48" />
        </ContentLoader>
      )}
      {!isSubmitting &&
        results.map(result => <ResultItem result={result} key={result._id} />)}
      {!results.length && !isSubmitting && (
        <div className="flex px-4 py-3 mt-2 bg-red-200 text-red-900 shadow-sm hover:shadow-md transition-all rounded-xl">
          <Frown className="mr-3" />
          Brak wyników
        </div>
      )}
    </section>
  );
};

export default function Home() {
  const [results, setResults] = useState(null);

  return (
    <>
      <Head>
        <title>Wyszukiwarka Firm</title>
      </Head>
      <Container>
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
          <>
            <SearchForm />
            <div className="mt-8 md:mt-20 max-w-4xl px-4 mx-auto">
              <Results results={results} />
            </div>
          </>
        </Formik>
      </Container>
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
