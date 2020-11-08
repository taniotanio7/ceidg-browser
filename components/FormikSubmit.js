import React from "react";
import { useFormikContext } from "formik";
import clsx from "clsx";

const FormikSubmit = ({ className, children }) => {
  const { handleSubmit, isSubmitting, errors } = useFormikContext();

  const disabled = isSubmitting || !!Object.keys(errors).length;

  return (
    <button
      type="submit"
      disabled={disabled}
      onClick={handleSubmit}
      className={clsx(
        className,
        "bg-blue-500 hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded"
      )}
    >
      {children}
    </button>
  );
};

export default FormikSubmit;
