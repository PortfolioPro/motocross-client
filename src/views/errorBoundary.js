import { Link, useRouteError } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

function ErrorBoundary() {
  const error = useRouteError();
  const exclamation = <FontAwesomeIcon icon={faTriangleExclamation} />

  return (
    <div className="error-boundary">
      <div className="menu">
        <ul>
          <li><Link to={'/teams'}>Back to teams</Link></li>
        </ul>
      </div>

      <div className="article">
        <div className="title">
          <h2>SOMETHING WENT WRONG!</h2>
        </div>

        <div className="content">
          <div className="boundary">
            <div className="card">
              <div className="card-image">
                <span>{exclamation}</span>
              </div>

              <div className="card-info">
                <h3>{error.name}</h3>

                <p>{error.message}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="back">
          <Link to={'/teams'}>&larr; Back to teams</Link>
        </div>
      </div>
    </div>
  );
}

export default ErrorBoundary;
