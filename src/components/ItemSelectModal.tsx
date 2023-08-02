import React, { useContext } from "react";
import { BsUnlock } from "react-icons/bs";
import Modal from "react-modal";
import { styled } from "styled-components";
import { DataContext } from "../context/DataContext";

Modal.setAppElement("#___gatsby");

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  width: 300px;
  height: 400px;
  background-color: #f1f1f1;

  input {
    padding: 5px;
  }

  #list {
    display: flex;
    flex-direction: column;
    gap: 5px;
    overflow-y: auto;
    height: 100%;

    button {
      border-bottom: 1px solid #000;
      padding-bottom: 5px;
    }
  }
`;

const ItemSelectModal = ({ setIsOpen, isOpen, items, category, callback }) => {
  const { unlocks } = useContext(DataContext);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Select Item"
      className="modal"
      overlayClassName="overlay"
    >
      <Content>
        <input type="text" placeholder="Search" />
        <div id="list">
          {items.map(item => (
            <button key={item.id} onClick={() => callback(item.id)}>
              {unlocks[category] && unlocks[category][item.id] && unlocks[category][item.id].unlocked && <BsUnlock />}
              {item.name}
            </button>
          ))}
        </div>
      </Content>
    </Modal>
  );
};

export default ItemSelectModal;
