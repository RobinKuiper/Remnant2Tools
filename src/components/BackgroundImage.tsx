import "./BackgroundImage.scss";
import React from "react";
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
    <div className="background-image-container">
      {Backgrounds[index ?? 0]}
      <div className="gradient"></div>
      <div className="children">{children}</div>
    </div>
  );
};

export default BackgroundImage;
