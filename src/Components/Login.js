import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", passward: "" });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://cors-anywhere.herokuapp.com/https://mern-api-ruby.vercel.app/api/auth/login", {
    // const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",

      headers: {
         'Access-Control-Allow-Origin': '*',
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        passward: credentials.passward,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //redirect to uuser notes home page....
      localStorage.setItem("token", json.authtoken);
      props.showAlert("Logged in successfully...", "success");
      navigate("/");
    } else {
      props.showAlert("Invalid credentials...", "danger");
    }
  };
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: [e.target.value] });
  };
  return (
    <div className="login-form pt-5">
      <Form className="container" onSubmit={handleSubmit}>
        <Form.Group className="mb-0" controlId="formBasicEmail">
          <Form.Label className="from-label">Email address</Form.Label>
          <Form.Control
            className="input-area"
            controlId="email"
            name="email"
            type="email"
            value={credentials.email}
            placeholder="Enter email"
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="from-label">Password</Form.Label>
          <Form.Control
            className="input-area"
            controlId="passward"
            name="passward"
            type="password"
            value={credentials.passward}
            placeholder="Password"
            onChange={handleChange}
          />
        </Form.Group>

        <Button className="login-btn" type="submit">
          Login
        </Button>
        <div className="my-2">or a new user</div>
        <Button className="login-btn" type="submit">
          <a style={{ textDecoration: "none", color: "#fff" }} href="/signup">
            {" "}
            Sign Up{" "}
          </a>
        </Button>
      </Form>
    </div>
  );
};

export default Login;
