<template>
  <v-card class="dialog__signup">
    <v-card-title
      :class="`d-flex justify-space-between headline`"
    >
      <span>Se connecter</span>
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
          label="Email"
          prepend-icon="mdi-email"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
          @click="removeError"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :type="showpassword ? 'text' : 'password'"
          :error-messages="passwordErrors"
          label="Mot de passe"
          prepend-icon="mdi-lock"
          :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showpassword = !showpassword"
          @click="removeError"
          required
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
        ></v-text-field>

        <div class="d-flex justify-space-around">
          <v-btn large color="error" @click.prevent="submit">Se connecter</v-btn>
          <!-- <v-btn large color="error" @click.prevent="submit" :disabled="$v.$invalid">Se connecter</v-btn> -->
        </div>
      </form>
    </v-card-text>
    <v-card-text
      :class="`d-flex justify-center py-4 align-center`"
    >
      <div>Nouveau sur TheJamQuiz? Créer un compte</div>
      <v-btn
        text
        blue
        class="Primary"
        @click="$emit('closeAndSignUp')"
      >
        S'inscrire
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import { SESSION } from '@/graphqlQueries/auth.gql'
import gql from 'graphql-tag'

export default {
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password: { required },
  },
  data: () => ({
    email: '',
    password: '',
    showpassword: false,
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
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required')
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
        const password = this.password
        this.$apollo.provider.defaultClient.clearStore()
        // console.log('Starting mutation...')
        this.$apollo.mutate({
          mutation: gql`mutation Login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              jwt
              jwtExpiration
              user { _id }
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
            this.$root.$data.userId = response.data.login.user._id
            window.localStorage.setItem('login', Date.now())
            this.$router.push({name: 'dashboard'})
            // console.log('LOGIN SUCCESS!')
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
