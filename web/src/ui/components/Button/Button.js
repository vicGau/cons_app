import React from 'react';
import PropTypes from 'prop-types';
import MUIButton from '@material-ui/core/Button';

const Button = ({ className, children, ...other }) => (
  <MUIButton className={className} {...other}>
    {children}
  </MUIButton>
);

Button.defaultProps = {
  className: null,
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Button;
