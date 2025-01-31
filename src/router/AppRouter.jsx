import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import LogineRagister from "../Pages/LogineRagister";
import { useContext, useEffect } from "react";
import { UserContext } from "./userContest";
import Layout from "../Pages/Layout";

const AppRouter = () => {
  const { user, setUser, setSingleUser } = useContext(UserContext);
  const userLocal = () => {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
      setUser(true);
      setSingleUser(userData);
    } else {
      setUser(false);
      setSingleUser({});
    }
  };

  useEffect(() => {
    userLocal();
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
