import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MUIChip from '@material-ui/core/Chip';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    root: ({ type }) => {
        if (!type) return null;

        const backgrounds = new Map([['warning', theme.palette.warning.lightest]]);

        return {
            background: backgrounds.get(type) || theme.palette[type]?.main,
            color: theme.palette[type].contrastText,
            '& .MuiChip-icon': {
                color: theme.palette[type].contrastText,
            },
        };
    },
}));

/**
 * Extention of Material UI's Chip component with additional type prop
 * which auto-applies icon and color. All props in MUI Chip docs are supported.
 */
const Chip = ({ type, label, icon, className: classNameProp, ...other }) => {
    const classes = useStyles({ type });
    const className = clsx(classes.root, classNameProp);

    let iconProp = null;
    let labelProp = null;
    switch (type) {
        case 'error':
            iconProp = <CloseIcon fontSize="small" data-testid="closeIcon" />;
            labelProp = 'Error';
            break;
        case 'success':
            iconProp = <CheckIcon fontSize="small" data-testid="checkIcon" />;
            labelProp = 'Success';
            break;
        case 'warning':
            iconProp = <ErrorOutlineIcon fontSize="small" data-testid="warningIcon" />;
            labelProp = 'Warning';
            break;
        default:
            iconProp = icon;
            labelProp = label;
            break;
    }

    return <MUIChip label={labelProp} icon={iconProp} className={className} {...other} />;
};

Chip.propTypes = {
    /**
     * The type refers to the icon & color styling
     * representing success, error and warning scenarios
     * which are automatically applied if type is specified.
     */
    type: PropTypes.oneOf(['success', 'warning', 'error']),
    /**
     * The icon is passed directly to the MUIChip component.
     * (Only applicable if type prop is not specified)
     */
    icon: PropTypes.element,
    /**
     * Additional classes which need to be applied to root element
     */
    className: PropTypes.string,

    label: PropTypes.string,
};

Chip.defaultProps = {
    icon: null,
    type: null,
    className: null,
    label: null,
};

export default Chip;
