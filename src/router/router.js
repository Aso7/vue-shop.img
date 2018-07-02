import Vue from 'vue'
import VueRouter from 'vue-router'

//全局
import Index from "../components/index"

//首页
import Home from "../components/Home/home"
import IconDetail from "../components/Home/iconDetail"
import Listdetail from "../components/Home/Listdetail"

//分类
import Item from "../components/Classify/item"
import Search from "../components/Classify/Search"

//购物车
import Cart from "../components/Cart/cart"

//我的
import Myself from "../components/Myself/myself"
import Login from "../components/Myself/login"
import Register from "../components/Myself/register"
import Money from "../components/Myself/money"
import Address from "../components/Myself/address"
import Service from "../components/Myself/service"
import Set from "../components/Myself/set"
import Newadd from "../components/Myself/newAdd"
import Order from "../components/Myself/order"
import News from "../components/Myself/news"
import Send from "../components/Myself/send"
import Wait from "../components/Myself/wait"
import Notmoney from "../components/Myself/notmoney"
import All from "../components/Myself/all"
import Aftersale from "../components/Myself/after-sale"

Vue.use(VueRouter)

import { getCookie } from "../utils/utils"

const router = new VueRouter({
    routes: [
        {
            path: "/",
            redirect: Home
        },
        {
            path: "/home",
            name: "home",
            component: Home
        },
        {
            path: "/iconDetail",
            name: "iconDetail",
            component: IconDetail
        },
        {
            path: "/item",
            name: "item",
            component: Item
        },
        {
            path: "/cart",
            name: "cart",
            component: Cart
        },
        {
            path: "/myself",
            name: "myself",
            component: Myself
        },
        {
            path: "/money",
            name: "money",
            component: Money
        },
        {
            path: "/address",
            name: "address",
            component: Address
        },
        {
            path: "/service",
            name: "service",
            component: Service
        },
        {
            path: "/listDetail",
            name: "listDetail",
            component: Listdetail
        },
        {
            path: "/search",
            name: 'search',
            component: Search
        },
        {
            path: "/login",
            name: 'login',
            component: Login
        },
        {
            path: "/register",
            name: "register",
            component: Register
        },
        {
            path: "/set",
            name: "set",
            component: Set
        },
        {
            path: "/newAdd",
            name: "newAdd",
            component: Newadd
        },
        {
            path: "/order",
            name: "order",
            component: Order,
            children:[
                {
                    path:"all",
                    name:'all',
                    component:All
                },
                {
                    path:'notmoney',
                    name:'notmoney',
                    component:Notmoney
                },
                {
                    path:"send", 
                    name:'send',
                    component:Send                   
                },
                {
                    path:"wait",
                    name:'wait',
                    component:Wait
                },
                {
                    path:"after-sale",
                    name:'after-sale',
                    component:Aftersale
                }
            ]
        },
        {
            path: "/news",
            name: "news",
            component: News
        }
    ]
})

router.beforeEach((to, from, next) => {
    //console.log(to)
    if (to.name == 'cart' || to.name == "myself") {
        let token = getCookie('token')
        //console.log(token)
        if (!token) {
            next({ name: 'login', query: { from: to.name } })
        } else {
            next()
        }
    } else {
        next()
    }
    next()
})
export default router
