import React, { useContext } from "react";
import Modal from "react-modal";
import { DataContext } from "../contexts/DataContext";

Modal.setAppElement("#___gatsby");

const styles = {
  overlay: {
    zIndex: 9999999,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ExportModal = ({ setIsOpen, modalIsOpen }) => {
  const { userData, setUserData } = useContext(DataContext);

  const closeModal = () => {
    setIsOpen(false);
  };

  const importUserData = () => {
    const value = document.getElementById("input").value;
    setUserData(JSON.parse(value));
    localStorage.setItem("data", value);
  };

  return (
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Example Modal" style={styles}>
      <h2>Export/import</h2>
      <textarea
        id={"input"}
        style={{
          width: "300px",
          height: "200px",
        }}
      >
        {JSON.stringify(userData)}
      </textarea>
      <button
        style={{
          padding: "10px",
        }}
        onClick={importUserData}
      >
        Import
      </button>
    </Modal>
  );
};

export default ExportModal;
