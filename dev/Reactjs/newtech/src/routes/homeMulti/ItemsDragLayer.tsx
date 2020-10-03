import React from 'react';
import ItemsTemplate from './ItemsTemplate';
//@ts-ignore
import { DragLayer } from 'react-dnd';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
};

const getFieldStyle = (isDragging: boolean) => {
  const style: any = {
    width: 300,
    maxWidth: 300,
  };
  style.opacity = isDragging ? 0.8 : 1;
  return style;
};

const getItemStyles = (props: any) => {
  const { currentOffset } = props;
  if (!currentOffset) {
    return {
      display: 'none',
    };
  }

  const { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
};

const collect = (monitor: any) => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging(),
});

function FieldDragLayer(props: any) {
  const { item, itemType, isDragging } = props;

  const renderItem = (type: string, item: any) => {
    // [IMPORTANTE]
    switch (type) {
      case 'ITEM':
        return (
          <ItemsTemplate items={item.fields} />
        );
      default:
        return null;
    }
  }


  if (!isDragging) {
    return null;
  }

  return (
    <div style={layerStyles as any}>
      <div style={getItemStyles(props)}>
        <div style={getFieldStyle(isDragging)}>
          {renderItem(itemType, item)}
        </div>
      </div>
    </div>
  );

}

const dragLayer = DragLayer;
export default dragLayer(collect)(FieldDragLayer);
