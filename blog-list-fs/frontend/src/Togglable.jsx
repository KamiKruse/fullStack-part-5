import {useState} from "react";

const Togglable =(props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleFunction = () => {
    setVisible(prev => !prev);
  };

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={toggleFunction}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}{" "}
        <button onClick={toggleFunction}>cancel</button>
      </div>
    </>
  );
}
export default Togglable
