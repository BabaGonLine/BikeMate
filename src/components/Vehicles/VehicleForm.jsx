import { Form, Link, redirect, useLoaderData } from "react-router-dom";
import Button from "../UI/Button";
import classes from "./VehicleForm.module.css";
import { useEffect, useState } from "react";

export default function VehicleForm() {
  const vBrandsList = useLoaderData();
  const [selectedType, setSelectedType] = useState("motorcycle");
  const [filteredBrands, setFilteredBrands] = useState([]);

  useEffect(() => {
    setFilteredBrands(vBrandsList?.filter((b) => b.type === selectedType));
  }, [vBrandsList, selectedType]);

  function onTypeChange(event) {
    console.log(event.target.value);
    setSelectedType(event.target.value);
  }
  return (
    <Form method="post" className={classes.form}>
      <div className={classes["controls-row"]}>
        <p>
          <label htmlFor="vType">Type</label>
          <select
            id="vType"
            name="vType"
            value={selectedType}
            onChange={onTypeChange}
          >
            <option value="motorcycle">Motorcycle</option>
            <option value="private">Private</option>
          </select>
        </p>
        <p>
          <label htmlFor="vBrand">Brand *</label>

          <select id="vBrand" name="vBrand">
            {filteredBrands.map((brand) => (
              <option key={brand.brand} value={brand.brand}>
                {brand.brand}
              </option>
            ))}
          </select>
        </p>
      </div>
      <div className={classes["controls-row"]}>
        <p className={classes["form-label"]}>
          <label htmlFor="vModel">Model *</label>
        </p>
        <p className={classes["form-input"]}>
          <input type="text" id="vModel" name="vModel" required />
        </p>
      </div>
      <div className={classes["controls-row"]}>
        <p className={classes["form-label"]}>
          <label htmlFor="vNumber">Number *</label>
        </p>
        <p className={classes["form-input"]}>
          <input type="number" id="vNumber" name="vNumber" required />
        </p>
      </div>
      <div className={classes["controls-row"]}>
        <p className={classes["form-label"]}>
          <label htmlFor="vYear">Year *</label>
        </p>
        <p className={classes["form-input"]}>
          <input
            type="number"
            max={2100}
            min={1920}
            id="vYear"
            name="vYear"
            required
          />
        </p>
      </div>
      <div className={classes["controls-row"]}>
        <p className={classes["form-label"]}>
          <label htmlFor="vKm">Current Kilometers</label>
        </p>
        <p className={classes["form-input"]}>
          <input type="number" id="vKm" name="vKm" />
        </p>
      </div>
      <p className={classes.actions}>
        <Link to="..">
          <Button textOnly>Cancel</Button>
        </Link>

        <Button>Add Vehicle</Button>
      </p>
    </Form>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const postData = Object.fromEntries(formData);
  console.log(postData);
  alert("addin vehicle");
  return redirect("..");
}

export async function loader() {
  // load models from db
  const vehicleBrands = [
    { brand: "Honda", type: "motorcycle" },
    { brand: "Kawasaky", type: "motorcycle" },
  ];
  return vehicleBrands;
}
