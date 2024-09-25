import { useParams } from "react-router-dom";
import { Field } from "./Field";
import { Form } from "./Form";
import useForm from "../hooks/useForm";

function AuthPage({ mode, socket, server }) {
  const { type } = useParams();
  const adminSignup = type === "Admin" ? true : false;
  const isLogin = mode === "login"; // A bool to determine conditional rendering and submission logic
  const initialValues = isLogin
    ? { username: "", password: "" }
    : {
        username: "",
        password: "",
        instrument: "",
        type: adminSignup ? "admin" : "player",
      };
  const isValid = type === "Admin" || type === "Player" || isLogin;

  const { formData, handleChange, handleSubmit, userNotFound } = useForm(
    socket,
    initialValues,
    server,
    isLogin ? "login" : "create-user"
  );

  return isValid ? (
    <Form
      handleSubmit={handleSubmit}
      type={isLogin ? "Log In" : `${type} Sign Up`}
    >
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
      {!isLogin && !adminSignup && (
        <Field
          type="text"
          purpose="instrument"
          value={formData.instrument}
          handleChange={handleChange}
        />
      )}
    </Form>
  ) : (
    <h1>Page Not Found</h1>
  );
}

export default AuthPage;
