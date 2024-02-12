import React from "react";
import GreenBackground from "./assets/GreenBackground.svg";
import PurpleBackground from "./assets/PurpleBackground.svg";
import Header from "./components/Header";
import LeftPanel from "./components/LeftPanel";
import MidPannel from "./components/MidPanel";
import RightPanel from "./components/RightPanel";

function App() {
  return (
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
      <Header />
      <div
        style={{
          padding: "50px",
          display: "grid",
          gridTemplateColumns: "2fr 3fr 1fr",
          gap: "50px",
          height: "calc(100% - 200px)",
        }}
      >
        <LeftPanel />
        <MidPannel />
        <RightPanel />
      </div>
    </div>
  );
}

export default App;
