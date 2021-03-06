import React from "react";

export default function CustomButton(props) {
  return (
    <button
      className={props.classStyle}
      type={props.type}
      onSubmit={props.handleSubmit}
    >
      <h4>{props.name}</h4>
    </button>
  );
}
