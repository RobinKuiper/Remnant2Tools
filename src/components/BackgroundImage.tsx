import React from "react";
import { styled } from "styled-components";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const Container = styled.div`
  position: relative;
  display: grid;
  min-height: 100vh;

  .bgimage {
    grid-area: 1/1;
  }

  .gradient {
    grid-area: 1/1;
    z-index: 1;
    background: linear-gradient(45deg, rgba(255, 255, 255, 1) 11%, rgba(231, 231, 231, 1) 23%, rgba(0, 0, 0, 0) 100%);

    // BUILDS
    //background: linear-gradient(45deg,
    //rgba(255, 255, 255, 1) 11%,
    //rgba(231, 231, 231, 1) 53%,
    //rgba(255, 255, 255, 0) 100%);

    // ITEM
    //background: linear-gradient(
    //  45deg,
    //  rgba(255, 255, 255, 1) 11%,
    //  rgba(231, 231, 231, 1) 40%,
    //  rgba(255, 255, 255, 0) 100%
    //);
  }

  .children {
    grid-area: 1/1;
    position: relative;
    z-index: 2;
  }
`;

interface Props {
  children: React.ReactNode;
  image: any;
}

const BackgroundImage = ({ children, image }: Props) => {
  const bgImage = getImage(image);

  return (
    <Container>
      {bgImage && (
        <>
          <GatsbyImage
            className="bgimage"
            layout="fullWidth"
            aspectRatio={3}
            // This is a presentational image, so the alt should be an empty string
            alt=""
            image={bgImage}
            formats={["auto", "webp", "avif"]}
          />
          <div className="gradient"></div>
        </>
      )}
      <div className="children">{children}</div>
    </Container>
  );
};

export default BackgroundImage;
