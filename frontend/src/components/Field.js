export function Field({ type, purpose, value, handleChange }) {
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
