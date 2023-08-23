import "./CategorySidebarContent.scss";
import { Link, graphql, useStaticQuery } from "gatsby";
import React from "react";
import { useAppSelector } from "../../hooks";
import type { RootState } from "../../store";

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
  const { statistics } = useAppSelector((state: RootState) => state.data);
  const url = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="category-sidebar-content-container">
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
    </div>
  );
};

export default CategorySidebarContent;
