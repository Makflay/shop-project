import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";

import { Container, AuthCard, FormBox, LinksBox } from "./auth-styles";
import { useAuth } from "../hooks/useAuth";
import {
  validateEmail,
  validatePassword,
  validateName,
} from "../utils/validators";

const Register = () => {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (!validateName(name)) {
      setError("Name must be between 1 and 20 characters.");
      return;
    }

    setError("");

    try {
      await register(email, name, password);
      navigate("/redirect");
    } catch {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <Container>
      <AuthCard>
        <Typography variant="h4">Register</Typography>

        <FormBox onSubmit={handleSubmit}>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="small"
            fullWidth
          />

          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            size="small"
            fullWidth
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="small"
            fullWidth
          />

          {error && <Alert severity="error">{error}</Alert>}

          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>
        </FormBox>

        <LinksBox>
          <Typography variant="body2">
            Already have an account?{" "}
            <Link component={RouterLink} to="/login">
              Login here
            </Link>
          </Typography>

          <Typography variant="body2">
            Back to the shop{" "}
            <Link component={RouterLink} to="/products">
              Shop
            </Link>
          </Typography>
        </LinksBox>
      </AuthCard>
    </Container>
  );
};

export default Register;
