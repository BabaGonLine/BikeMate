import RootLayout from "./RootLayout";
import App from "../App";
import NewVehicle from "./NewVehicle";

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
        action: () => {
          alert("action");
        },
      },
    ],
  },
];
