import { v4 as uuidv4 } from 'uuid';

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