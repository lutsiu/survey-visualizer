import useToken from "./hooks/useToken";

function App() {
  const {loading, error, refresh, token} = useToken();

  return (
    <>

    </>
  );
}

export default App;
