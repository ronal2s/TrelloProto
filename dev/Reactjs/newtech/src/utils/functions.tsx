import { v4 as uuidv4 } from 'uuid';
import { IGlobal } from '../contexts/global';
import { ItemTypes } from './enums';

export const getUIDCode = () => {
    return uuidv4();
}

export const isMobile = () => {
    let isMobile = false
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isMobile = true;
    }
    return isMobile;
}

export const saveData = (data: object) => {
    const string_data = JSON.stringify(data);
    window.localStorage.setItem("data", string_data);
}

export const getData = () => {
    const string_data = JSON.stringify(window.localStorage.getItem("data"));
    return string_data;
}

export const setLoadingData = (globalContext: IGlobal, value: boolean) => {
    globalContext.setContext({ ...globalContext, loading: value })
}

export const searchData = (data: { items: any }, itemType: ItemTypes, searchValue: string) => {
    const items = { ...data.items };
    // const newItems: any = { [itemType]: [] };
    const newItems: any = []
    for (let i = 0; i < items[itemType].length; i++) {
        const item: any = items[itemType][i];
        if (
            item.title.toLowerCase().startsWith(searchValue.toLowerCase()) ||
            item.assignee.toLowerCase().startsWith(searchValue.toLowerCase()) ||
            item.tag.toLowerCase().startsWith(searchValue.toLowerCase())
            ) {
            newItems.push(item);
        }
    }
    return newItems;
}