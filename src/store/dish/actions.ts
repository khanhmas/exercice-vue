export default {
    addAll(context, payload) {
        context.commit("addAll", payload);
    },
    add(context, payload) {
        context.commit("add", payload);
    },
    update(context, payload) {
        context.commit("update", payload);
    },
    delete(context, payload) {
        context.commit("delete", payload);
    }
};
