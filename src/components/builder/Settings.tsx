import "./BuildSettings.scss";
import React, { useEffect, useState } from "react";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import type { Build } from "../../interface/Build";
import type { DraftFunction } from "use-immer";

interface Props {
  build: Build;
  setBuild: (arg: DraftFunction<Build> | Build) => void;
  onlyUnlocked: boolean;
  toggleOnlyUnlocked: () => void;
}

const Settings = ({ build, setBuild, toggleOnlyUnlocked, onlyUnlocked }: Props) => {
  const [name, setName] = useState(build.name);

  useEffect(() => {
    setName(build.name);
  }, [build]);

  const handleNameSave = () => {
    if (name && name !== "") {
      setBuild(build => {
        build.name = name;
      });
    }
  };

  const handleNameChange = e => {
    setName(e.target.value);
  };

  return (
    <div className="build-settings-container">
      <input type="text" placeholder="Name" value={name} onChange={handleNameChange} onBlur={handleNameSave} />
      <div>
        <button
          onClick={toggleOnlyUnlocked}
          data-tooltip-id="tooltip"
          data-tooltip-content={onlyUnlocked ? "Showing only unlocked items" : "Showing all items"}
          data-tooltip-place="bottom"
        >
          {onlyUnlocked ? <AiFillUnlock size={"30px"} /> : <AiFillLock size={"30px"} />}
        </button>
      </div>
    </div>
  );
};

export default Settings;
