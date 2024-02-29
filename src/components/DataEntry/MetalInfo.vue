<template>
    <h2> Metal Information </h2>
        <v-row class="pt-8">
          <v-col
            cols="12"
            md="2"
          >
          <v-text-field
            label="Metal ID for fakers"
            prepend-icon="mdi-gold"
            variant="solo"
            :loading="isLoading ?? false"
            @input="onMetalIdUpdate"
            v-model:model-value="metal_id"
            ></v-text-field>
          </v-col>
        </v-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent ({ 
    name: "MetalInfo",
    props: {
        isLoading: {
            type: Boolean,
            default: false
        },
        metal_id: {
            type: String,
            default: ''
        }
        // metal_central_element: {
        //     type: String,
        //     default: ''
        // },
        // metal_formula_string: {
        //     type: String,
        //     default: ''
        // },
        // metal_charge: {
        //     type: String,
        //     default: false
        // }
    },
    data: () => ({
        metal_id: ''
        // metal_central_element_val: '',
        // metal_formula_string_val: '',
        // metal_charge_val: ''
    }),
    methods: {
        // todo: make these a single method: how?
        onMetalIdUpdate(){
            this.$emit('update:metal_id', this.metal_id)
        }
    }
})
</script>