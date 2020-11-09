import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import FileCate from '../components/FileCate'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  { path: '/', component: HelloWorld },
  { path: '/FileCate', component: FileCate }
]

const router = new VueRouter({
  scrollBehavior: () => ({
    y: 0
  }),
  routes
})

export default router