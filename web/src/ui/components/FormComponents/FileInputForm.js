import React from "react";
import PropTypes from 'prop-types';
import { Button, Input } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import PublishTwoToneIcon from '@material-ui/icons/PublishTwoTone';

const useStyles = makeStyles({
  input: {
    display: 'none',
  }
});

const FileInput = ({ form, field, accept, ...props }) => {
  const classes = useStyles();
  const [file, setFile] = React.useState(null);

  return (
    <>
      <Input
        className={classes.input}
        id={field.name}
        name={field.name}
        type="file"
        accept={accept}
        onChange={e => {
          if (e.currentTarget.files[0]) {
            setFile(e.target.files[0].name);
          }
          form.setFieldValue(field.name, e.currentTarget.files[0])
        }}
        {...props}
      />
      <label htmlFor={field.name}>
        <Button
          component="span"
          color="primary"
          variant="outlined"
          startIcon={<PublishTwoToneIcon />}
        >

          {file !== null ? file : 'Choisir un fichier...'}
        </Button>
      </label>
    </>
  )
};

FileInput.propTypes = {
  accept: PropTypes.string,
  field: PropTypes.shape({
    name: PropTypes.string,
    onChange: PropTypes.func,
  }).isRequired,
  form: PropTypes.shape({
    dirty: PropTypes.bool,
    errors: PropTypes.object,
    touched: PropTypes.shape({}),
  }).isRequired,
}

FileInput.defaultProps = {
  accept: '*/*'
}


export default FileInput;
