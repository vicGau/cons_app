import { makeStyles } from '@material-ui/core/styles';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import Button from '../../../components/Button';
import TextField from '../../../components/FormComponents/TextFieldForm';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  linkPasswordRecovery: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(4),
  },
  linkPasswordRecoveryText: {
    textAlign: 'right'
  },
}));

function LoginForm(props) {
  const { onSubmit } = props;
  const classes = useStyles();

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={onSubmit}
      validateOnChange={false}
      className={classes.form}
    >
      {({ values }) => {
        return (
          <Form noValidate autoComplete="off">
            <Field
              fullWidth
              name="email"
              label="E-mail"
              variant="outlined"
              margin="normal"
              value={values.email}
              component={TextField}
              autoComplete="email"
            />
            <Field
              fullWidth
              variant="outlined"
              margin="normal"
              label="Password"
              name="password"
              value={values.password}
              component={TextField}
              type="password"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              fullWidth
            >
              Login
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default LoginForm;
