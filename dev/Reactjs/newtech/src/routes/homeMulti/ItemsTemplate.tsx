import React from 'react';

const getFieldStyle = (isDragging: boolean) => {
  const style: any = {
    borderStyle: 'dashed',
    borderWidth: 1,
    height: 30,
    margin: 5,
    backgroundColor: 'pink',
  };
  style.opacity = isDragging ? 0.5 : 1;
  return style;
};

const ItemsTemplate = ({ items }: any) => {
 const rows = items.map((field: any) => (<div key={field.id} style={getFieldStyle(false)}>
      {field.title}
    </div>));
  return (<div>{rows}</div>);
};

export default ItemsTemplate;
