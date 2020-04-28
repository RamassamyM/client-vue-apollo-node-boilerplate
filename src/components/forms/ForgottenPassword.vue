<template>
  <v-card class="dialog__signup">
    <v-card-title
      :class="`d-flex justify-space-between headline`"
    >
      <span>Forgot your password ?</span>
      <v-btn
        icon
        large
        @click="$emit('close')"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <div v-if="error" class="error">
        {{ error }}
      </div>
      <form>
        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          label="We will send you an email with a link to create a new password :"
          placeholder="Email"
          prepend-icon="mdi-email"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
          @click="removeError"
        ></v-text-field>
        <div class="d-flex justify-space-around">
          <v-btn large color="error" @click.prevent="submit">Get a link</v-btn>
        </div>
      </form>
    </v-card-text>
    <v-card-text class="d-flex flex-column">
      <div class="d-flex justify-center pt-4 align-center">
        <div>I know my password ? </div>
        <v-btn text blue color="primary" class="ml-1" @click="$emit('closeForgottenPasswordAndOpenLogin')">
          Login
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import { SESSION } from '@/graphqlQueries/auth.gql'
import gql from 'graphql-tag'
import EventBus from '@/event-bus'

export default {
  mixins: [validationMixin],
  validations: {
    email: { required, email },
  },
  data: () => ({
    email: '',
    submitted: false,
    error: false,
    form: {
      email: '',
    },
  }),
  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
  },
  props: {
    dialogName: String,
  },
  methods: {
    submit() {
      try {
        if (this.$v.$invalid) {
          this.error = 'Please complete the form'
          return
        }
        this.$v.$touch()
        const email = this.email
        this.$apollo.provider.defaultClient.clearStore()
        // console.log('Starting mutation...')
        this.$apollo.mutate({
          mutation: gql`mutation SendNewPasswordLink($email: String!) {
            sendNewPasswordLink(email: $email) {
            }
          }`,
          variables: { email, password },
          update: (cache, { data: { login: { jwt, jwtExpiration } } }) => {
            this.$apollo.provider.defaultClient.writeQuery({ query: SESSION,
              data: { jwt, jwtExpiration, isLoggedIn: true },
            })
          },
        }).then((response) => {
          if (response.data) {
            // console.log('Mutation finished !')
            this.submitted = true
            this.error = false
          } else {
            throw response
          }
          return
        }).catch((error) => {
          if (error.graphQLErrors && error.graphQLErrors.length >= 1) {
            this.error = error.graphQLErrors[0].message
          } else {
            this.error = 'Something went wrong'
          }
          // console.log(error.message)
        })
      } catch (error) {
        // console.log(error)
        // throw error
      }
    },
    removeError() {
      this.error = false
    },
  },
}

</script>

<style scoped lang="scss">

.dialog__signup {
  border-radius: 20px;
}

.error {
  padding: 3px 15px;
  border-radius: 5px;
}

</style>
