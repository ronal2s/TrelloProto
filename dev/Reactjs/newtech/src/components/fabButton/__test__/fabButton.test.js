import React from "react";
import ReactDOM from "react-dom";
import FabButton from "../fabButton";

import { render, cleanup } from "@testing-library/react";

afterEach(cleanup);

it("FabButton: renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<FabButton />, div);
})

it("FabButton: renders fabButton correctly", () => {
    render(<FabButton openModal={() => console.log("Test")} />);
})