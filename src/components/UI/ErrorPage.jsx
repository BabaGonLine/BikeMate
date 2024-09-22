import { useRouteError } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Header from "../Header/Header";
import classes from "./ErrorPage.module.css";

export default function ErrorPage() {
  const error = useRouteError();
  let errMessage = "Error has accured!";
  // const err = errorObj.data;
  console.log(error);

  if (error.status === 404) {
    errMessage = "404 - Page Not Found";
    // return (
    //   <>
    //     <Header />
    //     <div className={classes.error}>404 - no page like this</div>
    //   </>
    // );
  }
  return (
    <>
      <Header />
      <Alert variant="danger">
        <Alert.Heading>{error.statusText}</Alert.Heading>
        <p className={classes.error}>{errMessage}</p>
        <hr />
        <p className="mb-0">Need help? Contact Support</p>
      </Alert>
    </>
  );

  // const errorObj1 = useRouteError();
  // console.log("isRouteErrorResponse", isRouteErrorResponse(errorObj1));
  // let message = "Error";
  // if (errorObj1.status !== 0) {
  //   message = errorObj1.data.message;
  //   console.log(errorObj1);
  // }
  // // const message = errorObj.data.message;
  // // console.log(errorObj);
  // return (
  //   <>
  //     <Header />
  //     <h1>Error</h1>
  //     <h3>{message}</h3>
  //   </>
  // );
}
