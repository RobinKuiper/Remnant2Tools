import "./BuildsSidebarContent.scss";
import React from "react";
import { AiFillCopy, AiFillDelete } from "react-icons/ai";
import type { Build } from "../../interface/Build";

interface Props {
  builds: {
    [key: number]: Build;
  };
  setBuild: (value: ((prevState: Build) => Build) | Build) => void;
  resetBuild: () => void;
  build: Build;
  copyBuild: (build: Build) => void;
  deleteBuild: (build: Build) => void;
}

const BuildsSidebarContent = ({ builds, setBuild, resetBuild, build, copyBuild, deleteBuild }: Props) => {
  const selectBuild = (id: number) => {
    localStorage.setItem("activeBuildId", id.toString());
    setBuild(builds[id]);
  };

  return (
    <div className="builds-sidebar-content-container">
      <nav>
        <strong>Saved builds</strong>
        {builds && Object.keys(builds).length > 0 ? (
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

        <button className="nav-item new-build-button" onClick={resetBuild}>
          New Build
        </button>
      </nav>
    </div>
  );
};

export default BuildsSidebarContent;
