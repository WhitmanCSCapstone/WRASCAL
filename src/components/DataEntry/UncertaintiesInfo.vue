<template>
    <h2>Uncertainties Information</h2>
    <!-- Add your uncertainties information fields here -->
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent ({
      name: "UncertaintiesInfo",
      props: {
          isLoading: {
              type: Boolean,
              default: false
          }
      },
      data: () => ({
          // Define your uncertainties information properties here
      }),
      methods: { 
          entry(fieldToChange: String, dataToSend: any) {
              this.$emit('entry', {'fieldToChange': fieldToChange, 'dataToSend': dataToSend})
          }
      }
  })
  </script>
  