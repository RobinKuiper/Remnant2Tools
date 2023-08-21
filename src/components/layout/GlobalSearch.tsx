import "./GlobalSearch.scss";
import React, { useEffect, useRef, useState } from "react";
import Search from "../Search";
import { Link, graphql, useStaticQuery } from "gatsby";
import { searchItems } from "../../dataHelpers";

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
    const handleClick = e => {
      if (e.target.tagName !== "INPUT") {
        setQuery("");
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("keydown", handleClick);
    };
  }, []);

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
    <div className="global-search-container">
      <Search
        placeholder="Search"
        query={query}
        setQuery={setQuery}
        tooltip="Searches through name, description, world, etc."
      />

      <div className="results">
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
      </div>
    </div>
  );
};

export default GlobalSearch;
