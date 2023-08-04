import React, { useContext } from "react";
import { styled } from "styled-components";
import { BuildsContext } from "../../context/BuildContext";
import { AiFillCopy, AiFillDelete } from "react-icons/ai";

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

    .nav-item {
      display: flex;
      justify-content: space-between;
      padding: 7.5px 0 7.5px 10px;
      text-align: left;
      color: white;
      width: 180px;

      &:hover {
        background: #000;
      }
    }
  }
`;

const BuildsSidebar = ({ setBuild, setOldName, setName, resetBuild }) => {
  const { builds, deleteBuild, copyBuild } = useContext(BuildsContext);

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
            <div key={name} className="nav-item">
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
          <span>No saved builds found.</span>
        )}

        <button className="nav-item" onClick={resetBuild}>
          New Build
        </button>
      </nav>
    </Container>
  );
};

export default BuildsSidebar;
