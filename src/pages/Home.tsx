import React from "react";

import Header from "../components/Header";
import LeftPanel from "../components/LeftPanel";
import MidPannel from "../components/MidPanel";
import RightPanel from "../components/RightPanel";

export default function Home() {
  return (
    <>
      <Header />
      <div
        style={{
          padding: "50px",
          display: "grid",
          gridTemplateColumns: "2fr 3fr",
          gap: "50px",
          height: "calc(100% - 200px)",
        }}
      >
        <LeftPanel />
        <MidPannel />
        {/* <RightPanel /> */}
      </div>
    </>
  );
}
