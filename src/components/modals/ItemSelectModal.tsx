import "./ItemSelectModal.scss";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { useEffect, useState } from "react";
import { BsLock } from "react-icons/bs";
import Modal from "react-modal";
import { findImageById } from "../../helpers";
import Search from "../Search";
import { graphql, useStaticQuery } from "gatsby";
import { filterItems, sorter } from "../../dataHelpers";
import type { Filter } from "../../interface/IData";
import Loader from "../Loader";
import { useAppSelector } from "../../hooks";
import type { RootState } from "../../store";
import ItemTooltip from "../database/ItemTooltip";

Modal.setAppElement("#___gatsby");

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
  const { unlocks } = useAppSelector((state: RootState) => state.data);
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
      <div className="item-select-modal-container">
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
                <button key={item.externalId} onClick={() => handleItemPick(item)} data-tooltip-id={item.externalId}>
                  <div>
                    <GatsbyImage alt={item.name} image={getImage(findImageById(item.externalId, images))} />
                  </div>
                  <div>
                    {!unlocks.includes(item.externalId) && <BsLock />}
                    {item.name}
                  </div>
                  <ItemTooltip id={item.externalId} item={item} />
                </button>
              ))}

            {itemsToShow.length === 0 && <p>No (unlocked) items found.</p>}
          </div>
        ) : (
          <Loader loading={loading} />
        )}
      </div>
    </Modal>
  );
};

export default ItemSelectModal;
