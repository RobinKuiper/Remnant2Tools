import "./Loader.scss";
import React from "react";
import { CircleLoader } from "react-spinners";

interface Props {
  size?: number;
  color?: string;
  loading?: boolean;
}

const Loader = ({ size, color, loading }: Props) => {
  return (
    <div className="loader-container">
      <CircleLoader color={color ?? "#000"} loading={loading ?? true} size={size ?? 150} aria-label="Loading Spinner" />
    </div>
  );
};

export default Loader;
