import { CardContent, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
//@ts-ignore
import { DragSource } from 'react-dnd';
//@ts-ignore
import { getEmptyImage } from 'react-dnd-html5-backend';
import { COLORS } from '../../utils/enums';
//stories
import Card from "../../components/card/card";

const dragSource = DragSource;

const fieldSource = {
  beginDrag(props: any) {
    console.log(props.name)
    let dragFields;
    if (props.selectedFields.find((field: any) => field.id === props.name.id)) {
      dragFields = props.selectedFields;
    } else {
      dragFields = [...props.selectedFields, props.name];
    }
    return { fields: dragFields, source: props.selectedSource };
  },
  endDrag(props: any, monitor: any) {
    // When dropped on a compatible target, do something
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    if (dropResult) {
      props.addItemsToCart(item.fields, props.toPlace, dropResult);
      props.clearItemSelection();
    }
  },
};

/**
 * Specifies which props to inject into your component.
 */
const collect = (connect: any, monitor: any) => ({
  // Call this function inside render()
  // to let React DnD handle the drag events:
  connectDragSource: connect.dragSource(),
  // You can ask the monitor about the current drag preview
  connectDragPreview: connect.dragPreview(),
  // You can ask the monitor about the current drag state:
  isDragging: monitor.isDragging(),
});

function Item(props: any) {
  useEffect(() => {
    // Use empty image as a drag preview so browsers don't draw it
    // and we can draw whatever we want on the custom drag layer instead.
    props.connectDragPreview(getEmptyImage(), {
      // IE fallback: specify that we'd rather screenshot the node
      // when it already knows it's being dragged so we can hide it with CSS.
      captureDraggingState: true,
    });

  }, [])


  const handleRowSelection = (cmdKey: any, shiftKey: any, index: any, item: any) => {
    if (!cmdKey && !shiftKey) {
      props.onEditItem(item);
    } else {
      props.handleSelection(index, cmdKey, shiftKey);
    }
  }

  const selected = props.selectedFields.find((field: any) => props.name.title === field.title);
  const subtitle = props.name.assignee !== "" ? 'assignee to ' + props.name.assignee : ""
  return props.connectDragSource(
    <div onClick={(e) => handleRowSelection(e.ctrlKey, e.shiftKey, props.index, props.name)}>
      <Card title={props.name.title} subtitle={subtitle}
        selected={selected} description={props.name.description} onClick={props.onClick} tags={[{text: props.name.tag, color: COLORS.PRIMARY}, {text: props.name.dueDate}]} />      
    </div >);

}


export default dragSource('ITEM', fieldSource, collect)(Item);
