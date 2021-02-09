import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Modal from '../Modal/Modal';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles({
    button: {}
});


function ButtonWithModal({
    onConfirm,
    modal: { title, content, leftButtonLabel, rightButtonLabel, splitActions, ...modalProps },
    closeOnConfirm,
    color,
    variant,
    children,
    className,
    ...props
}) {

    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const classNameProp = clsx(classes.button, className);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        onConfirm();
        if (closeOnConfirm) {
            handleClose();
        }
    };

    return (
        <>
            <Button
                variant={variant}
                color={color}
                className={classNameProp}
                onClick={handleClickOpen}
                {...props}
            >
                {children}
            </Button>

            <Modal
                open={open}
                title={title}
                leftActionOptions={{
                    name: leftButtonLabel || 'Cancel',
                    variant: 'outlined',
                    onClick: handleClose,
                }}
                onClose={handleClose}
                rightActionOptions={{
                    color: 'primary',
                    name: rightButtonLabel || 'Confirm',
                    variant: 'contained',
                    onClick: handleConfirm
                }}
                splitActions={splitActions}
                TransitionComponent={Transition}
                {...modalProps}
            >
                {content}
            </Modal>
        </>
    );
}

ButtonWithModal.propTypes = {
    variant: PropTypes.string,
    color: PropTypes.string,
    onConfirm: PropTypes.func.isRequired,
    modal: PropTypes.shape({
        title: PropTypes.string.isRequired,
        showCloseicon: PropTypes.bool,
        leftButtonLabel: PropTypes.string,
        rightButtonLabel: PropTypes.string,
        splitActions: PropTypes.bool,
        content: PropTypes.string,
    }),
    closeOnConfirm: PropTypes.bool,
}

ButtonWithModal.defaultProps = {
    color: 'primary',
    variant: 'contained',
    closeOnConfirm: true,
    modal: {
        leftButtonLabel: 'Cancel',
        rightButtonLabel: 'Confirm',
        showCloseicon: false,
        splitActions: false,
        content: null,
    },
    onConfirm: () =>  null,
    
};


export default ButtonWithModal;