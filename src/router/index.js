import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login'
import notFound from '../components/404'
import main from '../components/Main'
import waterList from '../components/waterSource/list'
import waterForm from '../components/waterSource/form'
import buildingList from '../components/building/list'
import buildingForm from '../components/building/form'
import userList from '../components/user/list'


import {adminGuard} from "./guard"


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: login
        },
        {
            path: '/404',
            name: '404',
            component: notFound
        },
        {
            path: '/admin',
            component: main,
            redirect:'/admin/water/list',
            // beforeEnter: adminGuard,
            children:[
                //水源
                {
                    path: 'water/list',
                    name: 'waterList',
                    component: waterList
                },
                {
                    path: 'water/form',
                    name: 'waterForm',
                    component: waterForm
                },
                //建筑
                {
                    path: 'building/list',
                    name: 'buildingList',
                    component: buildingList
                },
                {
                    path: 'building/form',
                    name: 'buildingForm',
                    component: buildingForm
                },
                {
                    path: 'user/list',
                    name: 'userList',
                    component: userList
                }
            ]
        }
    ]
})
