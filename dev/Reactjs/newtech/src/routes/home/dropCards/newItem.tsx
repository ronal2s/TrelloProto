import React, { useState, useContext } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    DatePicker
} from '@material-ui/pickers';
//Components
import TextField from "../../../components/_textField";
import TextSelect from "../../../components/_textSelect";
//Utils
import { GlobalContext } from "../../../contexts/global";
import models from "../../../utils/models";
import { ItemTypes } from "../../../utils/enums";
import { saveData } from "../../../utils/functions";
//Modal
import ModalQuestion from "./deleteModal";

interface IModal {
    open: boolean,
    onClose: () => void,
    selectedItem: any
}

function ModalItem(props: IModal) {
    const [form, setForm] = useState({ ...models.item });
    const [modalQuestion, setModalQuestion] = useState(false);

    const globalContext = useContext(GlobalContext);


    const onEnter = () => {
        if (props.selectedItem) {
            setForm({ ...props.selectedItem });
        }
    }

    const onClose = () => {
        setForm({ ...models.item });
        props.onClose();
    }

    const handleInputs = (name: string, value: string) => {
        setForm({ ...form, [name]: value });
    }

    const onRequestDelete = () => setModalQuestion(true);

    const closeModalQuestion = () => setModalQuestion(false);

    const onDelete = () => {
        const obj = { ...globalContext };
        const items: any = { ...globalContext.data.items };
        const index = items[props.selectedItem.place].findIndex((el: any) => el.id === props.selectedItem.id);
        items[props.selectedItem.place].splice(index, 1);
        obj.data.items = { ...items };
        globalContext.setContext({ ...obj })
        saveData(obj);
        onClose();
        closeModalQuestion();
    }

    const onSave = () => {
        const obj = { ...globalContext };
        const items: any = { ...globalContext.data.items };
        if (props.selectedItem) {
            const index = items[props.selectedItem.place].findIndex((el: any) => el.id === props.selectedItem.id);
            items[props.selectedItem.place][index] = { ...form, dueDate: (form.dueDate as unknown as Date).toLocaleDateString("en") };
        } else {
            items[ItemTypes.PENDING].push({ ...form, dueDate: (form.dueDate as unknown as Date).toLocaleDateString("en") });
        }
        obj.data.items = { ...items };
        globalContext.setContext({ ...obj })
        saveData(obj);
        onClose();
    }


    return (
        <Dialog open={props.open} onClose={onClose} onEnter={onEnter} maxWidth="xs" fullWidth >
            <DialogTitle>
            </DialogTitle>
            <DialogContent>
                <TextField fullwidth label="Title" name="title" value={form.title} onChange={handleInputs} />
                <TextSelect fullwidth label="Tag" name="tag" value={form.tag} list={["SEO", "Long Form", "Blog Post"]} onChange={handleInputs} />
                <TextField fullwidth label="Assignee" name="assignee" value={form.assignee} onChange={handleInputs} /> <br /><br />
                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                    <DatePicker
                        margin="normal"
                        id="date-picker"
                        label="Date picker"
                        value={form.dueDate}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(date) => handleInputs("dueDate", date as any)}

                    />
                </MuiPickersUtilsProvider>
                <TextField fullwidth label="Description" name="description" variant="outlined" rows={5} multiline value={form.description} onChange={handleInputs} />
            </DialogContent>
            <DialogActions>
                {props.selectedItem && <Button color="secondary" onClick={onRequestDelete} >Delete</Button>}
                <Button variant="contained" color="primary" onClick={onSave} >Save</Button>
            </DialogActions>
            <ModalQuestion open={modalQuestion} onClose={closeModalQuestion} onAccept={onDelete} />
        </Dialog>
    )
}

export default ModalItem;