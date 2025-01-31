import { useState } from "react";

const useInput = (fealds) => {
  const [input, setInput] = useState(fealds);
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return { input, setInput, handleInputChange };
};

export default useInput;
