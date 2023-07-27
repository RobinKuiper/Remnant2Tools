import { useEffect, useState } from "react";
import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import styled from "styled-components";
import { motion } from "framer-motion";
import "../global.css";
import CollectablesTable from "../Components/CollectablesTable";
import CollectablesTopBar from "../Components/CollectablesTopBar";
import dataCollection from "../data/dataCollection.json";

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

const Navigation = styled.div`
  position: relative;
  min-height: 100vh;
  min-width: 200px;
  box-sizing: border-box;
  border-right: 1px solid #000;
  background: #eeeded;
  color: #000;
  //background: #fff;
  //border: 1px solid red;

  transition: all 0.5s linear;

  nav {
    position: fixed;
    display: flex;
    flex-direction: column;
    min-width: 200px;

    a {
      padding: 15px 10px;
      border-bottom: 1px solid #000;
    }
  }
`;

const Content = styled.div`
  background: #fff;
  //padding-left: 20px;
  box-shadow: 0 0 30px 10px rgba(0, 0, 0, 0.8);
  color: #000;
  z-index: 200;

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

const categories = [
  {
    label: "Archetypes",
  },
  {
    label: "Traits",
  },
  {
    label: "Weapons",
  },
  {
    label: "Mods",
  },
  {
    label: "Mutators",
  },
  // "Armor",
  {
    label: "Relics",
  },
  {
    label: "Amulets",
  },
  {
    label: "Rings",
  },
];

const IndexPage: React.FC<PageProps> = () => {
  const [category, setCategory] = useState<string | null>("archetypes");
  const [unlocks, setUnlocks] = useState<{ key: string; value: boolean } | object>({});
  const [data, setData] = useState({});
  const [userData, setUserData] = useState({});
  const [query, setQuery] = useState("");
  const [useDark, setUseDark] = useState(true);
  const [sortDir, setSortDir] = useState(1);

  useEffect(() => {
    // Check if we have an unlocks object in localStorage
    if (localStorage.getItem("data")) {
      setUserData(JSON.parse(localStorage.getItem("data") as string) ?? {});
    }

    if (localStorage.getItem("mode")) {
      if (localStorage.getItem("mode") === "dark") {
        setUseDark(true);
      }
    }

    if (category) {
      dataCollection[category].items;
    }
  }, []);

  useEffect(() => {
    if (!category) {
      setData({});
      return;
    }

    let data = dataCollection[category].items;
    if (query && query.length > 0) {
      data = data.filter(item => {
        // Loop through each value in the item object
        // and check if query matches the content
        for (const value of Object.values(item)) {
          if (typeof value === "string" && value.toLowerCase().includes(query.toLowerCase())) {
            return true;
          }
        }
        return false;
      });
    }

    // data = data.sort((a, b) => (sortDir === 0 ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name)));

    setData(data);
  }, [category, query, sortDir]);

  const unlock = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.id;

    if (!userData[category]) {
      userData[category] = {};
    }

    if (!userData[category][id]) {
      userData[category][id] = {
        unlocked: true,
      };
    }

    setUserData(userData);
    localStorage.setItem("data", JSON.stringify(userData));
  };

  const toggleDarkMode = e => {
    e.preventDefault();

    localStorage.setItem("mode", !useDark ? "dark" : "light");
    setUseDark(!useDark);
  };

  const sort = () => {
    setSortDir(sortDir === 1 ? 0 : 1);
  };

  return (
    <Container className={useDark ? "dark" : ""}>
      <Navigation className={"navigation"}>
        <nav>
          <motion.a
            initial={{
              transform: "translateX(-200px)",
            }}
            whileInView={{
              transform: "translateX(0px)",
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.2,
              delay: 0.1,
            }}
            href="#"
            onClick={() => {
              setCategory(null);
            }}
          >
            Statistics
          </motion.a>
          {categories.map((category, index) => (
            <motion.a
              initial={{
                transform: "translateX(-200px)",
              }}
              whileInView={{
                transform: "translateX(0px)",
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.2,
                delay: 0.1 * index + 1,
              }}
              href="#"
              key={category.label}
              onClick={() => {
                setCategory(category.label.toLowerCase());
              }}
            >
              {category.label}
            </motion.a>
          ))}
        </nav>
      </Navigation>

      <Content className={"content"}>
        {category && data ? (
          <>
            <CollectablesTopBar query={query} setQuery={setQuery} useDark={useDark} toggleDarkMode={toggleDarkMode} />

            <CollectablesTable
              keys={Object.keys(Object.values(data)[0])}
              data={Object.values(data)}
              unlocks={unlocks}
              unlock={unlock}
              sort={sort}
            />
          </>
        ) : (
          <h1>Blaat</h1>
        )}
      </Content>
    </Container>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
