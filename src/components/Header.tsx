import React from "react";

export default function Header() {
  return (
    <div
      style={{
        height: "100px",
        background: "#fff",
        borderBottomLeftRadius: "25px",
        borderBottomRightRadius: "25px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0px 0px 6px 0px rgba(0,0,0,0.25)",
        position: "relative",
      }}
    >
      <h1
        style={{
          margin: 0,
          padding: 0,
          fontSize: "40px",
          background: "linear-gradient(90deg, #9176FF 0%, #76FFB5 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: "900",
        }}
      >
        Split Cart
      </h1>
      <h2
        style={{
          fontSize: "20px",
          textAlign: "center",
          padding: 0,
          margin: 0,
          color: "rgba(0,0,0,0.66)",
          position: "absolute",
          right: "75px",
        }}
      >
        XM5CW
      </h2>
    </div>
  );
}
