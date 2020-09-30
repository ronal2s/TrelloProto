import React from "react";
import { Dialog, DialogContent, DialogActions, Button, Typography } from "@material-ui/core";

interface IModal {
    open: boolean,
    onClose: () => void,
    onAccept: () => void,
}

function ModalDelete(props: IModal) {

    return (
        <Dialog open={props.open} onClose={props.onClose} maxWidth="xs" fullWidth >
            <DialogContent>
                <Typography>Are you sure to delete this element?</Typography>
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={props.onClose} >Cancel</Button>
                <Button variant="contained" color="primary" onClick={props.onAccept} >Accept</Button>
            </DialogActions>
        </Dialog>

    )
}

export default ModalDelete;