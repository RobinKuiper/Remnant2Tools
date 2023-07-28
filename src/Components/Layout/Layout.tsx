import React, { useContext } from "react";
import styled from "styled-components";
import { DataContext } from "../../contexts/DataContext";
import NavigationComponent from "./Navigation";

const Container = styled.main`
  display: flex;
  flex-direction: row;

  #top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
  }

  &.dark {
    .navigation {
      background-color: #292929;
      color: #fff;

      a:hover {
        background-color: #000;
      }
    }

    .content {
      background-color: #000;
      color: #fff;

      thead {
        tr {
          th {
            border-bottom: 2px solid #4b4848;
          }
        }
      }

      tbody {
        tr {
          td {
            .redacted {
              background-color: #4b4848;
              color: #4b4848;
            }
          }
        }

        tr:nth-child(even) {
          background: #1f1f1f;
        }

        tr:nth-child(odd) {
          background: #292929;
        }

        tr.unlocked {
          background-color: rgba(63, 159, 63, 0.44);
        }
      }
    }
  }
`;

const Content = styled.div`
  background: #fff;
  //padding-left: 20px;
  box-shadow: 0 0 30px 10px rgba(0, 0, 0, 0.8);
  color: #000;
  z-index: 200;
  width: 100%;

  transition: all 0.2s linear;

  table {
    table-layout: fixed;
    width: 100%;
    //padding-left: 20px;

    thead {
      th {
        text-align: left;
      }
    }

    thead {
      tr {
        th {
          padding: 10px 2px;
          border-bottom: 2px solid #292929;
        }
      }
    }

    tbody {
      tr {
        transition: all 0.5s linear;

        td {
          padding: 15px 2px;

          span {
            transition: all 0.5s linear;
          }

          .redacted {
            background-color: #000;
            color: #000;
            cursor: pointer;
          }
        }
      }

      tr td:first-child {
      }

      tr:nth-child(even) {
        background: #eaeaea;
      }

      tr:nth-child(odd) {
        background: #fff;
      }

      tr.unlocked {
        background-color: rgba(63, 159, 63, 0.44);
      }
    }
  }
`;

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const { darkMode } = useContext(DataContext);

  return (
    <Container className={darkMode ? "dark" : ""}>
      <NavigationComponent />

      <Content className={"content"}>{children}</Content>
    </Container>
  );
};

export default Layout;
