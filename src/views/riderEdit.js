import { useEffect } from 'react';
import { Link, useParams, useLoaderData, useActionData, useOutletContext, useNavigate }
from 'react-router-dom';
import RiderForm from '../components/riderForm';
import ErrorMessage from '../components/errorMessage';


function EditRider() {
  const {teamId, id} = useParams();
  const rider = useLoaderData();
  const actionData = useActionData();
  const [[, setFlashMessage], [, setOrigin]] = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData) {
      if (actionData.success) {
        setFlashMessage(actionData.message);
        setOrigin('riderEdit');
        navigate(`/teams/${teamId}/riders/${id}`);
      }
    } else {
      setFlashMessage();
      setOrigin();
    }
  }, [actionData, setFlashMessage, setOrigin, navigate, teamId, id]);

  return (
    <div className="rider-edit">
      <div className="menu">
        <ul>
          <li><Link to={`/teams/${teamId}/riders/${id}`}>Back to rider</Link></li>
        </ul>
      </div>

      <div className="article">
        <div className="title">
          <h2>EDIT RIDER</h2>
        </div>

        {actionData && actionData.errors &&
          <ErrorMessage error={actionData} />
        }

        <div className="content">
          <div className="form">
            <RiderForm method="post" button="Update rider" rider={rider} />
          </div>
        </div>

        <div className="back">
          <Link to={`/teams/${teamId}/riders/${id}`}>&larr; Back to rider</Link>
        </div>
      </div>
    </div>
  );
}

export default EditRider;

export async function riderEditLoader({ params }) {
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

export async function riderEditAction({ request, params }) {
  const riderData = Object.fromEntries(await request.formData());
  const response = await fetch(`https://motocross-server.onrender.com/api/teams/${params.teamId}/riders/${params.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(riderData)
  });
  if (!response.ok) {
    throw new Error('Rider was not updated!');
  }
  const data = await response.json();
  return data;
}
