import useRouteElements from "./routes/useRouteElements";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const routeElements = useRouteElements();
  return (
    <>
      {routeElements}
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
