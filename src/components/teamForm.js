import { Form } from 'react-router-dom';

function TeamForm(props) {
  return (
    <Form method={props.method}>
      <div className="row">
        <label htmlFor="team">Team</label>
        <input type="text" id="team" name="team" defaultValue={props.team && props.team.team} />
      </div>

      <div className="row">
        <label htmlFor="manager">Manager</label>
        <input type="text" id="manager" name="manager" defaultValue={props.team && props.team.manager} />
      </div>

      <div className="row">
        <label htmlFor="manufacturer">Manufacturer</label>
        <input type="text" id="manufacturer" name="manufacturer" defaultValue={props.team && props.team.manufacturer} />
      </div>

      <div className="row">
        <button type="submit">{props.button}</button>
      </div>
    </Form>
  );
}

export default TeamForm
