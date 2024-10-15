import RootLayout from "./RootLayout";
import App from "../App";
import NewVehicle from "./NewVehicle";

import {
  loader as newVehicleLoader,
  action as newVehicleAction,
} from "../components/Vehicles/VehicleForm";
import ErrorPage from "../components/UI/ErrorPage";
// import { loader as vehiclesLoader } from "../components/Vehicles/VehiclePanel";
import Auth, { action as authAction } from "../components/Auth/Auth";

export const routeList = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    // loader: vehiclesLoader,
    children: [
      { index: true, element: <App /> },
      { path: "Auth/", element: <Auth />, action: authAction },
      {
        path: "/NewVehicle",
        element: <NewVehicle />,
        loader: newVehicleLoader,
        action: newVehicleAction,
      },
    ],
  },
];
