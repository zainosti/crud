import React from "react";

const Button = (props) => {
  return (
    <>
      <button className={props.class} onClick={props.click}>
        {props.btn_name}
      </button>
    </>
  );
};

export default Button;
