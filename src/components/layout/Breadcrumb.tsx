import React from "react";
import { Link } from "gatsby";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  font-size: 14px;
  color: #6c6c6c;

  a {
    color: #6c6c6c !important;

    &:hover {
      color: #733333 !important;
    }
  }
`;

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface Props {
  data: BreadcrumbItem[];
}

const Breadcrumb = ({ data }: Props) => {
  return (
    <Container>
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
    </Container>
  );
};

export default Breadcrumb;
