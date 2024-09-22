import RootLayout from "./RootLayout";
import App from "../App";
import NewVehicle from "./NewVehicle";

// import {
//   loader as newVehicleLoader,
//   action as newVehicleAction,
// } from "../components/Vehicles/VehicleForm";
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
      { path: "/", element: <App /> },
      {
        path: "/NewVehicle",
        element: <NewVehicle />,
        // loader: newVehicleLoader,
        // action: newVehicleAction,
        loader: () => {
          return [
            { brand: "Honda", type: "motorcycle" },
            { brand: "Kawasaky", type: "motorcycle" },
          ];
        },
        action: () => {
          return null;
        },
      },
    ],
  },
];
