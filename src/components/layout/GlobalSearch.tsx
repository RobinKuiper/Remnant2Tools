import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import Search from "../Search";
import { Link, graphql, useStaticQuery } from "gatsby";
import { searchItems } from "../../dataHelpers";

const Container = styled.div`
  position: relative;

  @media (max-width: 670px) {
    display: none;
  }
`;

const SearchResults = styled.div`
  position: absolute;
  left: 0;
  top: 50px;
  background: #292929;
  width: 100%;

  .result {
    padding: 10px;

    &:hover,
    &.active {
      background: #000;
    }

    .title {
    }

    .info {
      display: flex;
      font-size: 0.7em;

      span:not(:last-child) {
        border-right: 1px solid #fff;
        padding-right: 5px;
        margin-right: 5px;
      }
    }
  }
`;

const GlobalSearch = () => {
  const resultRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [query, setQuery] = useState<string>("");
  const [searchedItems, setSearchedItems] = useState([]);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const { items } = useStaticQuery(graphql`
    {
      items: allItem {
        nodes {
          externalId
          name
          description
          fragment
          category
          type
          race
          armorset
        }
      }
    }
  `);

  const handleArrowNavigation = (event: KeyboardEvent) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setFocusedIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : searchedItems.length - 1));
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setFocusedIndex(prevIndex => (prevIndex < searchedItems.length - 1 ? prevIndex + 1 : 0));
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!searchedItems || searchedItems.length <= 0) {
        return;
      }

      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();
        handleArrowNavigation(event);
      }

      if (event.key === "Enter") {
        event.preventDefault();
        if (focusedIndex > -1 && resultRefs.current[focusedIndex] && "click" in resultRefs.current[focusedIndex]) {
          resultRefs.current[focusedIndex].click();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleArrowNavigation]);

  useEffect(() => {
    resultRefs.current = resultRefs.current.slice(0, searchedItems.length);
  }, [searchedItems]);

  useEffect(() => {
    if (!query || query === "") {
      setSearchedItems([]);
    } else {
      const foundItems = searchItems(items.nodes, query).slice(0, 10);
      setSearchedItems(foundItems);
    }
  }, [query]);

  return (
    <Container>
      <Search placeholder="Search" query={query} setQuery={setQuery} />

      <SearchResults>
        {searchedItems.map((item, i) => (
          <Link
            key={item.fragment}
            to={`/database/${item.category}/${item.fragment}`}
            title={item.title}
            data-testid={i}
            ref={el => (resultRefs.current[i] = el)}
          >
            <div className={`result ${focusedIndex === i ? "active" : ""}`}>
              <span className="title">{item.name}</span>
              <div className="info">
                {item.category && <span>{item.category}</span>}
                {item.type && <span>{item.type}</span>}
                {item.race && <span>{item.race}</span>}
              </div>
            </div>
          </Link>
        ))}
      </SearchResults>
    </Container>
  );
};

export default GlobalSearch;
