export const addUser = async (user: string) => {
  fetch("http://localhost:3001/api/userCreation", {
    method: "POST",
    body: JSON.stringify({ username: user }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
