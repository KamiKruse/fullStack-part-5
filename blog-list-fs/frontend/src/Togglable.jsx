import { useState } from "react";

export default function Togglable(props) {
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
