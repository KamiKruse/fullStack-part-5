import Notification from "./Notification";
import PropTypes from 'prop-types'
export default function Login({
  handleSubmit,
  onUserNameChange,
  onPasswordChange,
  username,
  password,
  error
}) {
  return (
    <>
      <h1>Log in to application</h1>
      {error && <Notification err={error} />}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={onUserNameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={onPasswordChange}
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    </>
  );
}
Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onUserNameChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired
};
