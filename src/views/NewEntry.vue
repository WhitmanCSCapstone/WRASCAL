import Dropdown from 'primevue/dropdown';

<template>
  <v-container class="pt-8">
    <h1> New Ligand Submission </h1><br>

    <h2> Metal Information</h2>
    
    <!-- <v-radio-group v-model="metal_radio">
      <v-radio label="Enter a new metal" value="new"/>
      <v-radio label="Select an existing metal" value="existing"/>
    </v-radio-group> -->

    <MetalInfo v-if="metal_radio == 'new'" :isLoading="isLoading" v-model:metal_id="this.metal_id"/>

    <!-- <v-row class="pt-8">
      <v-col
        cols="12"
        md="2"
      >
      <v-text-field
        label="Metal ID"
        prepend-icon="mdi-gold"
        variant="solo"
        :loading="isLoading ?? false"
        v-model:model-value="metal_id"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md = "2"
      >
      <v-text-field
        label="Central Element"
        prepend-icon="mdi-gold"
        variant="solo"
        :loading="isLoading ?? false"
        v-model:model-value="metal_central_element"
        ></v-text-field>
      </v-col>
      <v-col
      cols="12"
      md = "2"
      >
      <v-text-field
        label="Charge"
        prepend-icon="mdi-gold"
        variant="solo"
        :loading="isLoading ?? false"
        v-model:model-value="metal_charge"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md = "6"
      >
      <v-text-field
        label="Formula String"
        prepend-icon="mdi-gold"
        variant="solo"
        :loading="isLoading ?? false"
        v-model:model-value="metal_formula_string"
        ></v-text-field>
      </v-col>
    </v-row> -->
    <ConditionsInfo :isLoading="isLoading" @entry="updateField"/>

    <v-btn id="testButton" @click="testMethod">TEST BUTTON</v-btn>

    <v-btn id="sumbitbutton" type="submit" block class="mt-2" color="primary" @click="submitForm">Submit</v-btn>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MetalInfo from "../components/DataEntry/MetalInfo.vue"
import ConditionsInfo from "../components/DataEntry/ConditionsInfo.vue"


interface writeRequest {
  metal_central_element: string;
  metal_formula_string: string;
  metal_charge: number;
  conditions_constant_kind: string;
  conditions_temperature: number;
  conditions_temperature_varies: boolean;
  conditions_ionic_strength: number;
}

// POSTs the data to backend API endpoint. Reciever is currently in wrascal-ts-2024
// repository, under src/controllers/rest/api/WriteController.ts
async function postJSON(data: writeRequest) {
  try {
    const response = await fetch("http://0.0.0.0:8083/rest/write/db", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Defines the HTML so that it can be used as a component in the vue frame on the site
export default defineComponent({
  name: "NewEntryForm",
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
  },
  components:{ MetalInfo , ConditionsInfo},
  data: () => ({
    // ALL DATA IS PREFIXED_ with the component it came from!

    // metal information
    metal_central_element: '',
    metal_formula_string: '',
    metal_charge: '',

    // conditions information
    conditions_radio: '',
    conditions_constant_kind: '',
    conditions_temperature: '',
    conditions_temperature_varies: false,
    conditions_ionic_strength: '',
  }),
  methods: {
    submitForm() {
      // turn the data into a writeRequest object
      const writeData: writeRequest = {
        metal_central_element: this.metal_central_element,
        metal_formula_string: this.metal_formula_string,
        metal_charge: parseInt(this.metal_charge),
        conditions_constant_kind: this.conditions_constant_kind,
        conditions_temperature: parseInt(this.conditions_temperature),
        conditions_temperature_varies: this.conditions_temperature_varies,
        conditions_ionic_strength: parseInt(this.conditions_ionic_strength)
      }

      console.log("Sending Request")
      console.log(JSON.stringify(writeData))
      postJSON(writeData);
    },
    updateField(input: {fieldToChange: String, dataToSend: any}) {
      // doing this should make alan turing revive and call a hit on you
      this.$data[input.fieldToChange] = input.dataToSend
    },
    testMethod() {
      console.log("button pushed")
      this.conditions_constant_kind = 'yarr'
    }
  }
})
</script>