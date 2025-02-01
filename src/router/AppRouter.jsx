import { Navigate, Route, Routes } from "react-router-dom";

import LogineRagister from "../Pages/LogineRagister";
import { useContext, useEffect } from "react";
import { UserContext } from "./userContest";
import Layout from "../Pages/Layout";

const AppRouter = () => {
  const { user, setSingleUser, setUser } = useContext(UserContext);
  const userLocal = () => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));

      if (userData) {
        setSingleUser(userData);
        setUser(true);
      } else {
        setUser(false);
        setSingleUser({});
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      setUser(false);
      setSingleUser({});
    }
  };

useEffect(() => {
  userLocal();
  const handleStorageChange = () => {
    userLocal();
  };
  window.addEventListener("storage", handleStorageChange);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
  };
}, []);


  // const [islogine, setIslogine] = useState(false);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={user ? <Layout /> : <Navigate to={"/logine"} />}
        />
        <Route
          path="/logine"
          element={user ? <Navigate to={"/"} /> : <LogineRagister />}
        />
      </Routes>
    </>
  );
};

export default AppRouter;
