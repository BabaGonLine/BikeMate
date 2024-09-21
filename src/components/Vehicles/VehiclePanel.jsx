import classes from "./VehiclePanel.module.css";
import Button from "../UI/Button";
import { Link } from "react-router-dom";
import { getTranslation } from "../../tools/commonHelpers";

const VEHICLES = [];

export default function VehiclePanel() {
  return (
    <div className={classes.panel}>
      {VEHICLES.length === 0 && (
        <section className={classes.section}>
          <div className={classes.card}>
            <p>No vehicles found</p>
            <Link to="/NewVehicle">
              <Button>{getTranslation("btnAddVehicle")}</Button>
            </Link>
          </div>
        </section>
      )}
      {VEHICLES.length > 0 && VEHICLES.map((v) => <p>{v}</p>)}
    </div>
  );
}
