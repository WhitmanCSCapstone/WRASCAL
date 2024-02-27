import Dropdown from 'primevue/dropdown';

<template>
  <v-container class="pt-8">
    <h1> New Ligand Submission </h1><br>

    <h2> Metal Information </h2>
    <v-row class="pt-8">
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
    </v-row>

    <v-btn id="sumbitbutton" type="submit" block class="mt-2" color="primary" @click="submitForm">Submit</v-btn>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// interface dataEntry {
//   metal_id: number,
//   metal_central_element: string,
//   metal_formula_string: string,
//   metal_charge: number,
//   ligand_id: number,
//   ligand_name: string,
//   ligand_mol_formula: string,
//   ligand_charge: string,
//   ligand_form: string,
//   categories: string,
//   eq_id: number,
//   eq_expression_string: string,
//   eq_products: string,
//   eq_reactants: string,
//   eq_value: number,
//   eq_significant_figures: number,
//   conditions_id: number,
//   conditions_temperature: number,
//   conditions_ionic_strength: number
// }

interface writeRequestExample {
  metal_id: number;
  metal_central_element: String;
  metal_formula_string: string;
  metal_charge: number;
}

async function postJSON(data: writeRequestExample) {
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

export default defineComponent({
  name: "NewEntryForm",
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
  },
  //   metalName: {
  //     type: String,
  //     default: ''
  //   },
  //   metalCharge: {
  //     type: String,
  //     default: ''
  //   },
  //   ligandName: {
  //     type: String,
  //     default:''
  //   },
  //   ligandFormula: {
  //     type: String,
  //     default: ''
  //   },
  //   fileName: {
  //     type: String,
  //     default: ''
  //   },
  //   protonationLevel: {
  //     type: String,
  //     default: ''
  //   },
  //   constantType: {
  //     type: String,
  //     default: ''
  //   },
  //   equilibriumExpression: {
  //     type: String,
  //     default: ''
  //   },
  //   temperature: {
  //     type: String,
  //     default: ''
  //   },
  //   ionicStrength: {
  //     type: String,
  //     default: ''
  //   },
  //   footnote: {
  //     type: String,
  //     default: ''
  //   },
  //   value: {
  //     type: String,
  //     default: ''
  //   },
  //   entryCode: {
  //     type: String,
  //     default: ''
  //   },
  //   DOI: {
  //     type: String,
  //     default: ''
  //   }
  // },
  data: () => ({
    metal_id: '',
    metal_central_element: '',
    metal_formula_string: '',
    metal_charge: ''
    // ligand_id: 0,
    // ligand_name: '',
    // ligand_mol_formula: '',
    // ligand_charge: '',
    // ligand_form: '',
    // categories: '',
    // eq_id: 0,
    // eq_expression_string: '',
    // eq_products: '',
    // eq_reactants: '',
    // eq_value: 0,
    // eq_significant_figures: 0,
    // conditions_id: 0,
    // conditions_temperature: 0,
    // conditions_ionic_strength: 0
  }),
  methods: {
    submitForm() {

      // this.$emit('update:isLoading', true)
    
      // const allVars: dataEntry = {
      //   id: 999,
      //   metalName: this.metalNameValue,
      //   metalCharge: this.metalChargeValue,
      //   ligandName: this.ligandNameValue,
      //   ligandFormula: this.ligandFormulaValue,
      //   ligandFile: this.ligandFileValue,
      //   protonationLevel: this.protonationLevelValue,
      //   constantType: this.constantTypeValue,
      //   equilibriumExpression: this.equilibriumExpressionValue,
      //   temperature: this.temperatureValue,
      //   ionicStrength: this.ionicStrengthValue,
      //   footnote: this.footnoteValue,
      //   value: this.valueValue,
      //   referenceEntryCode: this.entryCodeValue,
      //   referenceDOIValue: this.DOIValue
      // };
      const exampleData: writeRequestExample = {
        metal_id: parseInt(this.metal_id),
        metal_central_element: this.metal_central_element,
        metal_formula_string: this.metal_formula_string,
        metal_charge: parseInt(this.metal_charge)
        // metal_central_element = this.metal_central_element,
        // metal_formula_string = this.metal_formula_string,
        // metal_charge = this.metal_charge
      }

      //postJSON(data);
      console.log("Sending Request")
      console.log(JSON.stringify(exampleData))
      postJSON(exampleData);
    }
  }
})
</script>