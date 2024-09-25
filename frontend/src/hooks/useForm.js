import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// A custom hook to improve reusability and minimize duplicate code
function useForm(socket, initialValues, server, route) {
  const [formData, setFormData] = useState(initialValues);
  const navigate = useNavigate(); // Used to navigate to the main page after logging in
  function handleChange(e) {
    // Handles value change in each field of the form
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    // Handles form submission
    e.preventDefault();
    try {
      const response = await axios.post(`${server}/${route}`, formData); // Makes a request to the server based on which form was submitted
      console.log("response:", response.data.user);
      setFormData(initialValues);
      if (!response.data.user) {
        alert("No such user");
        return;
      } else if (route === "login") {
        // Login route requires additional logic
        socket.emit("joinRoom", response.data.user);
        navigate("/main");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return { formData, handleChange, setFormData, handleSubmit };
}

export default useForm;
