import React from "react";
import { Compass } from "react-feather";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-blue-700 px-4">
      <Link href="/">
        <a className="flex items-center container py-5 mx-auto">
          <Compass className="text-white mr-4" />
          <h1 className="text-white font-medium text-xl">Wyszukiwarka Firm</h1>
        </a>
      </Link>
    </header>
  );
};

export default Header;
