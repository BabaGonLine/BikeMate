import RootLayout from "./RootLayout";
import App from "../App";
import NewVehicle from "./NewVehicle";

import {
  loader as newVehicleLoader,
  action as newVehicleAction,
} from "../components/Vehicles/VehicleForm";
import ErrorPage from "../components/UI/ErrorPage";

export const routeList = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: () => {
      return null;
    },
    children: [
      { index: true, element: <App /> },
      {
        path: "/NewVehicle",
        element: <NewVehicle />,
        loader: newVehicleLoader,
        action: newVehicleAction,
      },
    ],
  },
];
