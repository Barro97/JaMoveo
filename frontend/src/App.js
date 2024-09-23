import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import useForm from "./hooks/useForm";
import { io } from "socket.io-client";

const server = "http://localhost:5000";
const socket = io("http://localhost:5000");

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage mode="login" socket={socket} />} />
        <Route
          path="/signup"
          element={<AuthPage mode="signup" socket={socket} />}
        />
      </Routes>
    </Router>
  );
}

function AuthPage({ mode, socket }) {
  const isLogin = mode === "login";
  const initialValues = isLogin
    ? { username: "", password: "" }
    : { username: "", password: "", instrument: "", type: "player" };

  const { formData, handleChange, handleSubmit } = useForm(
    socket,
    initialValues,
    server,
    isLogin ? "login" : "create-user"
  );

  return (
    <Form handleSubmit={handleSubmit} type={isLogin ? "Log In" : "Sign Up"}>
      <Field
        type="text"
        purpose="username"
        value={formData.username}
        handleChange={handleChange}
      />
      <Field
        type="password"
        purpose="password"
        value={formData.password}
        handleChange={handleChange}
      />
      {!isLogin && (
        <Field
          type="text"
          purpose="instrument"
          value={formData.instrument}
          handleChange={handleChange}
        />
      )}
    </Form>
  );
}

function Form({ children, handleSubmit, type }) {
  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>{type}</h2>
        {children}
        <button type="submit">{type}</button>
        {type === "Log In" && (
          <p>
            Haven't signed up yet? <Link to="/signup">sign up</Link>
          </p>
        )}
      </form>
    </div>
  );
}

function Field({ type, purpose, value, handleChange }) {
  return (
    <>
      <label htmlFor={purpose}>{purpose}:</label>
      <input
        type={type}
        id={purpose}
        name={purpose}
        value={value}
        onChange={handleChange}
        required
      />
    </>
  );
}
export default App;
