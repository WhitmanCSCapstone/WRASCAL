<template>
    <h2>Literatures Information</h2>
    <!-- Add your literatures information fields here -->
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent ({
      name: "LiteraturesInfo",
      props: {
          isLoading: {
              type: Boolean,
              default: false
          }
      },
      data: () => ({
          // Define your literatures information properties here
      }),
      methods: { 
          entry(fieldToChange: String, dataToSend: any) {
              this.$emit('entry', {'fieldToChange': fieldToChange, 'dataToSend': dataToSend})
          }
      }
  })
  </script>
  