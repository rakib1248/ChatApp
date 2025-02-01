import { Navigate, Route, Routes } from "react-router-dom";

import LogineRagister from "../Pages/LogineRagister";
import { useContext } from "react";
import { UserContext } from "./userContest";
import Layout from "../Pages/Layout";

const AppRouter = () => {
  const { user } = useContext(UserContext);


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
