import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DialogContentText } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  divider: {
    flex: '1 0 0',
  },
}));

/**
 * Modal is a custom wrapper of Material UI's Dialog components (Content, Actions, etc...),
 * it also make use of our custom `DialogTitle` component.
 */
const Modal = ({
  title,
  showCloseIcon,
  leftActionOptions: { name: leftName, hide: leftHide, ...leftProps },
  rightActionOptions: { name: rightName, hide: rightHide, ...rightProps },
  open,
  onClose,
  splitActions,
  children,
  className,
  ...props
}) => {
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={onClose} className={className} fullWidth {...props}>
      <DialogTitle onClose={showCloseIcon ? onClose : null}>{title}</DialogTitle>
      <DialogContent dividers>
        <DialogContentText>
          {children}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {!leftHide && <Button {...leftProps}>{leftName}</Button>}
        {splitActions && <div className={classes.divider} />}
        {!rightHide && <Button {...rightProps}>{rightName}</Button>}
      </DialogActions>
    </Dialog>
  );
};

Modal.propTypes = {
  /**
   * String to show as title.
   */
  title: PropTypes.string.isRequired,
  /**
   * Variable to enable the `closeIcon` button aligned to the modal title
   */
  showCloseIcon: PropTypes.bool,
  /**
   * Additional classes which need to be applied to action component. See [MUI-Button](https://material-ui.com/api/button/)
   */
  leftActionOptions: PropTypes.shape({
    /**
     * If `true`, the action button will be hidden
     */
    hide: PropTypes.bool,
    /**
     * String for the action button, by default is "<b>back</b>"
     */
    name: PropTypes.string,
    /**
     * Function to be executed on action button click
     */
    onClick: PropTypes.func,
  }),
  /**
   * Additional classes which need to be applied to action component. See [MUI-Button](https://material-ui.com/api/button/)
   */
  rightActionOptions: PropTypes.shape({
    /**
     * If `true`, the action button will be hidden
     */
    hide: PropTypes.bool,
    /**
     * String for the action button, by default is "<b>next</b>"
     */
    name: PropTypes.string,
    /**
     * Function to be executed on action button click
     */
    onClick: PropTypes.func,
  }),
  /**
   * If `true`, the modal is open
   */
  open: PropTypes.bool.isRequired,
  /**
   * Function to be executed on close icon click
   */
  onClose: PropTypes.func.isRequired,
  /**
   * If true the actions buttons will show next to each other instead of at each side
   */
  splitActions: PropTypes.bool,
  /**
   * Child components to be rendered within the content.
   */
  children: PropTypes.node.isRequired,
  /**
   * Additional classes which need to be applied to root element
   */
  className: PropTypes.string,
};

Modal.defaultProps = {
  showCloseIcon: false,
  splitActions: true,
  leftActionOptions: {
    hide: false,
    name: 'Back',
    startIcon: <ArrowBackIcon />,
    onClick: () => { },
    variant: 'outlined',
    color: 'primary',
  },
  rightActionOptions: {
    hide: false,
    name: 'Next',
    endIcon: <ArrowForwardIcon />,
    onClick: () => { },
    variant: 'outlined',
    color: 'primary',
  },
  className: null,
};

export default Modal;