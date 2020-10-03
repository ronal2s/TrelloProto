import React, { useContext, useEffect, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { Fab } from '@material-ui/core';
// @ts-ignore
import { DragDropContext } from 'react-dnd';
// @ts-ignore
import HTML5Backend from 'react-dnd-html5-backend';
//Utils
import { ItemTypes } from '../../utils/enums';
import { getUIDCode, saveData } from '../../utils/functions';
import { CornerFab } from '../../globalStyles';
//Custom components
import ItemsDragLayer from './ItemsDragLayer';
import Cart from './Cart'
//Modals
import ModalItem from "./newItem";
import { GlobalContext } from '../../contexts/global';

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
    items: {
      'To Do': [
        // {
        //   title: "Prueba1", description: "",
        //   tag: "", assignee: "",
        //   dueDate: new Date().toLocaleDateString("en"),
        //   place: ItemTypes.TODO,
        //   id: getUIDCode()
        // },
        // {
        //   title: "Prueba2", description: "",
        //   tag: "", assignee: "",
        //   dueDate: new Date().toLocaleDateString("en"),
        //   place: ItemTypes.TODO,
        //   id: getUIDCode()
        // },
      ],
      'Done': [
        // {
        //   title: "Prueba2", description: "",
        //   tag: "", assignee: "",
        //   dueDate: new Date().toLocaleDateString("en"),
        //   place: ItemTypes.DONE,
        //   id: getUIDCode()
        // }
      ],
      'In Progress': [
        // {
        //   title: "Prueba3", description: "",
        //   tag: "", assignee: "",
        //   dueDate: new Date().toLocaleDateString("en"),
        //   place: ItemTypes.PENDING,
        //   id: getUIDCode()
        // }
      ]
    }
  });

  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const globalContext = useContext(GlobalContext);

  useEffect(() => {
    // window.localStorage.removeItem("data");
    const string_json = window.localStorage.getItem("data");
    console.log(string_json);
    let json: any = null;
    if (string_json) {
      json = JSON.parse(string_json);
      setTimeout(() => {
        setData({
          items: {...json},
        });
        setLoading(false);
      }, 5)
    } else {
      setLoading(false);
    }
  }, [])

  const addItemsToCart = (items: any[], source: string, dropResult: any) => {
    let _data: any = { ...data }
    let _items = [];

    for (let i = 0; i < items.length; i++) {
      _items.push({ ...items[i], place: toPlace })
    }

    _data.items[toPlace] = _data.items[toPlace].concat(_items);

    for (let i = 0; i < items.length; i++) {
      const element = items[i];
      const index = _data.items[element.place].findIndex((item: any) => item.id === element.id);
      _data.items[element.place].splice(index, 1)
    }
    const data_string = JSON.stringify(_data.items);
    window.localStorage.setItem("data", data_string);
    setData({ ..._data })
  }

  const openModal = () => {
    setModal(true);
  }

  const closeModal = () => {
    setModal(false);
  }

  const onNewItem = (item: any) => {
    const items: any = { ...data.items };
    const _selectedItem: any = selectedItem;
    if (_selectedItem) {
      const index = items[_selectedItem.place].findIndex((el: any) => el.id === _selectedItem.id);
      items[_selectedItem.place][index] = { ...item, dueDate: (item.dueDate as any) instanceof Date ? (item.dueDate as unknown as Date).toLocaleDateString("en") : item.dueDate };
    } else {
      items[ItemTypes.TODO].push({ ...item, dueDate: (item.dueDate as any) instanceof Date ? (item.dueDate as unknown as Date).toLocaleDateString("en") : item.dueDate });
    }
    setData({ items: { ...items } })
    saveData(items);
  }

  const onSelectItem = (item: any) => {
    setSelectedItem(item);
    openModal();
  }

  return (
    <div >
      <h4>Use Shift or CTRL key to multi-select</h4>
      <ItemsDragLayer />
      <div style={styles.content}>
        <Cart id={ItemTypes.TODO} fields={data.items["To Do"]} addItemsToCart={addItemsToCart} onNewPlace={(place: string) => setToPlace(place)} onSelectItem={onSelectItem} />
        <Cart id={ItemTypes.PENDING} fields={data.items["In Progress"]} addItemsToCart={addItemsToCart} onNewPlace={(place: string) => setToPlace(place)} onSelectItem={onSelectItem}/>
        <Cart id={ItemTypes.DONE} fields={data.items.Done} addItemsToCart={addItemsToCart} onNewPlace={(place: string) => setToPlace(place)} onSelectItem={onSelectItem}/>
      </div>
      <CornerFab>
        <Fab size="large" color="primary" aria-label="add" onClick={openModal} >
          <AddIcon />
        </Fab>
      </CornerFab>
      {/* <ModalItem selectedItem={selectedItem} onClose={closeModal} open={modal} /> */}
      <ModalItem onNewItem={onNewItem} selectedItem={selectedItem} onClose={closeModal} open={modal} />
    </div>
  );
}

const dragDropContext = DragDropContext;
export default dragDropContext(HTML5Backend)(App);
