export default function Notification(props){
  return props.err ? (
    <h3 className="notification error">{props.err}</h3>
  ) : (
    <h3 className="notification success">{props.success}</h3>
  );
}
