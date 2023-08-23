import "./Sidebar.scss";
import React, { useState } from "react";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";

interface Props {
  children: React.ReactNode;
  position: "right" | "left";
  useSidebarOpener?: boolean;
}

const Sidebar = ({ children, position, useSidebarOpener = true }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const openIcon = position === "left" ? <BiSolidRightArrow size="35px" /> : <BiSolidLeftArrow size="35px" />;
  const closeIcon = position === "left" ? <BiSolidLeftArrow size="35px" /> : <BiSolidRightArrow size="35px" />;

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className={`sidebar-container ${position} ${isOpen && "open"}`}>
      <div className="content">{children}</div>

      {useSidebarOpener && (
        <div className="opener">
          <button onClick={toggleOpen}>{isOpen ? closeIcon : openIcon}</button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
