import React from "react";
import Panel from "../components/Panel";
import { addUser } from "../services";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  // save the user to local storage on save
  // redirect to home page
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = e.currentTarget.username.value;
    addUser(username)
      .then((res) => {
        localStorage.setItem("user", username);
        navigate("/");
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
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
        <div style={{ paddingBottom: "25px" }}>
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
        </div>
      </Panel>
    </div>
  );
}
