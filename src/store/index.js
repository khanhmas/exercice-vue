import Vue from "vue";
import Vuex from "vuex";

// Importer votre module ici et l'ajouter au Store (ligne 19)
import dishModule from './dish/module.ts';

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

// export default function(/* { ssrContext } */) {
//   const Store = new Vuex.Store({
//     modules: {
//       // Votre module ici (mettre une virgule à la fin de la ligne 18)
//       tasks: dishModule
//     },

//     // enable strict mode (adds overhead!)
//     // for dev mode only
//     strict: process.env.DEV
//   });

//   return Store;
// }

/**
 * /!\ IMPORTANT: Need to initialize like this, not by the function above
 * Otherwise, whatever method we use to mutate the store, we always get the annoying warning
 * Even, the example on the documentation will cause the warning
 */
const Store = new Vuex.Store({
  modules: {
    // Votre module ici (mettre une virgule à la fin de la ligne 18)
    tasks: dishModule
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV
});

export default Store;
