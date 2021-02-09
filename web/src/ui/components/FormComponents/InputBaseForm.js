import React from 'react';
import { InputBase } from '@material-ui/core';

export default ({
  label,
  field,
  margin,
  variant,
  fullWidth,
  multiline,
  form: { dirty, touched, errors },
  className,
  ...other
}) => (
  <InputBase
    label={label}
    placeholder={label}
    error={dirty && touched[field.name] && errors[field.name] !== undefined}
    multiline={multiline}
    {...field}
    {...other}
  />
);
