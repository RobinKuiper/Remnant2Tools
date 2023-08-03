import React, { useContext } from "react";
import { styled } from "styled-components";
import { BuildsContext } from "../../context/BuildContext";

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
    width: 100%;

    strong {
      margin: 7.5px 0 7.5px 10px;
    }

    button {
      padding: 7.5px 0 7.5px 10px;
      text-align: left;
      color: white;

      &:hover {
        background: #000;
      }
    }
  }
`;

const BuildsSidebar = ({ setBuild, setOldName, setName }) => {
  const { builds } = useContext(BuildsContext);

  const selectBuild = (name: string) => {
    setBuild(builds[name]);
    setName(name);
    setOldName(name);
  };

  return (
    <Container>
      <nav>
        <strong>Saved builds</strong>
        {Object.keys(builds).length > 0 ? (
          Object.keys(builds).map(name => (
            <button key={name} onClick={() => selectBuild(name)}>
              {name}
            </button>
          ))
        ) : (
          <span>No saved builds found.</span>
        )}
      </nav>
    </Container>
  );
};

export default BuildsSidebar;
