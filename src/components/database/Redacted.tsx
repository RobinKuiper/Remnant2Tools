import type { ReactNode} from "react";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useAppSelector } from "../../hooks";
import type { RootState } from "../../store";

interface Props {
  value?: string;
  tooltip?: string;
  defaultShow?: boolean;
  bgColor?: string;
  children?: ReactNode;
  text?: string;
}

const Redacted = ({ value, children, defaultShow = false, bgColor = "#f1f1f1", tooltip, text = "Reveal" }: Props) => {
  const { showRedacted } = useAppSelector((state: RootState) => state.settings);
  const [show, setShow] = useState(showRedacted);

  const toggleShow = () => setShow(!show);

  useEffect(() => {
    setShow(defaultShow || showRedacted);
  }, [defaultShow, showRedacted]);

  return (
    <Container
      bgcolor={bgColor}
      text={text}
      onClick={toggleShow}
      data-tooltip-id="tooltip"
      data-tooltip-content={(show && tooltip) || ""}
    >
      <span className={show ? "" : "redacted"}>{children || value}</span>
    </Container>
  );
};

export default Redacted;

const Container = styled.span`
  cursor: pointer;
  position: relative;

  span {
    &.redacted:after {
      content: "${props => props.text}";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: ${props => props.bgcolor};
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 1;
      font-size: 0.75em;
      transition: all 0.3s ease-in-out;
    }
  }
`;
