import { Field } from "./Field";
import { Form } from "./Form";
import useForm from "../hooks/useForm";

function AuthPage({ mode, socket, server }) {
  const isLogin = mode === "login"; // A bool to determine conditional rendering and submission logic
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

export default AuthPage;
