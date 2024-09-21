import RootLayout from "./RootLayout";
import App from "../App";
import NewVehicle from "./NewVehicle";

import {
  loader as newVehicleLoader,
  action as newVehicleAction,
} from "../components/Vehicles/VehicleForm";

export const routeList = [
  {
    path: "/",
    element: <RootLayout />,
    loader: () => {
      return null;
    },
    children: [
      { path: "/", element: <App /> },
      {
        path: "/NewVehicle",
        element: <NewVehicle />,
        loader: newVehicleLoader,
        action: newVehicleAction,
      },
    ],
  },
];
