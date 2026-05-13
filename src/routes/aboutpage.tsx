import { Link } from 'react-router';

export default function About() {
  return (
    <div className="about-page">
      <p>This app was made by Kanykei Zulumova</p>
      <p>
        Other apps you can find in my{' '}
        <a href="https://github.com/kanykeizulumova"> Github </a>
      </p>
      <p>
        This app is part of{' '}
        <a href="https://rs.school/courses/reactjs">RS School React course</a>.
      </p>

      <button type="button" id="backtobtn">
        <Link to="/">⬅️</Link>
      </button>
    </div>
  );
}
