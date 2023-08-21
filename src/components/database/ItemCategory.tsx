import React from "react";
import { styled } from "styled-components";
import { Flex } from "../../style/global";

interface Props {
  item: any;
}

const ItemCategory = ({ item }: Props) => {
  return (
    <Container className={""}>
      <Flex alignitems="center">
        <div className="title">{item.name}</div>
      </Flex>
    </Container>
  );
};

export default ItemCategory;

const Container = styled.div`
  flex-basis: 100%;
  margin: 20px 0;

  .title {
    font-weight: 900;
  }
`;
