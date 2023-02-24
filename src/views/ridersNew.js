import { useEffect } from 'react';
import { Link, useParams, useActionData, useOutletContext, useNavigate } from 'react-router-dom';
import RiderForm from '../components/riderForm';
import ErrorMessage from '../components/errorMessage';

function RidersNew() {
  const {teamId} = useParams();
  const actionData = useActionData();
  const [[, setFlashMessage], [, setOrigin]] = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData) {
      if (actionData.success) {
        setFlashMessage(actionData.message);
        setOrigin('riderNew');
        navigate(`/teams/${teamId}`);
      }
    } else {
      setFlashMessage();
      setOrigin();
    }
  }, [actionData, setFlashMessage, setOrigin, navigate, teamId]);

  return (
    <div className="riders-new">
      <div className="menu">
        <ul>
          <li><Link to={`/teams/${teamId}`}>Back to team</Link></li>
        </ul>
      </div>

      <div className="article">
        <div className="title">
          <h2>RIDER REGISTRATION</h2>
        </div>

        {actionData && actionData.errors &&
          <ErrorMessage error={actionData} />
        }

        <div className="content">
          <div className="form">
            <RiderForm method="post" button="Create rider" />
          </div>
        </div>

        <div className="back">
          <Link to={`/teams/${teamId}`}>&larr; Back to team</Link>
        </div>
      </div>
    </div>
  );
}

export default RidersNew;

export async function ridersNewAction({ request, params }) {
  const riderData = Object.fromEntries(await request.formData());
  const response = await fetch(`https://motocross-server.onrender.com/api/teams/${params.teamId}/riders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(riderData)
  });
  if (!response.ok) {
    throw new Error('Rider was not created!');
  }
  const data = await response.json();
  if (data.success) {
    return data;
  } else {
    throw new Error('Rider was not created!');
  }
}
