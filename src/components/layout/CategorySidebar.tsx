import { Link } from "gatsby";
import React, { useContext } from "react";
import { styled } from "styled-components";
import { DataContext } from "../../context/DataContext";
import { getCategorySettings } from "../../dataHelpers";
import Sidebar from "../Sidebar";

const Container = styled.div`
  nav {
    position: fixed;
    display: flex;
    flex-direction: column;
    
    .sub-links {
      height: auto;
      overflow: hidden;
      transition: all 0.5s ease-in-out;

      @media (max-height: 750px) {
        height: 0;
      }

      &.active {
        height: auto;
      }
    }

    a,
    div {
      span {
        padding: 5px 10px;
      }
      
      &.sub-link {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 7.5px 0 7.5px 10px;
        width: 100%;

        &:hover {
          background: #000;
        }
      }

      &.main-category {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        cursor: pointer;

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
  
  const toggleMainCategory = e => {
    const parent = e.target.parentElement,
      subLinks = parent.querySelector(".sub-links");
    subLinks.classList.toggle("active");
  }

  return (
    <Sidebar>
      <Container>
        <nav>
          {type === "tracker" && (
            <Link to="/tracker" className="main-category">
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
                        <Link className="sub-link" key={categoryFragment} to={`/${type}/${categoryFragment}`}>
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
