import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Redacted from "../database/Redacted";
import { graphql, useStaticQuery } from "gatsby";
import { useAppSelector } from "../../hooks";
import type { RootState } from "../../store";

const Container = styled.div`
  .values {
    display: flex;
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
`;

const SecretWorldsPanel = () => {
  const { items } = useStaticQuery(graphql`
    query MyQuery {
      items: allItem {
        nodes {
          externalId
          category
          world
        }
      }
    }
  `);
  const { unlocks } = useAppSelector((state: RootState) => state.data);
  const [worldsWithSecrets, setWorldsWithSecrets] = useState<string[]>([]);

  useEffect(() => {
    const worldsWithLockedItems = items.nodes
      .filter(item => !unlocks.includes(item.externalId) && item.world) // Filter locked items with worlds
      .map(item => item.world) // Get only the world
      .filter((world, index, array) => array.indexOf(world) === index) // Filter for uniques
      .sort((a, b) => a.localeCompare(b));

    setWorldsWithSecrets(worldsWithLockedItems);
  }, [unlocks]);

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
