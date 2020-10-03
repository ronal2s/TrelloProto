import React from "react";
import ReactDOM from "react-dom";

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Item from "../Item"

import { cleanup } from "@testing-library/react";
import models from "../../../utils/models";

afterEach(cleanup);

it("CardItem: renders without crashing", () => {
    const div = document.createElement("div");
    const ItemCont = DragDropContext(HTML5Backend)(Item);
    ReactDOM.render(<ItemCont selectedFields={[]} name={models.item} /> , div)
})