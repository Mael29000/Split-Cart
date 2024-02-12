import React from "react";
import Panel from "./Panel";
import Restants from "./Restants";
import Besoin from "./Besoin";

export default function MidPannel() {
  return (
    <Panel disablePadding>
      <div
        style={{
          position: "absolute",
          height: "100%",
          width: "1px",
          backgroundColor: "rgba(0,0,0,0.17)",
          left: "50%",
          top: 0,
        }}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 0,
          paddingTop: "25px",
        }}
      >
        <Restants />
        <Besoin />
      </div>
    </Panel>
  );
}
