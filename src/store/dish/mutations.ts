export default {
    delete(state, payload) {
        const cloneDishes = [...state.dishes];
        const index = cloneDishes.findIndex((item) => item.id === payload.id);
        cloneDishes.splice(index, 1);
        state.dishes = [...cloneDishes];
;    }
}