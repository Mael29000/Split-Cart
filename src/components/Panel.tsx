import React from "react";

interface PanelProps {
  children: React.ReactNode;
  disablePadding?: boolean;
}

export default function Panel(props: PanelProps) {
  const { children, disablePadding } = props;

  return (
    <div
      style={{
        background: "#fff",
        padding: !disablePadding ? "25px 25px 0px 25px" : 0,
        boxShadow: "0px 0px 6px 0px rgba(0,0,0,0.25)",
        borderRadius: "25px",
        position: "relative",
      }}
    >
      {children}
    </div>
  );
}
