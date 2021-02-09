import React from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import MomentUTCUtils from './MomentUTCUtils';

const FormikDatePicker = ({
  label,
  format,
  placeholder,
  variant,
  form: { setFieldValue, setFieldError, errors },
  field,
  ...other
}) => {
  const hasError = errors[field.name];
  return (
    <MuiPickersUtilsProvider utils={MomentUTCUtils} locale={'fr'} libInstance={moment}>
      <KeyboardDatePicker
        clearable="true"
        name={field.name}
        value={field.value}
        helperText={hasError}
        format={format}
        inputVariant={variant}
        error={Boolean(hasError)}
        invalidDateMessage="Format invalide"
        invalidLabel="Inconnu"
        maxDateMessage="La date ne doit pas être postérieure à la date maximale"
        minDateMessage="La date ne doit pas être antérieure à la date minimale"
        onError={(error) => {
          // handle as a side effect
          if (error !== hasError) {
            setFieldError(field.name, error);
          }
        }}
        // if you are using custom validation schema you probably want to pass `true` as third argument
        onChange={(date) => setFieldValue(field.name, date, false)}
        {...other}
      />
    </MuiPickersUtilsProvider>
  );
};

export default FormikDatePicker;
