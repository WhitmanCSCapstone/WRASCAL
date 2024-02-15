<template>
  <v-dialog v-model="dialog" max-width="290">
    <v-card>
      <v-card-title class="headline">Log in</v-card-title>
      <v-card-text>
        <v-text-field v-model="username" label="Username" required></v-text-field>
        <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="close">Cancel</v-btn>
        <v-btn color="green darken-1" text @click="submit">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    username: '',
    password: ''
  }),
  methods: {
    close() {
      this.dialog = false;
    },
    submit() {
      // Handle login logic here
      this.close();
    }
  }
}
</script>
