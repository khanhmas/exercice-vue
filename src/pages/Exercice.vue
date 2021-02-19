<template>
  <q-pull-to-refresh @refresh="onRefresh">
    <q-page class="q-pa-lg">
      <div class="row q-gutter-lg">
        <dishe v-for="dishe in dishes" :key="dishe.id" :dishe="dishe" />

        <add-button @click="showFormDishe = true" />

        <q-dialog v-model="showFormDishe">
          <form-dishe action="add" />
        </q-dialog>
      </div>
    </q-page>
  </q-pull-to-refresh>
</template>

<script>
import { mapGetters } from "vuex";
import store from "../store/index";
import dishes from "../store/dish/static/data.ts";
import { addAllItems, getAllItems } from "../utils/localStorage.ts";
import CONF from "../config/app.config.ts";

export default {
  data() {
    return {
      showFormDishe: false,
    };
  },
  components: {
    dishe: require("components/Dishe.vue").default,
    "add-button": require("components/AddButton.vue").default,
    "form-dishe": require("components/FormDishe.vue").default
  },
  store,
  computed: {
    // Method 1: use classic approach
    // dishes() {
    //   return this.$store.getters['tasks/getDishes'];
    // }
    // Method 2: use mapGetters
    ...mapGetters({
      dishes: "tasks/getDishes"
    })
  },
  methods: {
    onRefresh(done) {
      setTimeout(() => {
        // Do the refresh stuff here
        console.log('refreshed');
        done();
      }, 1000);
    },
  },
  created() {
    // Only add default items if the LOCAL_STORAGE_KEY is not defined in localStorage
    addAllItems(CONF.LOCAL_STORAGE_KEY, dishes);

    const items = getAllItems(CONF.LOCAL_STORAGE_KEY);
    if (items !== null) {
      this.$store.dispatch("tasks/addAll", items);
    }
  }
};
</script>
