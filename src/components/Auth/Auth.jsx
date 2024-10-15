import Button from "../UI/Button";
import {
  getTranslation,
  isTokenExpired,
  setLocalStorage,
} from "../../tools/commonHelpers";
import classes from "./Auth.module.css";
import { redirect, useActionData, useNavigation } from "react-router";
import { Form } from "react-router-dom";
import { useState } from "react";
import SpinerElement from "../UI/SpinerElement";
import { LoginUser, manageUser } from "../../tools/userQuery";

export default function Auth() {
  const data = useActionData();
  const navigation = useNavigation();
  const [isSigning, setIsSigningn] = useState(false);
  // const [isNewMail, setIsNewMail] = useState(true);

  // isTokenExpired();

  const isPosting = navigation.state === "submitting";
  function handleEmailChange() {
    // setIsNewMail = false;
  }

  return (
    <div className={classes.Auth}>
      {isPosting && <SpinerElement />}

      <Form method="POST" className={classes.form}>
        <input type="hidden" name="type" value={isSigning ? "sign" : "login"} />
        <div className={classes["controls-row"]}>
          <input
            type="email"
            name="email"
            placeholder={getTranslation("email", "placeHolder")}
            onChange={handleEmailChange}
          />
        </div>
        {data && data.status === 409 && (
          <p className={classes.danger}>
            {getTranslation("createUserError409", "message")}
          </p>
        )}
        <div className={classes["controls-row"]}>
          <input
            type="password"
            name="password"
            placeholder={getTranslation("password", "placeHolder")}
          />
        </div>
        {isSigning && (
          <div>
            <div className={classes["controls-row"]}>
              <input
                type="text"
                name="fName"
                placeholder={getTranslation("fName", "placeHolder")}
              />
            </div>
            <div className={classes["controls-row"]}>
              <input
                type="text"
                name="lName"
                placeholder={getTranslation("lName", "placeHolder")}
              />
            </div>
          </div>
        )}
        <div className={classes["controls-row"]}>
          <Button
            type="button"
            textOnly
            disabled={isPosting}
            onClick={(e) => {
              e.preventDefault();
              setIsSigningn(!isSigning);
            }}
            className={classes["text-button"]}
          >
            {isSigning
              ? getTranslation("btnCancelSign", "button")
              : getTranslation("btnSign", "button")}
          </Button>
          <Button
            type="submit"
            disabled={isPosting}
            className={classes["text-button"]}
          >
            {getTranslation("btnLogin", "button")}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const postData = Object.fromEntries(formData);
  // let ret;
  if (postData.type === "sign") {
    const addUserResponse = await manageUser(postData);
    const res = await addUserResponse.json();
    // detail: "Error while processing posted data."
    // instance: "/Users/Post"
    // status: 409
    // title: "An error occured."
    // traceId: "00-6ce1a6736d6451778651583225ff1c24-705a36f72367a848-00"
    // type: "Error: cant create user, Email alredy exists"

    // need to do login in localstorage with res
    if (!res.status) {
      const token = { token: res.uidKey, expire: res.expireLogin };
      setLocalStorage("token", token, true);
    }
    return redirect("..");
    // return res;
  } else {
    const loginResponse = await LoginUser(postData);
    const res = await loginResponse.json();

    console.log("res", res);

    // need to do login in localstorage with res
    if (!res.status) {
      const token = { token: res.uidKey, expire: res.expireLogin };
      setLocalStorage("token", token, true);
    }
    return redirect("..");
  }

  // if success need to log out after a period of time:
  //the time would be the expiration time getting from server
  // const timeout = 5000;
  // setTimeout(() => {
  //   //do logout
  // }, timeout);

  // return ret;
}
