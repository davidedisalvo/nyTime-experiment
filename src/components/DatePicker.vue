<template>
<div class="general-box">
    <div class="date-picker">
    <v-date-picker
      v-model="picker"
      reactive="reactive"
      color="orange"
      @click="getDate()"
      class="calendar"
      :class="{halfWidth : future}"
    />
    <v-btn color="orange" @click="getList">Search</v-btn>
   
    
  </div>
   <div class="box">

      <v-alert
      :value="true"
      type="error"
      v-if="future"
      color= 'orange'
    >
Sorry we can't find Best seller list in the future, unfortunately we don't have a T.A.R.D.I.S    </v-alert>

    </div>
</div>

</template>

<script>
  export default {
    data: () => ({
      picker: new Date().toISOString().substr(0, 10),
      landscape: false,
      reactive: false,
      future:false
    }),
    methods: {
      getList() {
        console.log(this.picker)
        console.log(new Date().toISOString().substr(0, 10))
        if(this.picker > new Date().toISOString().substr(0, 10)) {
          this.future = true
        } else {
        this.future = false
        this.$store.dispatch("getting_books", this.picker);


        }
      }
    }
  };
</script>
<style lang="scss" scoped>
.calendar {
  display: block;
}

.date-picker {
  max-width: 100%;
  margin-top: 50px;

}
.halfWidth {
      width: 50% !important;
    margin: 0 auto !important;
    margin-top: 50px !important;
      @media only screen and (max-width: 599px) {
      width: 100% !important;

  }

}

.v-card>:last-child:not(.v-btn):not(.v-chip) {
  @media only screen and (max-width: 599px) {
      width: 100% !important;

  }
}

.v-alert.v-alert {
  padding: 0;
}
</style>


