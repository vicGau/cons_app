import React from 'react';
import TextField from '@material-ui/core/TextField';

const TextInput = ({
  label,
  field,
  margin,
  variant,
  fullWidth,
  form: { dirty, touched, errors },
  className,
  ...other
}) => {
  const hasError = dirty && touched[field.name] && errors[field.name] !== undefined;

  return (
    <TextField
      label={label}
      variant={variant}
      error={hasError}
      fullWidth={fullWidth}
      margin={margin}
      {...field}
      {...other}
    />
  );
};

export default TextInput;
