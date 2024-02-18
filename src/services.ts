export const addUser = async (user: string) => {
  fetch("http://localhost:3001/api/userCreation", {
    method: "POST",
    body: JSON.stringify({ username: user }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getUsers = async () => {
  const response = await fetch("http://localhost:3001/api/userCreation");
  const data = await response.json();
  return data;
};
