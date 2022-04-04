import { useState } from 'react';
import axios from 'axios';
import TextField from "@material-ui/core/TextField";
import { Formik } from "formik";
import { string, object } from "yup";
import { makeStyles } from "@material-ui/core/styles";
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { FaUserAlt } from "react-icons/fa";



const projectID = '0288bf2c-6383-4ed4-98ae-5503ec2ff135';

const Modal = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const classes = useStyles();

  const validationSchema = object().shape({
    username: string()
    .required("Required"),
    password: string()
      .min(4, "Must be 4 characters or more")
      .required("Required"),
  });

  const initialValues = {
    username: "",
    password: "",
  };

  const onFormSubmit = async (values) => {
    console.log(values);

    const authObject = { 'Project-ID': projectID, 'User-Name': values.username, 'User-Secret': values.password };

    try {
      await axios.get('https://api.chatengine.io/chats', { headers: authObject })
        .then(response => {
          if (response?.status === 200) {
            localStorage.setItem('username', values.username);
            localStorage.setItem('password', values.password);
            window.location.reload();
          }
        })
      
      
    } catch (err) {
       setError('Invalid credentials.');
    }

  };
  return (

      <div className={classes.container}>
        <div className={classes.form}>
          <div className={classes.logodiv}>
          <p className={classes.chatHeading}>Encrypted Chat</p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onFormSubmit}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              errors,
              isValid,
              dirty,
            }) => (
              <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                  error={touched.username && !!errors.username}
                  name="username"
                  id="formEmail"
                  label="Username"
                  onChange={(e) => { handleChange(e); setError('') }}
                  onBlur={handleBlur}
                  value={values.username}
                  helperText={touched.username ? errors.username : false}
                  variant="outlined"
                  fullWidth
                color="primary"
                InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<FaUserAlt />
									</InputAdornment>
								)
							}}
              />
            

                <TextField
                  label="Room No"
                  type="password"
                  autoComplete="current-password"
                  variant="outlined"
                  name="password"
                  id="formPassword"
                  onChange={(e) => { handleChange(e); setError('') }}
                  onBlur={handleBlur}
                  value={values.password}
                  helperText={touched.password ? errors.password : false}
                  error={touched.password && !!errors.password}
                fullWidth
                InputProps={{
								className: 'pr-2',
								type: showPassword ? 'text' : 'password',
								endAdornment: (
									<InputAdornment position="end">
									
                    {
                      showPassword ?
                        <MdVisibility onClick={() => setShowPassword(!showPassword)} /> : <MdVisibilityOff onClick={() => setShowPassword(!showPassword)} />
                    }
									</InputAdornment>
								)
							}}
                />

              {/* <CustomButton label="Login" /> */}
              <button type="submit" className="button">
               <span>Login</span>
              </button>
                 <p className={classes.error}>{error}</p>
              </form>
            )}
          </Formik>
        </div>
      </div>
  );
};

export default Modal;



const useStyles = makeStyles((theme) => ({
  form: {
    width: "30rem",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "left",
    fontSize: "2rem",
    border: "2px solid var(--primary)",
    padding: "4rem 3.5rem",
    borderRadius: "1rem",
    fontWeight: "600",
    backgroundColor: "#fff",

    "@media (max-width: 37.5em)": {
      width: "92vw",
      padding: '4rem 0.5rem',
    },

    "& .MuiTextField-root": {
      margin: "1rem 0",
    },

    "& .MuiButtonBase-root": {
      width: "10rem",
      padding: ".7rem 0",
      marginTop: ".8rem",
    },
  },

  container: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#343a40",
  },

  logo: {
    width: "60px",
  },
  logodiv:{
      display:'flex',
      justifyContent:'center',
  },
  error:{
    color: '#f44336',
    fontSize:'20px'
  },
  chatHeading: {
    fontFamily: 'cursive',
    marginBottom: '20px',
  }
}));

