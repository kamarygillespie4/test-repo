import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const styles = {
  header: {
    borderBottom: " double black",
    paddingBottom: "3%",
  },
  button: {
    marginTop: "1%",
    padding: "1%",
  },
  container: {
    margin: "2% 5%",
    borderRadius: "10px",
  },
};
const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password: pass }),
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      const { token, userId } = await response.json();
      localStorage.setItem("authToken", token);
      localStorage.setItem("userId", userId);
      navigate("/protected/owners");
    } catch (err) {
      console.log(err);
      alert("Sign up failed. Please try again.");
    }
  };

  return (
    <div className="auth-form-container" style={styles.container}>
      <img src="https://phxcapitalgroup.com/wp-content/uploads/2023/03/March-2023-Update-Web-2-Tiny.png" />

      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="email">email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        />
        <label htmlFor="password">password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        <Button style={styles.button} variant="primary" type="submit">
          Sign Up{" "}
        </Button>
      </form>
      <Button style={styles.button} variant="light" href="/">
        Already have an account? Login here.
      </Button>
    </div>
  );
};

export default Signup;
