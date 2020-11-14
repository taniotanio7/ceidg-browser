import React from "react";
import clsx from "clsx";

const Container = ({ className, children }) => {
  return (
    <main className={clsx("container mx-auto mt-4", className)}>
      {children}
    </main>
  );
};

export default Container;
