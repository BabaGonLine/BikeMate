import { json } from "react-router";

const url = process.env.REACT_APP_API_URL;
const currentUser = "gilad";

export async function GetVehicles() {
  // load vehicles models from db

  const response = await fetch(url + "DropDowns", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw json("error", { status: 500 });
  }

  const result = await response.json();
  const vehicleBrands = result;
  return json(vehicleBrands, { status: 200 });
}

export async function ManageVehicle(data) {
  const newVehicle = setVehicleForApi(data);
  console.log("newVehilce", newVehicle);

  const response = await fetch(url + "Vehicle/" + currentUser, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(newVehicle),
  });

  console.log("after post");

  if (!response.ok) {
    throw json("Cant update car", { status: 500 });
  }

  const result = await response.json();

  return new json(result, { status: 200 });
}

function setVehicleForApi(vehicle) {
  const formattedV = {
    id: vehicle.Id || "0",
    user: vehicle.User || currentUser,
    vehicleId: vehicle.vNumber,
    year: vehicle.vYear,
    km: vehicle.vKm || "0",
    model: vehicle.vModel,
    type: vehicle.vType,
    brand: vehicle.vBrand,
  };

  return formattedV;
}
