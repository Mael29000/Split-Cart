import React from "react";
import Panel from "../components/Panel";

export default function Login() {
  // save the user to local storage on save
  // redirect to home page
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = e.currentTarget.username.value;
    localStorage.setItem("user", username);
    window.location.href = "/";
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Panel>
        <h2>Login</h2>
        <form onSubmit={onSubmit}>
          <input
            name="username"
            type="text"
            placeholder="Username"
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "black",
              color: "white",
              cursor: "pointer",
              marginLeft: "10px",
            }}
          >
            Login
          </button>
        </form>
      </Panel>
    </div>
  );
}
