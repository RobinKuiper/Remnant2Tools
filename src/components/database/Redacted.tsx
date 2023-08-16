import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import {useAppSelector} from "../../hooks";
import {RootState} from "../../store";

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
  const { showRedacted } = useAppSelector((state: RootState) => state.settings)
  const [show, setShow] = useState(showRedacted);

  const toggleShow = () => setShow(!show);

  useEffect(() => {
    setShow(defaultShow || showRedacted);
  }, [defaultShow, showRedacted]);

  return (
    <Container
      bgcolor={bgColor}
      onClick={toggleShow}
      data-tooltip-id="tooltip"
      data-tooltip-content={(show && tooltip) || ""}
    >
      <span className={show ? "" : "redacted"}>{value}</span>
    </Container>
  );
};

export default Redacted;
