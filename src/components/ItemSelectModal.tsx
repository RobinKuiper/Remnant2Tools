import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { useContext, useEffect, useState } from "react";
import { BsUnlock } from "react-icons/bs";
import Modal from "react-modal";
import { styled } from "styled-components";
import { DataContext } from "../context/DataContext";
import { findImage } from "../helpers";
import Search from "./Search";

Modal.setAppElement("#___gatsby");

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  width: 435px;
  height: 500px;
  background-color: #f1f1f1;

  input {
    padding: 5px;
  }

  #list {
    display: flex;
    flex-direction: row;

    flex-wrap: wrap;
    gap: 5px;
    overflow-y: auto;
    height: 100%;

    button {
      padding-bottom: 5px;
      width: 100px;
      height: 150px;
      border: 1px solid #000;
      box-sizing: border-box;
    }
  }
`;

const ItemSelectModal = ({ setIsOpen, isOpen, items, category, callback, images }) => {
  const { unlocks } = useContext(DataContext);
  const [query, setQuery] = useState("");
  const [itemsFiltered, setItemsFiltered] = useState(items);

  const search = () => {
    if (query && query.length > 0) {
      return items.filter(item => {
        for (const value of Object.values(item)) {
          if (typeof value === "string" && value.toLowerCase().includes(query.toLowerCase())) {
            return true;
          }
        }
      });
    }

    return items;
  };

  useEffect(() => {
    setQuery("");
  }, []);

  useEffect(() => {
    setItemsFiltered(search());
  }, [query, items]);

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
        <div id="search">
          <Search placeholder={`Search ${category}`} onChange={e => setQuery(e.target.value)} width={"100%"} />
        </div>

        <div id="list">
          {itemsFiltered.length > 0 &&
            itemsFiltered.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  callback(item);
                  closeModal();
                }}
              >
                <div>
                  <GatsbyImage alt={item.name} image={getImage(findImage(item.name, images))} />
                </div>
                <div>
                  {unlocks[category] && unlocks[category][item.id] && unlocks[category][item.id].unlocked && (
                    <BsUnlock />
                  )}
                  {item.name}
                </div>
              </button>
            ))}

          {itemsFiltered.length === 0 && <p>No (unlocked) items found.</p>}
        </div>
      </Content>
    </Modal>
  );
};

export default ItemSelectModal;
