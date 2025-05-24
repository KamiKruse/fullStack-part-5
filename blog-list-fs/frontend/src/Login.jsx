import Notification from "./Notification";
export default function Login(props) {
  return (
    <>
      <h1>Log in to application</h1>
      {props.error && <Notification err={props.error} />}
      <form onSubmit={props.handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={props.username}
            onChange={props.onUserNameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={props.password}
            onChange={props.onPasswordChange}
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    </>
  );
}
