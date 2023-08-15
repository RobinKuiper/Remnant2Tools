import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import "react-toggle/style.css";
import { Tooltip } from "react-tooltip";
import type { Build } from "../../interface/Build";
import { calculateWeightType, getFieldValue, setFieldValue } from "../../dataHelpers";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  background: #292929;
  color: #fff;
  //min-height: 100%;
  padding: 100px 0;
  box-sizing: border-box;
  width: 0;
  display: flex;
  flex-direction: column;
  gap: 30px;
  z-index: 75;
  overflow: auto;

  transition: all 0.5s ease-in-out;

  &.active {
    width: 300px;
    padding: 100px 20px;

    .content {
      opacity: 1;
    }

    .opener {
      right: 300px;
    }
  }

  .content {
    opacity: 0;

    transition: opacity 0.2s ease-in-out;
  }

  .opener {
    position: fixed;
    top: 80px;
    right: 0;
    color: #fff;
    background: #292929;
    padding: 5px;
    opacity: 1;
    z-index: 100;
    animation: scale 1.2s ease-in-out;

    button {
      position: relative;

      &:after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0.25em;
        height: 0.25em;
        background-color: rgba(255, 255, 255, 0.9);
        opacity: 0;
        border-radius: 3em;
        transform: scale(1);
        transform-origin: 50% 50%;
        -webkit-animation: ripple-33 1.5s cubic-bezier(0.11, 0.29, 0.18, 0.98);
        animation: ripple-33 1.5s cubic-bezier(0.11, 0.29, 0.18, 0.98);
      }
    }

    transition:
      right 0.5s ease-in-out,
      opacity 0.2s ease-in-out;

    &:hover {
      opacity: 1;
    }
  }

  .statisticsContainer {
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 260px;

    .key {
      font-weight: 600;
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
    min-width: 280px;
    box-sizing: border-box;
    padding: 0 10px 0 0;
  }
`;

interface Props {
  isOpen: boolean;
  build: Build;
}

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

const BuildStatisticsSidebar = ({ build }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

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
    <Container className={isOpen && "active"}>
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

      <Tooltip id="tooltip" />
      <div className="opener">
        <button onClick={toggleOpen}>
          {isOpen ? <BiSolidRightArrow size="35px" /> : <BiSolidLeftArrow size="35px" />}
        </button>
      </div>
    </Container>
  );
};

export default BuildStatisticsSidebar;
