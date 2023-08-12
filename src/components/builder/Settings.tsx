import React, { useContext } from "react";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import { Tooltip } from "react-tooltip";
import { styled } from "styled-components";
import { BuildsContext } from "../../context/BuildContext";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 400px;
  margin: 20px auto;

  input {
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
  }
`;

interface Props {
  name: string;
  setName: (value: ((prevState: string) => string) | string) => void;
  oldName: string;
  onlyUnlocked: boolean;
  toggleOnlyUnlocked: () => void;
}

const Settings = ({ name, oldName, toggleOnlyUnlocked, onlyUnlocked, setName }: Props) => {
  const { changeName } = useContext(BuildsContext);

  const handleNameSave = () => {
    changeName(oldName, name);
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
          data-tooltip-id="unlocked"
          data-tooltip-content={onlyUnlocked ? "Showing only unlocked items" : "Showing all items"}
          data-tooltip-place="bottom"
        >
          {onlyUnlocked ? <AiFillUnlock size={"30px"} /> : <AiFillLock size={"30px"} />}
        </button>
        <Tooltip id="unlocked" />
      </div>
    </Container>
  );
};

export default Settings;
