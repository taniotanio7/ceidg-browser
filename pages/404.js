import React from "react";
import Link from "next/link";
import Container from "~/components/Container";
import Button from "~/components/Button";
import Image from "next/image";
import { Home } from "react-feather";

const NotFoundPage = () => {
  return (
    <Container>
      <section className="flex flex-col items-center">
        <h2 className="text-lg font-bold">404 - Nie znaleziono</h2>
        <p>Strona o podanym adresem nie istnieje</p>
        <div className="my-4">
          <Image
            src="/img/ginger-cat-404.png"
            alt="Kot w pustej lodówce"
            width={266}
            height={259}
          />
        </div>
        <Link href="/">
          <Button as="a" className="flex">
            <Home className="mr-2 -ml-2" />
            Strona główna
          </Button>
        </Link>
      </section>
    </Container>
  );
};

export default NotFoundPage;
