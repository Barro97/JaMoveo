import { useState, useEffect } from "react";
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
        <Route path="/main" element={<Main />} />
      </Routes>
    </Router>
  );
}

function Main() {
  const [user, setUser] = useState(() => {
    // Retrieve the user from sessionStorage if it exists
    const savedUser = sessionStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : {};
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    // Retrieve isAdmin from sessionStorage if it exists
    const savedIsAdmin = sessionStorage.getItem("isAdmin");
    return savedIsAdmin ? JSON.parse(savedIsAdmin) : false;
  });

  useEffect(() => {
    socket.on("currentUser", (loggedUser) => {
      // An empty object means this user just logged in
      if (Object.keys(user).length === 0) {
        setUser(loggedUser);
        setIsAdmin(loggedUser.type === "admin");
      }
    });

    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("isAdmin", JSON.stringify(isAdmin));
    });

    return () => {
      // Clean up the event listener
      window.removeEventListener("beforeunload", () => {
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("isAdmin", JSON.stringify(isAdmin));
      });

      // Clear sessionStorage when the user navigates away
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("isAdmin");
    };
  }, [user, isAdmin]);
  return (
    <h1>
      Hello {user.username} , you are {isAdmin ? "an admin" : "a player"}
    </h1>
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
