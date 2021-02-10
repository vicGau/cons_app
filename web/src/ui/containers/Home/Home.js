import React, { useEffect, useState } from 'react';
import { Divider, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import RoomsTable from './RoomsTable';
import Header from './Header';
import axios from 'axios';
import FormPopIn from '../../components/Modal/FormModal/FormModal';
import Modal from '../../components/Modal/Modal';
import TextField from '../../components/FormComponents/TextFieldForm'
import { connect } from 'react-redux';
import { Field } from 'formik';
import MyBooking from './MyBooking';
import { setUser } from '../../../redux/actions';

const useStyles = makeStyles(theme => ({
  paper: {
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
    maxWidth: '800px',
    minHeight: '100%',
    margin: 'auto',
  },
  grid: {
    maxWidth: '50%',
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(5),
  },
  divider: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
  }
}));

const renderFields = props => {
  return (
    <Field
      fullWidth
      component={TextField}
      variant='outlined'
      label='Description'
      name='description'
      value={props.values.description}
      multiline
      rows={4}
    />
  )
}

function Home(props) {
  const { auth, setUser } = props;
  const classes = useStyles();

  useEffect(() => {
    axios({
      method: 'GET',
      url: `/api/room/company/${auth.company.id}`,
    }).then(({ data }) => {
      setRooms(data);
    })
  }, [auth.company.id]);

  const [rooms, setRooms] = useState([]);
  const [popIn, setOpenPopIn] = useState({
    opened: false,
    data: {}
  });
  const [cancelPopInOpened, setOpenCancelPopIn] = useState(false);


  const handleClosePopIn = () => {
    setOpenPopIn({
      opened: false,
      data: {}
    });
  }

  const handleOpenPopIn = roomId => {
    setOpenPopIn({
      opened: true,
      data: { roomId },
    });
  }

  const handleOpenCancelPopIn = () => {
    setOpenCancelPopIn(true);
  }

  const handleCloseCancelPopIn = () => {
    setOpenCancelPopIn(false);
  }

  const handleBookingCancel = () => {
    axios({
      method: 'DELETE',
      url: `/api/booking/${auth.booking.id}`,
    }).then(() => {
      handleCloseCancelPopIn();
      axios({
        method: 'GET',
        url: `/api/room/company/${auth.company.id}`,
      }).then(({ data }) => {
        setRooms(data);
      })
      axios({
        method: 'GET',
        url: `/api/users/${auth.id}`,
      }).then(({ data }) => {
        setUser(data);
      })
    })
  }

  const handleFormSubmit = values => {
    const bookingInfos = {
      ...values,
      roomId: popIn.data.roomId,
      userId: auth.id,
    }
    axios({
      method: 'POST',
      url: '/api/booking',
      data: bookingInfos,
    }).then(() => {
      handleClosePopIn();
      axios({
        method: 'GET',
        url: `/api/room/company/${auth.company.id}`,
      }).then(({ data }) => {
        setRooms(data);
      })
      axios({
        method: 'GET',
        url: `/api/users/${auth.id}`,
      }).then(({ data }) => {
        setUser(data);
      })
    })
  }
  return (
    <Paper className={classes.paper}>
      <Header
        firstName={auth.firstName}
        lastName={auth.lastName}
        companyName={auth.company.name}
      />

      <Divider className={classes.divider} />

      <MyBooking
        booking={auth.booking}
        handleOpenCancelPopIn={handleOpenCancelPopIn}
      />

      <Divider className={classes.divider} />
      
      {auth.booking === null &&
        <>
          <Typography component="h1" variant="title1">
            Rooms list :
      </Typography>


          <RoomsTable
            data={rooms}
            handleOpenPopIn={handleOpenPopIn}
          />
        </>
      }

      <FormPopIn
        title='Confirm room booking'
        initialValues={{
          description: '',
        }}
        maxWidth="sm"
        splitActions={false}
        open={popIn.opened}
        render={renderFields}
        onSubmit={handleFormSubmit}
        onClose={handleClosePopIn}
        leftActionOptions={{
          name: 'Cancel',
          variant: 'outlined',
          onClick: handleClosePopIn,
        }}
        rightActionOptions={{
          name: 'Confirm',
          color: 'primary',
          variant: 'contained',
        }}
      />

      <Modal
        open={cancelPopInOpened}
        title="Are you sure you want to cancel your booking."
        subtitle="This operation is final"
        leftActionOptions={{
          name: 'Cancel',
          variant: 'outlined',
          onClick: handleCloseCancelPopIn,
        }}
        rightActionOptions={{
          name: 'Confirm',
          color: 'primary',
          variant: 'contained',
          onClick: handleBookingCancel,
        }}
      />

    </Paper>
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
})

const mapDispatchToProps = {
  setUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
