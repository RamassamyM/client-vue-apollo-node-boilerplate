import { apolloClient } from '@/apollo'
import { Login, Signup, GetUserInfos } from '../../constants/query.gql'

export default {
  namespaced: true,
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {}
  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, { token, user }){
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
      state.user = { username: 'me', level: 'Beginner', playedGamesNb: 0 }
    },
    auth_auto(state, {user}){
      state.status = 'success'
      state.user = user
    },
  },
  actions: {
    setUserInfos({commit}) {
      return new Promise((resolve, reject) => {
        try {
          commit('auth_request')
          async function handler() {
            const response = await apolloClient.query({
              query: GetUserInfos
            })
            let user = response.data.me
            console.log('hi######')
            console.log(user)
            commit('auth_auto', { user: user })
            resolve(response)
          }
          handler()
        } catch (err) {
          // commit('auth_error')
          // localStorage.removeItem('token')
          reject(err)
        }
      })
    },
    login({commit}, { email, password }){
      return new Promise((resolve, reject) => {
        try {
          commit('auth_request')
          async function handler(email, password) {
            const response = await apolloClient.mutate({
              mutation: Login,
              variables: { email, password },
              // update: (store, { data }) => {
              // }
            })
            let token = response.data.login.token
            localStorage.setItem('token', token)
            commit('auth_success', { token: token, user: response.data.login.user })
            resolve()
          }
          handler(email, password)
        } catch (err) {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        }
      })
    },
    register({commit}, user){
      return new Promise((resolve, reject) => {
        try {
          async function signupHandler(user) {
            await commit('auth_request')
            const response = await apolloClient.mutate({
              mutation: Signup,
              variables: user,
              // update: (store, { data }) => {
              // }
            })
            let token = response.data.signup.token
            localStorage.setItem('token', token)
            commit('auth_success', { token: token, user: response.data.signup.user })
            resolve()
          }
          signupHandler(user)
        } catch (err) {
          commit('auth_error', err)
          localStorage.removeItem('token')
          reject(err)
        }
      })
    },
    logout({commit}){
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        // delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    isUserLoaded: state => !!state.user.username
  }
}
