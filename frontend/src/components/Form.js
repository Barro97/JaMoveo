import { Link } from "react-router-dom";

export function Form({ children, handleSubmit, type }) {
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
