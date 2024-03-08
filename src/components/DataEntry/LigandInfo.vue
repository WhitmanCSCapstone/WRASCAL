<template>
    <h2>Ligand Information</h2>
    <v-row class="pt-8">
        <!-- Ligand Name -->
        <v-col cols="12" md="6">
            <v-text-field
                label="Ligand Name"
                prepend-icon="mdi-gold"
                variant="solo"
                :loading="isLoading ?? false"
                @change="entry('ligand_name', ligand_name)"
                v-model:model-value="ligand_name"
            ></v-text-field>
        </v-col>

        <!-- Molecular Formula Charge -->
        <v-col cols="12" md="6">
            <v-text-field
                label="Molecular Formula Charge"
                prepend-icon="mdi-gold"
                variant="solo"
                :loading="isLoading ?? false"
                @change="entry('molecular_formula_charge', molecular_formula_charge)"
                v-model:model-value="molecular_formula_charge"
            ></v-text-field>
        </v-col>

        <!-- Ligand Form Protonation -->
        <v-col cols="12" md="6">
            <v-text-field
                label="Ligand Form Protonation"
                prepend-icon="mdi-gold"
                variant="solo"
                :loading="isLoading ?? false"
                @change="entry('ligand_form_protonation', ligand_form_protonation)"
                v-model:model-value="ligand_form_protonation"
            ></v-text-field>
        </v-col>

        <!-- Ligand Form Charge -->
        <v-col cols="12" md="6">
            <v-text-field
                label="Ligand Form Charge"
                prepend-icon="mdi-gold"
                variant="solo"
                :loading="isLoading ?? false"
                @change="entry('ligand_form_charge', ligand_form_charge)"
                v-model:model-value="ligand_form_charge"
            ></v-text-field>
        </v-col>

        <!-- Ligand Charge -->
        <v-col cols="12" md="6">
            <v-text-field
                label="Ligand Charge"
                prepend-icon="mdi-gold"
                variant="solo"
                :loading="isLoading ?? false"
                @change="entry('ligand_charge', ligand_charge)"
                v-model:model-value="ligand_charge"
            ></v-text-field>
        </v-col>

        <!-- Ligand Categories -->
        <v-col cols="12" md="6">
            <v-text-field
                label="Ligand Categories"
                prepend-icon="mdi-gold"
                variant="solo"
                :loading="isLoading ?? false"
                @change="entry('ligand_categories', ligand_categories)"
                v-model:model-value="ligand_categories"
            ></v-text-field>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent ({
    name: "LigandInfo",
    props: {
        isLoading: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        ligand_name: '',
        molecular_formula_charge: '',
        ligand_form_protonation: '',
        ligand_form_charge: '',
        ligand_charge: '',
        ligand_categories: ''
    }),
    methods: {
        entry(fieldToChange: String, dataToSend: any) {
            this.$emit('entry', {'fieldToChange': fieldToChange, 'dataToSend': dataToSend})
        }
    }
})
</script>