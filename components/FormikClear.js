import React from "react";
import clsx from "clsx";
import { useFormikContext } from "formik";

const FormikClear = ({ className, children }) => {
  const { dirty, handleReset } = useFormikContext();

  return (
    <button
      onClick={handleReset}
      disabled={!dirty}
      className={clsx(
        className,
        "bg-blue-500 hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded"
      )}
    >
      {children}
    </button>
  );
};

export default FormikClear;
