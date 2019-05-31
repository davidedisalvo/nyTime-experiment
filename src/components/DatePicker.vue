<template>
  <div>
    <v-date-picker
      v-model="picker"
      reactive="reactive"
      landscape
      color="orange"
      @click="getDate()"
    />
    <v-btn color="orange" @click="getList">Search</v-btn>
  </div>
</template>

<script>
  export default {
    data: () => ({
      picker: new Date().toISOString().substr(0, 10),
      landscape: false,
      reactive: false
    }),
    methods: {
      getList() {
        this.$store.dispatch("getting_books", this.picker);
      }
    }
  };
</script>

