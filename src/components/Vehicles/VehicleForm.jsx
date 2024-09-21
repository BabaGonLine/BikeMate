import { Form, Link, redirect, useLoaderData } from "react-router-dom";
import Button from "../UI/Button";
import classes from "./VehicleForm.module.css";
import { useEffect, useState } from "react";
import { getTranslation } from "../../tools/commonHelpers";

export default function VehicleForm() {
  const vBrandsList = useLoaderData();
  const [selectedType, setSelectedType] = useState("motorcycle");
  const [filteredBrands, setFilteredBrands] = useState([]);

  //   const items = JSON.parse(localStorage.getItem("language"));
  //   console.log(items.dictionary.vYear);

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
          <label htmlFor="vType">{getTranslation("vType")}</label>
          <select
            id="vType"
            name="vType"
            value={selectedType}
            onChange={onTypeChange}
          >
            <option value="motorcycle">{getTranslation("motorcycle")}</option>
            <option value="private">{getTranslation("privateV")}</option>
          </select>
        </p>
        <p>
          <label htmlFor="vBrand">{getTranslation("vBrand")}</label>

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
          <label htmlFor="vModel">{getTranslation("vModel")}</label>
        </p>
        <p className={classes["form-input"]}>
          <input type="text" id="vModel" name="vModel" required />
        </p>
      </div>
      <div className={classes["controls-row"]}>
        <p className={classes["form-label"]}>
          <label htmlFor="vNumber">{getTranslation("vNumber")}</label>
        </p>
        <p className={classes["form-input"]}>
          <input type="number" id="vNumber" name="vNumber" required />
        </p>
      </div>
      <div className={classes["controls-row"]}>
        <p className={classes["form-label"]}>
          <label htmlFor="vYear">{getTranslation("vYear")}</label>
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
          <label htmlFor="vKm">{getTranslation("vKm")}</label>
        </p>
        <p className={classes["form-input"]}>
          <input type="number" id="vKm" name="vKm" />
        </p>
      </div>
      <p className={classes.actions}>
        <Link to="..">
          <Button textOnly>{getTranslation("btnCancel")}</Button>
        </Link>

        <Button>{getTranslation("btnAddVehicle")}</Button>
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
