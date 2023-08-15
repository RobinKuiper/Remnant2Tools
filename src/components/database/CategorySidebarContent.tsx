import { Link, graphql, useStaticQuery } from "gatsby";
import React, { useContext } from "react";
import { styled } from "styled-components";
import { DataContext } from "../../context/DataContext";

const Container = styled.div`
  margin-top: 10px;

  nav {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-right: 10px;
    box-sizing: border-box;

    .sub-links {
      height: auto;
      overflow: hidden;
      transition: all 0.5s ease-in-out;
      width: 100%;
      box-sizing: border-box;
    }

    a,
    div {
      width: 100%;
      box-sizing: border-box;

      span {
        padding: 5px 10px;
        box-sizing: border-box;
      }

      &.sub-link {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 7.5px 0 7.5px 10px;
        width: 100%;
        box-sizing: border-box;

        transition: all 0.3s ease-in-out;

        &:after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: rgba(159, 19, 19, 0.66);

          transition: all 0.5s ease-in-out;
        }

        &:hover:after,
        &.active:after {
          width: 100%;
        }

        &:hover,
        &.active {
          background: #181818;
        }
      }

      &.main-category {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        cursor: pointer;
        box-sizing: border-box;

        a:first-child {
          margin-top: 5px;
        }

        &:hover {
          background: inherit;
        }
      }
    }
  }
`;

interface Props {
  type: string;
}

const CATEGORY_ORDER = [
  {
    label: "Character",
    categories: ["archetypes", "traits"],
  },
  {
    label: "Items",
    categories: ["weapons", "mods", "mutators", "armor", "armorset", "amulets", "rings", "relics", "relicfragments"],
  },
  {
    label: "Events",
    categories: ["worldbosses", "bosses"],
  },
];

const CategorySidebarContent = ({ type }: Props) => {
  const { categories } = useStaticQuery(graphql`
    {
      categories: allCategory {
        nodes {
          settings {
            fragment
            showIn
            label
          }
        }
      }
    }
  `);
  const { statistics } = useContext(DataContext);
  const url = typeof window !== "undefined" ? window.location.href : "";

  return (
    <Container>
      <nav>
        {type === "tracker" && (
          <Link
            to="/tracker/statistics"
            className={url.includes("statistics") ? "active main-category" : "main-category"}
          >
            <span>Statistics</span>
          </Link>
        )}
        {CATEGORY_ORDER.map(mainCategory => {
          return (
            <div key={mainCategory.label} className="main-category">
              <span>{mainCategory.label}</span>
              <div className="sub-links">
                {mainCategory.categories
                  .filter(categoryFragment =>
                    categories.nodes
                      .find(cat => cat.settings.fragment === categoryFragment)
                      .settings.showIn.includes(type),
                  )
                  .map(categoryFragment => {
                    const categorySettings = categories.nodes.find(
                      cat => cat.settings.fragment === categoryFragment,
                    ).settings;

                    return (
                      <Link
                        className={url.includes(`/${categoryFragment}/`) ? "active sub-link" : "sub-link"}
                        key={categoryFragment}
                        to={`/${type}/${categoryFragment}`}
                      >
                        <span>{categorySettings.label}</span>
                        {type === "tracker" && statistics[categoryFragment] && (
                          <span>
                            {parseInt(
                              (
                                (statistics[categoryFragment].unlocked / statistics[categoryFragment].total) *
                                100
                              ).toString(),
                            )}
                            %
                          </span>
                        )}
                      </Link>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </nav>
    </Container>
  );
};

export default CategorySidebarContent;
