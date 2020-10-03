import React, { useEffect, useState } from "react";
//Container
import Container from "./routes/container";
//Utils
import { GlobalContext, IGlobal } from "./contexts/global";

function App() {

  const _setContext = (object: any) => { setContext({ ...context, ...object }) };
  const [context, setContext] = useState<IGlobal>({
    loading: true,
    setContext: _setContext
  });

  return (
    <GlobalContext.Provider value={{ ...context, setContext: _setContext }}>
      <Container />
    </GlobalContext.Provider>
  )
}
export default App;