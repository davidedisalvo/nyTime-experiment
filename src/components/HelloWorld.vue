<template>
  <div>
    <div>
      <v-date-picker v-model="picker" reactive="reactive" landscape color="red" @click="getDate()"></v-date-picker>
    </div>
    <v-btn @click="getList">Search</v-btn>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
        picker: new Date().toISOString().substr(0, 10),
        landscape: false,
        reactive: false
    }),
    methods: {
      getList() {
      this.$store.dispatch('getting_books', this.picker)
   
    }
    }
}
</script>

