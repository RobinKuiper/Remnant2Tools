import React from "react";
import ItemStat from "../item/ItemStat";
import { calculateWeightType } from "../../dataHelpers";
import { styled } from "styled-components";

const Container = styled.div`
  padding: 20px;
  border: ${props => props.border ?? "1px solid #ddd"};
  background: ${props => props.background ?? "#f9f9f9"};
  color: ${props => props.color ?? "#333"};
  width: 300px;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ItemStatistics = ({ stats, background, color, border }) => {
  return (
    <Container background={background} color={color} border={border}>
      {stats.weight && <ItemStat valueKey="Weight type" value={calculateWeightType(stats.weight)} />}
      {Object.entries(stats)
        .filter(([key, value]) => key && value)
        .map(([key, value]) => (
          <ItemStat key={key} valueKey={key} value={value} />
        ))}
    </Container>
  );
};

export default ItemStatistics;
