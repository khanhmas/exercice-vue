export default {
  delete(context, payload) {
    context.commit('delete', payload);
  }
};
