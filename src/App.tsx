import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import GreenBackground from "./assets/GreenBackground.svg";
import PurpleBackground from "./assets/PurpleBackground.svg";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ShoppingListProvider } from "./contexts/ShoppingList";
import { RepartitionProvider } from "./contexts/RepartitionContext";

function App() {
  // check if a user is stored in local storage
  // if not, redirect to login page

  // Create WebSocket connection

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user && window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
  }, []);

  return (
    <ShoppingListProvider>
      <RepartitionProvider>
        <BrowserRouter>
          <div
            style={{
              margin: 0,
              padding: 0,
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
      </RepartitionProvider>
    </ShoppingListProvider>
  );
}

export default App;
