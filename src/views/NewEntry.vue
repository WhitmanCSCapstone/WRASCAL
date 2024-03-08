<template>
  <v-container class="pt-8">
    <h1>New Entry Submission</h1><br>

    <!-- Metal selection options -->
    <v-radio-group v-model="metal_radio">
      <v-radio label="Enter a new metal" value="new"/>
      <v-radio label="Select an existing metal" value="existing"/>
    </v-radio-group>

    <!-- Metal Information -->
    <MetalInfo v-if="metal_radio === 'new'" :isLoading="isLoading" v-model:metal_id="this.metal_id" @entry="updateField"/>

    <!-- Ligand Information -->
    <LigandInfo v-if="metal_radio === 'new'" :isLoading="isLoading" @entry="updateField"/>

    <!-- Conditions Information -->
    <ConditionsInfo :isLoading="isLoading" @entry="updateField"/>    

    <!-- Equilibrium Expression Information -->
    <EquilibriumExpressionInfo v-if="metal_radio === 'new'" :isLoading="isLoading" @entry="updateField"/>    

    <!-- Constants Information -->
    <ConstantsInfo :isLoading="isLoading" @entry="updateField"/>    

    <!-- Uncertainties Information -->
    <UncertaintiesInfo :isLoading="isLoading" @entry="updateField"/>    

    <!-- Literature Information -->
    <LiteratureInfo :isLoading="isLoading" @entry="updateField"/>    

    <!-- Submit Button -->
    <v-btn id="sumbitbutton" type="submit" block class="mt-2" color="primary" @click="submitForm">Submit</v-btn>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MetalInfo from "../components/DataEntry/MetalInfo.vue"
import LigandInfo from "../components/DataEntry/LigandInfo.vue"
import ConditionsInfo from "../components/DataEntry/ConditionsInfo.vue"
import EquilibriumExpressionInfo from "../components/DataEntry/EquilibriumExpressionInfo.vue"
import ConstantsInfo from "../components/DataEntry/ConstantsInfo.vue"
import UncertaintiesInfo from "../components/DataEntry/UncertaintiesInfo.vue"
import LiteratureInfo from "../components/DataEntry/LiteratureInfo.vue"

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
  ligandInfo: any; // Define the structure of ligandInfo
  conditionsInfo: conditionsData;
  equilibriumExpressionInfo: any; // Define the structure of equilibriumExpressionInfo
  constantsInfo: any; // Define the structure of constantsInfo
  uncertaintiesInfo: any; // Define the structure of uncertaintiesInfo
  literaturesInfo: any; // Define the structure of literaturesInfo
}

// POSTs the data to backend API endpoint. Receiver is currently in wrascal-ts-2024
// repository, under src/controllers/rest/api/WriteController.ts
async function postJSON(data: writeRequest) {
  try {
    const response = await fetch("http://0.0.0.0:8083/rest/write/db", { // change before deploy
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

export default defineComponent({
  name: "NewEntryForm",
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
  },
  components: {
    MetalInfo,
    LigandInfo,
    ConditionsInfo,
    EquilibriumExpressionInfo,
    ConstantsInfo,
    UncertaintiesInfo,
    LiteratureInfo
  },
  data: () => ({
    // Metal information
    metal_radio: 'existing',
    metal_id: '',

    // Other fields
    // Define other fields if needed
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

      // Define other input objects if needed

      const writeData: writeRequest = {
        metalInfo: metalInput,
        conditionsInfo: conditionsInput,
        // Add other input objects
      }

      console.log("Sending Request")
      console.log(JSON.stringify(writeData))
      postJSON(writeData);
    },

    updateField(input: {fieldToChange: String, dataToSend: any}) {
      this.$data[input.fieldToChange] = input.dataToSend
    }
  }
})
</script>
