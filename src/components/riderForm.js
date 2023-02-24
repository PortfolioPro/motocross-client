import { Form } from 'react-router-dom';

function RiderForm(props) {
  return (
    <Form method={props.method}>
      <div className="row">
        <label htmlFor="rider">Rider</label>
        <input type="text" id="rider" name="rider" defaultValue={props.rider && props.rider.rider} />
      </div>

      <div className="row">
        <label htmlFor="number">Number</label>
        <input type="text" id="number" name="number" defaultValue={props.rider && props.rider.number} />
      </div>

      <div className="row">
        <label htmlFor="country">Country</label>
        <input type="text" id="country" name="country" defaultValue={props.rider && props.rider.country} />
      </div>

      <div className="row">
        <label htmlFor="mechanic">Mechanic</label>
        <input type="text" id="mechanic" name="mechanic" defaultValue={props.rider && props.rider.mechanic} />
      </div>

      <div className="row">
        <button type="submit">{props.button}</button>
      </div>
    </Form>
  );
}

export default RiderForm;
