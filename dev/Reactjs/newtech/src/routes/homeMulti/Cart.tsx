import React, { useContext, useEffect, useState } from 'react';
//@ts-ignore
import { DropTarget } from 'react-dnd';
import CardSkeleton from '../../components/cardSkeleton';
import { GlobalContext } from '../../contexts/global';
import { ContentCard } from '../../globalStyles';
import Item from './Item';

const getDroppedPlace = {
  drop(props: any) {
    return props.id;
  }
}

const nodeTarget = {
  drop(props: any) {
    props.onNewPlace(props.id)
    return props.data;
  },
  canDrop(props: any, monitor: any) {
    return monitor.getItem().source !== props.id;
  },
};

function collect(connect: any, monitor: any) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  };
}

function Cart(props: any) {

  const [selectedFields, setSelectedFields] = useState([]);
  const [lastSelectedIndex, setLastSelectedIndex] = useState(-1);
  useEffect(() => {
    handleItemSelection(-1, false, false);
  }, [])

  const clearItemSelection = () => {
    setSelectedFields([]);
    setLastSelectedIndex(-1);
  }


  const handleItemSelection = (index: number, cmdKey: any, shiftKey: any) => {
    let _selectedFields: any[];
    const fields = props.fields;
    const field = index < 0 ? '' : fields[index];
    const _lastSelectedIndex = index;
    if (!cmdKey && !shiftKey) {      
      // _selectedFields = [field];
      _selectedFields = [];
    } else if (shiftKey) {
      if (lastSelectedIndex >= index) {
        _selectedFields = [].concat.apply(selectedFields,
          fields.slice(index, _lastSelectedIndex));
      } else {
        _selectedFields = [].concat.apply(selectedFields,
          fields.slice(lastSelectedIndex + 1, index + 1));
      }
    } else if (cmdKey) {
      // console.log("Field: ", field)
      const foundIndex = selectedFields.findIndex((f: any) => f === field);
      // If found remove it to unselect it.
      if (foundIndex >= 0) {
        _selectedFields = [
          ...selectedFields.slice(0, foundIndex),
          ...selectedFields.slice(foundIndex + 1),
        ];
      } else {
        _selectedFields = [...selectedFields, field];
      }
    }
    const finalList = fields ? fields
      .filter((f: any) => _selectedFields.find(a => a === f)) : [];
    setSelectedFields(finalList); setLastSelectedIndex(_lastSelectedIndex);

  }

  const items = props.fields.map((field: any, index: number) => (<Item
    name={field}
    key={index}
    selectedSource={props.id}
    addItemsToCart={props.addItemsToCart}
    clearItemSelection={clearItemSelection}
    selectedFields={selectedFields}
    handleSelection={handleItemSelection}
    onEditItem={props.onSelectItem}
    toPlace={props.id}
    index={index}
  />));

  const globalContext = useContext(GlobalContext);

  return props.connectDropTarget(
    <div>
      <ContentCard>
        <span>{props.id}</span>
        {!globalContext.loading && items}
        {globalContext.loading && <CardSkeleton/>}
      </ContentCard>

    </div>
  );

}



const dropTarget = DropTarget;

export default dropTarget('ITEM', nodeTarget, collect, getDroppedPlace)(Cart);
