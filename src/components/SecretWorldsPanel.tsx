import React, { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { DataContext } from "../context/DataContext";
import Redacted from "./Redacted";
import { getAllLockedItems } from "../dataHelpers";

const Container = styled.div`
  .values {
    display: flex;
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
`;

const SecretWorldsPanel = () => {
  const { unlocks } = useContext(DataContext);
  const [worldsWithSecrets, setWorldsWithSecrets] = useState<string[]>([]);

  useEffect(() => {
    const worldsWithLockedItems = getAllLockedItems(unlocks)
      .filter(item => item.world)
      .map(item => item.world)
      .filter((world, index, array) => array.indexOf(world) === index)
      .sort((a, b) => a.localeCompare(b));

    setWorldsWithSecrets(worldsWithLockedItems);
  }, []);

  if (worldsWithSecrets.length <= 0) {
    return "";
  }

  return (
    <Container className="panel">
      <h3>Worlds</h3>
      <p>Below are worlds where you still have secrets to unlock.</p>
      <div className="values">
        {worldsWithSecrets.map(worldName => (
          <Redacted key={worldName} value={worldName} bgColor="#5d5d5d" />
        ))}
      </div>
    </Container>
  );
};

export default SecretWorldsPanel;
