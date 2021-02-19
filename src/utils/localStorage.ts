export function addAllItems(key, items) {
    if (localStorage.getItem(key) === null)
        localStorage.setItem(key, JSON.stringify(items));
}

export function getAllItems(key) {
    const items = JSON.parse(localStorage.getItem(key));
    return items;
}

export function addItem(key, item) {
    const items = getAllItems(key);
    if (items !== null) {
        items.push(item);
        localStorage.setItem(key, JSON.stringify(items));
    }
}


export function updateItem(key, item) {
    const items = getAllItems(key);
    if (items !== null) {
        const index = items.findIndex(value => item.id === value.id);
        // Object.keys(items[index]).forEach((key) => {
        //     items[index][key] = item[key];
        // });
        items[index] = item;
        localStorage.setItem(key, JSON.stringify(items));
    }
}


export function deleteItem(key, index) {
    const items = getAllItems(key);
    if (items !== null) {
        // const index = items.findIndex(value => item.id === value.id);
        items.splice(index, 1);
        localStorage.setItem(key, JSON.stringify(items));
    }
}