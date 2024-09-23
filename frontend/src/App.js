import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const server = "http://localhost:5000";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // A function that handles field change:
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(`${server}/login`, formData);
      console.log("Welcome:", response.data);
      setFormData({
        username: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
    console.log(formData);
  }
  return (
    <Form handleSubmit={handleSubmit} type="Log In">
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
    </Form>
  );
}

function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    instrument: "",
    type: "player",
  });

  // A function that handles field change:
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(`${server}/create-user`, formData);
      console.log("Response:", response.data);
      setFormData({
        username: "",
        password: "",
        instrument: "",
        type: "player",
      });
    } catch (error) {
      console.log(error);
    }
    console.log(formData);
  }

  return (
    <Form handleSubmit={handleSubmit} type="Sign Up">
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
      <Field
        type="text"
        purpose="instrument"
        value={formData.instrument}
        handleChange={handleChange}
      />
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
        {type === "Log In" ? (
          <p>
            Haven't signed up yet? <Link to="/signup">sign up</Link>
          </p>
        ) : (
          ""
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
