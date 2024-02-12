import React from "react";
import Panel from "./Panel";
import Participants from "./Participants";
import Repartition from "./Repartition";

export default function LeftPanel() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "1fr 1fr",
        gap: "50px",
      }}
    >
      <Panel>
        <Participants />
      </Panel>
      <Panel>
        <Repartition />
      </Panel>
    </div>
  );
}
