import React, { useEffect, useState } from "react";
import BuildItemBox from "./BuildItemBox";
import { styled } from "styled-components";
import type { Build } from "../../interface/Build";
import type { Filter } from "../../interface/IData";
import ItemLevelNew from "../database/ItemLevelNew";
import { Link, graphql, useStaticQuery } from "gatsby";
import { getFieldValue } from "../../dataHelpers";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 40px;
  width: 400px;
  margin: 20px auto;

  @media (max-width: 450px) {
    width: 300px;
  }

  .archetype {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;

    .item-box {
      width: 128px;
      height: 128px;
    }
  }
`;

interface Props {
  build: Build;
  openModal: (filters: Filter[], buildPath: string) => void;
  images: any[];
  handleLevelChange: (level: number, buildPath: string) => void;
}

const ArchetypesInterface = ({ build, openModal, images, handleLevelChange }: Props) => {
  const { items } = useStaticQuery(graphql`
    {
      items: allItem(filter: { category: { in: ["traits", "archetypes"] } }) {
        nodes {
          externalId
          name
          fragment
        }
      }
    }
  `);
  const [archetype1, setArchetyp1] = useState();
  const [archetype2, setArchetyp2] = useState();
  const [trait1, setTrait1] = useState();
  const [trait2, setTrait2] = useState();

  useEffect(() => {
    [1, 2].forEach(index => {
      const externalId = getFieldValue(build, `archetype${index}.externalId`);
      if (externalId) {
        const archetype = items.nodes.find(item => item.externalId === externalId);
        if (index === 1) setArchetyp1(archetype);
        else if (index === 2) setArchetyp2(archetype);
      }

      const traitEId = getFieldValue(build, `archetype${index}.trait`);
      if (traitEId) {
        const trait = items.nodes.find(item => item.externalId === traitEId);
        if (index === 1) setTrait1(trait);
        else if (index === 2) setTrait2(trait);
      }
    });
  }, [build]);

  return (
    <Container>
      <div className="archetype one">
        <h3>{archetype1?.name ?? "Pick archetype"}</h3>
        <BuildItemBox
          openModal={openModal}
          build={build}
          images={images}
          buildPath={"archetype1.externalId"}
          filters={[{ category: "archetypes" }]}
        />
        <strong>
          <Link to={`/database/traits/${trait1?.fragment}`} title={trait1?.name}>
            {trait1?.name}
          </Link>
        </strong>
        <ItemLevelNew
          level={build.archetype1?.level}
          callback={(level: number) => handleLevelChange(level, "archetype1.level")}
          maxLevel={10}
          disabled={!build.archetype1}
        />
      </div>

      <div className="archetype two">
        <h3>{archetype2?.name ?? "Pick archetype"}</h3>
        <BuildItemBox
          openModal={openModal}
          build={build}
          images={images}
          buildPath={"archetype2.externalId"}
          filters={[{ category: "archetypes" }]}
        />
        <strong>
          <Link to={`/database/traits/${trait2?.fragment}`} title={trait2?.name}>
            {trait2?.name}
          </Link>
        </strong>
        <ItemLevelNew
          level={build.archetype2?.level}
          callback={(level: number) => handleLevelChange(level, "archetype2.level")}
          maxLevel={10}
          disabled={!build.archetype2}
        />
      </div>
    </Container>
  );
};

export default ArchetypesInterface;
