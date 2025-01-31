import { useCallback } from "react";
import { useState } from "react";

/**
 * Custom hook to toggle a boolean state.
 * @param {boolean} initialState - The initial state value (default is false).
 * @returns {[boolean, Function]} - Returns the current state and a function to toggle it.
 */
const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);

  const toggle = useCallback(() => {
    setState((prev) => !prev);
  }, []);
  return [state, toggle];
};

export default useToggle;
