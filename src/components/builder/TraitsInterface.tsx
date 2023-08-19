import React, { useEffect, useState } from "react";
import { MAX_TRAIT_POINTS } from "../../constants";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { findImageById, restrainNumber } from "../../helpers";
import { styled } from "styled-components";
import type { Build } from "../../interface/Build";
import { graphql, useStaticQuery } from "gatsby";
import { sorter } from "../../dataHelpers";
import Search from "../Search";
import { useAppSelector } from "../../hooks";
import type { RootState } from "../../store";

interface Props {
  build: Build;
  showOnlyUnlocked: boolean;
  updateBuildValue: (buildPath: string, value: any) => void;
}

const TraitsInterface = ({ build, showOnlyUnlocked, updateBuildValue }: Props) => {
  const data = useStaticQuery(graphql`
    {
      images: allFile(filter: { relativePath: { regex: "/traits/" } }) {
        nodes {
          fields {
            itemId
          }
          ...imageFragment
        }
      }
      traits: allTrait {
        nodes {
          externalId
          name
          fragment
        }
      }
    }
  `);
  const { unlocks } = useAppSelector((state: RootState) => state.data);
  const images = data.images.nodes;
  const [traits, setTraits] = useState([]);
  const [query, setQuery] = useState("");
  const [currentTotalPoints, setCurrentTotalPoints] = useState(0);

  useEffect(() => {
    let traits = data.traits.nodes.sort((a, b) => sorter(a, b));
    if (showOnlyUnlocked) {
      traits = traits.filter(item => unlocks.includes(item.externalId));
    }
    if (query && query !== "") {
      traits = traits.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
    }
    setTraits(traits);
  }, [data.traits, showOnlyUnlocked, unlocks, query]);
  useEffect(() => {
    let total = 0;
    traits.forEach(({ externalId }) => {
      total += build.traitLevels[externalId] ?? 0;
    });
    setCurrentTotalPoints(total);
  }, [build, traits]);

  const addTraitPoint = (trait: any) => {
    if (currentTotalPoints === MAX_TRAIT_POINTS) return;

    const currentPoints = build.traitLevels[trait.externalId] ?? 0;
    if (currentPoints >= 10) return;
    let archetypeLevel = 0;
    if (build.archetype1?.trait === trait.externalId) {
      archetypeLevel = build.archetype1?.level ?? 0;
    } else if (build.archetype2?.trait === trait.externalId) {
      archetypeLevel = build.archetype2?.level ?? 0;
    }
    updateBuildValue(`traitLevels.${trait.externalId}`, restrainNumber(currentPoints, 10 - archetypeLevel));
  };

  const subtractTraitPoint = (trait: any) => {
    const currentPoints = build.traitLevels[trait.externalId] ?? 0;
    if (currentPoints === 0) return;
    updateBuildValue(`traitLevels.${trait.externalId}`, restrainNumber(currentPoints, 0, true));
  };

  const getArchetypeLevel = (trait: any) => {
    let archetypeLevel = 0;
    [1, 2].forEach(index => {
      if (archetypeLevel > 0) return;
      if (build[`archetype${index}`]?.trait === trait.externalId) {
        archetypeLevel = build[`archetype${index}`]?.level ?? 0;
      }
    });
    return archetypeLevel;
  };

  return (
    <Container>
      <div className="traits-interface-top">
        <div className="totals">
          <TraitCircle type="trait" />
          <span>
            {currentTotalPoints}/{MAX_TRAIT_POINTS} Trait points
          </span>
        </div>

        <Search query={query} setQuery={setQuery} placeholder="Search trait" tooltip="Search by name" />
      </div>
      <div className="items">
        {traits.map(trait => (
          <div
            key={trait.fragment}
            className={`trait ${
              build.traitLevels[trait.externalId] ||
              build.archetype1?.trait === trait.externalId ||
              build.archetype2?.trait === trait.externalId
                ? "active"
                : ""
            }`}
            onClick={() => addTraitPoint(trait)}
            onContextMenu={e => {
              e.preventDefault();
              subtractTraitPoint(trait);
            }}
          >
            <div className="image">
              <GatsbyImage alt={trait.name ?? ""} image={getImage(findImageById(trait.externalId, images))} />
            </div>
            <h3>{trait.name}</h3>
            <div className="nodes">
              {Array.from({ length: 10 }, (_, k) => {
                let type;
                const archetypeLevel = getArchetypeLevel(trait);
                const traitPoints = build.traitLevels[trait.externalId] ?? 0;
                if (archetypeLevel > 0 && k < archetypeLevel) {
                  type = "archetype";
                } else if (k >= archetypeLevel && k < traitPoints + archetypeLevel) {
                  type = "trait";
                }

                return <TraitCircle key={`${trait.externalId}_${k}`} type={type} />;
              })}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default TraitsInterface;

const Container = styled.div`
  margin-top: 20px;

  .traits-interface-top {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .totals {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      margin: 20px;
      font-size: 1.2em;
      font-weight: 900;
    }
  }

  .items {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    row-gap: 20px;
    column-gap: 10px;

    .trait {
      display: flex;
      flex-direction: column;
      gap: 10px;
      text-align: center;
      cursor: pointer;
      padding: 10px;
      box-sizing: border-box;
      transition: all 0.3s ease-in-out;

      &.active {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.49);
        z-index: 10;
        background: rgba(241, 241, 241, 0.62);
      }

      &:hover {
        background: #b0b0b0;
      }

      .image {
        width: 150px;
        height: auto;
        overflow: hidden;

        @media (max-width: 1200px) {
          height: 100px;
        }

        img {
          width: 150px;

          @media (max-width: 1200px) {
            transform: translateY(-80px);
          }
        }
      }

      .nodes {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 3px;
      }
    }
  }
`;

const TRAIT_POINT_COLORS = {
  archetype: "#932020",
  trait: "#b6a441",
};
const TraitCircle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid #000;
  background: ${props => TRAIT_POINT_COLORS[props.type] ?? "#fff"};
`;
