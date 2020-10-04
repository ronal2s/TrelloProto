import React from "react";
import Searchbar from "./searchBar";

export default {
    title: "Searchbar",
    component: Searchbar,
}

export const TextInput = () => <Searchbar label="Search..." value="" onChange={() => console.log()} />