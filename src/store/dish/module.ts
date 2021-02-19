import getters from './getters.ts';
import actions from './actions.ts';
import mutations from './mutations.ts';

export default {
  namespaced: true,
  state: {
    dishes: [],
  },
  mutations,
  actions,
  getters,
};
