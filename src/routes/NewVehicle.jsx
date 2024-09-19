import Modal from "../components/UI/Modal";
import { Form } from "react-router-dom";

export default function NewVehicle() {
  return (
    <Modal>
      <Form method="post">
        <p>
          <label htmlFor="vNumber">Number</label>
          <input type="number" id="vNumber" name="vNumber" required />
        </p>
      </Form>
    </Modal>
  );
}
