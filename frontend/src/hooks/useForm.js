import { useState } from "react";
import axios from "axios";

// A custom hook to improve reusability and minimize duplicate code
function useForm(initialValues, server, type) {
  const [formData, setFormData] = useState(initialValues);

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
      console.log("response:", response.data);
      setFormData(initialValues);
    } catch (error) {
      console.log(error);
    }
    console.log(formData);
  }
  return { formData, handleChange, setFormData, handleSubmit };
}

export default useForm;
