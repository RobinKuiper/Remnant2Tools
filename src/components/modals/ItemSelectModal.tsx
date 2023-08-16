import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { useEffect, useState } from "react";
import { BsLock } from "react-icons/bs";
import Modal from "react-modal";
import { styled } from "styled-components";
import { findImageById } from "../../helpers";
import Search from "../Search";
import { graphql, useStaticQuery } from "gatsby";
import { filterItems, sorter } from "../../dataHelpers";
import type { Filter } from "../../interface/IData";
import Loader from "../Loader";
import {useAppSelector} from "../../hooks";
import {RootState} from "../../store";

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

interface Props {
  setIsOpen: (value: ((prevState: boolean) => boolean) | boolean) => void;
  isOpen: boolean;
  filters: Filter[];
  callback: (item: any) => void;
  onlyShowUnlocked?: boolean;
}

const ItemSelectModal = ({ setIsOpen, isOpen, filters, callback, onlyShowUnlocked = false }: Props) => {
  const data = useStaticQuery(graphql`
    {
      images: allFile(filter: { relativePath: { regex: "/items/" } }) {
        nodes {
          fields {
            itemId
          }
          ...imageFragment
        }
      }
      items: allItem(
        filter: {
          category: {
            in: [
              "mutators"
              "armor"
              "rings"
              "amulets"
              "relics"
              "relicfragments"
              "mods"
              "traits"
              "weapons"
              "archetypes"
            ]
          }
        }
      ) {
        nodes {
          externalId
          name
          fragment
          category
          type
          race
          armorset
          stats {
            ...itemStatsFragment
          }
          links {
            ...itemLinkIdsFragment
          }
        }
      }
    }
  `);
  const { unlocks } = useAppSelector((state: RootState) => state.data)
  const allItems = data.items.nodes;
  const images = data.images.nodes;
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [itemsFiltered, setItemsFiltered] = useState<any[]>([]);
  const [itemsToShow, setItemsToShow] = useState([]);

  // Filter items & reset search query on close/open
  useEffect(() => {
    if (!isOpen) return;
    setQuery("");
    setItemsFiltered(filterItems(allItems, filters, onlyShowUnlocked));
  }, [isOpen]);

  // Search items when query or filtered items change
  useEffect(() => {
    let searchedItems = itemsFiltered;
    if (query && query !== "") {
      const filter = item => item.name.toLowerCase().includes(query.toLowerCase());
      searchedItems = searchedItems.filter(filter);
    }

    const sort = (a, b) => sorter(a, b, "name");
    searchedItems.sort(sort);
    setItemsToShow(searchedItems);
    setLoading(false);
  }, [query, itemsFiltered]);

  const closeModal = () => {
    setIsOpen(false);
    setLoading(true);
  };

  const handleItemPick = (item: any) => {
    if (item.links?.mod) {
      item.links.mod = allItems.find(i => i.category === "mods" && i.externalId === item.links.mod.externalId) ?? null;
    }

    if (item.links?.trait) {
      item.links.trait =
        allItems.find(i => i.category === "traits" && i.externalId === item.links.trait.externalId) ?? null;
    }

    callback(item);
    closeModal();
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
          <Search
            placeholder={"Search items"}
            query={query}
            setQuery={setQuery}
            width={"100%"}
            tooltip="Search by name"
          />
        </div>

        {!loading ? (
          <div id="list">
            {itemsToShow.length > 0 &&
              itemsToShow.map(item => (
                <button key={item.externalId} onClick={() => handleItemPick(item)}>
                  <div>
                    <GatsbyImage alt={item.name} image={getImage(findImageById(item.externalId, images))} />
                  </div>
                  <div>
                    {!unlocks.includes(item.externalId) && <BsLock />}
                    {item.name}
                  </div>
                </button>
              ))}

            {itemsToShow.length === 0 && <p>No (unlocked) items found.</p>}
          </div>
        ) : (
          <Loader loading={loading} />
        )}
      </Content>
    </Modal>
  );
};

export default ItemSelectModal;
