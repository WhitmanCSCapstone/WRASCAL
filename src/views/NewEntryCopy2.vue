import Dropdown from 'primevue/dropdown';

<template>
  <v-container class="pt-8">
    <h1> New Ligand Submission </h1><br>

    <h2> Metal Information </h2>
    <v-row class="pt-8">
      <v-col
        cols="12"
        md="3"
      >
      <v-text-field
        label="Metal ID"
        prepend-icon="mdi-gold"
        variant="solo"
        :loading="isLoading ?? false"
        v-model:model-value="metal_id"
        ></v-text-field>
      </v-col>
    </v-row>

    <!-- <h2> Metal Information </h2>
    <v-row class="pt-8">
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          label="Metal ID"
          prepend-icon="mdi-gold"
          variant="solo"
          :loading="isLoading ?? false"
          @input="onMetalNameUpdate"
          v-model:model-value="metalNameValue"
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
      <v-combobox
        label="Metal Select"
      ></v-combobox>
    
      </v-col>
    </v-row>

    <h2> Ligand Information</h2>
    <v-row class="pt-8">
      <v-col
        cols="12"
        md="12"
      >
        <v-text-field
          label="Name"
          prepend-icon="mdi-pen"
          variant="solo"
          :loading="isLoading ?? false"
          @input="onLigandNameUpdate"
          v-model:model-value="ligandNameValue"
        ></v-text-field>
      </v-col><br>

      <v-col
        cols="12"
        md="4"
      >
        <!TODO: FIGURE OUT HOW TO ENTER CHEMICAL DATA!!!
        <v-text-field
          label="Formula"
          prepend-icon="mdi-flask"
          variant="solo"
          :loading="isLoading ?? false"
          @input="onLigandFormulaUpdate"
          v-model:model-value="ligandFormulaValue"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <v-text-field
          label=".mol File (TODO FIX)"
          prepend-icon="mdi-file-cabinet"
          variant="solo"
          :loading="isLoading ?? false"
          @input="onLigandFileUpdate"
          v-model:model-value="ligandFileValue"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <v-text-field
          label="Protonation Level"
          prepend-icon="mdi-atom-variant"
          variant="solo"
          :loading="isLoading ?? false"
          @input="onProtonationLevelUpdate"
          v-model:model-value="protonationLevelValue"
        ></v-text-field>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          label="Constant Type"
          prepend-icon="mdi-atom-variant"
          variant="solo"
          :loading="isLoading ?? false"
          @input="onConstantTypeUpdate"
          v-model:model-value="constantTypeValue"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          label="Equilibrium Expression"
          prepend-icon="mdi-atom-variant"
          variant="solo"
          :loading="isLoading ?? false"
          @input="onEquilibriumExpressionUpdate"
          v-model:model-value="equilibriumExpressionValue"
        ></v-text-field>
      </v-col>
    </v-row>

    <h2> Conditions </h2>
    <v-row class="pt-8">
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          label="Temperature"
          prepend-icon="mdi-atom-variant"
          variant="solo"
          :loading="isLoading ?? false"
          @input="onTemperatureUpdate"
          v-model:model-value="temperatureValue"
        ></v-text-field>

        <v-text-field
          label="Ionic Strength"
          prepend-icon="mdi-atom-variant"
          variant="solo"
          :loading="isLoading ?? false"
          @input="onIonicStrengthUpdate"
          v-model:model-value="ionicStrengthValue"
        ></v-text-field>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          label="Footnote"
          prepend-icon="mdi-atom-variant"
          variant="solo"
          :loading="isLoading ?? false"
          @input="onFootnoteUpdate"
          v-model:model-value="footnoteValue"
        ></v-text-field>

        <v-text-field
            label="Value"
            prepend-icon="mdi-atom-variant"
            variant="solo"
            :loading="isLoading ?? false"
            @input="onValueUpdate"
            v-model:model-value="valueValue"
        ></v-text-field>
      </v-col>
    </v-row>

    <h2> Reference Information </h2>
    <v-row class="pt-8">
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          label="Entry Code"
          prepend-icon="mdi-atom-variant"
          variant="solo"
          :loading="isLoading ?? false"
          @input="onEntryCodeUpdate"
          v-model:model-value="entryCodeValue"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          label="DOI"
          prepend-icon="mdi-atom-variant"
          variant="solo"
          :loading="isLoading ?? false"
          @input="onDOIupdate"
          v-model:model-value="DOIValue"
        ></v-text-field>
  
      </v-col>
    </v-row> -->

    <v-btn id="sumbitbutton" type="submit" block class="mt-2" color="primary" @click="submitForm">Submit</v-btn>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface dataEntry {
  metal_id: number,
  metal_central_element: string,
  metal_formula_string: string,
  metal_charge: number,
  ligand_id: number,
  ligand_name: string,
  ligand_mol_formula: string,
  ligand_charge: string,
  ligand_form: string,
  categories: string,
  eq_id: number,
  eq_expression_string: string,
  eq_products: string,
  eq_reactants: string,
  eq_value: number,
  eq_significant_figures: number,
  conditions_id: number,
  conditions_temperature: number,
  conditions_ionic_strength: number
}

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
    metal_id: 0,
    metal_central_element: '',
    metal_formula_string: '',
    metal_charge: 0,
    ligand_id: 0,
    ligand_name: '',
    ligand_mol_formula: '',
    ligand_charge: '',
    ligand_form: '',
    categories: '',
    eq_id: 0,
    eq_expression_string: '',
    eq_products: '',
    eq_reactants: '',
    eq_value: 0,
    eq_significant_figures: 0,
    conditions_id: 0,
    conditions_temperature: 0,
    conditions_ionic_strength: 0
  }),
  methods: {
    // onMetalNameUpdate() {
    //   this.$emit('update:metalName', this.metalNameValue);
    // },
    // onMetalChargeUpdate() {
    //   this.$emit('update:metalCharge', this.metalChargeValue);
    // },
    // onLigandNameUpdate(){
    //   this.$emit('update:ligandName', this.ligandNameValue);
    // },
    // onLigandFormulaUpdate() {
    //   this.$emit('update:ligandFormula', this.ligandFormulaValue);
    // },
    // onLigandFileUpdate() {
    //   this.$emit('update:fileName', this.ligandFileValue);
    // },
    // onProtonationLevelUpdate() {
    //   this.$emit('update:protonationLevel', this.protonationLevelValue);
    // },
    // onConstantTypeUpdate() {
    //   this.$emit('update:constantType', this.constantTypeValue);
    // },
    // onEquilibriumExpressionUpdate() {
    //   this.$emit('update:equilibriumExpression', this.equilibriumExpressionValue);
    // },
    // onTemperatureUpdate() {
    //   this.$emit('udpate:temperature', this.temperatureValue);
    // },
    // onIonicStrengthUpdate() {
    //   this.$emit('update:ionicStrenth', this.ionicStrengthValue);
    // },
    // onFootnoteUpdate() {
    //   this.$emit('update:footnote', this.footnoteValue);
    // },
    // onValueUpdate() {
    //   this.$emit('update:value', this.valueValue);
    // },
    // onEntryCodeUpdate() {
    //   this.$emit('update:entryCode', this.entryCodeValue);
    // },
    // onDOIupdate() {
    //   this.$emit('update:DOI', this.DOIValue);
    // },
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
        metal_id = this.metal_id,
        metal_central_element = this.metal_central_element,
        metal_formula_string = this.metal_formula_string,
        metal_charge = this.metal_charge
      }

      //postJSON(data);
      postJSON(exampleData);
    }
  }
})
</script>