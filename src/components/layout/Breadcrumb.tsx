import "./breadcrumb.scss";
import React from "react";
import { Link } from "gatsby";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface Props {
  data: BreadcrumbItem[];
}

const Breadcrumb = ({ data }: Props) => {
  return (
    <div className="breadcrumb-container">
      {data.map((item, index) => (
        <>
          {index !== 0 && <span>-</span>}

          {item.path ? (
            <Link to={item.path} title={item.label}>
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}
        </>
      ))}
    </div>
  );
};

export default Breadcrumb;
