import "./TraitsInterface.scss";
import React, { useEffect, useState } from "react";
import { MAX_TRAIT_POINTS } from "../../constants";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { findImageById, restrainNumber } from "../../helpers";
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
    <div className="traits-interface-container">
      <div className="traits-interface-top">
        <div className="totals">
          <div className="trait-circle trait-point" />
          <span>
            {currentTotalPoints}/{MAX_TRAIT_POINTS} Trait points
          </span>
        </div>

        <div className="search">
          <Search query={query} setQuery={setQuery} placeholder="Search trait" tooltip="Search by name" />
        </div>
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
                  type = "archetype-point";
                } else if (k >= archetypeLevel && k < traitPoints + archetypeLevel) {
                  type = "trait-point";
                }

                return <div className={`trait-circle ${type}`} key={`${trait.externalId}_${k}`} />;
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TraitsInterface;
