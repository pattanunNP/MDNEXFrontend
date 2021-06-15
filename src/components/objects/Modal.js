import React, { useContext } from "react";
import { Modal, Paper } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { IconButton } from "@material-ui/core";
import { StoreContext } from "../../context/store";

export default function ModalPop(props) {
  const { openModal, setOpenModal } = useContext(StoreContext);

  return (
    <div>
      <Modal open={openModal} className="flex justify-center">
        <Paper
          style={{
            marginTop: "80px",
            width: props.width !== undefined ? props.width : "500px",
            height: props.height !== undefined ? props.height : "500px",
            padding: "1rem",
            borderRadius: "30px",
          }}
        >
          <div className="flex justify-between">
            <IconButton
              className="orders-last"
              onClick={() => {
                setOpenModal(false);
              }}
            >
              <CancelIcon className="text-red-400" />
            </IconButton>
          </div>
          <div className="flex justify-center">
            <div className="order-center"> {props.contents}</div>
          </div>
        </Paper>
      </Modal>
    </div>
  );
}
