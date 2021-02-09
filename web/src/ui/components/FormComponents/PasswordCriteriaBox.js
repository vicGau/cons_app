import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Checkbox, Typography } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

const useStyles = makeStyles((theme) => ({
  criteriaBox: {
    padding: theme.spacing(2),
    color: theme.palette.primary.main,
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(3)}px 0`,
    borderColor: '#b4c3ca',
    borderRadius: 4,
  },
  errorsBox: {
    backgroundColor: '#0e2542',
    color: theme.palette.primary.main,
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorBoxContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  typo: {
    color: '#b4c3ca',
  },
  errorBoxTypo: {
    padding: theme.spacing(1),
  },
  checked: {
    color: theme.palette.primary.main,
  },
  checkbox: {
    marginRight: theme.spacing(2),
  },
}));

const DisabledCheckbox = withStyles({
  root: {
    padding: 0,
    color: '#88a0ab',
    '&$disabled': {
      color: '#88a0ab',
    },
  },
  checked: {},
  disabled: {
    '&$checked': {
      color: '#1f2c60',
    },
  },
})((props) => <Checkbox color="default" {...props} />);

function PasswordCriteriaBox(props) {
  const classes = useStyles();
  const {
    typeMinError,
    typeLowerCaseError,
    typeUpperCaseError,
    typeNumberError,
    typeSpecialCharacterError,
  } = props;

  return (
    <>
      <div className={classes.criteriaBox}>
        <Typography component="div" className={classes.errorBoxContent}>
          <DisabledCheckbox
            className={classes.checkbox}
            checked={typeMinError}
            disabled
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<CheckCircleOutlineIcon />}
          />
          <Typography
            className={clsx(classes.typo, typeMinError && classes.checked)}
            variant="body1"
            component="span"
          >
            Doit contenir au moins 8 caractères
          </Typography>
        </Typography>
        <Typography component="div" className={classes.errorBoxContent}>
          <DisabledCheckbox
            className={classes.checkbox}
            checked={typeLowerCaseError}
            disabled
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<CheckCircleOutlineIcon />}
          />
          <Typography
            className={clsx(classes.typo, typeLowerCaseError && classes.checked)}
            variant="body1"
            component="span"
          >
            Doit contenir une lettre minuscule
          </Typography>
        </Typography>
        <Typography component="div" className={classes.errorBoxContent}>
          <DisabledCheckbox
            className={classes.checkbox}
            checked={typeUpperCaseError}
            disabled
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<CheckCircleOutlineIcon />}
          />
          <Typography
            className={clsx(classes.typo, typeUpperCaseError && classes.checked)}
            variant="body1"
            component="span"
          >
            Doit contenir une lettre majuscule
          </Typography>
        </Typography>
        <Typography component="div" className={classes.errorBoxContent}>
          <DisabledCheckbox
            className={classes.checkbox}
            checked={typeNumberError}
            disabled
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<CheckCircleOutlineIcon />}
          />
          <Typography
            className={clsx(classes.typo, typeNumberError && classes.checked)}
            variant="body1"
            component="span"
          >
            Doit contenir un chiffre
          </Typography>
        </Typography>
        <Typography component="div" className={classes.errorBoxContent}>
          <DisabledCheckbox
            className={classes.checkbox}
            checked={typeSpecialCharacterError}
            disabled
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<CheckCircleOutlineIcon />}
          />
          <Typography
            className={clsx(classes.typo, typeSpecialCharacterError && classes.checked)}
            variant="body1"
            component="span"
          >
            Doit contenir un caractère spécial
          </Typography>
        </Typography>
      </div>
    </>
  );
}

// PasswordCriteriaBox.defaultProps = {
// }

PasswordCriteriaBox.propTypes = {
  typeMinError: PropTypes.bool.isRequired,
  typeLowerCaseError: PropTypes.bool.isRequired,
  typeUpperCaseError: PropTypes.bool.isRequired,
  typeNumberError: PropTypes.bool.isRequired,
  typeSpecialCharacterError: PropTypes.bool.isRequired,
};

export default PasswordCriteriaBox;
