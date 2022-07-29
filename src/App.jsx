import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./Components/Login.jsx";
import Register from "./Components/Register.jsx";
import Dashboard from "./Components/Dashboard.jsx";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

import { SocialMediaAppContext } from "./Helpers/Contexts";
import {
  getLocalStorageData,
  storeInLocalStorage,
} from "./Helpers/LocalStorageUtility";

function App() {
  const [appState, setAppState] = useState("login");
  const [usersList, setUsersList] = useState(getLocalStorageData("allUsers"));
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentPasswd, setCurrentPasswd] = useState(false);
  const [loadUsersDone, setLoadUsersDone] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (appState === "dashboard") {
      navigate("/dashboard");
      setAppState("dashboard");
    } else if (appState === "register") {
      navigate("/signup");
      setAppState("register");
    } else if (appState === "login") {
      navigate("/login");
      setAppState("login");
    }
  }, [appState]);

  return (
    <SocialMediaAppContext.Provider
      value={{
        appState,
        setAppState,
        usersList,
        setUsersList,
        currentUserName,
        setCurrentUserName,
        currentPasswd,
        setCurrentPasswd,
      }}
    >
      <Routes>
        <Route path="/" exact element={<Login />}></Route>
        <Route path="/login" exact element={<Login />}></Route>
        <Route path="/signup" exact element={<Register />}></Route>
        <Route path="/dashboard" exact element={<Dashboard />}></Route>
      </Routes>
    </SocialMediaAppContext.Provider>
  );
}

export default App;
