import { Global } from "@emotion/core";
import React, { useEffect, useState } from "react";
//Container
import Container from "./routes/container";
//Utils
import { GlobalContext, IGlobal } from "./contexts/global";
import { ItemTypes } from "./utils/enums";
import { getData } from "./utils/functions";

function App() {

  const _setContext = (object: any) => { setContext({ ...context, ...object }) };
  const [context, setContext] = useState<IGlobal>({
    data: { loading: false, movementReleased: 0, items: { 'To Do': [], 'Done': [], 'In Progress': [] } },
    setContext: _setContext
  });

  useEffect(() => {
    // window.localStorage.removeItem("data");
    // console.log(window.localStorage.getItem("data"))
    const string_json = window.localStorage.getItem("data");
    let json = null;
    console.log(string_json)
    if (string_json) {
      console.log("DENTROO")
      json = JSON.parse(string_json);
      console.log("Data: ", json)
      // const lengthToDo = json.data.items[ItemTypes.TODO].length;
      // const lengthPending = json.data.items[ItemTypes.PENDING].length;
      // const lengthDone = json.data.items[ItemTypes.DONE].length;
      // console.log(lengthToDo, lengthPending, lengthDone)
      // if(lengthDone || lengthPending || lengthToDo) {
        console.log("DENTROO")
        _setContext({
          // data: {  }
          // data: {...json}
          ...json
        })
      // }
    }
    // _setContext({
    //   data: {
    //     ...context.data, items: {
    //       'To Do': [{ title: "Prueba 3", description: "Ex1", tag: "SEO", assignee: "Ex2", dueDate:"12/12/12", place: ItemTypes.TODO, id: 1 }],
    //       'Done': [{ title: "Prueba 2", description: "Ex1", tag: "Long ", assignee: "Ex2", dueDate:"12/12/12", place: ItemTypes.DONE, id: 2 }],
    //       'In Progress': [{ title: "Prueba 1", description: "Ex1", tag: "Blog Post", assignee: "Ex2", dueDate:"12/12/12", place: ItemTypes.PENDING, id: 3 }]
    //     }
    //   }
    // })
    // setContext({})
  }, [])

  return (
    <GlobalContext.Provider value={{ ...context, setContext: _setContext }}>
      <Container />
    </GlobalContext.Provider>
  )
}
export default App;