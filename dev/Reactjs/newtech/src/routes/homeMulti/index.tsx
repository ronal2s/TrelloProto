import React, { useState } from 'react';
// @ts-ignore
import Cart from './Cart'
// @ts-ignore
import HTML5Backend from 'react-dnd-html5-backend';
// @ts-ignore
import { DragDropContext } from 'react-dnd';
import ItemsDragLayer from './ItemsDragLayer';
import { ItemTypes } from '../../utils/enums';
import { getUIDCode } from '../../utils/functions';

const styles = {
  main: {
    width: '50%',
    margin: '0 auto',
    textAlign: 'center',
  },
  content: {
    // display: 'flex',
    // flexFlow: 'row',
    // justifyContent: 'left',
    alignItems: 'stretch',
    alignContent: 'stretch',
  },
};

function App() {
  const [toPlace, setToPlace] = useState("");
  const [data, setData] = useState({
    cards: {
      'To Do': [
        {
          title: "Prueba1", description: "",
          tag: "", assignee: "",
          dueDate: new Date().toLocaleDateString("en"),
          place: ItemTypes.TODO,
          id: getUIDCode()
        },
        {
          title: "Prueba2", description: "",
          tag: "", assignee: "",
          dueDate: new Date().toLocaleDateString("en"),
          place: ItemTypes.TODO,
          id: getUIDCode()
        },
      ],
      'Done': [
        {
          title: "Prueba2", description: "",
          tag: "", assignee: "",
          dueDate: new Date().toLocaleDateString("en"),
          place: ItemTypes.DONE,
          id: getUIDCode()
        }
      ],
      'In Progress': [
        {
          title: "Prueba3", description: "",
          tag: "", assignee: "",
          dueDate: new Date().toLocaleDateString("en"),
          place: ItemTypes.PENDING,
          id: getUIDCode()
        }
      ]
    }
  });


  const addItemsToCart = (items: any[], source: string, dropResult: any) => {
    let _data: any = { ...data }
    let _items = [];

    for (let i = 0; i < items.length; i++) {
      _items.push({ ...items[i], place: toPlace })
    }

    _data.cards[toPlace] = _data.cards[toPlace].concat(_items);

    for (let i = 0; i < items.length; i++) {
      const element = items[i];
      const index = _data.cards[element.place].findIndex((item: any) => item.id === element.id);
      _data.cards[element.place].splice(index, 1)
    }

    setData({ ..._data })
  }

  console.log("TESTPLACE: ", toPlace)
  return (
    <div >
      <h4>Use Shift or CTRL key to multi-select</h4>
      <ItemsDragLayer />
      <div style={styles.content}>
        <Cart id={ItemTypes.TODO} fields={data.cards["To Do"]} addItemsToCart={addItemsToCart} onNewPlace={(place: string) => setToPlace(place)} />
        <Cart id={ItemTypes.PENDING} fields={data.cards["In Progress"]} addItemsToCart={addItemsToCart} onNewPlace={(place: string) => setToPlace(place)} />
        <Cart id={ItemTypes.DONE} fields={data.cards.Done} addItemsToCart={addItemsToCart} onNewPlace={(place: string) => setToPlace(place)} />
      </div>
    </div>
  );
}

const dragDropContext = DragDropContext;
export default dragDropContext(HTML5Backend)(App);
