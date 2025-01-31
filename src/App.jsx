import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppRouter from "./router/AppRouter";
import { ToastContainer } from "react-toastify";
import { useContext, useEffect } from "react";
import { RealTime } from "./Firebase/model";
import { UserContext } from "./router/userContest";
import Loader from "./components/Loader";

function App() {
  const { setChat, isLoader } = useContext(UserContext);

  useEffect(() => {
    RealTime("chat", setChat);
  },[setChat])
  return (
    <div
      className="container mx-auto bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: `url("../Screenshot_1.jpg")`, // Replace with your image path
      }}>
      <Router>
        {isLoader && <Loader/>}
        <AppRouter />
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;
