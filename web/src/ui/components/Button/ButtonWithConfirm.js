import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '../DialogTitle';

/**
 * USAGE EXAMPLE
 */
  // <ButtonWithConfirm
  //     onClick={finalizeAssetAction}
  //     title="Confirmer la finalisation du projet"
  //     content="Une fois le projet finalisé, celui-ci ne pourra plus être modifié."
  //     cancelHint="Annuler"
  //     color="primary"
  //     variant="contained"
  //     confirmHint={<> Finaliser le projet &nbsp;  <SendIcon/> </>}
  //   >
  //     Clotuer le projet et obtenir les certificats &nbsp;&nbsp; <SendIcon />
        
  //   </ButtonWithConfirm>



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function ButtonWithConfirm(
  {
   // eslint-disable-next-line no-alert
   onClick = () => null,
   title = "Confirmation",
   content = "Confirmer l'action",
   confirmHint = null, // same content as main button if not specified
   cancelHint = "Annuler",
   closeOnConfirm = true,
   color = "primary",
   variant = "contained",
   disabled=false,
   children,
  }) {

  const [open, setOpen] = React.useState(false);
  const classes = makeStyles({
    description: {
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    onClick();
    if (closeOnConfirm) {
      handleClose();
    }
  };

  return (
    <div>

    <Button
        variant={variant}
        color={color}
        className={classes.button}
        onClick={handleClickOpen}
        disabled={disabled}
      >
        {children}
     </Button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-confirmation"
      >
        <DialogTitle id="alert-dialog-slide-confirmation" onClose={handleClose}>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default" variant="contained">
            {cancelHint}
          </Button>
          <Button onClick={handleConfirm} color={color} variant={variant}>
            {confirmHint || children }
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ButtonWithConfirm;