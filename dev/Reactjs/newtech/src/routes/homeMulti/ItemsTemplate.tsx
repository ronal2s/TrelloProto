import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import { Tag } from '../../globalStyles';
import { COLORS } from '../../utils/enums';

const getFieldStyle = (isDragging: boolean) => {
  const style: any = {
  };
  style.opacity = isDragging ? 0.5 : 1;
  return style;
};

const ItemsTemplate = ({ items }: any) => {
  const rows = items.map((field: any) => (<div key={field.id} style={getFieldStyle(false)}>
    <Card style={getFieldStyle(false)} >
      <CardContent>
        <Typography component="h2">
          {field.title}
        </Typography>
        {field.tag.length > 0 && <Tag width={field.tag.length * 10} float="left"  >{field.tag}</Tag>}
        <Tag width={85} color={COLORS.DEFAULT_ICON_COLOR} >{field.dueDate}</Tag>
        <Typography component="h3">
          {field.description}
        </Typography>
      </CardContent>
    </Card>
    {/* {field.title} */}
  </div>));
  return (<div>{rows}</div>);
};

export default ItemsTemplate;
