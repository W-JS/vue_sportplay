import Vue from 'vue'
import VueRouter from 'vue-router'
//引入Login组件
import Login from '../components/Login.vue'
//引入Home组件
import Home from '../components/Home.vue'
//引入Welcome组件
import Welcome from '../components/Welcome.vue'
//引入UserList组件
import UserList from '../components/admin/UserList.vue'
//引入Register组件
import Register from '../components/Register.vue'
//引入Test组件
import Test from '../components/test/Test.vue'
//引入Test1组件
import Test1 from '../components/test/Test1.vue'
//引入Test2组件
import Test2 from '../components/test/Test2.vue'
//引入Test3组件
import Test3 from '../components/test/Test3.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/register",
    component: Register
  },
  {
    path: "/test",
    component: Test
  },
  {
    path: "/test1",
    component: Test1
  },
  {
    path: "/test2",
    component: Test2
  },
  {
    path: "/test3",
    component: Test3
  },
  {
    path: "/home",
    component: Home,
    redirect: "/welcome",
    children: [
      {
        path: "/welcome",
        component: Welcome,
      },
      {
        path: "/user",
        component: UserList,
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

// 出现问题的时候使用
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  //to 将要访问
  //from 从哪访问
  //next 接着干 next(url) 重定向到url上 next() 继续访问 to路径
  if (to.path == '/login') return next();//访问首页就放行
  //获取user
  const userFlag = window.sessionStorage.getItem("user");//取出当前用户
  if (!userFlag) return next();//无值，返回登录页 next() or next('/login');
  next();//符合要求 放行
})

export default router//暴露出去