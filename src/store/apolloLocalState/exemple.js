import gql from 'graphql-tag'

const typeDefs = gql`
  type AppBarColorSetting {
    id: Int!
    name: String!
    setting: String!
  }
  type Query {
    appBarColorSetting: AppBarColorSetting!
  }
  type Mutation {
    updateAppBarColorSetting(setting: String!): AppBarColorSetting!
  }
`

const resolvers = {
  Query: {
    appBarColorSetting: () => userSettings.appBarColorSetting
  },
  Mutation: {
    updateAppBarColorSetting: (_, { setting }) => {
      userSettings.appBarColorSetting.setting = setting
      return userSettings.appBarColorSetting
    }
  }
}

const defaults = {
  appBarColorSetting: {
    id: 1,
    name: 'App Bar Color',
    setting: 'primary',
    __typename: 'AppBarColorSetting'
  }
}

export default { typedefs, resolvers, defaults }
