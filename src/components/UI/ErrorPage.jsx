import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Header from "../Header/Header";
import classes from "./ErrorPage.module.css";

export default function ErrorPage() {
  const error = useRouteError();

  let errorMessage;
  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error.error?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = "Unknown error";
  }

  console.log(errorMessage);

  if (error.status === 404) {
    errorMessage = "404 - Page Not Found";
  }

  if (error.status === 401) {
    errorMessage = "401 - Not loged in";
  }

  return (
    <>
      <Header />
      <Alert variant="danger">
        <Alert.Heading>{error.statusText || "Error occurred"}</Alert.Heading>
        <p className={classes.error}>{errorMessage}</p>
        <hr />
        <p className="mb-0">Need help? Contact Support</p>
      </Alert>
    </>
  );
}
