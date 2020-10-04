import { TextField } from "@material-ui/core";
import React from "react";

interface ISearchbar {
    label: string,
    value: string,
    onChange: (value: string) => void,
}

function Searchbar(props: ISearchbar) {
    const { label, value, onChange } = props;
    return (
        <TextField label={label} value={value} onChange={(e) => onChange(e.target.value)}/>
    )
}

export default Searchbar;