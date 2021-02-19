import {addItem, updateItem, deleteItem} from '../../utils/localStorage.ts';
import CONF from '../../config/app.config.ts';

function getIndex(data, id) {
    return data.findIndex((item) => item.id === id);
}

export const ADD_ALL = 'addAll';
export const ADD = 'add';
export const UPDATE = 'update';
export const DELETE = 'delete';

export default {
    [ADD_ALL] (state, payload) {
        state.dishes = payload;
    },
    [ADD] (state, payload) {
        const item = {
            ...payload,
            id: state.dishes.length + 1,
        };
        state.dishes.push(item);
        addItem(CONF.LOCAL_STORAGE_KEY, item);
    },
    [UPDATE] (state, payload) {
        const index = getIndex(state.dishes, payload.id);
        const dish = state.dishes[index];
        Object.keys(state.dishes[index]).forEach((key) => {
            dish[key] = payload[key];
        });
        updateItem(CONF.LOCAL_STORAGE_KEY, dish);
    },
    [DELETE] (state, payload) {
        const index = getIndex(state.dishes, payload.id);
        deleteItem(CONF.LOCAL_STORAGE_KEY, index);
        state.dishes.splice(index, 1);
    }
}