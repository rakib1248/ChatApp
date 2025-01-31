import { useState } from "react";
import { UserContext } from "./userContest";

// UserProvider Component
export const UserProvider = ({ children }) => {
  const [isLoader, setLoader] = useState(false);
  const [user, setUser] = useState(false);
  const [chat, setChat] = useState([]);
  const [singleUser, setSingleUser] = useState({});
  const [update, setUpdate] = useState({
    id: "",
    msg: "",
    true: false,
  }); // State for user authentication

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        singleUser,
        setSingleUser,
        chat,
        setChat,
        isLoader,
        setLoader,
        update,
        setUpdate,
      }}>
      {children}
    </UserContext.Provider>
  );
};
