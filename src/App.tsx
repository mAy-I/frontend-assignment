import { styled } from "styled-components";

const App = () => {
  return (
    <Container>
      <Header>
        <button>라인 추가</button>
        <button>저장</button>
      </Header>
      <Flex>
        <CanvasColumn>
          <canvas />
        </CanvasColumn>
        <LineListColumn>{/* TODO */}</LineListColumn>
      </Flex>
    </Container>
  );
};

const Container = styled.div`
  --header-height: 80px;
  height: 99vh;
`;

const Header = styled.div`
  display: flex;
  height: var(--header-height);
  gap: 20px;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 20px;
`;

const Flex = styled.div`
  display: flex;
  height: calc(100% - var(--header-height));
`;

const CanvasColumn = styled.div`
  flex: 1;
  height: 100%;
  border: 1px solid gray;
`;

const LineListColumn = styled.div`
  width: 250px;
  height: 100%;
`;

export default App;
