import { Link } from "gatsby";
import React, { useContext } from "react";
import { styled } from "styled-components";
import { CATEGORIES } from "../../constants";
import { DataContext } from "../../context/DataContext";

const Container = styled.div`
  background: #292929;
  color: #fff;
  min-height: 100vh;
  padding: 20px 0;
  box-sizing: border-box;
  width: 10%;
  min-width: 214px;

  nav {
    position: fixed;
    display: flex;
    flex-direction: column;

    a {
      span {
        padding: 5px 10px;
      }

      &.sub-category {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 7.5px 0 7.5px 10px;
        width: 100%;
      }

      &.main-category {
        display: flex;
        flex-direction: column;

        a:first-child {
          margin-top: 5px;
        }

        &:hover {
          background: inherit;
        }
      }

      &:hover {
        background: #000;
      }
    }
  }
`;

interface Props {
  type: string;
}

const CategorySidebar = ({ type }: Props) => {
  const { statistics } = useContext(DataContext);

  return (
    <Container>
      <nav>
        {CATEGORIES.map(mainCategory => {
          if (mainCategory[type] && mainCategory.categories && mainCategory.categories.length > 0) {
            return (
              <Link key={mainCategory.label} to="#" className="main-category">
                <span>{mainCategory.label}</span>
                {mainCategory.categories
                  .filter(category => category[type])
                  .map(category => {
                    const categoryFragment = category.label.replace(" ", "").toLowerCase();

                    return (
                      <Link className="sub-category" key={category.label} to={`/tracker/${category.fragment}`}>
                        <span>{category.label}</span>
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
              </Link>
            );
          }
        })}
      </nav>
    </Container>
  );
};

export default CategorySidebar;
