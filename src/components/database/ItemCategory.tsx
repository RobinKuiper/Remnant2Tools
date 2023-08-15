import React, { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { DataContext } from "../../context/DataContext";
import { Flex } from "../../style/global";

const Container = styled.div`
  flex-basis: 100%;
  margin: 20px 0;

  .title {
    font-weight: 900;
  }
`;

interface Props {
  item: any;
  category: any;
  type?: string;
}

const ItemCategory = ({ item, category, type = "tracker" }: Props) => {
  const { unlocks, toggleUnlock } = useContext(DataContext);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (type !== "tracker") {
      setUnlocked(false);
      return;
    }

    const categoryFragment = category.fragment;
    if (unlocks[categoryFragment] && unlocks[categoryFragment][item.externalId]) {
      setUnlocked(unlocks[categoryFragment][item.externalId].unlocked);
    }
  }, [item, unlocks, type]);

  const handleChange = e => {
    const id = e.target.id;

    toggleUnlock(id);
  };

  return (
    <Container className={unlocked ? "unlocked" : ""}>
      <Flex alignitems="center">
        {type === "tracker" && category.categoryIsCheckable && (
          <div>
            <div className="checkbox-wrapper">
              <label className="checkbox">
                <input
                  id={item.externalId}
                  className="checkbox__trigger visuallyhidden"
                  type="checkbox"
                  checked={unlocked}
                  onChange={handleChange}
                />
                <span className="checkbox__symbol">
                  <svg
                    aria-hidden="true"
                    className="icon-checkbox"
                    width="28px"
                    height="28px"
                    viewBox="0 0 28 28"
                    version="1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 14l8 7L24 7"></path>
                  </svg>
                </span>
              </label>
            </div>
          </div>
        )}
        <div className="title">{item.name}</div>
      </Flex>
    </Container>
  );
};

export default ItemCategory;
