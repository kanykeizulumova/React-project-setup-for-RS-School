import { Link } from 'react-router';

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Page Not Found</p>
      <Link id="backtobtn" to="/">
        ⬅️
      </Link>
    </div>
  );
}
