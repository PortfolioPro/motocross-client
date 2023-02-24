import { useEffect } from 'react';
import { Link, Form, useParams, useLoaderData, useActionData, useOutletContext, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMotorcycle } from '@fortawesome/free-solid-svg-icons';
import { faPerson } from '@fortawesome/free-solid-svg-icons';
import SuccessMessage from '../components/successMessage';

function RiderShow() {
  const rider = useLoaderData();
  const {teamId} = useParams();
  const motorcycle = <FontAwesomeIcon icon={faMotorcycle} />
  const person = <FontAwesomeIcon icon={faPerson} />
  const actionData = useActionData();
  const [[flashMessage, setFlashMessage], [origin, setOrigin]] = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData) {
      if (actionData.success) {
        setFlashMessage(actionData.message);
        setOrigin('riderShow');
        navigate(`/teams/${teamId}`);
      }
    } else if (origin === 'riderNew' || origin === 'riderShow') {
      setFlashMessage();
      setOrigin();
    }
  }, [actionData, setFlashMessage, origin, setOrigin, navigate, teamId]);

  return (
    <div className="rider-show">
      <div className="menu">
        <ul>
          <li><Link to={`/teams/${teamId}`}>Back to team</Link></li>
        </ul>
      </div>

      <div className="article">
        <div className="title">
          <h2>Rider {rider.rider}</h2>
        </div>

        {origin &&
          <SuccessMessage success={flashMessage} />
        }

        <div className="content">
          <div className="rider">
            <div className="info">
              <div className="properties">
                <p>Name</p>
                <p>{rider.rider}</p>
              </div>

              <div className="properties">
                <p>Number</p>
                <p>{rider.number}</p>
              </div>

              <div className="properties">
                <p>Country</p>
                <p>{rider.country}</p>
              </div>

              <div className="properties">
                <p>Mechanic</p>
                <p>{rider.mechanic}</p>
              </div>
            </div>

            <div className="action">
              <div className="set">
                <span>{motorcycle}</span>
                <span>{person}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="crud">
          <Link to={'edit'}>Edit rider</Link>
          <Form method="post">
            <button type='submit'>Delete rider</button>
          </Form>
        </div>

        <div className="back">
          <Link to={`/teams/${teamId}`}>&larr; Back to team</Link>
        </div>
      </div>
    </div>
  );
}

export default RiderShow;

export async function riderShowLoader({ params }) {
  const response = await fetch(`https://motocross-server.onrender.com/api/teams/${params.teamId}/riders/${params.id}`);
  if (!response.ok) {
    throw new Error('Rider was not found!');
  }
  const data = await response.json();
  if (data !== null) {
    if (data.rider) {
      return data;
    } else {
      throw new Error('Rider was not found!');
    }
  } else {
    throw new Error('Rider was not found!')
  }
}

export async function riderDeleteAction({ params }) {
  const response = await fetch(`https://motocross-server.onrender.com/api/teams/${params.teamId}/riders/${params.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) {
    throw new Error('Rider was not deleted!');
  }
  const data = await response.json();
  return data;
}
