import React, { useContext, useState, useEffect, useRef } from "react";
import { styled } from "styled-components";
import { SettingContext } from "../../context/SettingContext";
import Loader from "../Loader";

const Container = styled.div`
  .saved-text {
    font-size: 0.8em;
  }
`;

const SavingIndicator = () => {
  const firstUpdate = useRef(true);
  const { saving } = useContext(SettingContext);
  const [showSavedText, setShowSavedText] = useState(false);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    if (!saving) {
      setShowSavedText(true);
    }
  }, [saving]);

  useEffect(() => {
    if (showSavedText) {
      setTimeout(() => {
        setShowSavedText(false);
      }, 1000);
    }
  }, [showSavedText]);

  return (
    <Container>
      {saving && <Loader color="#fff" size="25px" />}

      {showSavedText && <span className="saved-text">Saved</span>}
    </Container>
  );
};

export default SavingIndicator;
