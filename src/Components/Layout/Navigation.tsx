import { motion } from "framer-motion";
import React, { useContext } from "react";
import styled from "styled-components";
import { categories } from "../../config/constants";
import { DataContext } from "../../contexts/DataContext";

const Navigation = styled.div`
  position: relative;
  min-height: 100vh;
  min-width: 200px;
  box-sizing: border-box;
  border-right: 1px solid #000;
  background: #eeeded;
  color: #000;
  //background: #fff;
  //border: 1px solid red;

  transition: all 0.5s linear;

  nav {
    position: fixed;
    display: flex;
    flex-direction: column;
    min-width: 200px;

    a {
      padding: 15px 10px;
      border-bottom: 1px solid #000;
    }
  }
`;

const NavigationComponent = () => {
  const { setCategory } = useContext(DataContext);

  return (
    <Navigation className={"navigation"}>
      <nav>
        <motion.a
          initial={{
            transform: "translateX(-200px)",
          }}
          whileInView={{
            transform: "translateX(0px)",
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.2,
            delay: 0.1,
          }}
          href="/statistics"
        >
          Statistics
        </motion.a>
        {categories.map((category, index) => (
          <motion.a
            initial={{
              transform: "translateX(-200px)",
            }}
            whileInView={{
              transform: "translateX(0px)",
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.2,
              delay: 0.1 * index + 1,
            }}
            href="/"
            key={category.label}
            onClick={() => {
              setCategory(category.label.toLowerCase());
            }}
          >
            {category.label}
          </motion.a>
        ))}
      </nav>
    </Navigation>
  );
};

export default NavigationComponent;
