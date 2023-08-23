import "./Redacted.scss";
import type { ReactNode } from "react";
import React, { useEffect, useState } from "react";
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

const Redacted = ({ value, children, defaultShow = false, bgColor = "d5", tooltip, text = "Reveal" }: Props) => {
  const { showRedacted } = useAppSelector((state: RootState) => state.settings);
  const [show, setShow] = useState(showRedacted);

  const toggleShow = () => setShow(!show);

  useEffect(() => {
    setShow(defaultShow || showRedacted);
  }, [defaultShow, showRedacted]);

  return (
    <div
      className="redacted-container"
      onClick={toggleShow}
      data-tooltip-id="tooltip"
      data-tooltip-content={(show && tooltip) || ""}
    >
      <span className={`${bgColor} ${show ? "" : "redacted"}`} data-content={text}>
        {children || value}
      </span>
    </div>
  );
};

export default Redacted;
