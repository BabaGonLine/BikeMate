import { json } from "react-router";

const url = process.env.REACT_APP_API_URL;

export async function manageUser(user) {
  const newUser = setUserForApi(user);
  const response = await fetch(url + "Users/", {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });

  const result = await response.json();
  console.log("result", result);

  //   if (response.status === 409 || response.ok) {

  return new json(result);
  //   }

  //   if (!response.ok) {
  //     throw json("Cant update user", { status: 500 });
  //   }
}

function setUserForApi(user) {
  const username = user.email.substring(0, user.email.indexOf("@"));
  let newUser = {
    id: "",
    firstName: user.fName,
    lastName: user.lName,
    email: user.email,
    password: user.password,
    userName: username || "none",
    lastLogin: null,
    uidKey: null,
    expireLogin: null,
  };
  return newUser;
}
