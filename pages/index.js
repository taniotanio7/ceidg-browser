import Head from "next/head";
import { Formik, Form } from "formik";
import Field from "~/components/Field";
import isValidNip from "~/utils/validators/isValidNIP";
import isValidRegon from "~/utils/validators/isValidREGON";
import axios from "axios"
import FormikSubmit from "~/components/FormikSubmit";
import {useState} from "react";
import Link from "next/link";

export default function Home() {
  const [results, setResults] = useState(null);

  console.log(results)

  return (
    <>
      <Head>
        <title>Wyszukiwarka Firm</title>
      </Head>
      <main className="container mx-auto mt-4">
        <section>
          <h2 className="text-lg font-bold">Wprowadź dane</h2>
          <Formik
            initialValues={{
              nip: "",
              regon: "",
            }}
            onSubmit={handleSubmit}
          >
            <Form>
              <Field
                label="NIP"
                name="nip"
                className="mt-3"
                validate={isValidNip("Nieprawidłowy NIP")}
              />
              <Field
                label="REGON"
                name="regon"
                className="mt-3"
                validate={isValidRegon("Nieprawidłowy REGON")}
              />
              <FormikSubmit>Szukaj</FormikSubmit>
            </Form>
          </Formik>
        </section>
        {results && (
          <section className="mt-4">
            <h2 className="text-lg font-bold">Wyniki</h2>
            {results.map(result => (
              <Link key={result._id} href={`/company/${result._id}`}>
                <a className="block my-2">{result.nazwa}</a>
              </Link>
            ))}
          </section>
        )}
      </main>
    </>
  );

  function handleSubmit(values) {
    axios.get('/api/company/search', {
      params: values
    }).then(response => setResults(response.data)).catch(err => console.error(err))
  }
}
