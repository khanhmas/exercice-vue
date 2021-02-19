<template>
  <q-card class="form-card">
    <q-card-section>
      <div class="text-h6 heading">{{ action }} Plat</div>
    </q-card-section>

    <q-card-section>
      <div class="row q-mb-md">
        <q-input
          filled
          v-model="dishe.name"
          label="Nom"
          class="col"
          :rules="[
            val =>
              val.length <= MAX_NAME ||
              `Obligatoire avec un maximum de ${MAX_NAME} caractères.`
          ]"
        />
      </div>

      <div class="row q-mb-md">
        <q-input
          filled
          v-model="dishe.description"
          label="Description"
          type="textarea"
          class="col"
          :rules="[
            val =>
              val === '' ||
              val.length <= MAX_DESCRIPTION ||
              `Obligatoire avec un maximum de ${MAX_DESCRIPTION} caractères.`
          ]"
        />
      </div>

      <div class="row q-mb-md">
        <q-input
          filled
          v-model="dishe.image"
          label="URL de l'image"
          class="col"
          :rules="[
            checkImgUrl()
          ]"
        />
        <q-img
          :src="dishe.image ? dishe.image : 'statics/image-placeholder.png'"
          class="q-ml-sm"
          contain
        />
      </div>

      <div class="q-mb-md">
        <div class="row">
          <p class="q-mb-none">Note:</p>
        </div>
        <div class="row">
          <q-rating v-model="dishe.note" size="2em" color="orange" />
        </div>
      </div>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn label="Annuler" color="grey" v-close-popup />
      <q-btn v-if="isValid() === true" label="Sauver" color="primary" @click="onSave()" v-close-popup />
      <q-btn v-else disable label="Sauver" color="grey" v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<script>
import CONF from "../config/app.config.ts";

export default {
  props: ["action", "dishInstance"],
  data() {
    return {
      dishe: {
        name: "",
        description: "",
        note: 1,
        image: ""
      },
      MAX_NAME: CONF.MAX_NAME,
      MAX_DESCRIPTION: CONF.MAX_DESCRIPTION
    };
  },
  created() {
    if (this.dishInstance != null) {
      // different from null and undefined
      this.dishe = { ...this.dishInstance };
    }
  },
  methods: {
    onSave() {
      if (this.isValid() === true) {
        const action = "tasks/" + this.action;
        this.$store.dispatch(action, this.dishe);
      } else {
        alert(
          `Le nom de l'article doit contenir ${
            this.MAX_NAME
          } caractères maximum et la description doit contenir ${
            this.MAX_DESCRIPTION
          } caractères maximum `
        );
      }
    },
    checkImgUrl() {
      return val => val === '' || CONF.IMAGE_URL_REGEX.test(val) || 'Image url n\'est pas valid';
    },
    isValidImgUrl(val) {
      return val === '' || CONF.IMAGE_URL_REGEX.test(val);
    },
    isValid() {
      /**
       * Idea: Make the validator configurable just by adding new fields into the config
       */
      let res = true;
      for (const validator of CONF.VALIDATORS) {
        const criterias = validator.criterias;
        const field = validator.field;
        for (const criteria of criterias) {
          if (criteria.value != null) {
            switch (criteria.name) {
              case 'required':
                if (criteria.value === true)
                  res = res && this.dishe[field] !== '';
                break;
              case 'maxLength':
                if (typeof criteria.value === 'number')
                  res = res && this.dishe[field].length <= criteria.value;
                break;
              default:
                break;
            }
          }
        }
      }
      return res && this.isValidImgUrl(this.dishe.image);
    }
  }
};
</script>

<style>
.form-card {
  min-width: 400px;
}
.form-card .heading {
  text-transform: capitalize;
}
.form-card .q-card-section {
  width: 100%;
}
.thumbnail {
  max-width: 50px;
  max-height: 50px;
}
.form-card .q-img {
  height: 56px;
  width: 56px;
  border-radius: 10px;
}
.form-card .q-img__image {
  background-size: cover !important;
}
.form-card .q-rating__icon {
  opacity: 0.2;
}
.form-card .q-rating__icon--active {
  opacity: 1;
}
</style>
