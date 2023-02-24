import { useEffect } from 'react';
import { Link, useActionData, useOutletContext, useNavigate } from 'react-router-dom';
import TeamForm from '../components/teamForm';
import ErrorMessage from '../components/errorMessage';

function TeamsNew() {
  const actionData = useActionData();
  const [[, setFlashMessage], [,setOrigin]] = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData) {
      if (actionData.success) {
        setFlashMessage(actionData.message);
        setOrigin('teamNew');
        navigate('/teams');
      }
    } else {
      setFlashMessage();
      setOrigin();
    }
  }, [actionData, setFlashMessage, setOrigin, navigate]);

  return (
    <div className="teams-new">
      <div className="menu">
        <ul>
          <li><Link to={'/teams'}>Back to teams</Link></li>
        </ul>
      </div>

      <div className="article">
        <div className="title">
          <h2>TEAM REGISTRATION</h2>
        </div>

        {actionData && actionData.errors &&
          <ErrorMessage error={actionData} />
        }

        <div className="content">
          <div className="form">
            <TeamForm method='post' button='Create team' />
          </div>
        </div>

        <div className="back">
          <Link to={'/teams'}>&larr; Back to teams</Link>
        </div>
      </div>
    </div>
  );
}

export default TeamsNew;

export async function teamsNewAction({ request }) {
  const teamData = Object.fromEntries(await request.formData());
  const response = await fetch('https://motocross-server.onrender.com/api/teams', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(teamData)
  });
  if (!response.ok) {
    throw new Error('Team was not created!');
  }
  const data = await response.json();
  return data;
}
