import React from "react";
import check from "../assets/check.svg";
import lock from "../assets/lock.svg";
import Tooltip from "./Tooltip";
import { Unit } from "./types";

interface BoxProps {
  unit: Unit;
  onClick: () => void;
}

export default function Box(props: BoxProps) {
  const { unit, onClick } = props;
  const [over, setOver] = React.useState(false);

  const iconMap: Record<string, JSX.Element> = {
    taken: (
      <div
        style={{
          position: "relative",
          width: "20px",
          height: "20px",
        }}
      >
        <img
          src={check}
          alt="check"
          style={{
            position: "absolute",
            bottom: "0",
            left: "1px",
          }}
        />
      </div>
    ),
    missing: <></>,
    lock: <img src={lock} alt="lock" />,
    remaining: (
      <div
        style={{
          position: "relative",
          width: "20px",
          height: "20px",
        }}
      >
        <img
          src={check}
          alt="check"
          style={{
            position: "absolute",
            bottom: "0",
            left: "1px",
          }}
        />
      </div>
    ),
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          width: "20px",
          height: "20px",
          background: "#9176FF42",
          borderRadius: "5px",
          marginLeft: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          userSelect: "none",
        }}
        onClick={onClick}
        onMouseEnter={() => setOver(true)}
        onMouseLeave={() => setOver(false)}
      >
        {iconMap[unit.status]}
      </div>
      <Tooltip text={unit.user} display={over && unit.status !== "missing"} />
    </div>
  );
}
