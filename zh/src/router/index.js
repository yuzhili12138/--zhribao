import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import index from '../components/pages/index'
import dayn from '../components/pages/daynews'
import longshort from '../components/pages/longshort'
import wode from '../components/pages/wode'


export default new Router({
  routes: [
    {
      path:'/index',
      component:index,
    },
    {
      path:'/daynews/:id',
      component:dayn
    },
    {
      path:'*',
      redirect:'/index'
    },{
      path:'/longshort/:id',
      component:longshort
    },{
      path:'/wode',
      component:wode
    }
  ]
})
