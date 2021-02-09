import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import MUITextField from '@material-ui/core/TextField';

const Select = ({
  required,
  label,
  labelIdentifier,
  valueIdentifier,
  form: { dirty, touched, errors },
  field: { name, onChange, value },
  options,
  fullWidth,
  margin,
  allowEmptyOption,
  variant,
  className,
  ...other
}) => {
  const id = `sel_${name}`;
  const errorText = errors[name];
  const hasError = dirty && touched[name] && errorText !== undefined;

  return (
    <MUITextField
      select
      required={required}
      label={label}
      error={hasError}
      id={id}
      className={className}
      name={name}
      onChange={onChange}
      value={value}
      fullWidth={fullWidth}
      margin={margin}
      variant={variant}
      {...other}
    >
      {allowEmptyOption && <MenuItem key="empty" value="" />}
      {options.map((item) => (
        <MenuItem key={`${item[valueIdentifier]}-key`} value={item[valueIdentifier]}>
          {item[labelIdentifier]}
        </MenuItem>
      ))}
    </MUITextField>
  );
};

Select.propTypes = {
  /**
   * Label to be used for Select Field
   */
  label: PropTypes.string,
  field: PropTypes.shape({
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.shape({}),
      PropTypes.any,
    ]).isRequired,
  }).isRequired,
  form: PropTypes.shape({
    dirty: PropTypes.bool,
    errors: PropTypes.object,
    touched: PropTypes.shape({}),
  }).isRequired,
  /**
   * Options to be rendered as part of Select Field
   */
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  /**
   * Whether field is required
   */
  required: PropTypes.bool,
  /**
   * Select field to render in available width
   */
  fullWidth: PropTypes.bool,
  margin: PropTypes.oneOf(['none', 'dense', 'normal']),
  /**
   * Identifier for the label within options array
   */
  labelIdentifier: PropTypes.string,
  /**
   * Identifier for the value within options array
   */
  valueIdentifier: PropTypes.string,
  /**
   * If Select should render with no options
   */
  allowEmptyOption: PropTypes.bool,
  /**
   * Variant of Form Control to be rendered.
   */
  variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
  /**
   * The additional classes which need to be applied to the root element.
   */
  className: PropTypes.string,
};

Select.defaultProps = {
  label: '',
  required: false,
  fullWidth: true,
  margin: 'normal',
  labelIdentifier: 'label',
  valueIdentifier: 'value',
  allowEmptyOption: false,
  className: null,
  variant: 'outlined',
};

export default Select;
