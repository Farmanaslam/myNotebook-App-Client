import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TopNav from "./Components/TopNav";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import NoteState from "./Context/notes/NoteState";

import AlertMsg from "./Components/AlertMsg";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import { useState } from "react";
import Footer from "./Components/Footer";
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <NoteState>
      <TopNav />
      <AlertMsg alert={alert} />
      <div className="">
        <Routes>
          <Route path="" element={<Home showAlert={showAlert} />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route
            path="/login"
            element={<Login showAlert={showAlert} />}
          ></Route>
          <Route
            path="/signup"
            element={<SignUp showAlert={showAlert} />}
          ></Route>
        </Routes>
      </div>
      <Footer />
    </NoteState>
  );
}

export default App;
