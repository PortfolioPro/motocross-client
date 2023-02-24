import { useEffect } from 'react';
import { Link, useLoaderData, useOutletContext } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMotorcycle } from '@fortawesome/free-solid-svg-icons';
import SuccessMessage from '../components/successMessage';

function TeamsIndex() {
  const teams = useLoaderData();
  const motoIcon = <FontAwesomeIcon icon={faMotorcycle} />
  const [[flashMessage, setFlashMessage], [origin, setOrigin]] = useOutletContext();

  useEffect(() => {
    if (origin === 'teamEdit' || origin === 'riderNew' || origin === 'riderShow') {
      setFlashMessage();
      setOrigin();
    }
  }, [setFlashMessage, origin, setOrigin]);

  return (
    <div className="teams-index">
      <div className="menu">
        <ul>
          <li><Link to={'/teams/new'}>Create team</Link></li>
        </ul>
      </div>

      <div className="article">
        <div className="title">
          <h2>PRO MOTOCROSS TEAMS</h2>
        </div>

        {origin &&
          <SuccessMessage success={flashMessage} />
        }

        <div className="content">
          <div className="teams">
            {teams.map(team => (
              <div key={team._id} className="card">
                <div className="card-image">
                  <span>{motoIcon}</span>
                </div>

                <div className="card-info">
                  <h3>{team.team}</h3>

                  <ul>
                    {team.riders.map(rider => (
                      <li key={rider._id}>{rider.rider}</li>
                    ))}
                  </ul>
                </div>

                <div className="card-button">
                  <Link to={`/teams/${team._id}`}>Show team</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamsIndex;

export async function teamsIndexLoader() {
  const response = await fetch('https://motocross-server.onrender.com/api/teams');
  if (!response.ok) {
    throw new Error('No teams were found!');
  }
  const data = await response.json();
  return data;
}
