import React, { useEffect, useState } from "react";
//Container
import Container from "./routes/container";
//Utils
import { GlobalContext, IGlobal } from "./contexts/global";

function App() {

  const _setContext = (object: any) => { setContext({ ...context, ...object }) };
  const [context, setContext] = useState<IGlobal>({
    data: { loading: true, movementReleased: 0, items: { 'To Do': [], 'Done': [], 'In Progress': [] } },
    setContext: _setContext
  });

  useEffect(() => {
    const string_json = window.localStorage.getItem("data");
    let json: IGlobal | null = null;
    if (string_json) {
      json = JSON.parse(string_json);
      setTimeout(() => {
        _setContext({
          ...json,
        })
      }, 5000)
    } else {
      _setContext({ data: { ...context.data, loading: false } })
    }
  }, [])

  return (
    <GlobalContext.Provider value={{ ...context, setContext: _setContext }}>
      <Container />
    </GlobalContext.Provider>
  )
}
export default App;