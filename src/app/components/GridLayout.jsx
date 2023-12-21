import styled from "styled-components";

const Grid = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function GridLayout({ children }) {
  return <Grid>{children}</Grid>;
}
