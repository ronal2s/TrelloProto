import { Fab } from "@material-ui/core";
import React from "react";
import AddIcon from '@material-ui/icons/Add';

import { CornerFab } from "../../globalStyles";

interface IFabButton {
    openModal: () => void
}

function FabButton(props: IFabButton) {
    return (
        <CornerFab>
            <Fab data-testid="fabButton" size="large" color="primary" aria-label="add" onClick={props.openModal} >
                <AddIcon />
            </Fab>
        </CornerFab>
    )
}

export default FabButton;