import React from "react";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import { styled } from "styled-components";
import { changeName } from '../../features/data/dataSlice';
import {useAppDispatch} from "../../hooks";

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
  name: string;
  setName: (value: ((prevState: string) => string) | string) => void;
  oldName: string;
  onlyUnlocked: boolean;
  toggleOnlyUnlocked: () => void;
}

const Settings = ({ name, oldName, toggleOnlyUnlocked, onlyUnlocked, setName }: Props) => {
  const dispatch = useAppDispatch();

  const handleNameSave = () => {
    dispatch(changeName({ oldName, newName: name }));
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
