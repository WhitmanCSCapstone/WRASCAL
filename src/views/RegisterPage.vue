<template>
  <v-container class="pt-8">
    <h1> Sign Up </h1><br>
    <v-row class="pt-8">
      <v-col
        cols="12"
        md="12"
      >
        <v-text-field
          label="Email"
          prepend-icon="mdi-list-box-outline"
          variant="solo"
          :loading="isLoading ?? false"
          @input="onEmailUpdate"
          v-model:model-value="emailValue"
        ></v-text-field>
      </v-col>

      <v-col
        cols="12"
        md="12"
      >
        <v-text-field
          label="Password"
          prepend-icon="mdi-flask"
          variant="solo"
          :loading="isLoading ?? false"
          @input="onPasswordUpdate"
          v-model:model-value="passwordValue"
        ></v-text-field>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          label="ORCID"
          prepend-icon="mdi-flash"
          variant="solo"
          :loading="isLoading ?? false"
          @input="onORCIDUpdate"
          v-model:model-value="ORCIDValue"
        ></v-text-field>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
      </v-col>
    </v-row>

    <v-btn type="submit" block class="mt-2" color="primary" @click="submitForm">Submit</v-btn>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { SupabaseClient } from '@supabase/supabase-js';

export default defineComponent({
  name: "NewEntryForm",
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    email: {
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
    emailValue: '',
    passwordValue: '',
    ORCIDValue: '',
    ligandChargeValue: ''
  }),
  methods: {

    onEmailUpdate(){
      this.$emit('update:ligandName', this.emailValue);
    },

    onPasswordUpdate() {
      this.$emit('update:formula', this.passwordValue);
    },

    onORCIDUpdate() {
      this.$emit('update:metalCharge', this.ORCIDValue);
    },

    onLigandChargeUpdate() {
      this.$emit('update:ligandCharge', this.ligandChargeValue);
    },
    async submitForm() {
      const supabase = new SupabaseClient('https://eauyarvlibdxezijtoyx.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhdXlhcnZsaWJkeGV6aWp0b3l4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE0NjQ3NDcsImV4cCI6MjAxNzA0MDc0N30.3u320_sLG2xIyXRRVs4_TyO44w9kc0TJnhaLja5JyAA')
      try {
        // Use the Supabase provided method to handle the signup
        const { error } = await supabase.auth.signUp({
          email: this.emailValue,
          password: this.passwordValue,
        });
        if (error) throw error;
      } catch (error) {
          console.log('Error: ', error)
      }
    }
  }
})
</script>
