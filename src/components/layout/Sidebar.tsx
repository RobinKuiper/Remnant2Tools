import React, {useState} from "react";
import {styled} from "styled-components";
import {BiSolidLeftArrow, BiSolidRightArrow} from "react-icons/bi";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: ${({ position }) => (position === "left" ? "0" : "auto")};
  right: ${({ position }) => (position === "right" ? "0" : "auto")};
  background: #292929;
  color: #fff;
  height: 100vh;
  padding: 74px 0 45px 0;
  box-sizing: border-box;
  width: 235px;
  z-index: 50;

  .content {
    overflow: auto;
    height: 100%;
    box-sizing: border-box;
    padding-bottom: 20px;
  }

  .opener {
    display: ${({ alwaysshowopener }) => (alwaysshowopener ? "block" : "none")};
    position: fixed;
    top: 80px;
    left: ${({ position }) => (position === "left" ? "235px" : "auto")};
    right: ${({ position }) => (position === "right" ? "235px" : "auto")};
    color: #ffffff;
    background: #292929;
    padding: 5px;

    animation: scale 1.2s ease-in-out;
    transition: all 0.3s ease-in-out;

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
  }

  @media (max-width: 1200px) {
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.8);
    transform: ${({ isopen, position }) =>
      !isopen ? `translateX(${position === "left" ? "-235px" : "235px"})` : "translateX(0px)"};
    transition: all 0.3s ease-out;

    .opener {
      display: block;
    }
  }
`;

interface Props {
  children: React.ReactNode;
  position: "right" | "left";
  useSidebarOpener?: boolean;
  alwaysShowOpener?: boolean;
}

const Sidebar = ({ children, position, useSidebarOpener = true, alwaysShowOpener = false }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const openIcon = position === "left" ? <BiSolidRightArrow size="35px" /> : <BiSolidLeftArrow size="35px" />;
  const closeIcon = position === "left" ? <BiSolidLeftArrow size="35px" /> : <BiSolidRightArrow size="35px" />;

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <Container isopen={isOpen} position={position} alwaysshowopener={alwaysShowOpener}>
      <div className="content">{children}</div>

      {useSidebarOpener && (
        <div className="opener">
          <button onClick={toggleOpen}>{isOpen ? closeIcon : openIcon}</button>
        </div>
      )}
    </Container>
  );
};

export default Sidebar;
