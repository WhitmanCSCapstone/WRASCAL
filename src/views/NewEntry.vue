import Dropdown from 'primevue/dropdown';

<template>
  <v-container class="pt-8">
    <h1> New Ligand Submission </h1><br>
    <h2> Metal Information </h2>
    <v-row class="pt-8">
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          label="Metal"
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
      <!----<v-col
        cols="12"
        md="6"
      >
      <v-combobox
        label="Metal Select"
      ></v-combobox>

      </v-col> -->
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
        <!-- TODO: FIGURE OUT HOW TO ENTER CHEMICAL DATA!!!-->
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
    </v-row>

    <v-btn id="sumbitbutton" type="submit" block class="mt-2" color="primary" @click="submitForm">Submit</v-btn>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { AccessTokenResponse } from '@/models/UserData'

interface dataEntry {
  metalName: String,
  metalCharge: String,
  ligandName: String,
  ligandFormua: String,
  ligandFile: String,
  protonationLevel: String,
  constantType: String,
  equilibriumExpression: String,
  temperature: String,
  ionicStrength: String,
  footnote: String,
  value: String,
  referenceEntryCode: String,
  referenceDOIValue: String
}

interface metalEntry {
  metalName: String,
  legacy_string: String
}

async function postJSON(data: dataEntry) {
  console.log(getUserID());
  try {
    const response = await fetch("localhost:3003/metals", {
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
    metalName: {
      type: String,
      default: ''
    },
    metalCharge: {
      type: String,
      default: ''
    },
    ligandName: {
      type: String,
      default:''
    },
    ligandFormula: {
      type: String,
      default: ''
    },
    fileName: {
      type: String,
      default: ''
    },
    protonationLevel: {
      type: String,
      default: ''
    },
    constantType: {
      type: String,
      default: ''
    },
    equilibriumExpression: {
      type: String,
      default: ''
    },
    temperature: {
      type: String,
      default: ''
    },
    ionicStrength: {
      type: String,
      default: ''
    },
    footnote: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    entryCode: {
      type: String,
      default: ''
    },
    DOI: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    metalNameValue: '',
    metalChargeValue: '',
    ligandNameValue: '',
    ligandFormulaValue: '',
    ligandFileValue: '',
    protonationLevelValue: '',
    constantTypeValue: '',
    equilibriumExpressionValue: '',
    temperatureValue: '',
    ionicStrengthValue: '',
    footnoteValue: '',
    valueValue: '',
    entryCodeValue: '',
    DOIValue: ''
  }),
  methods: {
    onMetalNameUpdate() {
      this.$emit('update:metalName', this.metalNameValue);
    },
    onMetalChargeUpdate() {
      this.$emit('update:metalCharge', this.metalChargeValue);
    },
    onLigandNameUpdate(){
      this.$emit('update:ligandName', this.ligandNameValue);
    },
    onLigandFormulaUpdate() {
      this.$emit('update:ligandFormula', this.ligandFormulaValue);
    },
    onLigandFileUpdate() {
      this.$emit('update:fileName', this.ligandFileValue);
    },
    onProtonationLevelUpdate() {
      this.$emit('update:protonationLevel', this.protonationLevelValue);
    },
    onConstantTypeUpdate() {
      this.$emit('update:constantType', this.constantTypeValue);
    },
    onEquilibriumExpressionUpdate() {
      this.$emit('update:equilibriumExpression', this.equilibriumExpressionValue);
    },
    onTemperatureUpdate() {
      this.$emit('udpate:temperature', this.temperatureValue);
    },
    onIonicStrengthUpdate() {
      this.$emit('update:ionicStrenth', this.ionicStrengthValue);
    },
    onFootnoteUpdate() {
      this.$emit('update:footnote', this.footnoteValue);
    },
    onValueUpdate() {
      this.$emit('update:value', this.valueValue);
    },
    onEntryCodeUpdate() {
      this.$emit('update:entryCode', this.entryCodeValue);
    },
    onDOIupdate() {
      this.$emit('update:DOI', this.DOIValue);
    },
    submitForm() {

      // this.$emit('update:isLoading', true)

      const data: dataEntry = {
        metalName: this.metalNameValue,
        metalCharge: this.metalChargeValue,
        ligandName: this.ligandNameValue,
        ligandFormua: this.ligandFormulaValue,
        ligandFile: this.ligandFileValue,
        protonationLevel: this.protonationLevelValue,
        constantType: this.constantTypeValue,
        equilibriumExpression: this.equilibriumExpressionValue,
        temperature: this.temperatureValue,
        ionicStrength: this.ionicStrengthValue,
        footnote: this.footnoteValue,
        value: this.valueValue,
        referenceEntryCode: this.entryCodeValue,
        referenceDOIValue: this.DOIValue
      };

      const metalData: metalEntry = {
        metalName: this.metalNameValue,
        legacy_string: this.metalChargeValue
      }

      console.log("what if we kissed")
      console.log("data: " + JSON.stringify(data))

      postJSON(data);
    }
  }
})
</script>
