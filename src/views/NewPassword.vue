<template>
  <div id="changePasswordForm" class="d-flex justify-center align-center px-6 blue">
    <v-card class="dialog__changePassword">
      <v-card-title
        :class="`d-flex justify-space-between headline`"
      >
        <span>Change your password</span>
      </v-card-title>
      <v-card-text>
        <div v-if="error" class="error">
          {{ error }}
        </div>
        <form>
          <v-text-field
            v-model="password"
            :type="showpassword ? 'text' : 'password'"
            :error-messages="passwordErrors"
            label="Enter your new Password"
            prepend-icon="mdi-lock"
            :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showpassword = !showpassword"
            required
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
            @click="removeError"
          ></v-text-field>
          <v-text-field
            v-model="confirmedPassword"
            :type="showConfirmedPassword ? 'text' : 'password'"
            :error-messages="confirmedPasswordErrors"
            label="Confirm your new password"
            prepend-icon="mdi-lock"
            :append-icon="showConfirmedPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showConfirmedPassword = !showConfirmedPassword"
            required
            @input="$v.confirmedPassword.$touch()"
            @blur="$v.confirmedPassword.$touch()"
            @click="removeError"
          ></v-text-field>
          <div class="d-flex justify-space-around">
            <v-btn large color="error" @click.prevent="submit">Confirm</v-btn>
          </div>
        </form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'
import { isPasswordStrong } from "@/utils/validator"
import gql from 'graphql-tag'
import EventBus from '@/event-bus'

export default {
  mixins: [validationMixin],
  validations: {
    password: { required,
      minLength: minLength(8),
      isPasswordStrong,
     },
    confirmedPassword: { required,
     minLength: minLength(8),
     isPasswordStrong,
    },
  },
  data: () => ({
    password: '',
    showpassword: false,
    confirmedPassword: '',
    showConfirmedPassword: false,
    submitted: false,
    error: false,
  }),
  computed: {
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength && errors.push('Password must be at least 8 characters long')
      !this.$v.password.required && errors.push('Password is required')
      !this.$v.password.isPasswordStrong && errors.push('Password must contain a letter, a number, a special character.')
      return errors
    },
    confirmedPasswordErrors () {
      const errors = []
      if (!this.$v.confirmedPassword.$dirty) return errors
      // !this.$v.confirmedPassword.minLength && errors.push('Password must be at least 8 characters long')
      // !this.$v.confirmedPassword.required && errors.push('Password is required')
      // !this.$v.confirmedPassword.isPasswordStrong && errors.push('Password must contain a letter, a number, a special character.')
      this.password !== this.confirmedPassword && errors.push('Passwords must be the same.')
      return errors
    },
  },
  methods: {
    submit() {
      try {
        if (this.$v.$invalid) {
          this.error = 'Please complete the form'
          return
        }
        this.$v.$touch()
        const password = this.password
        const key = this.$route.params.key
        this.$apollo.provider.defaultClient.clearStore()
        // console.log('Starting mutation...')
        this.$apollo.mutate({
          mutation: gql`mutation changePassword($password: String!, $key: String!) {
            changePassword(password: $password, key: $key) {confirmed message}}`,
          variables: { password, key },
        }).then((response) => {
          if (response.data.changePassword) {
            const message = response.data.changePassword.message
            // console.log('Mutation finished !')
            this.submitted = true
            this.password = ''
            this.error = false
            if (message) {
              EventBus.$emit('displayNotifBar', { text: message, color: 'blue', x:'right', y:'top', mode: '' })
            }
            this.$router.push({name: 'home'})
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
          console.log(error.message)
        })
      } catch (error) {
        // console.log(error)
        throw error
      }
    },
    removeError() {
      this.error = false
    },
  },
}

</script>

<style scoped lang="scss">

#changePasswordForm {
  height: 100vh;
  // width: 100vw;
}

.dialog__changePassword {
  border-radius: 20px;
  width: 100%;
  max-width: 500px;
}

.error {
  padding: 3px 15px;
  border-radius: 5px;
}

</style>
