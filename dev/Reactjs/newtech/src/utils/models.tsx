import { ItemTypes } from "./enums";
import { getUIDCode } from "./functions";

const models = {
    item: {
        title: "", description: "",
        tag: "", assignee: "",
        dueDate: new Date().toLocaleDateString("en"),
        place: ItemTypes.TODO,
        id: getUIDCode()
    }
}

export default models;