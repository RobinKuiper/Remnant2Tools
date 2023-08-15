import React, { useState } from "react";
import { styled } from "styled-components";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";

const Container = styled.div`
  position: fixed;
  background: #292929;
  color: #fff;
  height: 100vh;
  padding: 20px 0;
  box-sizing: border-box;
  width: 235px;

  .content {
    overflow: auto;
    height: 78%;
  }

  .opener {
    display: none;
    position: fixed;
    top: 80px;
    left: 235px;
    color: #ffffff;
    background: #292929;
    padding: 5px;
    opacity: 0.8;

    animation: scale 1.2s ease-in-out;
    transition: all 0.3s ease-in-out;

    &:hover {
      opacity: 1;
    }

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
    position: fixed;
    z-index: 66;
    height: 100%;
    top: 74px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.8);
    transform: translateX(-235px);
    transition: all 0.3s ease-out;

    &.active {
      transform: translateX(0px);
    }

    .opener {
      display: block;
    }
  }
`;

interface Props {
  children: React.ReactNode;
}

const Sidebar = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <Container className={isOpen ? "active" : ""}>
      <div className="content">{children}</div>

      <div className="opener">
        <button onClick={toggleOpen}>
          {!isOpen ? <BiSolidRightArrow size="35px" /> : <BiSolidLeftArrow size="35px" />}
        </button>
      </div>
    </Container>
  );
};

export default Sidebar;
