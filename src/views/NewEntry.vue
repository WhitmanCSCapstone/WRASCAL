<template>
  <v-container class="pt-8">

    <h1> New Entry Submission </h1><br>

    <MetalInfo  :isLoading="isLoading" v-model:metal_id="this.metal_id" @entry="updateField"/>

    <LigandInfo :isLoading="isLoading" @entry="updateField"/>

    <ConditionsInfo :isLoading="isLoading" @entry="updateField"/>

    <ConstantsInfo :isLoading="isLoading" @entry="updateField"/>

    <UncertaintiesInfo :isLoading="isLoading" @entry="updateField"/>

    <LiteraturesInfo :isLoading="isLoading" @entry="updateField"/>

    <FootnotesInfo :isLoading="isLoading" @entry="updateField"/>

    <v-btn id="sumbitbutton" type="submit" block class="mt-2" color="primary" @click="submitForm">Submit</v-btn>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MetalInfo from "@/components/DataEntry/MetalInfo.vue";
import ConditionsInfo from "@/components/DataEntry/ConditionsInfo.vue";
import ConstantsInfo from "@/components/DataEntry/ConstantsInfo.vue";
import LigandInfo from '@/components/DataEntry/LigandInfo.vue';
import FootnotesInfo from '@/components/DataEntry/FootnotesInfo.vue';
import UncertaintiesInfo from '@/components/DataEntry/UncertaintiesInfo.vue';
import LiteraturesInfo from '@/components/DataEntry/LiteraturesInfo.vue';

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
function getUserID() {
  const user = window.localStorage.getItem("sb-eauyarvlibdxezijtoyx-auth-token") || '';
  const accessTokenResponse: AccessTokenResponse = JSON.parse(user);

  return accessTokenResponse.user.id;
}

export default defineComponent({
  name: "NewEntryForm",
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
  },
  components:{ MetalInfo , ConditionsInfo, ConstantsInfo, LigandInfo, FootnotesInfo, UncertaintiesInfo, LiteraturesInfo},
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
