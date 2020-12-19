import { useState } from "react";
import { useSetStoreValue } from "react-context-hook";
import { Box, TextField, Button, Link } from "@material-ui/core";
import { login, signup } from "../../api/api";

const LoginForm = (props) => {
  const setUser = useSetStoreValue("user");
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [signUpForm, setSignUpForm] = useState(false);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState(null);
  const isValid = () => {
    let valid = true;
    const error = {};
    if (!credentials.email.length) {
      error["email"] = "Email cannot be empty";
      valid = false;
    }
    if (!credentials.firstName.length && signUpForm) {
      error["firstName"] = "First name cannot be empty";
      valid = false;
    }
    if (!credentials.lastName.length && signUpForm) {
      error["lastName"] = "Last name cannot be empty";
      valid = false;
    }
    if (!credentials.password.length) {
      error["password"] = "Password cannot be empty";
      valid = false;
    }
    if (!valid) {
      setError(error);
    } else {
      setError(null);
    }
    return valid;
  };
  return (
    <Box width={400} height={200} display="flex" flexDirection="column">
      {signUpForm ? (
        <Box>
          <TextField
            fullWidth
            variant="outlined"
            label="Firstname"
            placeholder="Enter your first name"
            helperText={showError ? error?.firstName || "" : ""}
            onChange={(e) => {
              const firstName = e.target.value;
              if (firstName) setCredentials({ ...credentials, firstName });
            }}
          />
        </Box>
      ) : null}
      {signUpForm ? (
        <Box mt={1} mb={1}>
          <TextField
            fullWidth
            variant="outlined"
            label="Lastname"
            placeholder="Enter your last name"
            helperText={showError ? error?.lastName || "" : ""}
            onChange={(e) => {
              const lastName = e.target.value;
              if (lastName) setCredentials({ ...credentials, lastName });
            }}
          />
        </Box>
      ) : null}
      <Box>
        <TextField
          fullWidth
          variant="outlined"
          label="Email"
          placeholder="Enter your email"
          helperText={showError ? error?.email || "" : ""}
          onChange={(e) => {
            const email = e.target.value;
            if (email) setCredentials({ ...credentials, email });
          }}
        />
      </Box>
      <Box mt={1}>
        <TextField
          fullWidth
          variant="outlined"
          label="Password"
          type="password"
          placeholder="Enter your password"
          helperText={showError ? error?.password || "" : ""}
          onChange={(e) => {
            const password = e.target.value;
            if (password) setCredentials({ ...credentials, password });
          }}
        />
      </Box>
      <Box alignSelf="flex-end" mt={1}>
        {signUpForm ? (
          <Button
            variant="contained"
            onClick={async () => {
              const isValidCredentials = isValid();
              if (isValidCredentials) {
                const { firstName, lastName, email, password } = credentials;
                const response = await signup({
                  first_name: firstName,
                  last_name: lastName,
                  email,
                  password,
                });
                if (response) props.history.push("/");
              } else setShowError(true);
            }}
          >
            Sign Up
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={async () => {
              const isValidCredentials = isValid();
              if (isValidCredentials) {
                const response = await login({
                  username: credentials.email,
                  password: credentials.password,
                });
                if (response) props.history.push("/");
              } else setShowError(true);
            }}
          >
            Login
          </Button>
        )}
      </Box>
      <Box
        display="flex"
        alignSelf="flex-start"
        flexDirection="row"
        fontSize="12px"
        alignItems="center"
      >
        {signUpForm ? "Already have a account?" : "Do not have a account?"}
        <Link
          onClick={() => setSignUpForm(!signUpForm)}
          style={{ marginLeft: 4, cursor: "pointer" }}
        >
          {signUpForm ? "Login, instead!" : "Sign up, instead!"}
        </Link>
      </Box>
    </Box>
  );
};

const Login = (props) => {
  return (
    <Box style={{ top: "35%", left: "35%", position: "fixed" }}>
      <LoginForm {...props} />
    </Box>
  );
};

export default Login;
