import React, { useContext, useEffect, useState } from "react";
import { MAX_TRAIT_POINTS } from "../../constants";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { findImageById, restrainNumber } from "../../helpers";
import { styled } from "styled-components";
import type { Build } from "../../interface/Build";
import { graphql, useStaticQuery } from "gatsby";
import { sorter } from "../../dataHelpers";
import { DataContext } from "../../context/DataContext";
import Search from "../Search";

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

    @media (max-width: 1500px) {
    }

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
        box-shadow: 0 0 10px #670808;
        z-index: 10;
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
  const { unlocks } = useContext(DataContext);
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
      traits = traits.filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
    }
    setTraits(traits);
  }, [data.traits, showOnlyUnlocked, unlocks, query]);
  useEffect(() => {
    let total = 0;
    traits.forEach(({ fragment }) => {
      total += build.traits[fragment] ?? 0;
    });
    setCurrentTotalPoints(total);
  }, [build, traits]);

  const addTraitPoint = (trait: any) => {
    const currentPoints = build.traits[trait.fragment] ?? 0;
    let archetypeLevel = 0;
    if (build.archetype1?.links.trait.fragment === trait.fragment) {
      archetypeLevel = build.archetype1?.level ?? 0;
    } else if (build.archetype2?.links.trait.fragment === trait.fragment) {
      archetypeLevel = build.archetype2?.level ?? 0;
    }
    updateBuildValue(`traits.${trait.fragment}`, restrainNumber(currentPoints, 10 - archetypeLevel));
  };

  const subtractTraitPoint = (trait: any) => {
    const currentPoints = build.traits[trait.fragment] ?? 0;
    updateBuildValue(`traits.${trait.fragment}`, restrainNumber(currentPoints, 0, true));
  };

  const getArchetypeLevel = (trait: any) => {
    let archetypeLevel = 0;
    [1, 2].forEach(index => {
      if (archetypeLevel > 0) return;
      if (build[`archetype${index}`]?.links.trait.fragment === trait.fragment) {
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

        <Search query={query} setQuery={setQuery} placeholder="Search trait" />
      </div>
      <div className="items">
        {traits.map(trait => (
          <div
            key={trait.fragment}
            className={`trait ${
              build.traits[trait.fragment] ||
              build.archetype1?.links.trait.fragment === trait.fragment ||
              build.archetype2?.links.trait.fragment === trait.fragment
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
                const traitPoints = build.traits[trait.fragment] ?? 0;
                if (archetypeLevel > 0 && k < archetypeLevel) {
                  type = "archetype";
                } else if (k >= archetypeLevel && k < traitPoints + archetypeLevel) {
                  type = "trait";
                }

                return <TraitCircle key={`${trait.fragment}_${k}`} type={type} />;
              })}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default TraitsInterface;
