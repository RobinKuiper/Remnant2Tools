import React, { useEffect, useState } from "react";
import { MAX_TRAIT_POINTS } from "../../constants";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { findImageById, restrainNumber } from "../../helpers";
import { styled } from "styled-components";
import type { Build } from "../../interface/Build";
import { graphql, useStaticQuery } from "gatsby";
import { isUnlocked, sorter } from "../../dataHelpers";

const Container = styled.div`
  margin-top: 20px;

  .totals {
    text-align: center;
    font-size: 1.2em;
    font-weight: 900;
    margin-bottom: 20px;
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

        .node {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 1px solid #000;
          background: #fff;

          &.active {
            &.archetype-point {
              background: #932020;
            }

            &.trait-point {
              background: #b6a441;
            }
          }
        }
      }
    }
  }
`;

interface Props {
  build: Build;
  images: any[];
  showOnlyUnlocked: boolean;
  updateBuildValue: (buildPath: string, value: any) => void;
}

const TraitsInterface = ({ build, images, showOnlyUnlocked, updateBuildValue }: Props) => {
  const data = useStaticQuery(graphql`
    {
      images: allFile(filter: { relativePath: { regex: "/traits/" } }) {
        totalCount
        nodes {
          fields {
            itemId
          }
          childImageSharp {
            gatsbyImageData(quality: 80, layout: CONSTRAINED)
          }
        }
      }
      items: allItem(filter: { category: { eq: "traits" } }) {
        nodes {
          id
          externalId
          name
          fragment
          category
          type
          trait
          stats {
            armor
          }
        }
      }
    }
  `);
  const [traits, setTraits] = useState([]);
  const [currentTotalPoints, setCurrentTotalPoints] = useState(0);

  useEffect(() => {
    let items = data.items.nodes
      .map(item => {
        if (item.archetype) {
          item.archetype = data.find(i => i.category === "archetypes" && i.name === item.archetype) ?? item.archetype;
        }
        return item;
      })
      .sort((a, b) => sorter(a, b));
    if (showOnlyUnlocked) {
      items = items.filter(item => isUnlocked(item.category, item.externalId));
    }
    setTraits(items);
  }, [data, showOnlyUnlocked]);
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
    if (build.archetype1?.trait.fragment === trait.fragment) {
      archetypeLevel = build.archetype1?.level ?? 0;
    } else if (build.archetype2?.trait.fragment === trait.fragment) {
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
      if (build[`archetype${index}`]?.trait.fragment === trait.fragment) {
        archetypeLevel = build[`archetype${index}`]?.level ?? 0;
      }
    });
    return archetypeLevel;
  };

  return (
    <Container>
      <div className="totals">
        {currentTotalPoints}/{MAX_TRAIT_POINTS} Trait points
      </div>
      <div className="items">
        {traits.map(trait => (
          <div
            key={trait.fragment}
            className={`trait ${
              build.traits[trait.fragment] ||
              build.archetype1?.trait.fragment === trait.fragment ||
              build.archetype2?.trait.fragment === trait.fragment
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
                let classes = "node ";
                const archetypeLevel = getArchetypeLevel(trait);
                if (archetypeLevel > 0) {
                  classes += k < archetypeLevel ? "active archetype-point" : "";
                }
                const traitPoints = build.traits[trait.fragment] ?? 0;
                classes += k >= archetypeLevel && k < traitPoints + archetypeLevel ? "active trait-point" : "";

                return <div key={`${trait.fragment}_${k}`} className={classes} />;
              })}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default TraitsInterface;
