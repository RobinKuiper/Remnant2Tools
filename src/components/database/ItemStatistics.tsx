import "./ItemStatistics.scss";
import { useEffect, useState } from "react";
import ItemStat from "../item/ItemStat";
import { calculateWeightType } from "../../dataHelpers";

const MAX_LEVEL = 10;

interface Props {
  item: any;
  background?: string;
  color?: string;
  border?: string;
}

const ItemStatistics = ({ item, background = "#f9f9f9", color = "#333", border = "1px solid #ddd" }: Props) => {
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
    <div className="item-statistics-container" style={{ background, color, border }}>
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
    </div>
  );
};

export default ItemStatistics;
