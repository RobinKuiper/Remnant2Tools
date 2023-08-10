import { Link } from "gatsby";
import React, { useContext } from "react";
import { styled } from "styled-components";
import { DataContext } from "../../context/DataContext";
import { getCategorySettings } from "../../dataHelpers";
import Sidebar from "../layout/Sidebar";

const Container = styled.div`
  nav {
    position: fixed;
    display: flex;
    flex-direction: column;
    width: 225px;
    box-sizing: border-box;

    .sub-links {
      height: auto;
      overflow: hidden;
      transition: all 0.5s ease-in-out;
      width: 100%;
      box-sizing: border-box;

      @media (max-height: 750px) {
        height: 0;
      }

      &.active {
        height: auto;
      }
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

        &:hover:after, &.active:after {
          width: 100%;
        }

        &:hover, &.active {
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
    categories: ["weapons", "mods", "mutators", "armor", "amulets", "rings", "relics", "relicfragments"],
  },
  {
    label: "Events",
    categories: ["worldbosses"],
  },
];

const CategorySidebar = ({ type }: Props) => {
  const { statistics } = useContext(DataContext);
  const url = typeof window !== 'undefined' ? window.location.href : '';

  const toggleMainCategory = e => {
    const parent = e.target.parentElement,
      subLinks = parent.querySelector(".sub-links");
    subLinks.classList.toggle("active");
  };

  return (
    <Sidebar>
      <Container>
        <nav>
          {type === "tracker" && (
            <Link to="/tracker/statistics" className={url.includes("statistics") ? "active main-category" : "main-category"}>
              <span>Statistics</span>
            </Link>
          )}
          {CATEGORY_ORDER.map(mainCategory => {
            return (
              <div key={mainCategory.label} className="main-category">
                <span onClick={toggleMainCategory}>{mainCategory.label}</span>
                <div className="sub-links">
                  {mainCategory.categories
                    .filter(categoryFragment => getCategorySettings(categoryFragment)[type])
                    .map(categoryFragment => {
                      const categorySettings = getCategorySettings(categoryFragment);

                      return (
                        <Link className={url.includes(categoryFragment) ? "active sub-link" : "sub-link"} key={categoryFragment} to={`/${type}/${categoryFragment}`}>
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
    </Sidebar>
  );
};

export default CategorySidebar;