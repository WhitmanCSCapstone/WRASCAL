<template>
  <v-card class="mx-auto" max-width="344" title="User Registration">
    <v-container>
      <v-text-field
        v-model="first"
        color="primary"
        label="First name"
        variant="underlined">
      </v-text-field>

      <v-text-field
        v-model="last"
        color="primary"
        label="Last name"
        variant="underlined">
      </v-text-field>

      <v-text-field
        v-model="email"
        color="primary"
        label="Email"
        variant="underlined">
      </v-text-field>

      <v-text-field
        v-model="password"
        color="primary" label="Password"
        placeholder="Enter your password"
        variant="underlined">
      </v-text-field>

      <v-text-field
        v-model="orcid"
        color="primary"
        label="ORCID number (optional)"
        variant="underlined">
      </v-text-field>
    </v-container>

    <v-card-actions>
      <v-btn :disabled="!form" :loading="loading" block @click="handleSignUp" color="primary" size="large" type="submit" variant="elevated">
        Register
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
import { createClient } from '@supabase/supabase-js';
import { ref } from 'vue';

const supabase = createClient('https://eauyarvlibdxezijtoyx.supabase.co', 'public-anon-key');

const first = ref(null)
const last = ref(null)
const email = ref(null)
const password = ref(null)
const orcid = ref(null)

const handleSignUp = async () => {
  try {
    const { data, error } = await supabase.auth.signUp(
      {
        email: email.value || '',
        password: password.value || '',
        options: {
          data: {
            orcid: orcid.value,
          }
        }
      }
    )
  }
  catch (error) {
    console.error('Error signing up:', error as Error);
  }
}

export default {
  data: () => ({
    first: null,
    last: null,
    email: null,
    password: null,
    orcid: null,
    terms: false,
  }),
}

</script>
