import { useState, useEffect } from "react";
import axios from "axios";

// A custom hook to improve reusability and minimize duplicate code
function useForm(socket, initialValues, server, type) {
  const [formData, setFormData] = useState(initialValues);
  //   useEffect(() => {
  //     setFormData(initialValues);
  //   }, [initialValues]);
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
      const response = await axios.post(`${server}/${type}`, formData);
      console.log("response:", response.data.user);
      setFormData(initialValues);
      if (type === "login") {
        socket.emit("joinRoom", response.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return { formData, handleChange, setFormData, handleSubmit };
}

export default useForm;
