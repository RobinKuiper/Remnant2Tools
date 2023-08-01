import { Link } from "gatsby";
import React, { useContext } from "react";
import { styled } from "styled-components";
import { CATEGORIES } from "../../constants";
import { DataContext } from "../../context/DataContext";

const Container = styled.div`
  background: #292929;
  color: #fff;
  min-height: 100vh;
  padding: 20px 0;
  box-sizing: border-box;
  width: 10%;
  min-width: 200px;

  nav {
    position: fixed;
    display: flex;
    flex-direction: column;

    a {
      span {
        padding: 5px 10px;
      }

      &.sub-category {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 7.5px 0 7.5px 10px;
        width: 100%;
      }

      &.main-category {
        display: flex;
        flex-direction: column;

        a:first-child {
          margin-top: 5px;
        }

        &:hover {
          background: inherit;
        }
      }

      &:hover {
        background: #000;
      }
    }
  }
`;

const builds = [];

const BuildsSidebar = () => {
  return (
    <Container>
      <nav>{builds.length > 0 ? builds.map(build => <span>{build}</span>) : <span>No saved builds found.</span>}</nav>
    </Container>
  );
};

export default BuildsSidebar;
