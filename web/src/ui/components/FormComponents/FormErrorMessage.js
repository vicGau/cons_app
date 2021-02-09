import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ErrorIcon from '@material-ui/icons/Error';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        margin: `${theme.spacing(1)}px 0 ${theme.spacing(1)}px 0`,
        color: theme.palette.error.main,
        display: 'flex',
        flexDirection: 'row',
    },
    typo: {
        marginTop: theme.spacing(1)
    }
}))

const FormErrorMessage = ({ className, msg, ...other }) => {
    const classes = useStyles();
    const rootClassName = clsx(classes.root, className);

    return (
        <div className={rootClassName} {...other}>
            <ErrorIcon size="small" />
            <Typography className={classes.typo} variant="body1" component="span" >{msg}</Typography>
        </div>
    )
};

FormErrorMessage.defaultProps = {
    className: null,
};

FormErrorMessage.propTypes = {
    className: PropTypes.string,
};

export default FormErrorMessage;
