import {
  Form,
  Link,
  redirect,
  useLoaderData,
  useNavigation,
} from "react-router-dom";

import Button from "../UI/Button";
import classes from "./VehicleForm.module.css";
import { useEffect, useState } from "react";
import { getTranslation } from "../../tools/commonHelpers";
import SpinerElement from "../UI/SpinerElement";

export default function VehicleForm() {
  const vBrandsList = useLoaderData();
  const navigation = useNavigation();
  const [selectedType, setSelectedType] = useState("motorcycle");
  const [filteredBrands, setFilteredBrands] = useState([]);

  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    setFilteredBrands(vBrandsList?.filter((b) => b.type === selectedType));
  }, [vBrandsList, selectedType]);

  function onTypeChange(event) {
    setSelectedType(event.target.value);
  }
  return (
    <>
      {isSubmitting && <SpinerElement />}
      <Form method="post" className={classes.form}>
        <div className={classes["controls-row"]}>
          <p>
            <label htmlFor="vType">{getTranslation("vType", "label")}</label>
            <select
              id="vType"
              name="vType"
              value={selectedType}
              onChange={onTypeChange}
            >
              <option value="motorcycle">
                {getTranslation("motorcycle", "options")}
              </option>
              <option value="private">
                {getTranslation("privateV", "options")}
              </option>
            </select>
          </p>
          <p>
            <label htmlFor="vBrand">{getTranslation("vBrand", "label")}</label>

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
            <label htmlFor="vModel">{getTranslation("vModel", "label")}</label>
          </p>
          <p className={classes["form-input"]}>
            <input type="text" id="vModel" name="vModel" required />
          </p>
        </div>
        <div className={classes["controls-row"]}>
          <p className={classes["form-label"]}>
            <label htmlFor="vNumber">
              {getTranslation("vNumber", "label")}
            </label>
          </p>
          <p className={classes["form-input"]}>
            <input type="number" id="vNumber" name="vNumber" required />
          </p>
        </div>
        <div className={classes["controls-row"]}>
          <p className={classes["form-label"]}>
            <label htmlFor="vYear">{getTranslation("vYear", "label")}</label>
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
            <label htmlFor="vKm">{getTranslation("vKm", "label")}</label>
          </p>
          <p className={classes["form-input"]}>
            <input type="number" id="vKm" name="vKm" />
          </p>
        </div>
        <p className={classes.actions}>
          <Link to="..">
            <Button textOnly disabled={isSubmitting}>
              {getTranslation("btnCancel", "button")}{" "}
            </Button>
          </Link>

          <Button disabled={isSubmitting}>
            {getTranslation("btnAddVehicle", "button")}
          </Button>
        </p>
      </Form>
    </>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const postData = Object.fromEntries(formData);
  console.log(postData);

  await sleep(5000);

  return redirect("..");
}

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay)); // for testing

export async function loader() {
  // load models from db
  const vehicleBrands = [
    { brand: "Honda", type: "motorcycle" },
    { brand: "Kawasaky", type: "motorcycle" },
  ];
  return vehicleBrands;
}
