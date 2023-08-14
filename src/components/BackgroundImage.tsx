import React from "react";
import { styled } from "styled-components";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const Container = styled.div`
  position: relative;

  .bgimage {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .gradient {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
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
    position: absolute;
    top: 0;
    width: 100%;
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
      {/* You can use a GatsbyImage component if the image is dynamic */}
      {bgImage && (
        <>
          <GatsbyImage
            className="bgimage"
            // layout="fullWidth"
            // You can optionally force an aspect ratio for the generated image
            aspectRatio={2}
            // This is a presentational image, so the alt should be an empty string
            alt=""
            // src={
            //   "../images/bg1.webp"
            // }
            image={bgImage}
            formats={["auto", "webp", "avif"]}
          />
          <div className="gradient"></div>
        </>
      )}
      <div className="children">
        {/* Any content here will be centered in the component */}
        {children}
      </div>
    </Container>
  );
};

export default BackgroundImage;
