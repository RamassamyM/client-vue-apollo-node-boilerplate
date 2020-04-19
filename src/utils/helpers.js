// or use vue-validate for better validation system, this one is simple
// export function validateEmail(email) {
//     const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase())
//   }
import { apolloClient } from '@/apollo'
import { SESSION } from '@/graphqlQueries/auth.gql'
import localState from '@/store/apolloLocalState'
import router from '@/router'
import gql from 'graphql-tag'

export const isUserLoggedIn = async () => {
  try {
    const isLoggedIn = apolloClient.query({ query: SESSION })
    .then(({ data: { isLoggedIn }}) => {
      // console.log('Check if user logged: ', isLoggedIn)
      return isLoggedIn
    })
    return isLoggedIn
  } catch (err) {
    throw err
  }
}

export const resetSessionParams = async () => {
  const authDefaults = localState.authDefaults
  apolloClient.writeQuery({ query: SESSION, data: authDefaults })
}

export const logoutEverywhere = async () => {
  window.localStorage.setItem('logout', Date.now())
}

export const logoutFromRefresh = async () => {
const confirmed = await apolloClient
  .mutate({
      mutation: gql `mutation Logout {
        logout { confirmed }
      }`,
  })
  .then(({ data: { logout: { confirmed }}}) => {
    return confirmed
  })
  .catch((err) => {
      throw err
  })
  return confirmed
}

export const logoutLocal = async () => {
  try {
    resetSessionParams()
    logoutEverywhere()
    const loggedOut = await logoutFromRefresh()
    if (loggedOut) {
      router.push({name: 'home'})
    } else {
      throw 'ERROR while trying to Logout!'
    }
  } catch (e) {
      throw e
  }
}

export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

export function uniqueArray(arr) {
    var a = [];
    for (var i=0, l=arr.length; i<l; i++)
        if (a.indexOf(arr[i]) === -1 && arr[i] !== '')
            a.push(arr[i]);
    return a;
}
