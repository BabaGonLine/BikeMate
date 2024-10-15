import { json } from "react-router";

const url = process.env.REACT_APP_API_URL;

export async function manageUser(user) {
  const newUser = setUserForApi(user);
  const response = await fetch(url + "Users/", {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });

  if (!response.ok) {
    return new json(response);
  }

  const result = await response.json();
  return new json(result);
}

export async function LoginUser(userData) {
  const data = {
    user: userData.email,
    password: userData.password,
  };
  const response = await fetch(url + "Users/Login", {
    method: "PUT",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    return new json(response);
  }

  const result = await response.json();
  return new json(result);
}

function setUserForApi(user) {
  const username = user.email.substring(0, user.email.indexOf("@"));
  let newUser = {
    id: user.id || "",
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
