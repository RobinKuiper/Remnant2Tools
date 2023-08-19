import React from "react";
import { styled } from "styled-components";
import { camelCaseToText } from "../../helpers";

interface Props {
  valueKey: string;
  value: string | object;
}

const ItemStat = ({ valueKey: key, value }: Props) => {
  if (typeof value !== "object") {
    return (
      <Container>
        <span className="key">{camelCaseToText(key)}</span>
        <span className="value">{value}</span>
      </Container>
    );
  }

  return (
    <Container>
      <span className="key">
        <div className="main-key">{camelCaseToText(key)}</div>

        <div className="sub keys">
          {Object.keys(value).map(key => (
            <div key={key} className="key">
              {camelCaseToText(key)}
            </div>
          ))}
        </div>
      </span>

      <span className="value">
        <div className="main-value">&nbsp;</div>

        <div className="sub values">
          {Object.values(value).map(value => (
            <div key={value} className="key">
              {value}
            </div>
          ))}
        </div>
      </span>
    </Container>
  );
};

export default ItemStat;

const Container = styled.div`
  display: flex;
  gap: 30px;
  justify-content: space-between;

  .key {
    font-weight: 900;

    .sub {
      padding-left: 10px;
    }
  }

  .sub {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 5px;
  }
`;
