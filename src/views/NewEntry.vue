<template>
  <v-container class="pt-8">
    <h1> New Ligand Submission </h1><br>
    <v-alert
      border="start"
      variant="tonal"
      type="info"
      closable
      close-label="Close Alert"
      title="Advance Search Tips"
      class="text-left"
    >
      All the fields below support multiple entries, you can input one or more entries split by: <b>,</b>
      For example: Fe, H, Ca
    </v-alert>

    <v-row class="pt-8">
      <v-col
        cols="12"
        md="12"
      >
        <v-text-field
          label="Ligand Name"
          prepend-icon="mdi-list-box-outline"
          variant="solo"
          :loading="isLoading ?? false"
          @input="onLigandNameUpdate"
          v-model:model-value="ligandNameValue"
        ></v-text-field>
      </v-col>

      <v-col
        cols="12"
        md="12"
      >
        <!-- TODO: FIGURE OUT HOW TO ENTER CHEMICAL DATA!!!-->
        <v-text-field
          label="Formula"
          prepend-icon="mdi-flask"
          variant="solo"
          :loading="isLoading ?? false"
          @input="onFormulaUpdate"
          v-model:model-value="formulaValue"
        ></v-text-field>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          label="Metal Charge"
          prepend-icon="mdi-flash"
          variant="solo"
          :loading="isLoading ?? false"
          @input="onMetalChargeUpdate"
          v-model:model-value="metalChargeValue"
        ></v-text-field>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          label="Ligand Charge"
          prepend-icon="mdi-lightning-bolt-outline"
          variant="solo"
          :loading="isLoading ?? false"
          @input="onLigandChargeUpdate"
          v-model:model-value="ligandChargeValue"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-btn type="submit" block class="mt-2" color="primary" @click="submitForm">Submit</v-btn>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: "NewEntryForm",
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    ligandName: {
      type: String,
      default:''
    },
    formula: {
      type: String,
      default: ''
    },
    metalCharge: {
      type: String,
      default: ''
    },
    ligandCharge: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    ligandNameValue: '',
    formulaValue: '',
    metalChargeValue: '',
    ligandChargeValue: ''
  }),
  methods: {

    onLigandNameUpdate(){
      this.$emit('update:ligandName', this.ligandNameValue);
    },
    
    onFormulaUpdate() {
      this.$emit('update:formula', this.formulaValue);
    },

    onMetalChargeUpdate() {
      this.$emit('update:metalCharge', this.metalChargeValue);
    },

    onLigandChargeUpdate() {
      this.$emit('update:ligandCharge', this.ligandChargeValue);
    },
    submitForm() {
      console.log("ligand name: " + this.ligandNameValue);
      console.log("formula: " + this.formulaValue);
      console.log("metalChargeValue: " + this.metalChargeValue);
      console.log("ligand charge: " + this.ligandChargeValue);
    }
  }
})
</script>
