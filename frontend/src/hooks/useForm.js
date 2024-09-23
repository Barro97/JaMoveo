import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// A custom hook to improve reusability and minimize duplicate code
function useForm(socket, initialValues, server, route) {
  const [formData, setFormData] = useState(initialValues);
  const navigate = useNavigate();
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(`${server}/${route}`, formData);
      console.log("response:", response.data.user);
      setFormData(initialValues);
      if (route === "login") {
        socket.emit("joinRoom", response.data.user);
        navigate("/main");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return { formData, handleChange, setFormData, handleSubmit };
}

export default useForm;
