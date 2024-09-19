import classes from "./VehiclePanel.module.css";
import Button from "../UI/Button";
import { Link } from "react-router-dom";

const VEHICLES = [];

export default function VehiclePanel() {
  return (
    <div className={classes.panel}>
      {VEHICLES.length === 0 && (
        <section className={classes.section}>
          <div className={classes.card}>
            <p>No vehicles found</p>
            <Link to="/NewVehicle">
              <Button>Add vehicle</Button>
            </Link>
          </div>
        </section>
      )}
      {VEHICLES.length > 0 && VEHICLES.map((v) => <p>{v}</p>)}
    </div>
  );
}
