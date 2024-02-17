import React from "react";

interface TooltipProps {
  text: string;
  display: boolean;
}

export default function Tooltip(props: TooltipProps) {
  const { text, display } = props;

  return (
    <div
      style={{
        position: "absolute",
        top: "-60px",
        left: "-30px",
        height: "100%",
        display: display ? "block" : "none",
        backgroundColor: "rgba(0,0,0,0.6)",
        color: "white",
        borderRadius: "5px",
        padding: "10px",
        fontSize: "20px",
        textAlign: "center",
      }}
    >
      {text}
    </div>
  );
}
