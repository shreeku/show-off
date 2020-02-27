import Vue from 'vue'
import Router from 'vue-router'
import homePage from '@/components/homePage'
import showOff from '@/components/showOffPage'
import Auth from '@okta/okta-vue'


Vue.use(Auth, {
  issuer: process.env.OKTADOMAIN,
  client_id: process.env.OKTACLIENTID,
  redirect_uri: 'http://localhost:8080/implicit/callback',
  scope: 'openid profile email'
})

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: homePage
    },
    {
      path: '/implicit/callback',
      component: Auth.handleCallback()
    },
    {
      path: '/show-off-page',
      name: 'showOffPage',
      component: showOff,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach(Vue.prototype.$auth.authRedirectGuard())
export default router
