import Vue from 'vue'
import Router from 'vue-router'
import Menu from './views/Menu.vue'
import Scores from './views/Scores.vue'
import New from './views/New.vue'
import Play from './views/Play.vue'
import Summary from './views/Summary.vue'
import About from './views/About.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'menu',
      component: Menu
    },
    {
      path: '/scores',
      name: 'scores',
      component: Scores
    },
    {
      path: '/new',
      name: 'new',
      component: New
    },
    {
      path: '/play',
      name: 'play',
      component: Play
    },
    {
      path: '/summary',
      name: 'summary',
      component: Summary
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
