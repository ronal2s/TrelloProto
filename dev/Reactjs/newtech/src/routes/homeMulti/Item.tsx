import React, { useEffect } from 'react';
//@ts-ignore
import { DragSource } from 'react-dnd';
//@ts-ignore
import { getEmptyImage } from 'react-dnd-html5-backend';

const dragSource = DragSource;

const getFieldStyle = (isDragging: boolean, selected: boolean) => {
  const style: any = {
    borderStyle: 'dashed',
    borderWidth: 1,
    height: 30,
    margin: 5,
  };
  style.backgroundColor = selected ? 'pink' : '#87cefa';
  style.opacity = isDragging ? 0.5 : 1;
  return style;
};

const fieldSource = {
  beginDrag(props: any) {
    let dragFields;
    if (props.selectedFields.find((field: any) => field === props.name)) {
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

  },[])
  

  const handleRowSelection = (cmdKey: any, shiftKey: any, index: any) => {
    props.handleSelection(index, cmdKey, shiftKey);
  }

  
    // const selected = this.props.selectedFields.find(field => this.props.name === field);
    const selected = props.selectedFields.find((field: any) => props.name.title === field.title);
    return props.connectDragSource(
        <div
          style={getFieldStyle(false, selected)}
          onClick={(e) => handleRowSelection(e.ctrlKey, e.shiftKey, props.index)}
        >
          {props.name.title}
        </div>);
  
}


export default dragSource('ITEM', fieldSource, collect)(Item);
