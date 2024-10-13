import Button from "../UI/Button";
import classes from "./Vehicle.module.css";

export default function Vehicle({ vehicleData }) {
  // console.log("vehicleData", vehicleData);
  return (
    <div className={classes.wrapper}>
      <div id="1" className={classes.content}>
        <h4>{vehicleData.vehicleId}</h4>
        <p>{vehicleData.year}</p>
      </div>
      <div id="2" className={classes.edit}>
        <Button textOnly>edit</Button>
      </div>

      {/* <img
              // src="/IMG/car.jpg" //change to vehicle data type
              src="none"
              // alt="Avatar"
              //  style={"width:300px;height:300px;"}
            /> */}
    </div>
  );
}
