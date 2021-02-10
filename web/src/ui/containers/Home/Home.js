import React, { useEffect, useState } from 'react';
import { Divider, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Content from './Content';
import Header from './Header';
import axios from 'axios';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  paper: {
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
    maxWidth: '50%',
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

function Home(props) {
  const { auth } = props;
  const classes = useStyles();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios({
      method: 'GET',
      url: `/api/room/company/${auth.company.id}`,
    }).then(({ data }) => {
      setRooms(data);
    })
  }, [auth.company.id]);

  return (
    <Paper className={classes.paper}>
        <Header />
        <Divider className={classes.divider} />
        <Content data={rooms} />
    </Paper>
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(Home);
