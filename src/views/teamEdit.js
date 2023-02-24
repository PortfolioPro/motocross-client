import { useEffect } from 'react';
import { Link, useParams, useLoaderData, useActionData, useOutletContext, useNavigate } from 'react-router-dom';
import TeamForm from '../components/teamForm';
import ErrorMessage from '../components/errorMessage';

function TeamEdit() {
  const {id} = useParams();
  const team = useLoaderData();
  const actionData = useActionData();
  const [[, setFlashMessage], [, setOrigin]] = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData) {
      if (actionData.success) {
        setFlashMessage(actionData.message);
        setOrigin('teamEdit');
        navigate(`/teams/${id}`);
      }
    } else {
      setFlashMessage();
      setOrigin();
    }
  }, [actionData, setFlashMessage, setOrigin, navigate, id]);

  return (
    <div className="team-edit">
      <div className="menu">
        <ul>
          <li><Link to={`/teams/${id}`}>Back to team</Link></li>
        </ul>
      </div>

      <div className="article">
        <div className="title">
          <h2>EDIT TEAM</h2>
        </div>

        {actionData && actionData.errors &&
          <ErrorMessage error={actionData} />
        }

        <div className="content">
          <div className="form">
            <TeamForm method='post' button='Update team' team={team} />
          </div>
        </div>

        <div className="back">
          <Link to={`/teams/${id}`}>&larr; Back to team</Link>
        </div>
      </div>
    </div>
  );
}

export default TeamEdit;

export async function teamEditLoader({ params }) {
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

export async function teamEditAction({ request, params }) {
  const teamData = Object.fromEntries(await request.formData());
  const response = await fetch(`https://motocross-server.onrender.com/api/teams/${params.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(teamData)
  });
  if (!response.ok) {
    throw new Error('Team was not updated!');
  }
  const data = await response.json();
  return data;
}
