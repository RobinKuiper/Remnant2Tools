import "./Redacted.scss";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
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
    <div
      className="redacted-container"
      bgcolor={bgColor}
      text={text}
      onClick={toggleShow}
      data-tooltip-id="tooltip"
      data-tooltip-content={(show && tooltip) || ""}
      style={{
        background: bgColor,
      }}
    >
      <span className={show ? "" : "redacted"}>{children || value}</span>
    </div>
  );
};

export default Redacted;
