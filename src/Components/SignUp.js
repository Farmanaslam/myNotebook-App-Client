import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const SignUp = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    passward: "",
    cpassward: "",
  });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, passward } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, passward }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //redirect to uuser notes home page....
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      props.showAlert("Account created successfully...", "success");
    } else {
      props.showAlert("Invalid credentials...", "danger");
    }
  };
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: [e.target.value] });
  };
  return (
    <div className="signup-form pt-5">
      <Form className="container" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            className="input-area"
            type="name"
            placeholder="Your Name"
            name="name"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="cformBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            className="input-area"
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            className="input-area"
            type="password"
            placeholder="Password"
            name="passward"
            onChange={handleChange}
            minLength={5}
            required={true}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="CformBasicPassword">
          <Form.Label>Confirm Passward</Form.Label>
          <Form.Control
            className="input-area"
            type="password"
            placeholder="Confirm Password"
            name="cpasward"
            onChange={handleChange}
            minLength={5}
            required={true}
          />
        </Form.Group>

        <Button className="sign-in-btn" type="submit">
          Sign In
        </Button>
      </Form>
    </div>
  );
};

export default SignUp;
