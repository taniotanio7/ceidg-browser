import React from "react";
import PropTypes from "prop-types";
import { useField } from "formik";
import { useId } from "@reach/auto-id";
import clsx from "clsx";

const Field = ({
  label,
  textColor = "gray",
  className,
  inputClassName,
  disabled,
  description,
  ...props
}) => {
  const [field, meta] = useField({ ...props, disabled });
  const id = useId();

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className={clsx(
          "block text-sm font-bold mb-2",
          disabled ? `text-${textColor}-500` : `text-${textColor}-700`
        )}
      >
        {label}
      </label>
      <input
        id={id}
        className={clsx(
          "shadow appearance-none border rounded py-2 px-3",
          inputClassName
        )}
        disabled={disabled}
        {...field}
      />
      {description && (
        <p className={`mt-2 text-xs text-${textColor}-500 font-light`}>
          {description}
        </p>
      )}
      {meta.touched && meta.error && (
        <div className="mt-1 text-red-600">{meta.error}</div>
      )}
    </div>
  );
};

Field.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
};

export default Field;
