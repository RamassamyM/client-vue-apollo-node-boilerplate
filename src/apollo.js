require('dotenv').config()
import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'
import { ApolloLink, execute, makePromise } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import apolloLogger from 'apollo-link-logger'
import { SESSION } from '@/graphqlQueries/auth.gql'
import localState from '@/store/apolloLocalState'
import { setContext } from "apollo-link-context"
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
import introspectionQueryResultData from '@/fragmentTypes.json'
import router from '@/router'
import gql from 'graphql-tag'
import { API_URI } from '../config'
// import { resetSessionParams } from './helpers/helpers'
// import jwt from 'jsonwebtoken'

// const DEBUG = true
const authDefaults = localState.authDefaults
const defaults = localState.defaults

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
})
// console.log("API_URI: ", API_URI)
// configuration of apolloLink for apollo layer that fetch data to graphqlApi Server
export const httpLink = new HttpLink({
  uri: API_URI,
  credentials: 'include', // 'include' to have httpOnly cookie set
  // Below is a logger for request: activate this or use apolloLogger and see logs in browser console
  // fetch: (...pl) => {
  //   if (!DEBUG) return fetch(...pl)
  //   const [_, options] = pl
  //   const body = JSON.parse(options.body)
  //   console.log(`📡${body.operationName || ''}\n${body.query}`, body.variables)
  //   return fetch(...pl)
  // },
})
// Below is a logger for response :
// const responseLogger = new ApolloLink((operation, forward) => {
//   return forward(operation).map(result => {
//     console.info(operation.getContext().response.headers)
//     return result
//   })
// })

// Configure cache for apollo specifying which prop to look for id
// as apollo cache update cache according to id and typename
const cache = new InMemoryCache({
  fragmentMatcher,
  dataIdFromObject: object => object._id || null
})

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
    throw `[Network error]: ${networkError}`
  }
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    })
    const { cache } = operation.getContext()
    for (let err of graphQLErrors) {
      // handle errors differently based on its error code
      if (err.extensions && err.extensions.code) {
        switch (err.extensions.code) {
          case 'UNAUTHENTICATED':
          cache.writeQuery({ query: SESSION, data: authDefaults })
          // cache.writeData({ data: authDefaults })
          window.localStorage.setItem('logout', Date.now())
          router.push('/')

          // handle other errors
          // case 'ANOTHER_ERROR_CODE':
          // ...
        }
      }
    }
    forward(operation)
  }
})

const refreshSession = async () => {
  try {
    const operation = {
      query: gql`
      mutation RefreshToken {
        refreshToken { jwt jwtExpiration }
      }
      `
    }
    const response = await makePromise(execute(httpLink, operation))
    // console.log(`Received data from refresh: ${JSON.stringify(response, null, 2)}`)
    const { data: { refreshToken: { jwt, jwtExpiration }}} = response
    await apolloClient.writeQuery({ query: SESSION, data: { jwt, jwtExpiration, isLoggedIn: true }})
    return jwt
  } catch (error) {
    // console.log(`Received error ${error}`)
    // console.log('Resetting session params...')
    cache.writeData({ data: authDefaults })
    return null
  }
}

const getJwtTokenOrRefreshPromise = async ({ request }) => {
  console.log("request operationName: ", request.operationName)
  if (['Login', 'Signup', 'sendForgotPasswordEmail', 'changePassword'].includes(request.operationName)) {
    return null
  }
  let { jwt, jwtExpiration } = await apolloClient.readQuery({query: SESSION})
  const maxTimeBeforeRefreshing = await Date.now() + 10 * 1000
  if (jwtExpiration*1000 <= maxTimeBeforeRefreshing) {
    jwt = await refreshSession()
  }
  return `Bearer ${jwt}`
}

const asyncAuthLink = setContext(
  (request, { headers }) =>
  getJwtTokenOrRefreshPromise({ request }).then(bearer => {
    return { headers: {
        ...headers,
        authorization: bearer || null,
      },
    }
  })
  // .catch((err) => {
  //   console.log(err)
  //   return {}
  // })
)

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    apolloLogger,
    // responseLogger,
    errorLink,
    asyncAuthLink,
    httpLink
  ]),
  cache,
  resolvers: localState.resolvers,
  typeDefs: localState.typeDefs,
  connectToDevTools: process.env.NODE_ENV !== 'production',
})

apolloClient.onClearStore(() => {
  try {
    // console.log('Resetting session in cache...')
    cache.writeData({ data: authDefaults })
  } catch (e) {
    // console.log('ERROR while resetting cacke')
    throw e
  }
  return
})

// Initializing cache with defaults set in localState files :
// should not intialize here the defaults for authentication
// as these defaults are initialized with the router that add jwt tokens to header.

cache.writeData({ data: {
  ...authDefaults,
  ...defaults
}})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: 'loading'
  }
})

Vue.use(VueApollo)

export { apolloProvider as default, cache }
