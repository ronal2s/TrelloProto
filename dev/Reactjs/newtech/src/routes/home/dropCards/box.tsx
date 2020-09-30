import React, { useContext } from 'react'
import { COLORS, ItemTypes } from '../../../utils/enums'
import { useDrag } from 'react-dnd'
import { GlobalContext } from '../../../contexts/global'
import { Card, CardContent, Typography } from '@material-ui/core'
import { Tag } from '../../../globalStyles'
import { saveData } from '../../../utils/functions'

interface IBox {
    item: { title: string, description: string, tag: string, assignee: string, dueDate: string, type: ItemTypes, id: number },
    onClick?: () => void,
}

export const Box = (props: IBox) => {
    const item = { ...props.item, type: ItemTypes.BOX }
    const [{ opacity }, drag] = useDrag({
        item,
        end(item, monitor) {
            const dropResult = monitor.getDropResult()
            if (item && dropResult) {
                const isDropAllowed =
                    dropResult.allowedDropEffect === 'any' ||
                    dropResult.allowedDropEffect === dropResult.dropEffect
                if (isDropAllowed) {
                    console.log("Drop result: ", dropResult)
                    handleCard(item as any, dropResult.name);
                }
            }
        },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
    })

    const globalContext = useContext(GlobalContext);

    const handleCard = (item: any, newPlace: string) => {
        console.log("Actual: ", item.place, " New", newPlace)
        if (newPlace !== item.place) {
            const items = globalContext.data.items;
            //Lets try to find the item inside of pending
            let itemIndex = -1;
            if (items) itemIndex = (items as any)[item.place].findIndex((el: any) => el.id === item.id);
            (items as any)[item.place].splice(itemIndex, 1);
            (items as any)[newPlace].push({ ...item, place: newPlace });
            globalContext.setContext({ ...globalContext, data: { ...globalContext.data, items } })
            console.log("Index: ", itemIndex, item)
            //Saving the data
            saveData({ ...globalContext })

        }
    }


    return (
        <Card ref={drag} style={{ marginBottom: 5, cursor: "pointer" }} onClick={props.onClick} >
            <CardContent>
                <Typography component="h2">
                    {item.title}
                </Typography>
                {item.tag.length > 0 && <Tag width={item.tag.length * 10} float="left"  >{item.tag}</Tag>}
                <Tag width={85} color={COLORS.DEFAULT_ICON_COLOR} >{item.dueDate}</Tag>
                <Typography component="h3">
                    {item.description}
                </Typography>
            </CardContent>
        </Card>
    )
}
