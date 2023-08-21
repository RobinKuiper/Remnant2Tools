import React, { useEffect, useState } from "react";
import ItemStat from "../item/ItemStat";
import { calculateWeightType } from "../../dataHelpers";
import { styled } from "styled-components";

const MAX_LEVEL = 10;

const ItemStatistics = ({ item, background, color, border }) => {
  const { stats, values } = item;
  const [levels, setLevels] = useState<number[]>([]);

  useEffect(() => {
    if (values) {
      const increment = (values.max - values.min) / (MAX_LEVEL - 1);
      const newLevels = [];

      for (let i = 0; i < MAX_LEVEL; i++) {
        let level = values.min + increment * i;
        if (level.toString().includes(".")) {
          level = parseFloat(level.toFixed(2));
        }
        newLevels.push(level);
      }

      setLevels(newLevels);
    }
  }, [item]);

  return (
    <Container background={background} color={color} border={border}>
      {stats && (
        <div className="statistics">
          {stats.weight && <ItemStat valueKey="Weight type" value={calculateWeightType(stats.weight)} />}
          {Object.entries(stats)
            .filter(([key, value]) => key && value)
            .map(([key, value]) => (
              <ItemStat key={key} valueKey={key} value={value} />
            ))}
        </div>
      )}

      {values && (
        <div className="levels">
          {levels.map((level, index) => (
            <div key={`item_${level}`} className="level">
              <span className="title">Level {index + 1}:</span>
              <span>
                {level}
                {item.unitSymbol}
              </span>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default ItemStatistics;

const Container = styled.div`
  padding: 20px;
  border: ${props => props.border ?? "1px solid #ddd"};
  background: ${props => props.background ?? "#f9f9f9"};
  color: ${props => props.color ?? "#333"};
  //width: 300px;
  border-radius: 10px;

  .statistics,
  .levels {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .levels {
    .level {
      display: flex;
      justify-content: space-between;

      .title {
        font-weight: 700;
      }
    }
  }
`;
