import { Link } from "gatsby";
import React from "react";
import { styled } from "styled-components";
import { CATEGORIES } from "../../constants";

const Container = styled.div`
  background: #292929;
  color: #fff;
  min-height: 100vh;
  padding: 20px 0;
  box-sizing: border-box;
  width: 10%;

  nav {
    position: fixed;
    display: flex;
    flex-direction: column;

    a {
      padding: 10px 10px;

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
  // const { setCategoryInformation } = useContext(DataContext);

  return (
    <Container>
      <nav>
        {/*TODO: no onclick?*/}
        {CATEGORIES.map(mainCategory => {
          if (mainCategory[type] && mainCategory.categories && mainCategory.categories.length > 0) {
            return (
              <Link key={mainCategory.label} to="#" className="main-category">
                {mainCategory.label}
                {mainCategory.categories
                  .filter(category => category[type])
                  .map(category => (
                    <Link key={category.label} to={`/tracker/${ category.fragment}`}>
                      {category.label}
                    </Link>
                  ))}
              </Link>
            );
          }
        })}
      </nav>
    </Container>
  );
};

export default CategorySidebar;
