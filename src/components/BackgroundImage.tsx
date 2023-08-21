import React from "react";
import { styled } from "styled-components";
import { StaticImage } from "gatsby-plugin-image";

const aspectRation = 16 / 9;
const layout = "constrained";
const className = "bgimage";

const Backgrounds = [
  <StaticImage
    key="bg1"
    className={className}
    layout={layout}
    aspectRatio={aspectRation}
    alt=""
    src={"../images/background/bg1.webp"}
  />,
  <StaticImage
    key="bg2"
    className={className}
    layout={layout}
    aspectRatio={aspectRation}
    alt=""
    src={"../images/background/bg2.webp"}
  />,
  <StaticImage
    key="bg3"
    className={className}
    layout={layout}
    aspectRatio={aspectRation}
    alt=""
    src={"../images/background/bg3.webp"}
  />,
];

interface Props {
  children: React.ReactNode;
  index: number;
}

const BackgroundImage = ({ children, index }: Props) => {
  return (
    <Container>
      {Backgrounds[index ?? 0]}
      <div className="gradient"></div>
      <div className="children">{children}</div>
    </Container>
  );
};

export default BackgroundImage;

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
