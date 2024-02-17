import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import GreenBackground from "./assets/GreenBackground.svg";
import PurpleBackground from "./assets/PurpleBackground.svg";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  // check if a user is stored in local storage
  // if not, redirect to login page

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user && window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
  }, []);

  return (
    <BrowserRouter>
      <div
        style={{
          margin: 0,
          padding: 0,
          overflow: "hidden",
          backgroundImage: `url(${GreenBackground}), url(${PurpleBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "100vh",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
