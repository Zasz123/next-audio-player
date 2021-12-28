import styled from 'styled-components';

import Navbar from 'components/navbar/Navbar';

const Container = styled.div`
  position: relative;

  width: 100vw;
  height: 100vh;
`;

interface IProps {
  children: React.ReactNode;
}

function Layout({ children }: IProps) {
  return (
    <Container>
      <Navbar />
      {children}
    </Container>
  );
}

export default Layout;
