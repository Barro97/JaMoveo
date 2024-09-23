import { useState } from "react";
import axios from "axios";
const server = "http://localhost:5000";
function App() {
  return <SignupPage />;
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
      const response = await axios.post(`${server}/submit`, formData);
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
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
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
        <button type="submit">Sign Up</button>
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
