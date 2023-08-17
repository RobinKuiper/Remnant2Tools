import React, {useContext} from "react";
import {styled} from "styled-components";
import {BuildsContext} from "../../context/BuildContext";
import {AiFillCopy, AiFillDelete} from "react-icons/ai";

const BuildsSidebarContent = ({ setBuild, resetBuild, build }) => {
  const { builds, deleteBuild, copyBuild } = useContext(BuildsContext);

  const selectBuild = (id: number) => {
    localStorage.setItem("activeBuildId", id.toString());
    setBuild(builds[id]);
  };

  return (
    <Container>
      <nav>
        <strong>Saved builds</strong>
        {Object.keys(builds).length > 0 ? (
          Object.values(builds).map(({ name, id }) => (
            <div key={id} className={`nav-item ${id === build.id && "active"}`}>
              <button key={id} onClick={() => selectBuild(id)}>
                {name}
              </button>

              <div>
                <button onClick={() => copyBuild(id)}>
                  <AiFillCopy />
                </button>
                <button onClick={() => deleteBuild(id)}>
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
  );
};

export default BuildsSidebarContent;

const Container = styled.div`
  margin-top: 10px;

  nav {
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;

    strong {
      margin: 7.5px 0 7.5px 10px;
    }

    .nav-item {
      display: flex;
      justify-content: space-between;
      padding: 7.5px 5px 7.5px 10px;
      text-align: left;
      color: white;
      width: 100%;
      box-sizing: border-box;

      &:hover,
      &.active {
        background: #000;
      }
    }
  }

  .no-data {
    margin: 20px 10px;
  }
`;
