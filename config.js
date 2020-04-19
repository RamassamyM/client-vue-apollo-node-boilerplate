require('dotenv').config()

let uri
if (process.env.API_GRAPHQL_URI) {
  uri = `${process.env.API_GRAPHQL_URI}/graphql`
} else {
  uri = process.env.NODE_ENV == 'development' ? 'http://localhost:3000/graphql' : 'https://thejamquiz-api.herokuapp.com/graphql'
}

export const API_URI = uri
