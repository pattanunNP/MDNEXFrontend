import React from "react";

import { Modal } from "@material-ui/core";
export default function Modalpopup(props) {
  return (
    <div className="flex justify-center">
      <Modal open={props.open}>
        <div>{props.content}</div>
      </Modal>
    </div>
  );
}
