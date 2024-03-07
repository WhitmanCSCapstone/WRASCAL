<template>
    <h2>Constants Information</h2>
    <!-- Add your constants information fields here -->
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent ({
      name: "ConstantsInfo",
      props: {
          isLoading: {
              type: Boolean,
              default: false
          }
      },
      data: () => ({
          // Define your constants information properties here
      }),
      methods: { 
          entry(fieldToChange: String, dataToSend: any) {
              this.$emit('entry', {'fieldToChange': fieldToChange, 'dataToSend': dataToSend})
          }
      }
  })
  </script>
  