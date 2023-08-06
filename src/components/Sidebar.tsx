import React, { useState } from "react";
import { styled } from "styled-components";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";

const Container = styled.div`
  background: #292929;
  color: #fff;
  min-height: 100vh;
  padding: 20px 0;
  box-sizing: border-box;
  width: 10%;
  min-width: 214px;

  .opener {
    display: none;
    position: fixed;
    top: 80px;
    left: 214px;
    color: #fff;
    background: #292929;
    padding: 5px;
    opacity: 0.5;
  }

  @media (max-width: 1200px) {
    position: fixed;
    z-index: 15;
    height: 100%;
    top: 74px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.8);
    transform: translateX(-214px);
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
      <div>{children}</div>

      <div className="opener">
        <button onClick={toggleOpen}>
          {!isOpen ? <BiSolidRightArrow size="35px" /> : <BiSolidLeftArrow size="35px" />}
        </button>
      </div>
    </Container>
  );
};

export default Sidebar;
