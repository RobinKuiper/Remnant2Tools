import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { useContext, useEffect, useState } from "react";
import { BsLock } from "react-icons/bs";
import Modal from "react-modal";
import { styled } from "styled-components";
import { DataContext } from "../../context/DataContext";
import { findImageById } from "../../helpers";
import Search from "../Search";

Modal.setAppElement("#___gatsby");

const Content = styled.div`
  display: flex;
  flex-direction: column;

  width: 440px;
  height: 500px;
  background-color: #f1f1f1;

  input {
    padding: 10px;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.5);
    background: transparent;
    border: none;
    //border-bottom: 1px solid #000;
  }

  #list {
    display: flex;
    flex-direction: row;
    padding-top: 10px;

    flex-wrap: wrap;
    gap: 5px;
    overflow-y: auto;
    height: 100%;

    button {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      justify-content: center;
      padding-bottom: 5px;
      width: 100px;
      height: 150px;
      box-sizing: border-box;

      transition: all 0.3s ease-in-out;

      &:hover {
        background: #d5d5d5;
      }
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
  }, [items, category, isOpen]);

  useEffect(() => {
    setItemsFiltered(search().sort((a, b) => a.name.localeCompare(b.name)));
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
                  <GatsbyImage alt={item.name} image={getImage(findImageById(item.externalId, images))} />
                </div>
                <div>
                  {(!unlocks[category] ||
                    !unlocks[category][item.externalId] ||
                    !unlocks[category][item.externalId].unlocked) && <BsLock />}
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
