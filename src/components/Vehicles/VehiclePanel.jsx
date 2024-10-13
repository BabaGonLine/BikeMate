import classes from "./VehiclePanel.module.css";
import Button from "../UI/Button";
import { json, Link, useLoaderData } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { getTranslation } from "../../tools/commonHelpers";
import Vehicle from "./Vehicle";
import { useState } from "react";

export default function VehiclePanel() {
  const vehicalesList = useLoaderData();
  const [index, setIndex] = useState(0);

  const handleCarouselChange = (selectedIndex) => {
    setIndex(selectedIndex);
    // console.log(vehicalesList[selectedIndex].carNumber);
  };

  // console.log("loaderdata", vehicalesList);

  return (
    <div className={classes.panel}>
      <section className={classes.section}>
        {vehicalesList.length === 0 && (
          <div className={classes.card}>
            <p>{getTranslation("noVehicleFound", "message")}</p>
            <Link to="/NewVehicle">
              <Button>{getTranslation("btnAddVehicle", "button")}</Button>
            </Link>
          </div>
        )}

        {vehicalesList.length > 0 && (
          <Carousel
            fade
            activeIndex={index}
            onSelect={handleCarouselChange}
            interval={null}
          >
            {vehicalesList.map((v) => (
              <Carousel.Item key={index}>
                <Vehicle key={v.carNumber} vehicleData={v} />
              </Carousel.Item>
            ))}
          </Carousel>
        )}
      </section>
    </div>
  );
}

export async function loader() {
  const url = process.env.REACT_APP_API_URL;
  const response = await fetch(url + "Vehicle/gilad", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    // console.log(response);
    throw json("error", { status: 500 });
  }
  const retVehicles = await response.json();

  // console.log("myCars", retVehicles);
  return json(retVehicles, { status: 200 });
}
