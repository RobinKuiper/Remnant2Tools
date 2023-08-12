import React, { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { SettingContext } from "../../context/SettingContext";
import { Tooltip } from "react-tooltip";

const Container = styled.span`
  cursor: pointer;

  span {
    &.redacted {
      color: ${props => props.bgcolor} !important;
      background: ${props => props.bgcolor} !important;
    }
  }
`;

interface Props {
  value: string;
  tooltip?: string;
  defaultShow?: boolean;
  bgColor?: string;
}

const Redacted = ({ value, defaultShow = false, bgColor = "#f1f1f1", tooltip }: Props) => {
  const { defaultShowRedacted } = useContext(SettingContext);
  const [show, setShow] = useState(defaultShow);

  const toggleShow = () => setShow(!show);

  useEffect(() => {
    setShow(defaultShow || defaultShowRedacted);
  }, [defaultShow, defaultShowRedacted]);

  return (
    <Container
      bgcolor={bgColor}
      onClick={toggleShow}
      data-tooltip-id="redacted-tooltip"
      data-tooltip-content={(show && tooltip) || ""}
    >
      <span className={show ? "" : "redacted"}>{value}</span>
      <Tooltip id="redacted-tooltip" />
    </Container>
  );
};

export default Redacted;
