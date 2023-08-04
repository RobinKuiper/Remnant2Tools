import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

const Container = styled.span`
  cursor: pointer;

  span.redacted {
    color: ${props => props.bgColor} !important;
    background: ${props => props.bgColor} !important;
  }
`;

interface Props {
  value: string;
  defaultShow?: boolean;
  bgColor?: string;
}

const Redacted = ({ value, defaultShow = false, bgColor = "#f1f1f1" }: Props) => {
  const [show, setShow] = useState(defaultShow);

  const toggleShow = () => setShow(!show);

  useEffect(() => {
    setShow(defaultShow);
  }, [defaultShow]);

  return (
    <Container bgColor={bgColor} onClick={toggleShow}>
      <span className={show ? "" : "redacted"}>{value}</span>
    </Container>
  );
};

export default Redacted;