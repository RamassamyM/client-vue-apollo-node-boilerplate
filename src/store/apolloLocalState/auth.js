import gql from 'graphql-tag'

export const authDefaults = {
  jwt: '',
  jwtExpiration: Date.now(),
  isLoggedIn: false,
}

const clearSessionInCache = async ({cache}) => {
  const data = { isLoggedIn: false, ...authDefaults  }
  cache.writeData({ data })
}

const resolvers = {
  Query: {
    isLoggedIn: (root, args, { cache }) => {
      let { jwt, jwtExpiration } = cache.readQuery({ query: gql`
        query GetJwt {
          jwt
          jwtExpiration
        }
      ` })
      const jwtHasExpired = jwtExpiration <= Date.now()
      if (jwtHasExpired) {
        try {
          clearSessionInCache({ cache })
        } catch (e) {
          // console.log(e)
        }
      }
      return !jwtHasExpired && !!jwt
    }
  },
  Mutation: {
    logout: (root, args, { cache }) => {
      try {
        clearSessionInCache({ cache })
      } catch (e) {
        // console.log(e)
      }
      return true
    },
  }
}

const typeDefs = gql`
  type User {
    _id: ID
    email: String
    username: String
  }

  type Query {
    isLoggedIn: Boolean
    me: User
  }

  type Mutation {
    logout: Boolean
  }
`

export default { typeDefs, resolvers, authDefaults }
