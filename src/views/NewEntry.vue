import Dropdown from 'primevue/dropdown';

<template>
  <v-container class="pt-8">
    <h1> New Entry Submission </h1><br>
    
    <v-radio-group v-model="metal_radio">
      <v-radio label="Enter a new metal" value="new"/>
      <v-radio label="Select an existing metal" value="existing"/>
    </v-radio-group>

    <MetalInfo v-if="metal_radio == 'new'" :isLoading="isLoading" v-model:metal_id="this.metal_id" @entry="updateField"/>

    <ConditionsInfo :isLoading="isLoading" @entry="updateField"/>    

    <v-btn id="sumbitbutton" type="submit" block class="mt-2" color="primary" @click="submitForm">Submit</v-btn>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MetalInfo from "../components/DataEntry/MetalInfo.vue"
import ConditionsInfo from "../components/DataEntry/ConditionsInfo.vue"
import ChemicalEntry from "./ChemicalEntry.vue"

interface metalData {
  central_element: string;
  formula_string: string;
  charge: number;
}

interface conditionsData {
  constant_kind: string;
  temperature: number;
  temperature_varies: boolean;
  ionic_strength: number;
}

// will become own file eventually
interface writeRequest {
  metalInfo: metalData;
  conditionsInfo: conditionsData;
}

// POSTs the data to backend API endpoint. Reciever is currently in wrascal-ts-2024
// repository, under src/controllers/rest/api/WriteController.ts
async function postJSON(data: writeRequest) {
  try {
    const response = await fetch("http://0.0.0.0:8083/rest/write/db", { // change before deoloy
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
  components:{ MetalInfo , ConditionsInfo, ChemicalEntry},
  data: () => ({
    // all data is prefixed_ with the component it came from!

    // metal information
    metal_radio: 'existing',
    metal_id: '',
    metal_central_element: '',
    metal_formula_string: '',
    metal_charge: '',

    // conditions information
    conditions_radio: '',
    conditions_id: '',
    conditions_constant_kind: '',
    conditions_temperature: '',
    conditions_temperature_varies: false,
    conditions_ionic_strength: '',
  }),
  methods: {
    submitForm() {

      const metalInput: metalData = {
        central_element: this.metal_central_element,
        formula_string: this.metal_formula_string,
        charge: parseInt(this.metal_charge)
      }

      const conditionsInput: conditionsData = {
        constant_kind: this.conditions_constant_kind,
        temperature: parseInt(this.conditions_temperature),
        temperature_varies: this.conditions_temperature_varies,
        ionic_strength: parseInt(this.conditions_ionic_strength)
      }

      // turn the data into a writeRequest object
      const writeData: writeRequest = {
        metalInfo: metalInput,
        conditionsInfo: conditionsInput
      }

      console.log("Sending Request")
      console.log(JSON.stringify(writeData))
      postJSON(writeData);
    },

    updateField(input: {fieldToChange: String, dataToSend: any}) {
      // I should be sent to live on a butterfly farm for this line
      this.$data[input.fieldToChange] = input.dataToSend
    }
  }
})
</script>