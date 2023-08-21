import "./SecretWorldsPanel.scss";
import React, { useEffect, useState } from "react";
import Redacted from "../database/Redacted";
import { graphql, useStaticQuery } from "gatsby";
import { useAppSelector } from "../../hooks";
import type { RootState } from "../../store";
import { slugify } from "../../helpers";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const SecretWorldsPanel = () => {
  const { items, images } = useStaticQuery(graphql`
    query MyQuery {
      items: allItem {
        nodes {
          externalId
          category
          world
        }
      }
      images: allFile(filter: { relativePath: { regex: "/worlds/" } }) {
        nodes {
          name
          ...imageFragment
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
    <div className="secret-worlds-panel-container panel">
      <h3>Worlds</h3>
      <p>Below are worlds where you still have secrets to unlock.</p>
      <div className="values">
        {worldsWithSecrets.map(worldName => {
          const gatsbyImage = getImage(images.nodes.find(image => image.name === slugify(worldName)));

          return (
            <div className="world" key={worldName}>
              <Redacted bgColor="#5d5d5d">
                <picture>{gatsbyImage && <GatsbyImage alt={worldName} image={gatsbyImage} />}</picture>
              </Redacted>
              <Redacted value={worldName} bgColor="#5d5d5d" text="" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SecretWorldsPanel;
