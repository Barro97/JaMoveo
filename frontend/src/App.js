import { useState } from "react";
function App() {
  return <SignupPage />;
}

function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    instrument: "",
  });

  // A function that handles field change:
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventdefault();
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
