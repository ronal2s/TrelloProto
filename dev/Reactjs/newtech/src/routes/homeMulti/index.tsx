import React, { useContext, useEffect, useState } from 'react';
// @ts-ignore
import { DragDropContext } from 'react-dnd';
// @ts-ignore
import HTML5Backend from 'react-dnd-html5-backend';
//Utils
import { ItemTypes } from '../../utils/enums';
import { saveData, setLoadingData, searchData } from '../../utils/functions';
import { CartContainer } from '../../globalStyles';
import { GlobalContext } from '../../contexts/global';
//Custom components
import ItemsDragLayer from './ItemsDragLayer';
import Cart from './Cart'
import FabButton from "../../components/fabButton/fabButton";
//Modals
import ModalItem from "./newItem";
import CustomTextField from '../../components/_textField';


function App() {
  const [toPlace, setToPlace] = useState("");
  const [data, setData] = useState({
    items: {
      'To Do': [],
      'Done': [],
      'In Progress': []
    }
  });

  const [backupData, setBackupData] = useState({
    items: {
      'To Do': [],
      'Done': [],
      'In Progress': []
    }
  });

  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [search, setSearch] = useState("");

  const globalContext = useContext(GlobalContext);

  useEffect(() => {
    // window.localStorage.removeItem("data")
    const string_json = window.localStorage.getItem("data");
    let json: any = null;
    if (string_json) {
      json = JSON.parse(string_json);
      setTimeout(() => {
        setData({
          items: { ...json },
        });
        setBackupData({ items: { ...json } });
        setLoadingData(globalContext, false);
      }, 5)
    } else {
      setLoadingData(globalContext, false);
    }
  }, [])

  const addItemsToCart = (items: any[], source: string, dropResult: any) => {

    const reorder = (data: any) => {
      let _items = [];
      const _data = {...data}
      for (let i = 0; i < items.length; i++) {
        //Deleting from previous place:
        const index = _data.items[source].findIndex((item: any) => item.id === items[i].id);
        _data.items[items[i].place].splice(index, 1)
        _items.push({ ...items[i], place: toPlace })
      }

      _data.items[toPlace] = _data.items[toPlace].concat(_items);

      const data_string = JSON.stringify(_data.items);
      window.localStorage.setItem("data", data_string);
      setData({ ..._data })
    }
    let _data: any = { ...data }
    reorder(_data);

    if (search.length) {
      reorder(backupData);
      setSearch("");
    }
  }

  const openModal = () => {
    setModal(true);
  }

  const closeModal = () => {
    setSelectedItem(null);
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
    console.log("Items: ", items)
    saveData(items);
  }

  const onDelete = (item: any) => {
    const items: any = { ...data.items };
    const _selectedItem: any = item;
    const index = items[_selectedItem.place].findIndex((el: any) => el.id === _selectedItem.id);
    items[_selectedItem.place].splice(index, 1);
    setData({ items: { ...items } });
    saveData(items);
  }

  const onSelectItem = (item: any) => {
    setSelectedItem(item);
    openModal();
  }

  const handleInputs = (name: string, value: string) => {
    const newItems: any = {};
    if (value.length) {
      newItems[ItemTypes.DONE] = searchData(data, ItemTypes.DONE, value);
      newItems[ItemTypes.PENDING] = searchData(data, ItemTypes.PENDING, value);
      newItems[ItemTypes.TODO] = searchData(data, ItemTypes.TODO, value);
      setData({ items: { ...newItems } });
    } else {
      setData({ ...backupData });
    }
    setSearch(value);
  }

  return (
    <div >
      <h4>Use Shift or CTRL key to multi-select</h4>
      <CustomTextField label="Search" name="search" value={search} onChange={handleInputs} />
      <br /><br />
      <ItemsDragLayer />
      <CartContainer>
        <Cart id={ItemTypes.TODO} fields={[...data.items["To Do"]]} addItemsToCart={addItemsToCart} onNewPlace={(place: string) => setToPlace(place)} onSelectItem={onSelectItem} />
        <Cart id={ItemTypes.PENDING} fields={[...data.items["In Progress"]]} addItemsToCart={addItemsToCart} onNewPlace={(place: string) => setToPlace(place)} onSelectItem={onSelectItem} />
        <Cart id={ItemTypes.DONE} fields={[...data.items.Done]} addItemsToCart={addItemsToCart} onNewPlace={(place: string) => setToPlace(place)} onSelectItem={onSelectItem} />
      </CartContainer>
      <FabButton openModal={openModal} />
      {/* <ModalItem selectedItem={selectedItem} onClose={closeModal} open={modal} /> */}
      <ModalItem onNewItem={onNewItem} onDelete={onDelete} selectedItem={selectedItem} onClose={closeModal} open={modal} />
    </div>
  );
}

const dragDropContext = DragDropContext;
export default dragDropContext(HTML5Backend)(App);
