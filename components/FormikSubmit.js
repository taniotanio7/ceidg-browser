import React from 'react'
import {useFormikContext} from "formik";

const FormikSubmit = ({children}) => {
  const {handleSubmit} = useFormikContext()

  return (
    <button type="submit" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
      {children}
    </button>
  )
}

export default FormikSubmit
