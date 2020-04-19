<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    class="d-flex align-center flex-wrap justify-center "
  >
    <v-text-field
    v-model="email"
    :rules="emailRules"
    label="E-mail"
    required
    class="newsletter__form_textarea mr-4"
    ></v-text-field>
    <v-btn
    :disabled="!valid"
    depressed
    color="error"
    class="mr-4 newsletter__form_button"
    @click="validate"
    >
      Subscribe
    </v-btn>
  </v-form>
</template>
<script>
  export default {
    data: () => ({
      valid: true,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    }),

    methods: {
      validate () {
        this.$refs.form.validate()
        // todo
      },
      // reset () {
      //   this.$refs.form.reset()
      // },
      // resetValidation () {
      //   this.$refs.form.resetValidation()
      // },
    },
  }
</script>

<style lang="scss" scoped>

.newsletter__form_textarea {
  width: 400px;
  max-width: 80%;
}

.newsletter__form_button {
  position: relative;
  bottom: 3px;
}

</style>
