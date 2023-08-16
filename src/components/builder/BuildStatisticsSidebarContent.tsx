import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import "react-toggle/style.css";
import type { Build } from "../../interface/Build";
import { calculateWeightType, getFieldValue, setFieldValue } from "../../dataHelpers";

const Container = styled.div`
  padding: 10px;

  h2 {
    margin-bottom: 10px;
  }

  .statisticsContainer {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .key {
      
    }

    .stat-item,
    .sub-item {
      display: flex;
      justify-content: space-between;
    }

    .multiple-item {
      display: flex;
      flex-direction: column;
      gap: 5px;

      .values {
        display: flex;
        flex-direction: column;
        gap: 10px;

        .key {
          padding-left: 10px;
        }
      }
    }
  }

  .footer {
    position: absolute;
    bottom: 50px;
    box-sizing: border-box;
    padding: 0 10px 0 0;
  }
`;

const STATS = [
  {
    statisticsPath: "armor",
    buildPaths: ["headpiece", "chest", "hands", "feet"],
  },
  {
    statisticsPath: "weight",
    buildPaths: ["headpiece", "chest", "hands", "feet"],
  },
  {
    statisticsPath: "resistances.bleed",
    buildPaths: ["headpiece", "chest", "hands", "feet"],
  },
  {
    statisticsPath: "resistances.fire",
    buildPaths: ["headpiece", "chest", "hands", "feet"],
  },
  {
    statisticsPath: "resistances.shock",
    buildPaths: ["headpiece", "chest", "hands", "feet"],
  },
  {
    statisticsPath: "resistances.blight",
    buildPaths: ["headpiece", "chest", "hands", "feet"],
  },
  {
    statisticsPath: "resistances.corrosion",
    buildPaths: ["headpiece", "chest", "hands", "feet"],
  },
];

interface Props {
  build: Build;
}

const BuildStatisticsSidebarContent = ({ build }: Props) => {
  const [statistics, setStatistics] = useState({
    armor: 0,
    weight: 0,
    resistances: {
      bleed: 0,
      fire: 0,
      shock: 0,
      blight: 0,
      corrosion: 0,
    },
  });

  useEffect(() => {
    const newStatistics = { ...statistics };

    STATS.forEach(stat => {
      let value = 0;
      setFieldValue(newStatistics, stat.statisticsPath, value);

      stat.buildPaths.forEach(buildPath => {
        value += getFieldValue(build, `${buildPath}.stats.${stat.statisticsPath}`) ?? 0;

        setFieldValue(newStatistics, stat.statisticsPath, value);
      });
    });

    setStatistics(newStatistics);
  }, [build]);

  return (
    <Container>
      <h2>Statistics</h2>

      <div className="statisticsContainer">
        <div className="stat-item">
          <div className="key">Armor</div>
          <div className="value">{statistics.armor}</div>
        </div>

        <div className="stat-item">
          <div className="key">Weight</div>
          <div className="value">{statistics.weight}</div>
        </div>

        <div className="stat-item">
          <div className="key">Weight Type</div>
          <div className="value">{calculateWeightType(statistics.weight)}</div>
        </div>

        <div className="multiple-item">
          <div className="key title">Resistances</div>

          <div className="values">
            <div className="stat-item">
              <div className="key">Bleed</div>
              <div className="value">{statistics.resistances.bleed}</div>
            </div>

            <div className="sub-item">
              <div className="key">Fire</div>
              <div className="value">{statistics.resistances.fire}</div>
            </div>

            <div className="sub-item">
              <div className="key">Shock</div>
              <div className="value">{statistics.resistances.shock}</div>
            </div>

            <div className="sub-item">
              <div className="key">Blight</div>
              <div className="value">{statistics.resistances.blight}</div>
            </div>

            <div className="sub-item">
              <div className="key">Corrosion</div>
              <div className="value">{statistics.resistances.corrosion}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        <p style={{ fontSize: "0.8em", textAlign: "center" }}>
          Please be aware that the database might not have received all the data at this time. As a result, the
          statistics could be somewhat inaccurate.
        </p>
      </div>
    </Container>
  );
};

export default BuildStatisticsSidebarContent;
