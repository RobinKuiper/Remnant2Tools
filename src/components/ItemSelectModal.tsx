import React from "react";
import Modal from "react-modal";
import { styled } from "styled-components";

Modal.setAppElement("#___gatsby");

const styles = {
  overlay: {
    zIndex: 9999999,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    overflowY: "auto",
    height: "80%",
  },
};

const ItemSelectModal = ({ setIsOpen, isOpen, items }) => {
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Example Modal" style={styles}>
      <input type="text" placeholder="Search" />
      {items.map(item => (
        <span>{item.name}</span>
      ))}
    </Modal>
  );
};

export default ItemSelectModal;
