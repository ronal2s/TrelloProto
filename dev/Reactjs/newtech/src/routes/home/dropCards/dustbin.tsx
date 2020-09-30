import React, { useContext, useState } from 'react'
import { useDrop } from 'react-dnd'
import AddIcon from '@material-ui/icons/Add';
import { Skeleton } from "@material-ui/lab"
import { GlobalContext } from '../../../contexts/global';
import { ItemTypes } from "../../../utils/enums";
import { ContentCard, CornerFab } from "../../../globalStyles";
import { Box } from './box';
import ModalItem from "./newItem";
import { Fab } from '@material-ui/core';


interface IDustbin {
    allowedDropEffect: any,
    name: string
}

export const Dustbin = (props: IDustbin) => {
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: ItemTypes.BOX,
        drop: () => ({
            name: `${props.name}`,
            allowedDropEffect: props.allowedDropEffect,
        }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    })

    const [modal, setModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const selectItem = (item: any) => {
        setSelectedItem(item);
        openModal();
    }

    const openModal = () => setModal(true);

    const closeModal = () => {
        setModal(false);
        setSelectedItem(null);
    };



    const globalContext = useContext(GlobalContext);
    // console.log("Prueba: ", props.name, (globalContext.data.items as any)['In Progress'])
    return (
        <>
            <ContentCard ref={drop} >
                {props.name}
                {globalContext.data.loading && <>
                    <Skeleton variant="rect" width={200} /> <br />
                    <Skeleton variant="rect" width={285} height={170} />
                </>}
                <br />
                {((globalContext?.data.items) as any)[props.name].map((value: any, key: number) => {
                    return (
                        <Box item={value} key={key} onClick={() => selectItem(value)} />
                    )
                })}
            </ContentCard>
            <CornerFab>
                <Fab size="large" color="primary" aria-label="add" onClick={openModal} >
                    <AddIcon />
                </Fab>
            </CornerFab>
            <ModalItem selectedItem={selectedItem} onClose={closeModal} open={modal} />
        </>
    )


}
