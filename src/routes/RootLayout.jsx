import { Outlet } from "react-router";
import Header from "../components/Header/Header";
import VehiclePanel from "../components/Vehicles/VehiclePanel";

export default function RootLayout() {
  return (
    <>
      <Header />

      <VehiclePanel />
      <Outlet />
    </>
  );
}
