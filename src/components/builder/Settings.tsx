import React, { useState } from "react";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import { styled } from "styled-components";
import { saveBuild } from "../../features/data/dataSlice";
import { useAppDispatch } from "../../hooks";
import type { Build } from "../../interface/Build";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 400px;
  margin: 20px auto;

  @media (max-width: 450px) {
    width: 300px;
  }

  input {
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    background: transparent;
    border: none;
    border-bottom: 1px solid #000;

    &:focus {
      outline: none;
    }
  }
`;

interface Props {
  build: Build;
  setBuild: (value: ((prevState: Build) => Build) | Build) => void;
  onlyUnlocked: boolean;
  toggleOnlyUnlocked: () => void;
}

const Settings = ({ build, setBuild, toggleOnlyUnlocked, onlyUnlocked }: Props) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState(build.name);

  const handleNameSave = () => {
    const newBuild = { ...build };
    if (name && name !== "") {
      newBuild.name = name;
    }

    setBuild(newBuild);
    dispatch(saveBuild(newBuild));
  };

  const handleNameChange = e => {
    setName(e.target.value);
  };

  return (
    <Container>
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
    </Container>
  );
};

export default Settings;
