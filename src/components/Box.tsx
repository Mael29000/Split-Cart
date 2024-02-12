import React from "react";

export type Status = "taken" | "missing" | "lock";

interface BoxProps {
  status: Status;
}

export default function Box(props: BoxProps) {
  const { status } = props;

  return (
    <div
      style={{
        width: "20px",
        height: "20px",
        background: "#9176FF42",
        borderRadius: "5px",
        marginRight: "5px",
      }}
    ></div>
  );
}
