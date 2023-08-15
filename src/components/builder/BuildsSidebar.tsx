import React, { useContext } from "react";
import { styled } from "styled-components";
import { BuildsContext } from "../../context/BuildContext";
import { AiFillCopy, AiFillDelete } from "react-icons/ai";
import Sidebar from "../layout/Sidebar";

const Container = styled.div`
  nav {
    position: fixed;
    display: flex;
    flex-direction: column;
    width: 100%;

    strong {
      margin: 7.5px 0 7.5px 10px;
    }

    .nav-item {
      display: flex;
      justify-content: space-between;
      padding: 7.5px 0 7.5px 10px;
      text-align: left;
      color: white;
      width: 180px;

      &:hover, &.active {
        background: #000;
      }
    }
  }

  .no-data {
    margin: 20px 10px;
  }
`;

const BuildsSidebar = ({ setBuild, setOldName, setName, resetBuild, currentBuildName }) => {
  const { builds, deleteBuild, copyBuild } = useContext(BuildsContext);

  const selectBuild = (name: string) => {
    setBuild(builds[name]);
    setName(name);
    setOldName(name);
  };

  return (
    <Sidebar>
      <Container>
        <nav>
          <strong>Saved builds</strong>
          {Object.keys(builds).length > 0 ? (
            Object.keys(builds).map(name => (
              <div key={name} className={`nav-item ${name === currentBuildName && "active"}`}>
                <button key={name} onClick={() => selectBuild(name)}>
                  {name}
                </button>

                <div>
                  <button onClick={() => copyBuild(name)}>
                    <AiFillCopy />
                  </button>
                  <button onClick={() => deleteBuild(name)}>
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-data">No saved builds found.</div>
          )}

          <button className="nav-item" onClick={resetBuild}>
            New Build
          </button>
        </nav>
      </Container>
    </Sidebar>
  );
};

export default BuildsSidebar;
