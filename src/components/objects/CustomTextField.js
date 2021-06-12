import React from "react";
import { ErrorMessage, useField } from "formik";
import { TextField } from "@material-ui/core";

export default function CustromTextField({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className="mb-2">
      <label htmlFor={field.name}>{label}</label>
      <TextField
        className={`form-control shadow-none ${
          meta.touched && meta.error && "is-invalid"
        }`}
        {...field}
        {...props}
        autoComplete="off"
      ></TextField>
      <ErrorMessage component="div" name={field.name} className="error" />
    </div>
  );
}
