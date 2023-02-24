import React from 'react';
import { AiFillWarning } from "react-icons/ai"

import Modal from './Modal';

import classes from "../../styles/ErrorModal.module.css"

const ErrorModal = props => {
  return (
    <Modal
      onCancel={props.onClear}
      header={<div className={classes.warningDiv}><AiFillWarning className={classes.warning}></AiFillWarning><p>An error occured!</p></div>}
      show={!!props.error}
      footer={<button className={classes.okay} onClick={props.onClear}>Okay</button>}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
