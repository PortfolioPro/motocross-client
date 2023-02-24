import { useEffect } from 'react';
import { Link, Form, useLoaderData, useActionData, useOutletContext, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import SuccessMessage from '../components/successMessage';

function TeamShow() {
  const team = useLoaderData();
  const user = <FontAwesomeIcon icon={faUser} />
  const actionData = useActionData();
  const [[flashMessage, setFlashMessage], [origin, setOrigin]] = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData) {
      if (actionData.success) {
        setFlashMessage(actionData.message);
        setOrigin('teamShow');
        navigate('/teams');
      }
    } else if (origin === 'teamNew' || origin === 'teamShow' || origin === 'riderEdit') {
      setFlashMessage();
      setOrigin();
    }
  }, [actionData, setFlashMessage, origin, setOrigin, navigate]);

  return (
    <div className="team-show">
      <div className="menu">
        <ul>
          <li><Link to={`riders/new`}>Create rider</Link></li>
          <li><Link to={'/teams'}>Back to teams</Link></li>
        </ul>
      </div>

      <div className="article">
        <div className="title">
          <h2>TEAM {team.team.toUpperCase()}</h2>
        </div>

        {origin &&
          <SuccessMessage success={flashMessage} />
        }

        <div className="content">
          <div className="team">
            <div className="info">
              <div className="properties">
                <p>Name</p>
                <p>{team.team}</p>
              </div>

              <div className="properties">
                <p>Manager</p>
                <p>{team.manager}</p>
              </div>

              <div className="properties">
                <p>Manufacturer</p>
                <p>{team.manufacturer}</p>
              </div>
            </div>

            <div className="riders">
              {team.riders.map(rider => (
                <div key={rider._id} className="card">
                  <div className="card-image">
                    <span>{user}</span>
                  </div>

                  <div className="card-info">
                    <h3>{rider.rider}</h3>

                    <div className="data">
                      <p>{rider.number}</p>
                      <p>{rider.country}</p>
                    </div>
                  </div>

                  <div className="card-button">
                    <Link to={`riders/${rider._id}`}>Show rider</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="crud">
          <Link to={`edit`}>Edit team</Link>
          <Form method="post">
            <button type='submit'>Delete team</button>
          </Form>
        </div>

        <div className="back">
          <Link to={'/teams'}>&larr; Back to teams</Link>
        </div>
      </div>
    </div>
  );
}

export default TeamShow;

export async function teamShowLoader({ params }) {
  const response = await fetch(`https://motocross-server.onrender.com/api/teams/${params.id}`);
  if (!response.ok) {
    throw new Error('Team was not found!');
  }
  const data = await response.json();
  if (data.team) {
    return data;
  } else {
    throw new Error('Team was not found!');
  }
}

export async function teamDeleteAction({ params }) {
  const response = await fetch(`https://motocross-server.onrender.com/api/teams/${params.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) {
    throw new Error('Team was not deleted!');
  }
  const data = await response.json();
  return data;
}
