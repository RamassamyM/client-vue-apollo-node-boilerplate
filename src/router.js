import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import Dashboard from '@/views/Dashboard.vue';
import NotFoundPage from '@/views/NotFound.vue';
// import Dashboard from '@/views/Dashboard.vue';
import { isUserLoggedIn } from '@/utils/helpers'
import { apolloClient, httpLink, cache } from './apollo'
import { SESSION } from '@/graphqlQueries/auth.gql'
import { execute, makePromise } from 'apollo-link'
import gql from 'graphql-tag'
import { authDefaults } from '@/store/apolloLocalState/auth'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        unAuth: true,
        title: 'Home',
        layout: 'homenosidebar',
        preloading: 'true',
      },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        secure: true,
        title: 'Dashboard',
        layout: 'dashboard',
        preloading: 'true',
      },
    },
    // {
    //   path: '/dashboard',
    //   name: 'dashboard',
    //   component: Dashboard,
    //   meta: { title: 'Dashboard - TheJamQuiz',
    //           hideNavigation: true,
    //           secure: true,
    //           hideFooter: true,
    //         },
    // },
    {   path: '*',
        name: 'notfound',
        component: NotFoundPage,
        meta: {
          unAuth: true,
          title: '404',
          layout: 'homenosidebar',
          preloading: 'true',
        },
    },

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    // },
  ],
})

const refreshTokenRequestAndUpdateSessionParams = async () =>  {
  const operation = {
    query: gql`
    mutation RefreshToken {
      refreshToken { jwt jwtExpiration }
    }
    `
  }
  return makePromise(execute(httpLink, operation))
  .then(response => {
    if (response.errors && response.errors[0].extensions.code === 'REFRESHTOKEN_INVALID') throw 'REFRESHTOKEN_INVALID'
    // console.log(`received data ${JSON.stringify(response, null, 2)}`)
    const { data: { refreshToken: { jwt, jwtExpiration }}} = response
    return { jwt, jwtExpiration }
  }).then(({jwt, jwtExpiration}) => {
    apolloClient.writeQuery({query: SESSION, data: { jwt, jwtExpiration, isLoggedIn: true }})
    // console.log('SUCCESS: refreshing the token and caching session params')
  }).then(() => {
    return true
  }).catch(() => {
    // console.log(`Received error : ${error}, resetting params now`)
    cache.writeData({ data: authDefaults })
    return false
  })
}

router.beforeEach((to, from, next) => {
  isUserLoggedIn()
  .then((isLoggedIn) => {
    if (!isLoggedIn) {
      // console.log('Not logged with jwt, try refreshing jwt...')
      return refreshTokenRequestAndUpdateSessionParams()
    } else {
      return true
    }
  })
  .then((isLoggedIn) => {
    if(to.matched.some(record => record.meta.secure) && !isLoggedIn) {
      // console.log('This route requires authentication but you are not authenticated, so you are redirected to Home for Login')
      if (from.name !== 'home') {
        next({name: 'home'})
        return
      }
    } else if (to.matched.some(record => record.meta.unAuth) && isLoggedIn) {
      // console.log('Route require no authentication, but user already logged in, redirection to user Dashboard')
      if (from.name !== 'dashboard') {
        next({name: 'dashboard'})
        return
      }
    } else {
      next()
    }
    return false
  })
  .catch((err) => {
    // eslint-disable-next-line
    console.log(err)
  })
})

router.afterEach((to) => {
  document.title = to.meta.title
})

export default router
