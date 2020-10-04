import React from "react";
import { COLORS } from "../../utils/enums";
import Card from "./card";

export default {
    title: "Card",
    component: Card,
}

export const UnSelected = () => <Card title="Title" subtitle="Subtitle" description="Description" tags={[{text: "Tag #1", color: COLORS.PRIMARY}, {text: "Tag #2"}]} selected={false} />
export const Selected = () => <Card title="Title" subtitle="Subtitle" description="Description" tags={[{text: "Tag #1", color: COLORS.PRIMARY}, {text: "Tag #2"}]} selected={true} />