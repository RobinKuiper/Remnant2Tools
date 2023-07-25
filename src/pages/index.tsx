import { useEffect, useState } from "react";
import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { BsFillMoonStarsFill, BsSunFill } from "react-icons/bs";
import styled from "styled-components";
import "../global.css";
import CollectablesTable from "../Components/CollectablesTable";
import CollectablesTopBar from "../Components/CollectablesTopBar";
import archetypes from "../data/archetypes.json";
import traits from "../data/traits.json";
import weapons from "../data/weapons.json";
import mods from "../data/mods.json";
import mutators from "../data/mutators.json";
import relics from "../data/relics.json";
import amulets from "../data/amulets.json";
import rings from "../data/rings.json";

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
            border-bottom: 2px solid #fff;
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
          background: #000;
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
  //background: #fff;
  //border: 1px solid red;

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
  z-index: 1;

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
        td {
          padding: 15px 2px;

          .redacted {
            background-color: #000;
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
    data: archetypes,
  },
  {
    label: "Traits",
    data: traits,
  },
  {
    label: "Weapons",
    data: weapons,
  },
  {
    label: "Mods",
    data: mods,
  },
  {
    label: "Mutators",
    data: mutators,
  },
  // "Armor",
  {
    label: "Relics",
    data: relics,
  },
  {
    label: "Amulets",
    data: amulets,
  },
  {
    label: "Rings",
    data: rings,
  },
];

const IndexPage: React.FC<PageProps> = () => {
  const [category, setCategory] = useState(0);
  const [unlocks, setUnlocks] = useState<{ key: string; value: boolean } | object>({});
  const [data, setData] = useState(categories[category].data);
  const [query, setQuery] = useState("");
  const [useDark, setUseDark] = useState(false);

  useEffect(() => {
    // Check if we have an unlocks object in localStorage
    if (localStorage.getItem("unlocks")) {
      setUnlocks(JSON.parse(localStorage.getItem("unlocks") as string) ?? {});
    }

    if (localStorage.getItem("mode")) {
      if (localStorage.getItem("mode") === "dark") {
        setUseDark(true);
      }
    }
  }, []);

  useEffect(() => {
    let data = categories[category].data;
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
    setData(data);
  }, [category, query]);

  const unlock = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.id;
    setUnlocks(prevUnlocks => {
      const updatedUnlocks: { key: string; value: boolean } | object = { ...prevUnlocks };
      updatedUnlocks[id] = !updatedUnlocks[id] ?? true;
      localStorage.setItem("unlocks", JSON.stringify(updatedUnlocks));
      return updatedUnlocks;
    });
  };

  const toggleDarkMode = e => {
    e.preventDefault();

    localStorage.setItem("mode", !useDark ? "dark" : "light");
    setUseDark(!useDark);
  };

  return (
    <Container className={useDark ? "dark" : ""}>
      <Navigation className={"navigation"}>
        <nav>
          {categories.map((category, index) => (
            <a
              href="#"
              key={category.label}
              onClick={() => {
                setCategory(index);
              }}
            >
              {category.label}
            </a>
          ))}
        </nav>
      </Navigation>

      <Content className={"content"}>
        <CollectablesTopBar query={query} setQuery={setQuery} useDark={useDark} toggleDarkMode={toggleDarkMode} />

        <CollectablesTable
          keys={Object.keys(categories[category].data[0])}
          data={data}
          unlocks={unlocks}
          unlock={unlock}
        />
      </Content>
    </Container>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
