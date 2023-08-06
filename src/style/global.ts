import { styled } from "styled-components";

export const Flex = styled.div`
  display: flex;
  flex-direction: ${props => props.direction || "row"};
  justify-content: ${props => props.justifyContent || "normal"};
  gap: ${props => props.gap || "10px"};
  align-items: ${props => props.alignItems || "normal"};
  flex-wrap: ${props => props.wrap || "nowrap"};
`;
