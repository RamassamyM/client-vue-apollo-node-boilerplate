require('dotenv').config()
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VuePlyr from 'vue-plyr'
import apolloProvider from './apollo'

import Base from './layouts/Base.vue'
import BaseNosidebar from './layouts/BaseNoSidebar.vue'
import Centered from './layouts/Centered.vue'
import Dashboard from './layouts/Dashboard.vue'
import Gkeep from './layouts/Gkeep.vue'
import HomeNosidebar from './layouts/HomeNosidebar.vue'
import Main from './layouts/Main.vue'
import Modal from './layouts/Modal.vue'
import Ytube from './layouts/Ytube.vue'
import NoLayout from './layouts/NoLayout.vue'

Vue.component('base-layout', Base)
Vue.component('basenosidebar-layout', BaseNosidebar)
Vue.component('centered-layout', Centered)
Vue.component('dashboard-layout', Dashboard)
Vue.component('gkeep-layout', Gkeep)
Vue.component('homenosidebar-layout', HomeNosidebar)
Vue.component('main-layout', Main)
Vue.component('modal-layout', Modal)
Vue.component('ytube-layout', Ytube)
Vue.component('no-layout', NoLayout)

Vue.config.productionTip = false

Vue.use(VuePlyr, {})

new Vue({
  apolloProvider,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
