<template>
  <v-card class="dialog__signup">
    <v-card-title
      :class="`d-flex justify-space-between headline`"
    >
      <span class="signup__form_title">Inscrivez-vous</span>
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
          v-model="username"
          :error-messages="usernameErrors"
          :counter="10"
          label="Nom d'utilisateur"
          prepend-icon="mdi-account-circle"
          required
          @input="$v.username.$touch()"
          @blur="$v.username.$touch()"
          @click="removeError"
        ></v-text-field>

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
          required
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
          @click="removeError"
        ></v-text-field>

        <v-select
          v-model="selected"
          :items="choices"
          :error-messages="selectErrors"
          label="Choisir"
          multiple
          chips
          prepend-icon="mdi-music-circle"
          hint="Choisis..."
          persistent-hint
          @change="$v.select.$touch()"
          @blur="$v.select.$touch()"
        ></v-select>

        <v-checkbox
          v-model="checkbox"
          :error-messages="checkboxErrors"
          label="J'accepte les conditions générales d'utilisation de TheJamQuiz"
          required
          @change="$v.checkbox.$touch()"
          @blur="$v.checkbox.$touch()"
        ></v-checkbox>

        <div class="d-flex justify-space-around">
          <v-btn large color="error" @click="submit" >Commencer</v-btn>
        </div>
      </form>
    </v-card-text>
    <v-card-text
      :class="`d-flex justify-center py-4 align-center`"
    >
      <div>J'ai déjà un compte sur TheJamQuiz?</div>
      <v-btn
        text
        color="primary"
        blue
        @click="$emit('closeAndLogin')"
      >
        Se connecter
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength, email } from 'vuelidate/lib/validators'
import { isPasswordStrong } from "@/utils/validator"
import { SESSION } from '@/graphqlQueries/auth.gql'
import gql from 'graphql-tag'

export default {
  mixins: [validationMixin],

  validations: {
    username: { required, maxLength: maxLength(10) },
    email: { required, email },
    password: { required,
      minLength: minLength(8),
      isPasswordStrong,
     },
    checkbox: {
      checked (val) {
        return val
      },
    },
    select: {
      minOneSelected () {
        return this.selected.length > 0
      }
    }
  },

  data: () => ({
    username: '',
    email: '',
    password: '',
    showpassword: false,
    select: null,
    checkbox: false,
    selected: [],
    choices: ['this', 'that', 'these'],
    submitted: false,
    error: false,
    form: {
      email: '',
    }
  }),

  computed: {
    checkboxErrors () {
      const errors = []
      if (!this.$v.checkbox.$dirty) return errors
      !this.$v.checkbox.checked && errors.push('You must agree to continue!')
      return errors
    },
    selectErrors () {
      const errors = []
      if (!this.$v.select.$dirty) return errors
      !this.$v.select.minOneSelected && errors.push('Genre is required, select at least one genre')
      return errors
    },
    usernameErrors () {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.maxLength && errors.push('username must be at most 10 characters long')
      !this.$v.username.required && errors.push('username is required.')
      return errors
    },
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
      !this.$v.password.minLength && errors.push('Password must be at least 8 characters long')
      !this.$v.password.required && errors.push('Password is required')
      !this.$v.password.isPasswordStrong && errors.push('Password must contain a letter, a number, a special character.')
      return errors
    },
  },

  props: {
    dialogName: String,
  },

  methods: {
    async submit () {
      this.$v.$touch()
      // console.log('Submit')
      let user = {
        genres: this.selected,
        email: this.email,
        username: this.username,
        password: this.password
      }
      if (this.$v.$invalid) {
        console.log(this.$v)
        this.error = 'Please complete the form'
        return
      }
      this.$apollo.mutate({
        mutation: gql`mutation Signup($username: String!, $email: String!, $genres: [String], $password: String!) {
          signup(username: $username, email: $email, genres: $genres, password: $password) {
            jwt
            jwtExpiration
            user { _id }
          }
        }`,
        variables: user,
        update: (cache, { data: { signup: { jwt, jwtExpiration } } }) => {
          this.$apollo.provider.defaultClient.writeQuery({ query: SESSION,
            data: { jwt, jwtExpiration, isLoggedIn: true },
          })
        },
      }).then(({ data: { signup } }) => {
        this.submitted = true
        this.error = false
        this.$root.$data.userId = signup.user._id
        this.$router.push({name: 'dashboard'})
        // console.log('SIGNUP SUCCESS!')
      }).catch((error) => {
        if (error.graphQLErrors && error.graphQLErrors.length >= 1) {
          this.error = error.graphQLErrors[0].message
        } else {
          this.error = 'Something went wrong'
        }
        // console.log(error.message)
      })
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
