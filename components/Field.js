import React from 'react'
import PropTypes from 'prop-types'
import {useField} from "formik";
import { useId } from "@reach/auto-id";
import clsx from "clsx";


const Field = ({label, className, inputClassName, ...props}) => {
  const [field, meta] = useField(props)
  const id = useId();

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input id={id} className={clsx("shadow appearance-none border rounded w-48 py-2 px-3", inputClassName)} {...field} {...props} />
      {meta.touched && meta.error && (
        <div className="mt-1 text-red-600">{meta.error}</div>
      )}
    </div>
  )
}

Field.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  inputClassName: PropTypes.string
}

export default Field
