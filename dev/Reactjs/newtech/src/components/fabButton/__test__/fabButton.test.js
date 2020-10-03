import React from "react";
import ReactDOM from "react-dom";
import FabButton from "../fabButton";

import { render, cleanup } from "@testing-library/react";

afterEach(cleanup);

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<FabButton />, div);
})

it("renders fabButton correctly", () => {
    render(<FabButton openModal={() => console.log("Test")} />);
})