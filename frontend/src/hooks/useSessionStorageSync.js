import { useState, useEffect } from "react";

// A hook that determines weather the state needs to be set to the default value or to the value that is set in the session memory
// This hook allows for reloading the page without losing user data 
function useSessionStorageSync(key, defaultValue) {
  const [state, setState] = useState(() => {
    const savedValue = sessionStorage.getItem(key);
    return savedValue ? JSON.parse(savedValue) : defaultValue;
  }); 
  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}

export default useSessionStorageSync;
