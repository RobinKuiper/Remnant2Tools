import React from "react";
import BuildItemBox from "./BuildItemBox";
import { styled } from "styled-components";
import type { Build } from "../../interface/Build";
import type { Filter } from "../../interface/IData";
import ItemLevelNew from "../database/ItemLevelNew";
import { Link } from "gatsby";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 40px;
  width: 400px;
  margin: 20px auto;

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
  return (
    <Container>
      <div className="archetype one">
        <h3>{build.archetype1?.name ?? "Pick archetype"}</h3>
        <BuildItemBox
          openModal={openModal}
          build={build}
          images={images}
          buildPath={"archetype1"}
          filters={[{ category: "archetypes" }]}
        />
        <strong>
          <Link to={`/database/traits/${build.archetype1?.trait.fragment}`} title={build.archetype1?.trait.name}>
            {build.archetype1?.trait.name}
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
        <h3>{build.archetype2?.name ?? "Pick archetype"}</h3>
        <BuildItemBox
          openModal={openModal}
          build={build}
          images={images}
          buildPath={"archetype2"}
          filters={[{ category: "archetypes" }]}
        />
        <strong>
          <Link to={`/database/mods/${build.archetype2?.trait.fragment}`} title={build.archetype2?.trait.name}>
            {build.archetype2?.trait.name}
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
