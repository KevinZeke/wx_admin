import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login'
import main from '../components/Main'
import waterList from '../components/waterSource/list'
import waterForm from '../components/waterSource/form'


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
            path: '/admin',
            component: main,
            redirect:'/admin/water/list',
            children:[
                {
                    path: 'water/list',
                    name: 'waterList',
                    component: waterList
                },
                {
                    path: 'water/form',
                    name: 'waterForm',
                    component: waterForm
                }
            ]
        }
    ]
})
